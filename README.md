# Chrome Asana Hacks

This small extension is here to increase your Asana productivity, it:

* Introduces "Silent mode", which removes the unread inbox notifications
* Introduces "meeting mode", which reduces visual clutter when using Asana in meetings
* Introduces an "Inbox" switch, which completely hides your inbox so you can focus on work
* Introduces a "Home" switch, which hides the new Home feature in the menu bar.

Next to that, the extension:

* Makes private tasks more prominent with a red background, making sure you never accidentaly create private tasks anymore.
* Makes project and tags in the task list more clear (wider) on large screens.

## Installation
Get the extension [through the Chrome web store][1] or clone the repository and [load it as an unpacked extension][2].

## Changelog

### 0.11
* Fixes non-release of version 0.10 by actually updating the version in the manifest.
* Adds a new feature to hide the "Home" menu item.

### 0.10 — 2018-09-14
* Fixes bug where in some cases the unread inbox blob would return while "silent mode" is enabled.

### 0.9 — 2018-09-04
* Fixes full width task list for larger screens by updating CSS selector and attribute.

### 0.8 — 2018-05-31
* Fixes compatability with new Asana design

### 0.7
* Meeting mode now also automatically toggles the header and toggles the sidebar.

### 0.6
* Official release on the Chrome store

## Contributing

All contributions are welcome. Please open an issue or pull request in this repository.

## License

This code is distributed under the [MIT license][3].


[1]: https://chrome.google.com/webstore/detail/aednamkkbmbonmnmohjfhgmekggbnjlh
[2]: https://developer.chrome.com/extensions/getstarted#load
[3]: LICENSE
