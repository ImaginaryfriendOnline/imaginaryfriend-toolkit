import { MODULE_ID } from "../../constants";
import { MISC_CLASSES, MISC_SETTINGS, TOKEN_HUD_SELECTORS } from "./constants";

export function injectConditionFilter(_app: unknown, htmlElement: HTMLElement): void {
    if (!game.settings.get(MODULE_ID, MISC_SETTINGS.CONDITION_FILTER_ENABLED.key)) return;
    if (htmlElement.querySelector(`.${MISC_CLASSES.CONDITION_FILTER_INPUT}`)) return;

    // The HUD's toggle button for the effects palette also carries
    // data-palette="effects", so more than one element can match - find the
    // one that actually holds the icon grid rather than assuming the first match.
    const candidates = Array.from(htmlElement.querySelectorAll<HTMLElement>(TOKEN_HUD_SELECTORS.EFFECTS_PALETTE));
    const palette = candidates.find((candidate) => candidate.querySelector(TOKEN_HUD_SELECTORS.EFFECT_CONTAINER));
    if (!palette) return;

    const containers = Array.from(palette.querySelectorAll<HTMLElement>(TOKEN_HUD_SELECTORS.EFFECT_CONTAINER));

    const wrapper = document.createElement("div");
    wrapper.classList.add(MISC_CLASSES.CONDITION_FILTER_WRAPPER);

    const input = document.createElement("input");
    input.type = "text";
    input.classList.add(MISC_CLASSES.CONDITION_FILTER_INPUT);
    input.placeholder = game.i18n.localize("imaginaryfriend-toolkit.TokenHud.ConditionFilter.Placeholder");

    input.addEventListener("input", () => {
        const query = input.value.trim().toLowerCase();
        for (const container of containers) {
            const label = container.querySelector(TOKEN_HUD_SELECTORS.EFFECT_NAME)?.textContent?.trim().toLowerCase() ?? "";
            container.style.display = query && !label.includes(query) ? "none" : "";
        }
    });

    // Keep hotkeys/toggle handlers bound higher up the HUD form from firing
    // while the player is typing into the filter box.
    input.addEventListener("keydown", (event) => event.stopPropagation());

    wrapper.appendChild(input);
    palette.insertAdjacentElement("afterbegin", wrapper);
}
