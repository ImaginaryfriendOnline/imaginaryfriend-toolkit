export const TOOLTIP_SETTINGS = {
    TOOLTIP_SCALE: {
        key: "tooltipScale",
        name: "imaginaryfriend-toolkit.Settings.tooltipScale.Name",
        hint: "imaginaryfriend-toolkit.Settings.tooltipScale.Hint",
        scope: "world" as const,
        config: true,
        restricted: true,
        default: 1,
        type: Number,
        range: { min: 0.5, max: 3, step: 0.1 }
    },
    TOOLTIP_ANCHOR: {
        key: "tooltipAnchor",
        name: "imaginaryfriend-toolkit.Settings.tooltipAnchor.Name",
        hint: "imaginaryfriend-toolkit.Settings.tooltipAnchor.Hint",
        scope: "world" as const,
        config: true,
        restricted: true,
        default: "default",
        type: String,
        choices: {
            default: "imaginaryfriend-toolkit.Settings.tooltipAnchor.Choices.default",
            topLeft: "imaginaryfriend-toolkit.Settings.tooltipAnchor.Choices.topLeft",
            topCenter: "imaginaryfriend-toolkit.Settings.tooltipAnchor.Choices.topCenter",
            topRight: "imaginaryfriend-toolkit.Settings.tooltipAnchor.Choices.topRight",
            bottomLeft: "imaginaryfriend-toolkit.Settings.tooltipAnchor.Choices.bottomLeft",
            bottomCenter: "imaginaryfriend-toolkit.Settings.tooltipAnchor.Choices.bottomCenter",
            bottomRight: "imaginaryfriend-toolkit.Settings.tooltipAnchor.Choices.bottomRight",
            center: "imaginaryfriend-toolkit.Settings.tooltipAnchor.Choices.center"
        }
    },
    TOOLTIP_OFFSET_X: {
        key: "tooltipOffsetX",
        name: "imaginaryfriend-toolkit.Settings.tooltipOffsetX.Name",
        hint: "imaginaryfriend-toolkit.Settings.tooltipOffsetX.Hint",
        scope: "world" as const,
        config: true,
        restricted: true,
        default: 0,
        type: Number,
        range: { min: -50, max: 50, step: 1 }
    },
    TOOLTIP_OFFSET_Y: {
        key: "tooltipOffsetY",
        name: "imaginaryfriend-toolkit.Settings.tooltipOffsetY.Name",
        hint: "imaginaryfriend-toolkit.Settings.tooltipOffsetY.Hint",
        scope: "world" as const,
        config: true,
        restricted: true,
        default: 0,
        type: Number,
        range: { min: -50, max: 50, step: 1 }
    }
} as const;
