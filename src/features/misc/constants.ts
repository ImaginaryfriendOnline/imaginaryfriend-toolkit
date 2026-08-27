export const MISC_SETTINGS = {
    CONDITION_FILTER_ENABLED: {
        key: "conditionFilterEnabled",
        name: "imaginaryfriend-toolkit.Settings.conditionFilterEnabled.Name",
        hint: "imaginaryfriend-toolkit.Settings.conditionFilterEnabled.Hint",
        scope: "client" as const,
        config: false,
        default: true,
        type: Boolean
    }
} as const;

export const TOKEN_HUD_SELECTORS = {
    STATUS_ICON: "[data-status-id]"
} as const;

export const MISC_CLASSES = {
    CONDITION_FILTER_INPUT: "imaginaryfriend-toolkit-condition-filter"
} as const;
