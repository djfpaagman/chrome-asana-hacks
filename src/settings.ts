document.addEventListener('DOMContentLoaded', function() {
  var inbox = document.getElementById('inbox-value') as HTMLInputElement;
  var meeting = document.getElementById('meeting-mode-value') as HTMLInputElement;
  var silent = document.getElementById('silent-mode-value') as HTMLInputElement;
  var home = document.getElementById('home-value') as HTMLInputElement;
  
  // Load config settings
  chrome.storage.sync.get(
    { inbox: true, meeting_mode: false, silent_mode: true, home: true },
    function(data) {
      inbox.checked = data.inbox;
      meeting.checked = data.meeting_mode;
      silent.checked = data.silent_mode;
      home.checked = data.home;
    }
  );

  inbox.addEventListener('change', function() {
    chrome.storage.sync.set({ inbox: this.checked });

    chrome.tabs.query({ url: 'https://app.asana.com/*' }, function(tabs) {
      tabs.forEach(function(tab) {
        chrome.tabs.sendMessage(tab.id, { toggle: "inbox" });
      });
    });
  });

  meeting.addEventListener('change', function() {
    chrome.storage.sync.set({ meeting_mode: this.checked });

    chrome.tabs.query({ url: 'https://app.asana.com/*' }, function(tabs) {
      tabs.forEach(function(tab) {
        chrome.tabs.sendMessage(tab.id, { toggle: "meeting-mode" });
      });
    });
  });

  silent.addEventListener('change', function() {
    chrome.storage.sync.set({ silent_mode: this.checked });

    chrome.tabs.query({ url: 'https://app.asana.com/*' }, function(tabs) {
      tabs.forEach(function(tab) {
        chrome.tabs.sendMessage(tab.id, { toggle: "silent-mode" });
      });
    });
  });

  home.addEventListener('change', function() {
    chrome.storage.sync.set({ home: this.checked });

    chrome.tabs.query({ url: 'https://app.asana.com/*' }, function(tabs) {
      tabs.forEach(function(tab) {
        chrome.tabs.sendMessage(tab.id, { toggle: "home" });
      });
    });
  });
});