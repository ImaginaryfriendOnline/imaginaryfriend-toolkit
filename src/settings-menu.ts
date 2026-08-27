import { MODULE_ID } from "./constants";

export interface SettingFieldDef {
    key: string;
    name: string;
    hint?: string;
    type: unknown;
    choices?: Record<string, string>;
    range?: { min: number; max: number; step: number };
    filePicker?: foundry.applications.apps.FilePicker.Type;
}

// NOTE: intentionally not cached into module-level consts. Foundry evaluates
// module esmodule scripts before game.settings exists (it's only built during
// Foundry's own init sequence, ahead of Hooks.once("init") firing), so
// grabbing game.settings.get/set at import time throws
// "Cannot read properties of undefined (reading 'get')" and aborts this
// module's evaluation entirely - taking the rest of the bundle down with it,
// since hooks.ts transitively imports this file. Call through game.settings
// directly at the point of use instead, deferring the lookup until these
// methods actually run (well after init).
function settingsGet(namespace: string, key: string): unknown {
    return (game.settings.get as (namespace: string, key: string) => unknown)(namespace, key);
}

function settingsSet(namespace: string, key: string, value: unknown): Promise<unknown> {
    return (game.settings.set as (namespace: string, key: string, value: unknown) => Promise<unknown>)(
        namespace,
        key,
        value
    );
}

/**
 * A settings submenu that renders one form group per field, built generically
 * from the same setting-definition objects passed to registerModuleSettings —
 * so a feature's settings only need to be described once.
 */
export abstract class ToolkitSettingsMenu extends foundry.applications.api.ApplicationV2 {
    protected abstract fields(): SettingFieldDef[];

    protected override async _prepareContext(): Promise<object> {
        return {};
    }

    protected override _renderHTML(): HTMLElement[] {
        return [...this.fields().map((field) => this._buildFormGroup(field)), this._buildFooter()];
    }

    protected override _replaceHTML(result: unknown, content: HTMLElement): void {
        content.replaceChildren(...(result as HTMLElement[]));
    }

    private _buildFormGroup(field: SettingFieldDef): HTMLElement {
        const value = settingsGet(MODULE_ID, field.key);

        const formGroup = document.createElement("div");
        formGroup.classList.add("form-group");

        const label = document.createElement("label");
        label.textContent = game.i18n.localize(field.name);

        const fieldsWrapper = document.createElement("div");
        fieldsWrapper.classList.add("form-fields");
        fieldsWrapper.appendChild(this._buildInput(field, value));

        formGroup.append(label, fieldsWrapper);

        if (field.hint) {
            const hint = document.createElement("p");
            hint.classList.add("hint");
            hint.textContent = game.i18n.localize(field.hint);
            formGroup.appendChild(hint);
        }

        return formGroup;
    }

    private _buildInput(field: SettingFieldDef, value: unknown): HTMLElement {
        if (field.filePicker) {
            return foundry.applications.elements.HTMLFilePickerElement.create({
                type: field.filePicker,
                name: field.key,
                value: String(value)
            });
        }

        if (field.type === Boolean) {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = field.key;
            checkbox.dataset.dtype = "Boolean";
            checkbox.checked = value === true;
            return checkbox;
        }

        if (field.choices) {
            const select = document.createElement("select");
            select.name = field.key;
            select.dataset.dtype = "String";
            for (const [choiceValue, choiceLabel] of Object.entries(field.choices)) {
                const option = document.createElement("option");
                option.value = choiceValue;
                option.textContent = game.i18n.localize(choiceLabel);
                option.selected = choiceValue === value;
                select.appendChild(option);
            }
            return select;
        }

        if (field.type === Number) {
            const number = document.createElement("input");
            number.type = "number";
            number.name = field.key;
            number.dataset.dtype = "Number";
            number.value = String(value);

            if (!field.range) return number;

            number.min = String(field.range.min);
            number.max = String(field.range.max);
            number.step = String(field.range.step);

            const range = document.createElement("input");
            range.type = "range";
            range.min = String(field.range.min);
            range.max = String(field.range.max);
            range.step = String(field.range.step);
            range.value = String(value);

            range.addEventListener("input", () => (number.value = range.value));
            number.addEventListener("input", () => (range.value = number.value));

            const wrapper = document.createElement("div");
            wrapper.classList.add("imaginaryfriend-toolkit-range-field");
            wrapper.append(range, number);
            return wrapper;
        }

        const text = document.createElement("input");
        text.type = "text";
        text.name = field.key;
        text.dataset.dtype = "String";
        text.value = String(value);
        return text;
    }

    private _buildFooter(): HTMLElement {
        const footer = document.createElement("footer");
        footer.classList.add("form-footer", "imaginaryfriend-toolkit-form-footer");

        const submit = document.createElement("button");
        submit.type = "submit";
        submit.innerHTML = `<i class="fa-solid fa-save"></i> ${game.i18n.localize("SETTINGS.Save")}`;

        footer.appendChild(submit);
        return footer;
    }

    static async onSubmit(
        this: ToolkitSettingsMenu,
        _event: Event | SubmitEvent,
        _form: HTMLFormElement,
        formData: { object: Record<string, unknown> }
    ): Promise<void> {
        for (const [key, value] of Object.entries(formData.object)) {
            await settingsSet(MODULE_ID, key, value);
        }
    }
}
