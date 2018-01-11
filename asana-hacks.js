(
  function() {
    'use strict';

    var originalTitle = document.title;

    function hideNotificationBlobs() {
      if (document.title[0] === "●") {
        originalTitle = document.title;

        document.title = document.title.substr(2, document.title.length);

        // hide the blob next to the Inbox button
        document.querySelector('.has-newNotifications').classList.add("asana-hacks-hide");
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
         document.querySelector('.Topbar-notificationsButton').style.display = '';
        } else {
          // show the Inbox button
         document.querySelector('.Topbar-notificationsButton').style.display = 'none';
        }
      });
    }

    function toggleMeetingMode() {
      chrome.storage.sync.get({ meeting_mode: false }, function(data) {
        var headerToggle = document.querySelector(".PageHeaderStructure-collapseButton");

        if (data.meeting_mode) {
          // hide all tags and project labels
          document.querySelectorAll('.PotPillsContainer').forEach(function(el) {
            el.style.display = 'none';
          });

          // Collapse header if not yet collapsed
          if (document.querySelector(".PageHeaderStructure-collapseButton")) {
            document.querySelector(".PageHeaderStructure-collapseButton").click();
          }

          // Hide sidebar if not yet hidden
          if (document.querySelector(".Topbar-navButton").classList.contains("is-active")) {
            document.querySelector(".Topbar-navButton").click();
          }

        } else {
          // show all tags and project labels
          document.querySelectorAll('.PotPillsContainer').forEach(function(el) {
            el.style.display = '';
          });

          // Uncollapse header if collapsed
          if (document.querySelector(".PageHeaderCollapsedStructure-uncollapseButton")) {
            document.querySelector(".PageHeaderCollapsedStructure-uncollapseButton").click();
          }

          // Show hidebar if hidden
          if (!document.querySelector(".Topbar-navButton").classList.contains("is-active")) {
            document.querySelector(".Topbar-navButton").click();
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
