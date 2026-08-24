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

Settings are grouped by feature. Each group is a submenu button in
**Configure Settings → Imaginaryfriend's Toolkit** (GM-only) rather than one
long flat list.

### Nameplate Settings

| Setting | Description | Default | Range / Choices |
| --- | --- | --- | --- |
| Enable Nameplate Auto-Fit | Master on/off toggle for the width-fitting behavior. | On | — |
| Minimum Font Size | The smallest font size nameplates may shrink to before wrapping or truncating instead. | 16 | 8–48 |
| Font Shrink Step | How many pixels to reduce the nameplate font size by on each shrink attempt. | 2 | 1–8 |
| Color Nameplate by Disposition | Colors nameplate text using the token's disposition color (hostile, neutral, friendly, or secret). | Off | — |
| Maximum Nameplate Lines | The maximum number of lines a wrapped nameplate may span before the last line is truncated with an ellipsis. | 3 | 1–10 |

Additionally, each token has its own **Disable Nameplate Auto-Fit** checkbox
in Token Configuration (under the Identity tab), to opt a single token out of
auto-fit regardless of the world setting above.

### Elevation Tooltip Settings

| Setting | Description | Default | Range / Choices |
| --- | --- | --- | --- |
| Elevation Tooltip Scale | Scales the elevation tooltip's text. | 1 | 0.5–3 |
| Elevation Tooltip Position | Where the elevation tooltip appears relative to the token. "Default" leaves Foundry's own placement untouched. | Default (Foundry) | Default (Foundry), Top Left, Top Center, Top Right, Bottom Left, Bottom Center, Bottom Right, Center |
| Elevation Tooltip Offset X | Fine-tunes the elevation tooltip's horizontal position, in pixels, from its selected anchor (or from Foundry's default placement). | 0 | -50–50 |
| Elevation Tooltip Offset Y | Fine-tunes the elevation tooltip's vertical position, in pixels, from its selected anchor (or from Foundry's default placement). | 0 | -50–50 |

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
