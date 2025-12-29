// YouTube Shorts Blocker - Content Script

// Global state
let isEnabled = true;
let observer = null;
let intervalId = null;

// Function to remove Shorts elements from the page
function removeShortsElements() {
  if (!isEnabled) return;

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

// Start the blocking functionality
function startBlocking() {
  console.log('YouTube Shorts Blocker: Active');

  // Add class to enable CSS blocking
  document.documentElement.classList.add('yt-shorts-blocker-enabled');

  // Initial removal
  removeShortsElements();

  // Set up a MutationObserver to handle dynamically loaded content
  if (!observer) {
    observer = new MutationObserver((mutations) => {
      removeShortsElements();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Run periodically as a backup (every 500ms)
  if (!intervalId) {
    intervalId = setInterval(removeShortsElements, 500);
  }
}

// Stop the blocking functionality
function stopBlocking() {
  console.log('YouTube Shorts Blocker: Inactive');

  // Remove class to disable CSS blocking
  document.documentElement.classList.remove('yt-shorts-blocker-enabled');

  // Stop the observer
  if (observer) {
    observer.disconnect();
    observer = null;
  }

  // Stop the interval
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

// Initialize based on stored setting
chrome.storage.sync.get(['enabled'], function(result) {
  // Default to enabled if not set
  isEnabled = result.enabled !== undefined ? result.enabled : true;

  if (isEnabled) {
    startBlocking();
  }
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleBlocking') {
    isEnabled = request.enabled;

    if (isEnabled) {
      startBlocking();
    } else {
      stopBlocking();
    }

    // Reload the page to apply changes
    location.reload();
  }
});
