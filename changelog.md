##### 1.3.3

- Fixed the token HUD condition filter never being created at all. The HUD's own toggle button for the effects palette also carries `data-palette="effects"`, so the selector matched two elements and the code picked whichever came first (the toggle button, which has no icon grid), bailing out silently. Now finds the actual palette by checking which match holds `.effect-container` children.

##### 1.3.2

- Fixed the token HUD condition filter input not appearing at all. It was previously inserted as an in-flow flex/grid row at the top of the icon grid, which depended on layout assumptions about the palette that didn't hold. It's now absolutely positioned, anchored to the palette's own top-left corner and floating above the icon grid at a fixed 200px width, independent of the grid's internal layout.

##### 1.3.1

- Fixed the token HUD condition filter: it read the icon's `title`/`aria-label` attribute for the condition name, but Foundry's HUD markup puts the name in a sibling `.effect-name` div, so every non-empty search hid all icons. It also anchored to the wrong element, landing outside the conditions popout instead of above the icon grid. Now filters by `.effect-name` text and inserts as the first row inside the actual `.palette[data-palette="effects"]` container.

##### 1.3.0

- Added a Miscellaneous feature group, starting with a Condition Filter: adds a text box to the top of the token HUD's condition (status effect) icon grid to filter down to matching conditions as you type. Client-scoped, on by default.
- Removed the Chat Notification Sound feature and its Chat Settings submenu.

##### 1.2.0

- Fixed a bug where the Nameplate Settings submenu would crash with `"imaginaryfriend-toolkit.enabled" is not a registered game setting`. The `init` hook merged every feature's setting definitions into one object via object spread; Nameplate and Spell Fade each define a property named `ENABLED`, so the spread silently dropped Nameplate's entry and its `enabled` setting was never registered. Settings groups are now registered independently instead of merged.
- Numeric settings (font size, shrink step, max lines, tooltip scale/offset, spell opacity) now show a slider alongside the number field, kept in sync in both directions.
- Added spacing between fields and centered the Save Changes button in all settings submenus.

##### 1.1.1

- Fixed a bug where the module would fail to load entirely (no settings, no menus, no features active) with a console error `Cannot read properties of undefined (reading 'get')` at `main.js:57`. `ToolkitSettingsMenu` was caching `game.settings.get`/`game.settings.set` into module-level constants, which are evaluated the instant the esmodule script loads — before Foundry has finished building the `game.settings` object, ahead of the `init` hook. The lookups are now deferred to call time instead.

##### 1.1.0

- Added a Chat feature group, starting with Chat Notification Sound: plays a sound whenever a chat message arrives that wasn't sent by you (skips your own messages and whispers you aren't the recipient of), with a file-picker-backed setting to choose the sound. Client-scoped per player, configured in a new Chat Settings submenu.

##### 1.0.0

- Initial release. Ported from [token-names](https://github.com/ImaginaryfriendOnline/token-names) v1.4.0:
  - Nameplate auto-fit: automatically shrinks, wraps, or truncates token nameplates so they never overflow the token, with an optional disposition-based color mode.
  - Per-token override to disable nameplate auto-fit.
  - Elevation tooltip scale and position settings.
  - Fade Unprepared Spells (D&D 5e only): dims spells that require preparation but aren't currently prepared, with a configurable opacity, client-scoped per player.
- Settings are grouped into three submenus (Nameplate Settings, Elevation Tooltip Settings, Spell Fade Settings) instead of one flat list.
