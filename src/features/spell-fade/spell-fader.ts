import { MODULE_ID } from "../../constants";
import { SPELL_FADE_BODY_CLASS, SPELL_FADE_OPACITY_VAR, SPELL_FADE_SETTINGS } from "./constants";

export class SpellFader {
    static apply(): void {
        const enabled = game.settings.get(MODULE_ID, SPELL_FADE_SETTINGS.ENABLED.key) as boolean;
        const opacity = game.settings.get(MODULE_ID, SPELL_FADE_SETTINGS.OPACITY.key) as number;

        document.body.classList.toggle(SPELL_FADE_BODY_CLASS, enabled);
        document.body.style.setProperty(SPELL_FADE_OPACITY_VAR, String(opacity));
    }
}
