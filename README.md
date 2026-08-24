# 🧰 Imaginaryfriend's Toolkit

A growing collection of Foundry VTT quality-of-life modules, bundled into one
module so they share a single install/update. Currently includes the
features originally shipped as separate modules, starting with
[token-names](https://github.com/ImaginaryfriendOnline/token-names).

## ✨ Features

### Nameplate Auto-Fit

- Automatically shrinks nameplate font size so text fits within the token's width.
- Wraps multi-word names onto multiple lines if they still don't fit at the minimum font size.
- Truncates single-word names with an ellipsis if they still don't fit at the minimum font size.
- Optional per-token override to disable auto-fit for an individual token.
- Optional mode to color nameplate text by the token's disposition (hostile/neutral/friendly/secret), using Foundry's own disposition color palette.

### Elevation Tooltip Positioning

- Scale the elevation tooltip's text independently of the rest of the UI.
- Reposition the elevation tooltip relative to the token, with anchor presets (top/bottom left/center/right, center) plus fine X/Y pixel offsets. Defaults to Foundry's own placement until a preset is chosen.

## ⚙️ Settings

- **Enable Nameplate Auto-Fit** — master on/off toggle for the width-fitting behavior (default: on).
- **Minimum Font Size** — the smallest size a nameplate will shrink to before wrapping or truncating instead.
- **Font Shrink Step** — how many pixels to reduce the font size by on each shrink attempt.
- **Color Nameplate by Disposition** — colors nameplate text using the token's disposition color (default: off).
- **Maximum Nameplate Lines** — caps how many lines a wrapped nameplate may span before the last line is truncated.
- Per-token **Disable Nameplate Auto-Fit** checkbox, found in Token Configuration.
- **Elevation Tooltip Scale** — scales the elevation tooltip's text.
- **Elevation Tooltip Position** — anchor preset for the elevation tooltip.
- **Elevation Tooltip Offset X/Y** — fine-tune the tooltip's position in pixels.

## 🛠️ Development

```bash
npm install
npm run build      # one-off build into dist/
npm run watch       # rebuild on save
npm run typecheck   # type-check without emitting
```

`dist/` is the deployable module — symlink or copy it into your local Foundry
`Data/modules/imaginaryfriend-toolkit` directory to test.

## 📦 Installation

Install via manifest URL (once a GitHub repo and release exist):

```
https://github.com/ImaginaryfriendOnline/imaginaryfriend-toolkit/releases/latest/download/module.json
```

## ✅ Compatibility

Foundry VTT v14. System-agnostic.

## 📚 Credits

Built by [Imaginaryfriend](https://github.com/ImaginaryfriendOnline). Nameplate
auto-fit and elevation tooltip positioning ported from
[token-names](https://github.com/ImaginaryfriendOnline/token-names).
