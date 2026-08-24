import { SettingFieldDef, ToolkitSettingsMenu } from "../../settings-menu";
import { SPELL_FADE_SETTINGS } from "./constants";

export class SpellFadeSettingsMenu extends ToolkitSettingsMenu {
    static override DEFAULT_OPTIONS = {
        id: "imaginaryfriend-toolkit-spell-fade-settings",
        tag: "form",
        window: {
            title: "imaginaryfriend-toolkit.Menus.spellFade.Name",
            icon: "fa-solid fa-wand-sparkles"
        },
        position: {
            width: 480
        },
        form: {
            handler: ToolkitSettingsMenu.onSubmit,
            closeOnSubmit: true
        }
    };

    protected override fields(): SettingFieldDef[] {
        return Object.values(SPELL_FADE_SETTINGS);
    }
}
