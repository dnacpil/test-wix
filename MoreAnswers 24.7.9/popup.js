document.addEventListener('DOMContentLoaded', function () {
  const runbookToggle = document.getElementById('runbookToggle');
  const dropdownToggle = document.getElementById('dropdownToggle');

  // Load the toggle states from local storage
  chrome.storage.local.get(['runbookToggleState', 'dropdownToggleState'], function (data) {
    if (data.runbookToggleState !== undefined) {
      runbookToggle.checked = data.runbookToggleState;
    } else {
      runbookToggle.checked = false; // Default to off
    }

    if (data.dropdownToggleState !== undefined) {
      dropdownToggle.checked = data.dropdownToggleState;
    } else {
      dropdownToggle.checked = false; // Default to off
    }
  });

  // Save the runbook toggle state to local storage and update content script
  runbookToggle.addEventListener('change', function () {
    const isChecked = runbookToggle.checked;
    chrome.storage.local.set({ 'runbookToggleState': isChecked });

    // Send message to content script to update button visibility
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'updateCreateJiraButtonVisibility', isChecked: isChecked });
    });
  });

  // Save the dropdown toggle state to local storage and update content script
  dropdownToggle.addEventListener('change', function () {
    const isChecked = dropdownToggle.checked;
    chrome.storage.local.set({ 'dropdownToggleState': isChecked });

    // Send message to content script to update dropdown visibility
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'updateDropdownVisibility', isChecked: isChecked });
    });
  });
});
