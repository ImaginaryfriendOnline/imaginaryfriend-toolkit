import { MODULE_ID } from "../../constants";
import { MISC_CLASSES, MISC_SETTINGS, TOKEN_HUD_SELECTORS } from "./constants";

export function injectConditionFilter(_app: unknown, htmlElement: HTMLElement): void {
    if (!game.settings.get(MODULE_ID, MISC_SETTINGS.CONDITION_FILTER_ENABLED.key)) return;
    if (htmlElement.querySelector(`.${MISC_CLASSES.CONDITION_FILTER_INPUT}`)) return;

    const icons = Array.from(htmlElement.querySelectorAll<HTMLElement>(TOKEN_HUD_SELECTORS.STATUS_ICON));
    const [firstIcon] = icons;
    if (!firstIcon) return;

    const container = firstIcon.parentElement;
    if (!container) return;

    const input = document.createElement("input");
    input.type = "text";
    input.classList.add(MISC_CLASSES.CONDITION_FILTER_INPUT);
    input.placeholder = game.i18n.localize("imaginaryfriend-toolkit.TokenHud.ConditionFilter.Placeholder");

    input.addEventListener("input", () => {
        const query = input.value.trim().toLowerCase();
        for (const icon of icons) {
            const label = (icon.getAttribute("title") ?? icon.getAttribute("aria-label") ?? "").toLowerCase();
            icon.style.display = query && !label.includes(query) ? "none" : "";
        }
    });

    // Keep hotkeys/toggle handlers bound higher up the HUD form from firing
    // while the player is typing into the filter box.
    input.addEventListener("keydown", (event) => event.stopPropagation());

    container.insertAdjacentElement("beforebegin", input);
}
