# node-XMLHttpRequest #

node-XMLHttpRequest is a wrapper for the built-in http client to emulate the
browser XMLHttpRequest object.

This can be used with JS designed for browsers to improve reuse of code and
allow the use of existing libraries.

Note: This library currently conforms to [XMLHttpRequest 1](http://www.w3.org/TR/XMLHttpRequest/). Version 2.0 will target [XMLHttpRequest Level 2](http://www.w3.org/TR/XMLHttpRequest2/).

## Difference from original node-XMLHttpRequest ##

When a protocol was missing from the [original node-XMLHttpRequest](https://github.com/driverdan/node-XMLHttpRequest/),
`localhost` was intended to be assumed and any path determined relative to
`localhost` root.

This fork avoids the need for having a server set up and running, and
instead assumes a local file.

This project aims to ensure that the top-most requiring user-file is
used for determining the base path (but not relative to unrelated
higher executables like [nodeunit](https://github.com/caolan/nodeunit). More
precisely speaking, the relativity of the path will be determined
relative to the topmost file which meets either of the following
criteria and is thus assumed to be the topmost user file:

1. No `node_modules` folder is present.
1. The file's nearest "node_modules" ancestor contains our
node-XMLHttpRequest code (i.e., the user file has XMLHttpRequest as a dependency)

This may not be perfect (and alternative ideas are welcome), but it
is hoped it will allow the likes of `nodeunit` tests to be used with
portable and easy to follow relative paths (not to mention with the
possibility of reusing those same tests in the browser via the likes of
[karma-nodeunit](https://github.com/karma-runner/karma-nodeunit)).

## Usage ##

Here's how to include the module in your project and use as the browser-based
XHR object.

```js
	var XMLHttpRequest = require("local-xmlhttprequest").XMLHttpRequest;
	var xhr = new XMLHttpRequest();
```

Note: use the lowercase string "xmlhttprequest" in your require(). On
case-sensitive systems (e.g., Linux) using uppercase letters won't work.

## Versions ##

Prior to 1.4.0 version numbers were arbitrary. From 1.4.0 on they conform to
the standard major.minor.bugfix. 1.x shouldn't necessarily be considered
stable just because it's above 0.x.

Since the XMLHttpRequest API is stable this library's API is stable as
well. Major version numbers indicate significant core code changes.
Minor versions indicate minor core code changes or better conformity to
the W3C spec.

## License ##

MIT license. See LICENSE for full details.

## Supports ##

* Async and synchronous requests
* GET, POST, PUT, and DELETE requests
* All spec methods (open, send, abort, getRequestHeader,
  getAllRequestHeaders, event methods)
* Requests to all domains

## Known Issues / Missing Features ##

For a list of open issues or to report your own visit the [github issues
page](https://github.com/driverdan/node-XMLHttpRequest/issues).

* Local file access may have unexpected results for non-UTF8 files
* Synchronous requests don't set headers properly
* Synchronous requests freeze node while waiting for response (But that's what you want, right? Stick with async!).
* Some events are missing, such as abort
* getRequestHeader is case-sensitive
* Cookies aren't persisted between requests
* Missing XML support
* Missing basic auth
