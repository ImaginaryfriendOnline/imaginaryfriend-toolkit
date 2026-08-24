import { SettingFieldDef, ToolkitSettingsMenu } from "../../settings-menu";
import { NAMEPLATE_SETTINGS } from "./constants";

export class NameplateSettingsMenu extends ToolkitSettingsMenu {
    static override DEFAULT_OPTIONS = {
        id: "imaginaryfriend-toolkit-nameplate-settings",
        tag: "form",
        window: {
            title: "imaginaryfriend-toolkit.Menus.nameplate.Name",
            icon: "fa-solid fa-tag"
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
        return Object.values(NAMEPLATE_SETTINGS);
    }
}
