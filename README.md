# Flayyer Ping

Monitor and pre-render [Flayyer URLs](https://flayyer.com?ref=github)

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

## Concept

**This is very similar to Facebook Pixel.**

This lightweight script with zero dependencies reads the `<head>` of your HTML and if it finds a Flayyer URL in the contents of `og:image` or `twitter:image` it will ping one of our Flayyer severs to pre-render them (if were not rendered before) and to track some information to measure the impact of those images.

The easiest way of using this script is via a `<script>` tag at the end of the `<body>` element. Here is an example:

```html
<script async defer src="https://unpkg.com/@flayyer/ping-script/dist/ping.min.js"></script>
<noscript>
  <img src="https://edge.flayyer.host/v2/ping.gif" alt=""/>
</noscript>
```

So a fully-featured but also minimalist site using Flayyer should look like this:

```html
<!DOCTYPE html>
<html lang="en" prefix="og: https://ogp.me/ns#">
<head>
  <title>Example</title>
  <meta property="og:image" content="https://flayyer.host/v2/tenant/deck/template.jpeg?title=Example" />
</head>
<body>
  <h1>Example</h1>
  ...
  <script async defer src="https://unpkg.com/@flayyer/ping-script/dist/ping.min.js"></script>
  <noscript>
    <img src="https://edge.flayyer.host/v2/ping.gif" alt=""/>
  </noscript>
</body>
</html>
```

By using this script we are able to pre-render the image at `https://flayyer.host/v2/tenant/deck/template.jpeg?title=Example` and also keep track of outside visitors that may be interested in your link thanks to the preview we generated.

## Packages

Checkout the [/packages](./packages) directory, anyways here is the full list:

| Package              | Github                                          | NPM                                                                    | Description                                                                            |
|----------------------|-------------------------------------------------|------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| @flayyer/ping        | [/packages/ping](./packages/ping)               | [@flayyer/ping](https://npmjs.com/package/@flayyer/ping)               | Base script logic. Every other package imports this.                                   |
| @flayyer/ping-script | [/packages/ping-script](./packages/ping-script) | [@flayyer/ping-script](https://npmjs.com/package/@flayyer/ping-script) | Minified script for browsers (`<script src=... />`)                                    |
| @flayyer/ping-module | [/packages/ping-module](./packages/ping-module) | [@flayyer/ping-module](https://npmjs.com/package/@flayyer/ping-module) | CommonJS-like package so you can import it on project with Webpack, Rollup or similar. |
| @flayyer/ping-react  | [/packages/ping-react](./packages/ping-react)   | [@flayyer/ping-react](https://npmjs.com/package/@flayyer/ping-react)   | React hook and component for React.js projects.                                        |

## Flayyer URLs

The easiest way of generating Flayyer URLs and forget about dealing with encoding issues is by using [flayyer/flayyer-js](https://github.com/flayyer/flayyer-js).

```js
import Flayyer from "@flayyer/flayyer";

const flayyer = new Flayyer({
  tenant: "tenant",
  deck: "deck",
  template: "template",
  variables: {
    title: "Hello world!",
  },
});

// Use this image in your <head/> tags
const url = flayyer.href();
// > https://flayyer.host/v2/tenant/deck/template.jpeg?__v=1596906866&title=Hello+world%21

// Later in your HTML code:
<meta property="og:image" content={url} />
```

## Development

Prepare Lerna environment with:

```sh
yarn install
yarn run bootstrap
yarn run build
```

To deploy a new version:

```sh
yarn run deploy
```
