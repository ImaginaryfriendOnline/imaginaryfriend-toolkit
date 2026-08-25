export const CHAT_SETTINGS = {
    NOTIFICATION_SOUND_ENABLED: {
        key: "chatNotificationSoundEnabled",
        name: "imaginaryfriend-toolkit.Settings.chatNotificationSoundEnabled.Name",
        hint: "imaginaryfriend-toolkit.Settings.chatNotificationSoundEnabled.Hint",
        scope: "client" as const,
        config: false,
        default: true,
        type: Boolean
    },
    NOTIFICATION_SOUND_PATH: {
        key: "chatNotificationSoundPath",
        name: "imaginaryfriend-toolkit.Settings.chatNotificationSoundPath.Name",
        hint: "imaginaryfriend-toolkit.Settings.chatNotificationSoundPath.Hint",
        scope: "client" as const,
        config: false,
        // Mirrors Foundry's own CONFIG.sounds.notification default.
        default: "sounds/notify.wav",
        type: String,
        filePicker: "audio" as const
    }
} as const;
