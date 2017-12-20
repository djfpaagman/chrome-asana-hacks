(
  function() {
    'use strict';

    function hideNotificationStuff() {
      if (document.title[0] === "●") {
        document.title = document.title.substr(2, document.title.length);
      }
    }

    function toggleInbox() {
      chrome.storage.sync.get({ inbox: true }, function(data) {
        if (data.inbox) {
         document.querySelector('.Topbar-notificationsButton').style.display = '';
        } else {
         document.querySelector('.Topbar-notificationsButton').style.display = 'none';
        }
      });
    }

    function toggleMeetingMode() {
      chrome.storage.sync.get({ meeting_mode: false }, function(data) {
        if (data.meeting_mode) {
         document.querySelectorAll('.PotPillsContainer').forEach(function(el) {
           el.style.display = 'none';
         });
        } else {
         document.querySelectorAll('.PotPillsContainer').forEach(function(el) {
           el.style.display = '';
         });
        }
      });
    }

    // create an observer instance
    var titleObserver = new MutationObserver(
      function(mutations) {
        hideNotificationStuff();
      }
    );

    // pass in the target node, as well as the observer options
    titleObserver.observe(
      document.querySelector('title'),
      { attributes: true, childList: true, characterData: true }
    );

    // Listen for messages to toggle the inbox
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        switch(request.toggle) {
          case "inbox":
            toggleInbox();
            break;
          case "meeting-mode":
            toggleMeetingMode();
            break;
        }
      }
    );

    // Wait a second before hiding stuff, because stuff is not guaranteed to
    // have been loaded yet. "run_at": "document_idle" is not always late enough,
    // probably because stuff is still loaded asynchroniously.
    setTimeout(function() {
      toggleInbox();
      toggleMeetingMode();
      hideNotificationStuff();
    }, 1000);
  }
)();
