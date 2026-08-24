import { MODULE_ID } from "../../constants";
import { TOOLTIP_SETTINGS } from "./constants";

export class TooltipPositioner {
    static patchTokenPrototype(): void {
        const TokenClass = foundry.canvas.placeables.Token;
        const proto = TokenClass.prototype as unknown as { _refreshTooltip: (...args: unknown[]) => unknown };
        const original = proto._refreshTooltip;

        proto._refreshTooltip = function (this: Token, ...args: unknown[]): unknown {
            const result = original.apply(this, args);
            TooltipPositioner.apply(this);
            return result;
        };
    }

    static apply(token: Token): void {
        try {
            this._apply(token);
        } catch (error) {
            console.warn("imaginaryfriend-toolkit | Failed to reposition elevation tooltip for token", token, error);
        }
    }

    private static _apply(token: Token): void {
        const tooltip = token.tooltip;
        if (!tooltip) return;
        this._applyPositionAndScale(token, tooltip);
    }

    private static _applyPositionAndScale(token: Token, tooltip: PIXI.Text): void {
        const scale = game.settings.get(MODULE_ID, TOOLTIP_SETTINGS.TOOLTIP_SCALE.key) as number;
        if (scale !== 1) {
            tooltip.scale.set(tooltip.scale.x * scale, tooltip.scale.y * scale);
        }

        const anchorChoice = game.settings.get(MODULE_ID, TOOLTIP_SETTINGS.TOOLTIP_ANCHOR.key) as string;
        const offsetX = game.settings.get(MODULE_ID, TOOLTIP_SETTINGS.TOOLTIP_OFFSET_X.key) as number;
        const offsetY = game.settings.get(MODULE_ID, TOOLTIP_SETTINGS.TOOLTIP_OFFSET_Y.key) as number;

        if (anchorChoice === "default") {
            if (offsetX !== 0 || offsetY !== 0) {
                tooltip.position.set(tooltip.x + offsetX, tooltip.y + offsetY);
            }
            return;
        }

        const margin = 4;
        const point = this._anchoredPoint(anchorChoice, token.w, token.h, margin);
        if (!point) return;

        tooltip.anchor.set(point.anchorX, point.anchorY);
        tooltip.position.set(point.x + offsetX, point.y + offsetY);
    }

    private static _anchoredPoint(
        anchor: string,
        w: number,
        h: number,
        margin: number
    ): { x: number; y: number; anchorX: number; anchorY: number } | null {
        switch (anchor) {
            case "topLeft":
                return { x: -margin, y: -margin, anchorX: 1, anchorY: 1 };
            case "topCenter":
                return { x: w / 2, y: -margin, anchorX: 0.5, anchorY: 1 };
            case "topRight":
                return { x: w + margin, y: -margin, anchorX: 0, anchorY: 1 };
            case "bottomLeft":
                return { x: -margin, y: h + margin, anchorX: 1, anchorY: 0 };
            case "bottomCenter":
                return { x: w / 2, y: h + margin, anchorX: 0.5, anchorY: 0 };
            case "bottomRight":
                return { x: w + margin, y: h + margin, anchorX: 0, anchorY: 0 };
            case "center":
                return { x: w / 2, y: h / 2, anchorX: 0.5, anchorY: 0.5 };
            default:
                return null;
        }
    }
}
