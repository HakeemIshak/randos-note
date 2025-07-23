# Randos Note

One command. One file. Endless brain dumps.

A tiny VS Code extension that opens (or creates) a single rolling notes file so you can jot thoughts fast—no more unsaved scratch tabs.

---

## Features

- **Single file storage**: all notes live in `~/Documents/randos.txt` (configurable).
- **Quick access**: run from the Command Palette or a keybinding.
- **Auto-create**: file missing? Choose to create it or pick a new path.

---

## Usage

1. Open the Command Palette: `⇧⌘P` (macOS) / `Ctrl+Shift+P` (Windows/Linux).
2. Run **“Randos Note: Open File”**.
3. Start typing. Save as usual (`⌘S` / `Ctrl+S`).

### Default Keybinding

| OS      | Key            |
|---------|----------------|
| macOS   | `⌘⌥R`          |
| Win/Linux | `Ctrl+Alt+R` |

(Override via `Keyboard Shortcuts` if desired.)

---

## Settings

| Setting                | Type   | Default                     | Description                                |
|------------------------|--------|-----------------------------|--------------------------------------------|
| `randosNote.filePath`  | string | `~/Documents/randos.txt`    | Absolute path to the Randos Note file.     |

Edit via: `Code > Settings > Settings` → search “Randos Note”.

---

## Commands

| Command ID          | Title                     | Action                                 |
|---------------------|---------------------------|----------------------------------------|
| `randosNote.open`   | Randos Note: Open File    | Opens/creates and focuses the note file |

---

## Roadmap (Ideas)

* No roadmap ideas... this is just my basic usage of random note taking in vscode

---

## License
MIT (??? i dont even know which License actually.. just GPT-ed the license)