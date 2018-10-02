document.addEventListener('DOMContentLoaded', function() {
  // Load config settings
  chrome.storage.sync.get(
    { inbox: true, meeting_mode: false, silent_mode: true },
    function(data) {
      document.getElementById('inbox-value').checked = data.inbox;
      document.getElementById('meeting-mode-value').checked = data.meeting_mode;
      document.getElementById('silent-mode-value').checked = data.silent_mode;
    }
  )

  document.getElementById('meeting-mode-value').addEventListener('change', function() {
    chrome.storage.sync.set({ meeting_mode: this.checked });

    chrome.tabs.query({ url: 'https://app.asana.com/*' }, function(tabs) {
      tabs.forEach(function(tab) {
        chrome.tabs.sendMessage(tab.id, { toggle: "meeting-mode" });
      });
    });
  });

  document.getElementById('silent-mode-value').addEventListener('change', function() {
    chrome.storage.sync.set({ silent_mode: this.checked });

    chrome.tabs.query({ url: 'https://app.asana.com/*' }, function(tabs) {
      tabs.forEach(function(tab) {
        chrome.tabs.sendMessage(tab.id, { toggle: "silent-mode" });
      });
    });
  });

  document.getElementById('home-value').addEventListener('change', function() {
    chrome.storage.sync.set({ home: this.checked });

    chrome.tabs.query({ url: 'https://app.asana.com/*' }, function(tabs) {
      tabs.forEach(function(tab) {
        chrome.tabs.sendMessage(tab.id, { toggle: "home" });
      });
    });
  });

  document.getElementById('inbox-value').addEventListener('change', function() {
    chrome.storage.sync.set({ inbox: this.checked });

    chrome.tabs.query({ url: 'https://app.asana.com/*' }, function(tabs) {
      tabs.forEach(function(tab) {
        chrome.tabs.sendMessage(tab.id, { toggle: "inbox" });
      });
    });
  });

});
