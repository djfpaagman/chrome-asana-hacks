!function(e){var t={};function n(o){if(t[o])return t[o].exports;var c=t[o]={i:o,l:!1,exports:{}};return e[o].call(c.exports,c,c.exports,n),c.l=!0,c.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)n.d(o,c,function(t){return e[t]}.bind(null,c));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([,function(e,t){!function(){"use strict";var e=document.title,t=document.querySelector(".sidebar-mountNode"),n=document.querySelector(".ExpandSidebarButton"),o=document.querySelector("body");function c(){"●"===document.title[0]&&(e=document.title,document.title=document.title.substr(2,document.title.length))}var a=new MutationObserver(function(e){c()});function i(){chrome.storage.sync.get({inbox:!0},function(e){e.inbox?o.classList.remove("asana-hacks--hide-inbox"):o.classList.add("asana-hacks--hide-inbox")})}function s(){chrome.storage.sync.get({meeting_mode:!1},function(e){e.meeting_mode?(o.classList.add("asana-hacks--meeting-mode"),t.classList.contains("is-collapsed")||n.click()):(o.classList.remove("asana-hacks--meeting-mode"),t.classList.contains("is-collapsed")&&n.click())})}function r(){chrome.storage.sync.get({silent_mode:!1},function(t){t.silent_mode?(a.observe(document.querySelector("title"),{attributes:!0,childList:!0,characterData:!0}),c(),o.classList.add("asana-hacks--hide")):(a.disconnect(),document.title=e,o.classList.remove("asana-hacks--hide"))})}function u(){chrome.storage.sync.get({home:!0},function(e){e.home?o.classList.remove("asana-hacks--hide-home"):o.classList.add("asana-hacks--hide-home")})}chrome.runtime.onMessage.addListener(function(e,t,n){switch(e.toggle){case"inbox":i();break;case"meeting-mode":s();break;case"silent-mode":r();break;case"home":u()}}),i(),s(),r(),u()}()}]);