(
  function() {
    'use strict';

    var originalTitle = document.title;

    function hideNotificationBlobInTitle() {
      if (document.title[0] === "●") {
        originalTitle = document.title;

        document.title = document.title.substr(2, document.title.length);
      }
    }

    // creates an observer to monitor changes in the <title>
    var titleObserver = new MutationObserver(
      function(mutations) {
        hideNotificationBlobInTitle();
      }
    );

    function toggleInbox() {
      chrome.storage.sync.get({ inbox: true }, function(data) {
        if (data.inbox) {
          // hide the Inbox button
         document.querySelector('.Topbar-notificationsButton').style.display = '';
        } else {
          // show the Inbox button
         document.querySelector('.Topbar-notificationsButton').style.display = 'none';
        }
      });
    }

    function toggleMeetingMode() {
      chrome.storage.sync.get({ meeting_mode: false }, function(data) {
        if (data.meeting_mode) {
          // hide all tags and project labels
         document.querySelectorAll('.PotPillsContainer').forEach(function(el) {
           el.style.display = 'none';
         });
        } else {
          // show all tags and project labels
         document.querySelectorAll('.PotPillsContainer').forEach(function(el) {
           el.style.display = '';
         });
        }
      });
    }

    function toggleSilentMode() {
      chrome.storage.sync.get({ silent_mode: false }, function(data) {
        if (data.silent_mode) {
          // Observe changes in the <title> and hide the blob when it changes
          titleObserver.observe(
            document.querySelector('title'),
            { attributes: true, childList: true, characterData: true }
          );

          // Also remove it if already present
          hideNotificationBlobInTitle();

          // And hide the blob behind "Inbox"
          document.querySelector('.has-newNotifications').classList.add("asana-hacks-hide");
        } else {
          // Stop observing changes to the <title>
          titleObserver.disconnect();

          // Put back original <title>
          document.title = originalTitle;

          // Show blob behind "inbox"
          document.querySelector('.has-newNotifications').classList.remove("asana-hacks-hide");
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
