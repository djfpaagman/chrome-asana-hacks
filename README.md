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

## Development
1. `yarn install`
2. `yarn watch` while developing, load the `dist/` folder in Chrome.
3. `yarn build` when releasing.

## Changelog

### 0.17 — 2020-06-05
* Updates the CSS class for hiding the Upgrade button in the top bar.

### 0.16 — 2020-01-29
* Hides the ['Mark as Approval' feature][4] when upsells are hidden. This feature is for Business/Enterprise accounts only.

### 0.15 – 2020-01-16
* UI improved: makes sure all elements in the 'private task' banner are white.

### 0.14 — 2019-11-25
* Fixes hiding of unread inbox notifications blob in the sidebar.

### 0.13.2 — 2019-10-08
* Fix vulnerability in lodash by upgrading dependencies. No user facing changes.

### 0.13 — 2019-04-11
* Converts the code to Typescript as an experiment, minor changes to the code and functionality.
* Introduces a new setting to hide features/upsells belonging to the 'Business' plan
* Introduces a new setting to hide likes/like buttons.

### 0.12 — 2018-10-10
* Makes extension more stable with new approach to customizing CSS via classes on the HTML `body`. This fixes timing issues and makes the modes more stable when navigating different projects.

### 0.11 — 2018-10-02
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
[4]: https://asana.com/guide/help/premium/approvals
