# @flayyer/ping-script

Monitor and pre-render Flayyer URLs - Browser script

This script will only work on pages where a `<meta>` tag is present and related to `og:image` or `twitter:image` and has for content a [Flayyer URL](https://flayyer.com?ref=github). In other cases this will result in a no-op.

## Install

> This script is hosted in npm and served through [unpkg.com](https://unpkg.com/)

Add this script inside and at the end of the `<body>` tag:

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

### Specific version

While `https://unpkg.com/@flayyer/ping-script/dist/ping.min.js` is going to grab the latest version of this script, you can opt to use a specific version using the syntax described in https://unpkg.com/

## Size

We care about performance and we don´t want to impact the loading speed of your website. This script has the following filesize and we are continuously working to add more features while reducing the size as much as possible.

```txt
┌───────────────────────────────┐
│                               │
│   Destination: dist/ping.js   │
│   Bundle Size:  9.21 KB       │
│   Minified Size:  3.2 KB      │
│   Gzipped Size:  1.64 KB      │
│                               │
└───────────────────────────────┘
┌───────────────────────────────────┐
│                                   │
│   Destination: dist/ping.min.js   │
│   Bundle Size:  3.12 KB           │
│   Minified Size:  3.12 KB         │
│   Gzipped Size:  1.65 KB          │
│                                   │
└───────────────────────────────────┘
```
