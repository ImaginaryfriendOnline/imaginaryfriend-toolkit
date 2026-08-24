export const SPELL_FADE_SETTINGS = {
    ENABLED: {
        key: "fadeUnpreparedSpells",
        name: "imaginaryfriend-toolkit.Settings.fadeUnpreparedSpells.Name",
        hint: "imaginaryfriend-toolkit.Settings.fadeUnpreparedSpells.Hint",
        scope: "client" as const,
        config: false,
        default: true,
        type: Boolean
    },
    OPACITY: {
        key: "unpreparedSpellOpacity",
        name: "imaginaryfriend-toolkit.Settings.unpreparedSpellOpacity.Name",
        hint: "imaginaryfriend-toolkit.Settings.unpreparedSpellOpacity.Hint",
        scope: "client" as const,
        config: false,
        default: 0.4,
        type: Number,
        range: { min: 0.1, max: 1, step: 0.05 }
    }
} as const;

export const SPELL_FADE_BODY_CLASS = "imaginaryfriend-toolkit-fade-unprepared";
export const SPELL_FADE_OPACITY_VAR = "--imaginaryfriend-toolkit-unprepared-opacity";
