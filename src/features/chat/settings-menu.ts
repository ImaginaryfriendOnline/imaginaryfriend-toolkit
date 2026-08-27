import { SettingFieldDef, ToolkitSettingsMenu } from "../../settings-menu";
import { CHAT_SETTINGS } from "./constants";

export class ChatSettingsMenu extends ToolkitSettingsMenu {
    static override DEFAULT_OPTIONS = {
        id: "imaginaryfriend-toolkit-chat-settings",
        tag: "form",
        classes: ["imaginaryfriend-toolkit-settings-menu"],
        window: {
            title: "imaginaryfriend-toolkit.Menus.chat.Name",
            icon: "fa-solid fa-bell"
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
        return Object.values(CHAT_SETTINGS);
    }
}
