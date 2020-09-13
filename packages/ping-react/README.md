# @flayyer/ping-react

Monitor and pre-render Flayyer URLs - React component and hook.

This script will only work on pages where a `<meta>` tag is present and related to `og:image` or `twitter:image` and has for content a [Flayyer URL](https://flayyer.com?ref=github). In other cases this will result in a no-op.

## Install

This module supports TypeScript and JavaScript.

```sh
npm install --save @flayyer/ping-react

# or with yarn:
yarn add @flayyer/ping-react
```

## Usage

### React Hook

**We recommended using this library with React Hooks.**

Add this to public pages where you have a Flayyer URL in your `<meta>` tags for dynamic `og:images`.

```js
import { useFlayyerPing } from "@flayyer/ping-react";

function App() {
  useFlayyerPing();
  // ...
}
```

#### Next.js

> See https://nextjs.org/docs/advanced-features/custom-app

If you are using [Next.js](https://nextjs.org/) you probably want to add this hook to your `/pages/_app.js` file.

```js
// /pages/_app.js

import Head from "next/head";
import Flayyer from "@flayyer/flayyer";
import { useFlayyerPing } from "@flayyer/ping-react";

const flayyer = new Flayyer({
  tenant: "tenant",
  deck: "deck",
  template: "template",
  variables: {
    title: "Hello world!",
  },
});

function MyApp({ Component, pageProps }) {
  useFlayyerPing();

  return (
    <>
      <Head>
        <meta property="og:image" content={url} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
```

### React component

If you are not using React Hooks, you can active this script by mounting a `<FlayyerPing />` component. Make sure to mount it only one time per page.

The same rules described above applies here: this will only work on pages where you have a Flayyer URL in your `<meta>` tags for dynamic `og:images`. Ideally only on public pages.

This component has no effect on your DOM since it always renders `null`.

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
