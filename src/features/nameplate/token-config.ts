import { MODULE_ID } from "../../constants";
import { NAMEPLATE_CLASSES, NAMEPLATE_TOKEN_FLAGS, TOKEN_CONFIG_SELECTORS } from "./constants";

interface TokenConfigLike {
    document: {
        getFlag(scope: string, key: string): unknown;
    };
}

export function injectTokenConfigField(app: unknown, htmlElement: HTMLElement): void {
    if (htmlElement.querySelector("[data-token-names-field]")) return;

    const { document: sheetDocument } = app as TokenConfigLike;
    const checked = sheetDocument.getFlag(MODULE_ID, NAMEPLATE_TOKEN_FLAGS.DISABLE_AUTOFIT) === true;

    const formGroup = document.createElement("div");
    formGroup.classList.add("form-group", NAMEPLATE_CLASSES.FORM_GROUP);
    formGroup.dataset.tokenNamesField = "true";

    const label = document.createElement("label");
    label.textContent = game.i18n.localize("imaginaryfriend-toolkit.TokenConfig.DisableAutoFit.Name");

    const fields = document.createElement("div");
    fields.classList.add("form-fields");

    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = `flags.${MODULE_ID}.${NAMEPLATE_TOKEN_FLAGS.DISABLE_AUTOFIT}`;
    input.dataset.dtype = "Boolean";
    input.checked = checked;
    fields.appendChild(input);

    const hint = document.createElement("p");
    hint.classList.add("hint");
    hint.textContent = game.i18n.localize("imaginaryfriend-toolkit.TokenConfig.DisableAutoFit.Hint");

    formGroup.append(label, fields, hint);

    const displayNameGroup = htmlElement
        .querySelector(`${TOKEN_CONFIG_SELECTORS.IDENTITY_TAB} ${TOKEN_CONFIG_SELECTORS.DISPLAY_NAME_SELECT}`)
        ?.closest(".form-group");

    if (displayNameGroup) {
        displayNameGroup.insertAdjacentElement("afterend", formGroup);
        return;
    }

    const identityTab = htmlElement.querySelector(TOKEN_CONFIG_SELECTORS.IDENTITY_TAB);
    const fallbackAnchor = identityTab ?? htmlElement.querySelector("form") ?? htmlElement;
    fallbackAnchor.appendChild(formGroup);
}
