(
  function() {
    'use strict';

    function removeUnreadBlob() {
      if (document.title[0] === "●") {
        document.title = document.title.substr(2, document.title.length);
      }
    }

    removeUnreadBlob();

    // create an observer instance
    var observer = new MutationObserver(function(mutations) {
      removeUnreadBlob();
    });

    // pass in the target node, as well as the observer options
    observer.observe(document.querySelector('title'), { attributes: true, childList: true, characterData: true });
  }
)();
