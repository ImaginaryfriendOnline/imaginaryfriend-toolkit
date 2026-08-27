import { MODULE_ID } from "./constants";
import { injectConditionFilter } from "./features/misc/condition-filter";
import { MISC_SETTINGS } from "./features/misc/constants";
import { MiscSettingsMenu } from "./features/misc/settings-menu";
import { NAMEPLATE_SETTINGS, NAMEPLATE_TOKEN_FLAGS } from "./features/nameplate/constants";
import { NameplateFitter } from "./features/nameplate/nameplate-fitter";
import { NameplateSettingsMenu } from "./features/nameplate/settings-menu";
import { injectTokenConfigField } from "./features/nameplate/token-config";
import { SPELL_FADE_SETTINGS } from "./features/spell-fade/constants";
import { SpellFadeSettingsMenu } from "./features/spell-fade/settings-menu";
import { SpellFader } from "./features/spell-fade/spell-fader";
import { TOOLTIP_SETTINGS } from "./features/tooltip/constants";
import { TooltipSettingsMenu } from "./features/tooltip/settings-menu";
import { TooltipPositioner } from "./features/tooltip/tooltip-positioner";
import { registerModuleSettings } from "./settings";

Hooks.once("init", () => {
    registerModuleSettings(
        [NAMEPLATE_SETTINGS, TOOLTIP_SETTINGS, SPELL_FADE_SETTINGS, MISC_SETTINGS],
        {
            [NAMEPLATE_SETTINGS.ENABLED.key]: () => NameplateFitter.refreshAll(),
            [NAMEPLATE_SETTINGS.MIN_FONT_SIZE.key]: () => NameplateFitter.refreshAll(),
            [NAMEPLATE_SETTINGS.FONT_SHRINK_STEP.key]: () => NameplateFitter.refreshAll(),
            [NAMEPLATE_SETTINGS.COLOR_BY_DISPOSITION.key]: () => NameplateFitter.refreshAll(),
            [NAMEPLATE_SETTINGS.MAX_LINES.key]: () => NameplateFitter.refreshAll(),
            [TOOLTIP_SETTINGS.TOOLTIP_SCALE.key]: () => refreshAllTooltips(),
            [TOOLTIP_SETTINGS.TOOLTIP_ANCHOR.key]: () => refreshAllTooltips(),
            [TOOLTIP_SETTINGS.TOOLTIP_OFFSET_X.key]: () => refreshAllTooltips(),
            [TOOLTIP_SETTINGS.TOOLTIP_OFFSET_Y.key]: () => refreshAllTooltips(),
            [SPELL_FADE_SETTINGS.ENABLED.key]: () => SpellFader.apply(),
            [SPELL_FADE_SETTINGS.OPACITY.key]: () => SpellFader.apply()
        }
    );

    game.settings.registerMenu(MODULE_ID, "nameplateSettingsMenu", {
        name: "imaginaryfriend-toolkit.Menus.nameplate.Name",
        label: "imaginaryfriend-toolkit.Menus.nameplate.Label",
        hint: "imaginaryfriend-toolkit.Menus.nameplate.Hint",
        icon: "fa-solid fa-tag",
        type: NameplateSettingsMenu,
        restricted: true
    });

    game.settings.registerMenu(MODULE_ID, "tooltipSettingsMenu", {
        name: "imaginaryfriend-toolkit.Menus.tooltip.Name",
        label: "imaginaryfriend-toolkit.Menus.tooltip.Label",
        hint: "imaginaryfriend-toolkit.Menus.tooltip.Hint",
        icon: "fa-solid fa-arrows-up-down-left-right",
        type: TooltipSettingsMenu,
        restricted: true
    });

    game.settings.registerMenu(MODULE_ID, "spellFadeSettingsMenu", {
        name: "imaginaryfriend-toolkit.Menus.spellFade.Name",
        label: "imaginaryfriend-toolkit.Menus.spellFade.Label",
        hint: "imaginaryfriend-toolkit.Menus.spellFade.Hint",
        icon: "fa-solid fa-wand-sparkles",
        type: SpellFadeSettingsMenu,
        restricted: false
    });

    game.settings.registerMenu(MODULE_ID, "miscSettingsMenu", {
        name: "imaginaryfriend-toolkit.Menus.misc.Name",
        label: "imaginaryfriend-toolkit.Menus.misc.Label",
        hint: "imaginaryfriend-toolkit.Menus.misc.Hint",
        icon: "fa-solid fa-ellipsis",
        type: MiscSettingsMenu,
        restricted: false
    });

    // Wrapping the real _refreshNameplate/_refreshTooltip methods (rather than
    // relying on the public refreshToken Hook + renderFlags.set(), which is
    // ticker-deferred and races against core's own cascading refreshes)
    // guarantees our changes run synchronously every time core actually
    // rebuilds the nameplate/tooltip.
    NameplateFitter.patchTokenPrototype();
    TooltipPositioner.patchTokenPrototype();

    // Client-scope settings are already readable at this point, so applying
    // immediately (rather than waiting for "ready") avoids an unstyled flash
    // on the very first sheet render.
    SpellFader.apply();
});

function forceTooltipRefresh(token: Token): void {
    (token as unknown as { _refreshTooltip: () => void })._refreshTooltip();
}

function refreshAllTooltips(): void {
    if (!canvas?.ready) return;
    for (const token of canvas.tokens?.placeables ?? []) {
        forceTooltipRefresh(token);
    }
}

// Safety net for the very first paint; a no-op if the prototype wrap above
// already handled it during the same draw cycle.
Hooks.on("drawToken", (token: Token) => NameplateFitter.apply(token));

Hooks.on("updateToken", (tokenDocument: TokenDocument, changes: object) => {
    const flagPath = `flags.${MODULE_ID}.${NAMEPLATE_TOKEN_FLAGS.DISABLE_AUTOFIT}`;
    if (foundry.utils.hasProperty(changes, flagPath) && tokenDocument.object) {
        NameplateFitter.apply(tokenDocument.object, true);
    }
});

// core's own hover-triggered tooltip visibility toggle does not call
// _refreshTooltip - it only fires content/position/scale recomputation
// during an active drag - so without this, TooltipPositioner's scale/
// position settings never apply to a token that's only ever hovered.
Hooks.on("hoverToken", (token: Token, hovered: boolean) => {
    if (hovered) forceTooltipRefresh(token);
});

Hooks.on("controlToken", (token: Token, controlled: boolean) => {
    if (controlled) forceTooltipRefresh(token);
});

Hooks.on("renderTokenConfig", (app, htmlElement: HTMLElement) => injectTokenConfigField(app, htmlElement));
Hooks.on("renderPrototypeTokenConfig", (app, htmlElement: HTMLElement) => injectTokenConfigField(app, htmlElement));

Hooks.on("renderTokenHUD", (app, htmlElement: HTMLElement) => injectConditionFilter(app, htmlElement));
