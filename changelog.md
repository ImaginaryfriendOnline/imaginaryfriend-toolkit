##### 1.1.0

- Added a Chat feature group, starting with Chat Notification Sound: plays a sound whenever a chat message arrives that wasn't sent by you (skips your own messages and whispers you aren't the recipient of), with a file-picker-backed setting to choose the sound. Client-scoped per player, configured in a new Chat Settings submenu.

##### 1.0.0

- Initial release. Ported from [token-names](https://github.com/ImaginaryfriendOnline/token-names) v1.4.0:
  - Nameplate auto-fit: automatically shrinks, wraps, or truncates token nameplates so they never overflow the token, with an optional disposition-based color mode.
  - Per-token override to disable nameplate auto-fit.
  - Elevation tooltip scale and position settings.
  - Fade Unprepared Spells (D&D 5e only): dims spells that require preparation but aren't currently prepared, with a configurable opacity, client-scoped per player.
- Settings are grouped into three submenus (Nameplate Settings, Elevation Tooltip Settings, Spell Fade Settings) instead of one flat list.
