# @flayyer/ping-module

Monitor and pre-render Flayyer URLs - CommonJS compatible module

## Install

This module supports TypeScript and JavaScript.

```sh
npm install --save @flayyer/ping-module

# or with yarn:
yarn add @flayyer/ping-module
```

## Usage

### CommonJS import

**Note: this module is intended for browsers only.** We are working on a Node.js version.

```js
const ping = require("@flayyer/ping-module");

// Add this to your app initialization logic. Make sure to execute it only once.
ping();
```

### ES Import

```js
import ping from "@flayyer/ping-module";

// Add this to your app initialization logic. Make sure to execute it only once.
ping();
```
