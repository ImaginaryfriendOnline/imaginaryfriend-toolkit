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
