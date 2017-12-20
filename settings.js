document.addEventListener('DOMContentLoaded', function() {
  // Load config settings
  chrome.storage.sync.get({ inbox: true, meeting_mode: false }, function(data) {
    document.getElementById('inbox-value').checked = data.inbox;
    document.getElementById('meeting-mode-value').checked = data.meeting_mode;
  })

  document.getElementById('inbox').addEventListener('click', function() {
    chrome.storage.sync.get({ inbox: false }, function(data) {
      if (data.inbox) {
        chrome.storage.sync.set({inbox: false});
        document.getElementById('inbox-value').checked = false;
      } else {
        chrome.storage.sync.set({inbox: true});
        document.getElementById('inbox-value').checked = true;
      }

      chrome.tabs.query({ url: 'https://app.asana.com/*' }, function(tabs) {
        tabs.forEach(function(tab) {
          chrome.tabs.sendMessage(tab.id, { toggle: "inbox" });
        });
      });
    });
  });

  document.getElementById('meeting-mode').addEventListener('click', function() {
    chrome.storage.sync.get({ meeting_mode: false }, function(data) {
      if (data.meeting_mode) {
        chrome.storage.sync.set({meeting_mode: false});
        document.getElementById('meeting-mode-value').checked = false;
      } else {
        chrome.storage.sync.set({meeting_mode: true});
        document.getElementById('meeting-mode-value').checked = true;
      }

      chrome.tabs.query({ url: 'https://app.asana.com/*' }, function(tabs) {
        tabs.forEach(function(tab) {
          chrome.tabs.sendMessage(tab.id, { toggle: "meeting-mode" });
        });
      });
    });
  });
});
