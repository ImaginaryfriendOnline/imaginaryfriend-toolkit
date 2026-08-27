import { SettingFieldDef, ToolkitSettingsMenu } from "../../settings-menu";
import { TOOLTIP_SETTINGS } from "./constants";

export class TooltipSettingsMenu extends ToolkitSettingsMenu {
    static override DEFAULT_OPTIONS = {
        id: "imaginaryfriend-toolkit-tooltip-settings",
        tag: "form",
        classes: ["imaginaryfriend-toolkit-settings-menu"],
        window: {
            title: "imaginaryfriend-toolkit.Menus.tooltip.Name",
            icon: "fa-solid fa-arrows-up-down-left-right"
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
        return Object.values(TOOLTIP_SETTINGS);
    }
}
