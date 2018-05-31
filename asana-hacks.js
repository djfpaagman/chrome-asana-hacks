(
  function() {
    'use strict';

    var originalTitle = document.title;
    var unreadBlob = document.querySelector('.SidebarTopNavLinks-notificationsButton--hasNewNotifications');
    var inboxButton = document.querySelector('.SidebarTopNavLinks-notificationsButton');
    var allTagsAndLabels = document.querySelectorAll('.PotPillsContainer');
    var sidebar = document.querySelector(".sidebar-mountNode");
    var sidebarButton = document.querySelector(".ExpandSidebarButton");

    function hideNotificationBlobs() {
      if (document.title[0] === "●") {
        originalTitle = document.title;

        document.title = document.title.substr(2, document.title.length);

        // hide the blob next to the Inbox button
        unreadBlob.classList.add("asana-hacks-hide");
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
         inboxButton.style.display = '';
        } else {
          // show the Inbox button
         inboxButton.style.display = 'none';
        }
      });
    }

    function toggleMeetingMode() {
      chrome.storage.sync.get({ meeting_mode: false }, function(data) {
        if (data.meeting_mode) {
          // hide all tags and project labels
          allTagsAndLabels.forEach(function(el) {
            el.style.display = 'none';
          });

          // Hide sidebar if not yet hidden
          if (!sidebar.classList.contains("is-collapsed")) {
            sidebarButton.click();
          }

        } else {
          // show all tags and project labels
          allTagsAndLabels.forEach(function(el) {
            el.style.display = '';
          });

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
        } else {
          // Stop observing changes to the <title>
          titleObserver.disconnect();

          // Put back original <title>
          document.title = originalTitle;

          // Show blob behind "inbox"
          unreadBlob.classList.remove("asana-hacks-hide");
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
        }
      }
    );

    // Wait a second before toggling everything, because stuff is not guaranteed to
    // have been loaded yet. "run_at": "document_idle" is not always late enough,
    // probably because stuff is still loaded asynchroniously.
    setTimeout(function() {
      toggleInbox();
      toggleMeetingMode();
      toggleSilentMode();
    }, 1000);
  }
)();
