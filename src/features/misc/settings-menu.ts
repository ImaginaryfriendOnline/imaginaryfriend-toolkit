import { SettingFieldDef, ToolkitSettingsMenu } from "../../settings-menu";
import { MISC_SETTINGS } from "./constants";

export class MiscSettingsMenu extends ToolkitSettingsMenu {
    static override DEFAULT_OPTIONS = {
        id: "imaginaryfriend-toolkit-misc-settings",
        tag: "form",
        classes: ["imaginaryfriend-toolkit-settings-menu"],
        window: {
            title: "imaginaryfriend-toolkit.Menus.misc.Name",
            icon: "fa-solid fa-ellipsis"
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
        return Object.values(MISC_SETTINGS);
    }
}
