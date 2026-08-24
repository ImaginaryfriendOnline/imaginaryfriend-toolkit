export const NAMEPLATE_SETTINGS = {
    ENABLED: {
        key: "enabled",
        name: "imaginaryfriend-toolkit.Settings.enabled.Name",
        hint: "imaginaryfriend-toolkit.Settings.enabled.Hint",
        scope: "world" as const,
        config: false,
        restricted: true,
        default: true,
        type: Boolean
    },
    MIN_FONT_SIZE: {
        key: "minFontSize",
        name: "imaginaryfriend-toolkit.Settings.minFontSize.Name",
        hint: "imaginaryfriend-toolkit.Settings.minFontSize.Hint",
        scope: "world" as const,
        config: false,
        restricted: true,
        default: 16,
        type: Number,
        range: { min: 8, max: 48, step: 1 }
    },
    FONT_SHRINK_STEP: {
        key: "fontShrinkStep",
        name: "imaginaryfriend-toolkit.Settings.fontShrinkStep.Name",
        hint: "imaginaryfriend-toolkit.Settings.fontShrinkStep.Hint",
        scope: "world" as const,
        config: false,
        restricted: true,
        default: 2,
        type: Number,
        range: { min: 1, max: 8, step: 1 }
    },
    COLOR_BY_DISPOSITION: {
        key: "colorByDisposition",
        name: "imaginaryfriend-toolkit.Settings.colorByDisposition.Name",
        hint: "imaginaryfriend-toolkit.Settings.colorByDisposition.Hint",
        scope: "world" as const,
        config: false,
        restricted: true,
        default: false,
        type: Boolean
    },
    MAX_LINES: {
        key: "maxLines",
        name: "imaginaryfriend-toolkit.Settings.maxLines.Name",
        hint: "imaginaryfriend-toolkit.Settings.maxLines.Hint",
        scope: "world" as const,
        config: false,
        restricted: true,
        default: 3,
        type: Number,
        range: { min: 1, max: 10, step: 1 }
    }
} as const;

export const NAMEPLATE_TOKEN_FLAGS = {
    DISABLE_AUTOFIT: "disableAutoFit"
} as const;

export const TOKEN_CONFIG_SELECTORS = {
    IDENTITY_TAB: '[data-tab="identity"]',
    DISPLAY_NAME_SELECT: 'select[name="displayName"]'
} as const;

export const NAMEPLATE_CLASSES = {
    FORM_GROUP: "token-names-form-group"
} as const;

export const ELLIPSIS = "…";
