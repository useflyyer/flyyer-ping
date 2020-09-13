# @flayyer/ping-script

Monitor and pre-render Flayyer URLs - Browser script

This script will only work on pages where a `<meta>` tag is present and related to `og:image` or `twitter:image` and has for content a [Flayyer URL](https://flayyer.com?ref=github). In other cases this will result in a no-op.

## Install

> This script is hosted in npm and served through [unpkg.com](https://unpkg.com/)

Add this script inside and at the end of the `<body>` tag:

```html
<script async defer src="https://unpkg.com/@flayyer/ping-script/dist/ping.min.js"></script>
<noscript>
  <img src="https://ping.flayyer.host/v2/ping.gif" alt=""/>
</noscript>
```

### Specific version

While `https://unpkg.com/@flayyer/ping-script/dist/ping.min.js` is going to grab the latest version of this script, you can opt to use a specific version using the syntax described in https://unpkg.com/



## Size

We care about performance and we don´t want to impact the loading speed of your website. This script has the following filesize and we are continuously working to add more features while reducing the size as much as possible.

```txt
┌───────────────────────────────┐
│                               │
│   Destination: dist/ping.js   │
│   Bundle Size:  8.13 KB       │
│   Minified Size:  2.91 KB     │
│   Gzipped Size:  1.52 KB      │
│                               │
└───────────────────────────────┘
┌───────────────────────────────────┐
│                                   │
│   Destination: dist/ping.min.js   │
│   Bundle Size:  2.89 KB           │
│   Minified Size:  2.87 KB         │
│   Gzipped Size:  1.52 KB          │
│                                   │
└───────────────────────────────────┘
```
