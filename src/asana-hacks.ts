(
  function() {
    'use strict';

    var originalTitle = document.title;
    var sidebar = document.querySelector(".sidebar-mountNode");
    var sidebarButton = document.querySelector(".ExpandSidebarButton") as HTMLElement;
    var body = document.querySelector("body");

    function hideNotificationBlobs() {
      if (document.title[0] === "●") {
        originalTitle = document.title;
        document.title = document.title.substr(2, document.title.length);
      }
    }

    // creates an observer to monitor changes in the <title>
    var titleObserver = new MutationObserver(
      function(mutations) {
        hideNotificationBlobs();
      }
    );

    function toggleInbox() {
      chrome.storage.sync.get({ inbox: true }, function(data) {
        if (data.inbox) {
          // show the Inbox button
          body.classList.remove("asana-hacks--hide-inbox");
        } else {
          body.classList.add("asana-hacks--hide-inbox");
        }
      });
    }

    function toggleMeetingMode() {
      chrome.storage.sync.get({ meeting_mode: false }, function(data) {
        if (data.meeting_mode) {
          // hide all tags and project labels
          body.classList.add("asana-hacks--meeting-mode");

          // Hide sidebar if not yet hidden
          if (!sidebar.classList.contains("is-collapsed")) {
            sidebarButton.click();
          }

        } else {
          // show all tags and project labels
          body.classList.remove("asana-hacks--meeting-mode");

          // Show hidebar if hidden
          if (sidebar.classList.contains("is-collapsed")) {
            sidebarButton.click();
          }
        }
      });
    }

    function toggleSilentMode() {
      chrome.storage.sync.get({ silent_mode: false }, function(data) {
        if (data.silent_mode) {
          // Observe changes in the <title> and hide the blobs when it changes
          titleObserver.observe(
            document.querySelector('title'),
            { attributes: true, childList: true, characterData: true }
          );

          // Also hide them if already present
          hideNotificationBlobs();

          // hide the blob next to the Inbox button
          body.classList.add("asana-hacks--hide");
        } else {
          // Stop observing changes to the <title>
          titleObserver.disconnect();

          // Put back original <title>
          document.title = originalTitle;

          // Show blob behind "inbox"
          body.classList.remove("asana-hacks--hide");
        }
      });
    }

    function toggleHome() {
      chrome.storage.sync.get({ home: true }, function(data) {
        if (data.home) {
          // show the Home button
          body.classList.remove("asana-hacks--hide-home");
        } else {
          body.classList.add("asana-hacks--hide-home");
        }
      });
    }

    function toggleBusiness() {
      chrome.storage.sync.get({ business: false }, function (data) {
        if (data.business) {
          body.classList.remove("asana-hacks--hide-business");
        } else {
          body.classList.add("asana-hacks--hide-business");
        } else {
          body.classList.remove("asana-hacks--hide-business");
        }
      });
    }

    // Listen for messages to toggle features, sent by the settings panel
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        switch(request.toggle) {
          case "inbox":
            toggleInbox();
            break;
          case "meeting-mode":
            toggleMeetingMode();
            break;
          case "silent-mode":
            toggleSilentMode();
            break;
          case "home":
            toggleHome();
            break;
          case "business":
            toggleBusiness();
            break;
        }
      }
    );

    toggleInbox();
    toggleMeetingMode();
    toggleSilentMode();
    toggleHome();
    toggleBusiness();
  }
)();
