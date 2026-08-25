import { MODULE_ID } from "../../constants";
import { CHAT_SETTINGS } from "./constants";

export class ChatNotifier {
    static onCreateMessage(message: ChatMessage): void {
        try {
            this._onCreateMessage(message);
        } catch (error) {
            console.warn("imaginaryfriend-toolkit | Failed to play chat notification sound", error);
        }
    }

    private static _onCreateMessage(message: ChatMessage): void {
        const enabled = game.settings.get(
            MODULE_ID,
            CHAT_SETTINGS.NOTIFICATION_SOUND_ENABLED.key
        ) as boolean;
        if (!enabled) return;
        if (!this._shouldNotify(message)) return;

        const soundPath = game.settings.get(MODULE_ID, CHAT_SETTINGS.NOTIFICATION_SOUND_PATH.key) as string;
        if (!soundPath) return;

        void game.audio?.play(soundPath, { context: game.audio.interface });
    }

    private static _shouldNotify(message: ChatMessage): boolean {
        const userId = game.user?.id;
        if (message.author?.id === userId) return false;
        if (message.whisper.length > 0 && !message.whisper.includes(userId!)) return false;
        return true;
    }
}
