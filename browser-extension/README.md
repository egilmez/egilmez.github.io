# Record Studio — Browser Extension

Browse Discogs record listings in a beautiful vinyl crate interface, right from your browser toolbar.

## Prerequisites

1. **Discogs token** — free, from [discogs.com/settings/developers](https://www.discogs.com/settings/developers) → Generate token.
2. **Icons** — open `icons/generate-icons.html` in any browser, click "Download All Icons", and save the four PNG files into this `icons/` folder.

---

## Chrome / Edge / Brave

1. Open `chrome://extensions` (or `edge://extensions` / `brave://extensions`).
2. Enable **Developer mode** (top-right toggle).
3. Click **Load unpacked**.
4. Select this `browser-extension/` folder.
5. The Record Studio icon appears in your toolbar. Click it to open.

---

## Safari (macOS)

Safari Web Extensions use the same Manifest V3 format but must be packaged via Xcode.

### Requirements
- macOS 12+ with Xcode 13+ installed
- Apple Developer account (free tier is fine for local use)

### Steps

1. Open Terminal and run:
   ```bash
   xcrun safari-web-extension-converter /path/to/browser-extension \
     --project-location ~/Desktop \
     --app-name "Record Studio"
   ```
2. Xcode opens with the generated project. Press **⌘R** to build and run.
3. In Safari → **Settings → Extensions**, enable **Record Studio**.
4. Click the extension icon in the Safari toolbar.

> **Note:** For distribution on the Mac App Store, you need a paid Apple Developer account.

---

## How to use

1. Click the extension icon to open the popup.
2. Click the **⚙** button and paste your Discogs token (saved automatically).
3. Paste a Discogs URL into the input and click **Load**:
   - `https://www.discogs.com/seller/USERNAME/profile`
   - `https://www.discogs.com/user/USERNAME`
   - `https://www.discogs.com/sell/list?artist_id=123`
4. Navigate records with arrow keys, scroll wheel, or the ← → buttons.

## File structure

```
browser-extension/
  manifest.json          Chrome/Safari Manifest V3
  popup.html             Extension popup UI
  popup.css              Styles
  popup.js               Logic (adapted from record-store.html)
  icons/
    generate-icons.html  Open in browser to generate PNG icons
    icon16.png           } Add after running generate-icons.html
    icon32.png           }
    icon48.png           }
    icon128.png          }
  README.md
```
