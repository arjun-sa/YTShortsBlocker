// Popup script for YouTube Shorts Blocker

const toggleSwitch = document.getElementById('toggleSwitch');
const statusText = document.getElementById('statusText');

// Load the current state when popup opens
chrome.storage.sync.get(['enabled'], function(result) {
  // Default to enabled if not set
  const isEnabled = result.enabled !== undefined ? result.enabled : true;
  toggleSwitch.checked = isEnabled;
  updateStatus(isEnabled);
});

// Listen for toggle changes
toggleSwitch.addEventListener('change', function() {
  const isEnabled = toggleSwitch.checked;

  // Save the new state
  chrome.storage.sync.set({ enabled: isEnabled }, function() {
    updateStatus(isEnabled);

    // Send message to all YouTube tabs to update their state
    chrome.tabs.query({ url: '*://*.youtube.com/*' }, function(tabs) {
      tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, {
          action: 'toggleBlocking',
          enabled: isEnabled
        }).catch(() => {
          // Ignore errors for tabs that don't have the content script loaded
        });
      });
    });
  });
});

// Update the status text
function updateStatus(isEnabled) {
  if (isEnabled) {
    statusText.textContent = 'Active';
    statusText.style.color = '#4CAF50';
  } else {
    statusText.textContent = 'Inactive';
    statusText.style.color = '#f44336';
  }
}
