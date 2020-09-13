# @flayyer/ping-react

Monitor and pre-render Flayyer URLs - React component and hook.

## Install

```sh
npm install --save @flayyer/ping-react

# or with yarn:
yarn add @flayyer/ping-react
```

## Usage

### React Hook

Recommended.

```js
import { useFlayyerPing } from "@flayyer/ping-react";

function App() {
  useFlayyerPing();

  return (
    <div>
       // ...
    </div>
  )
}
```

### React component

```js
import { FlayyerPing } from "@flayyer/ping-react";

function App() {
  return (
    <div>
      <FlayyerPing />
      // ...
    </div>
  )
}
```
