# region-highlighter

region-highlighter is a simple yet customizable Visual Studio Code extension that highlights lines containing `#region` and `#endregion` comments. It helps developers visually organize code blocks across different languages and stay focused on structure.

This extension runs automatically and is lightweight, unobtrusive, and theme-friendly. Users can personalize highlight colors, font styles, and text appearance directly from VS Code settings.

---

## Features

- Highlights lines containing `#region` and `#endregion` markers
- Distinct styling for region and endregion lines
- Fully customizable highlight and text colors
- Adjustable font weight and style (e.g., bold, italic)
- Option to highlight entire line or only to the end of the text
- Automatically triggers on:
  - Editor load
  - Active file change
  - Document edits
  - Document open

---

## Requirements

- Visual Studio Code 1.70.0 or later

---

## Extension Settings

This extension contributes the following settings under `regionHighlighter`:

| Setting                  | Type    | Default     | Description                                      |
|--------------------------|---------|-------------|--------------------------------------------------|
| `regionBackground`       | string  | `#80008059` | Background color for `#region` lines            |
| `regionForeground`       | string  | `#f0e6ff`   | Text color for `#region` lines                  |
| `endRegionBackground`    | string  | `#0080804C` | Background color for `#endregion` lines         |
| `endRegionForeground`    | string  | `#e6fffa`   | Text color for `#endregion` lines               |
| `fontWeight`             | string  | `bold`      | Font weight for both `#region` and `#endregion` |
| `fontStyle`              | string  | `italic`    | Font style for both `#region` and `#endregion`  |
| `wholeLine`            | boolean | `true`      | Whether the highlight spans the full line width |

You can edit these settings via `Preferences → Settings → Extensions → Region Highlighter`.

---

## Known Issues

This is the initial release (v1.0.0), and there are no known issues at this time.  
If you encounter a bug or have a suggestion, please open an issue on GitHub or reach out via the Marketplace.

---

## Release Notes

### 1.0.0

- Initial release
- Highlights `#region` and `#endregion` lines with customizable styles
- Automatically runs on file load, change, edit, or switch
- User-configurable colors, font weight/style, and highlight behavior
