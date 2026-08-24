export {};

declare module "fvtt-types/configuration" {
    interface AssumeHookRan {
        init: never;
        ready: never;
    }

    interface SettingConfig {
        "imaginaryfriend-toolkit.enabled": boolean;
        "imaginaryfriend-toolkit.minFontSize": number;
        "imaginaryfriend-toolkit.fontShrinkStep": number;
        "imaginaryfriend-toolkit.colorByDisposition": boolean;
        "imaginaryfriend-toolkit.maxLines": number;
        "imaginaryfriend-toolkit.tooltipScale": number;
        "imaginaryfriend-toolkit.tooltipAnchor": string;
        "imaginaryfriend-toolkit.tooltipOffsetX": number;
        "imaginaryfriend-toolkit.tooltipOffsetY": number;
        "imaginaryfriend-toolkit.fadeUnpreparedSpells": boolean;
        "imaginaryfriend-toolkit.unpreparedSpellOpacity": number;
    }

    interface FlagConfig {
        Token: {
            "imaginaryfriend-toolkit": {
                disableAutoFit?: boolean;
            };
        };
    }
}
