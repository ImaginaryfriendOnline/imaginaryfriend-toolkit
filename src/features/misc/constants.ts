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
    EFFECTS_PALETTE: '[data-palette="effects"]',
    EFFECT_CONTAINER: ".effect-container",
    EFFECT_NAME: ".effect-name"
} as const;

export const MISC_CLASSES = {
    CONDITION_FILTER_WRAPPER: "imaginaryfriend-toolkit-condition-filter-wrapper",
    CONDITION_FILTER_INPUT: "imaginaryfriend-toolkit-condition-filter"
} as const;
