// YouTube Shorts Blocker - Content Script

// Function to remove Shorts elements from the page
function removeShortsElements() {
  // Remove Shorts button from sidebar (multiple selectors for reliability)
  const shortsButtons = document.querySelectorAll('a[href="/shorts"], a[href="/shorts/"], a[href^="/shorts?"], a[title="Shorts"][href^="/shorts"], a[aria-label="Shorts"][href^="/shorts"]');
  shortsButtons.forEach(button => {
    // Remove the parent element (usually the guide entry item)
    const parent = button.closest('ytd-guide-entry-renderer, ytd-mini-guide-entry-renderer');
    if (parent) {
      parent.style.display = 'none';
      parent.remove();
    }
  });

  // Remove Shorts sections in the feed
  const shortsSections = document.querySelectorAll('ytd-reel-shelf-renderer');
  shortsSections.forEach(section => {
    section.style.display = 'none';
    section.remove();
  });

  // Remove individual Shorts videos in the feed
  const shortsVideos = document.querySelectorAll('ytd-rich-item-renderer');
  shortsVideos.forEach(video => {
    const thumbnail = video.querySelector('ytd-thumbnail-overlay-time-status-renderer[overlay-style="SHORTS"]');
    const linkElement = video.querySelector('a[href^="/shorts/"]');
    if (thumbnail || linkElement) {
      video.style.display = 'none';
      video.remove();
    }
  });

  // Remove Shorts from search results
  const searchResults = document.querySelectorAll('ytd-video-renderer');
  searchResults.forEach(result => {
    const linkElement = result.querySelector('a[href^="/shorts/"]');
    if (linkElement) {
      result.style.display = 'none';
      result.remove();
    }
  });

  // Remove Shorts shelf on home page
  const reelShelves = document.querySelectorAll('[is-shorts]');
  reelShelves.forEach(shelf => {
    shelf.style.display = 'none';
    shelf.remove();
  });

  // Remove Shorts chips/filters
  const shortsChips = document.querySelectorAll('yt-chip-cloud-chip-renderer');
  shortsChips.forEach(chip => {
    const text = chip.innerText?.toLowerCase();
    if (text && text.includes('shorts')) {
      chip.style.display = 'none';
      chip.remove();
    }
  });
}

// Initial removal
removeShortsElements();

// Set up a MutationObserver to handle dynamically loaded content
// YouTube is a single-page application, so new content loads without page refresh
const observer = new MutationObserver((mutations) => {
  removeShortsElements();
});

// Start observing the document for changes
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Also run periodically as a backup (every 500ms)
setInterval(removeShortsElements, 500);

console.log('YouTube Shorts Blocker: Active');
