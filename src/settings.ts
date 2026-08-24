import { MODULE_ID } from "./constants";

type SettingDefinition = { key: string } & Record<string, unknown>;
type SettingChangeHandlers = Record<string, (value: unknown) => void>;

export function registerModuleSettings(
    settings: Record<string, SettingDefinition>,
    onChangeHandlers: SettingChangeHandlers = {}
): void {
    for (const { key, ...options } of Object.values(settings)) {
        (game.settings.register as (namespace: string, key: string, data: object) => void)(MODULE_ID, key, {
            ...options,
            onChange: onChangeHandlers[key]
        });
    }
}
