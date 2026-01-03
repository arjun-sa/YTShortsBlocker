# YouTube Shorts Blocker

A Chrome extension that removes all YouTube Shorts content from the YouTube interface.

Available on the Chrome Web Store -> https://chromewebstore.google.com/detail/youtube-shorts-blocker/kdeaaehibdnicomiglpcjpmmkedoblcn?authuser=1

## Features

- Removes the Shorts button from the YouTube sidebar
- Hides Shorts videos from the home feed
- Removes Shorts from search results
- Blocks Shorts carousels and shelves
- Works automatically as you browse YouTube

## What Gets Blocked

- Shorts button in the left sidebar
- Shorts sections in the feed
- Individual Shorts videos mixed in with regular videos
- Shorts recommendations
- Shorts filter chips

## Installation

### Chrome/Edge (Developer Mode)

1. Download or clone this repository to your computer
2. Open Chrome/Edge and navigate to `chrome://extensions/` (or `edge://extensions/`)
3. Enable "Developer mode" using the toggle in the top right corner
4. Click "Load unpacked"
5. Select the `YTShortsBlocker` folder
6. The extension is now installed and active!

### Verify Installation

1. Visit [YouTube.com](https://youtube.com)
2. The Shorts button should be removed from the sidebar
3. No Shorts videos should appear in your feed
4. Open the browser console (F12) and you should see: "YouTube Shorts Blocker: Active"

## Files

- `manifest.json` - Extension configuration
- `content.js` - Main script that removes Shorts elements
- `styles.css` - CSS rules to hide Shorts-related elements
- `README.md` - This file

## How It Works

The extension uses two approaches to block Shorts:

1. **CSS hiding**: Immediately hides known Shorts elements using CSS selectors
2. **JavaScript removal**: Continuously scans and removes Shorts elements from the DOM

Since YouTube is a single-page application that loads content dynamically, the extension uses a MutationObserver to detect new content and remove Shorts as they appear.

## Troubleshooting

If you still see Shorts content:

1. Try refreshing the YouTube page
2. Make sure the extension is enabled in `chrome://extensions/`
3. Check the browser console for the "YouTube Shorts Blocker: Active" message
4. YouTube occasionally changes their HTML structure - the extension may need updates

## Privacy

This extension:
- Does NOT collect any data
- Does NOT track your browsing
- Does NOT require any special permissions
- Only runs on youtube.com
- All processing happens locally in your browser

## License

Free to use and modify as needed.
