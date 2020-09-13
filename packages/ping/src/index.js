var init = function (window) {
  if (!window) return;
  try {
    var version = 1;
    var endpointProtocol = "https";
    var endpointSubdomain = "ping.";
    var endpointBase = "flayyer.host";
    var endpointPath = "/v2/ping.gif";

    var slash = "/";
    var https = "https:";
    var language = "language";

    var errorText = "error";
    var pageviewsText = "pageview";

    var baseUrl = endpointBase;
    var protocol = endpointProtocol + "://"; // "https://"
    var apiUrlPrefix = endpointSubdomain;

    var fullApiUrl = protocol + apiUrlPrefix + baseUrl;

    var undefinedVar = undefined;
    var nullVar = null;

    var con = window.console;
    var nav = window.navigator;
    var loc = window.location;
    var locationHostname = loc && loc.hostname;
    var doc = window.document;
    var userAgent = nav && nav.userAgent;
    var encodeURIComponentFunc = encodeURIComponent;
    var decodeURIComponentFunc = decodeURIComponent;
    // var addEventListenerFunc = window.addEventListener;
    // var documentElement = doc.documentElement || {};

    var timezone;
    try {
      timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (e) {
      /* Do nothing */
    }

    var warn = function (message) {
      if (con && con.warn) con.warn("FlayyerPing:", message);
    };

    var isBotAgent =
      /(bot|spider|crawl)/i.test(userAgent) && !/(cubot)/i.test(userAgent);
    var bot =
      nav.webdriver ||
      window.__nightmare ||
      "callPhantom" in window ||
      "_phantom" in window ||
      "phantom" in window ||
      isBotAgent;

    // Find the script element where options can be set on
    // var scriptElement = doc.querySelector('script[src*="' + baseUrl + '"]');
    // var attr = function (scriptElement, attribute) {
    //   return scriptElement && scriptElement.getAttribute("data-" + attribute);
    // };

    var getParams = function (regex) {
      var matches = loc.search.match(
        new RegExp("[?&](" + regex + ")=([^?&]+)", "gi")
      );
      var match = matches
        ? matches.map(function (m) {
            return m.split("=")[1];
          })
        : [];
      if (match && match[0]) return match[0];
    };

    var qs = function (data) {
      return Object.keys(data)
        .filter(function (key) {
          return data[key] !== undefinedVar && data[key] !== nullVar;
        })
        .map(function (key) {
          return (
            encodeURIComponentFunc(key) +
            "=" +
            encodeURIComponentFunc(data[key])
          );
        })
        .join("&");
    };

    var uuid = function () {
      var cryptoObject = window.crypto || window.msCrypto;
      var emptyUUID = [1e7] + -1e3 + -4e3 + -8e3 + -1e11;
      var uuidRegex = /[018]/g;

      try {
        return emptyUUID.replace(uuidRegex, function (c) {
          return (
            c ^
            // eslint-disable-next-line no-undef
            (cryptoObject.getRandomValues(new Uint8Array(1))[0] &
              (15 >> (c / 4)))
          ).toString(16);
        });
      } catch (error) {
        return emptyUUID.replace(uuidRegex, function (c) {
          var r = (Math.random() * 16) | 0,
            v = c < 2 ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
      }
    };

    var assign = function () {
      var to = {};
      var arg = arguments;
      for (var index = 0; index < arg.length; index++) {
        var nextSource = arg[index];
        if (nextSource) {
          for (var nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    };

    // Allow override
    // var definedHostname = attr(scriptElement, "hostname") || locationHostname;
    var definedHostname = locationHostname;

    // We don't want to end up with sensitive data so we clean the referrer URL
    var referrer =
      (doc.referrer || "")
        .replace(locationHostname, definedHostname)
        .replace(/^https?:\/\/((m|l|w{2,3}([0-9]+)?)\.)?([^?#]+)(.*)$/, "$4")
        .replace(/^([^/]+)$/, "$1") || undefinedVar;

    // The prefix utm_ is optional
    var utmRegexPrefix = "(utm_)?";
    var source = {
      source: getParams(utmRegexPrefix + "source|ref"),
      medium: getParams(utmRegexPrefix + "medium"),
      campaign: getParams(utmRegexPrefix + "campaign"),
      term: getParams(utmRegexPrefix + "term"),
      content: getParams(utmRegexPrefix + "content"),
      referrer: referrer, // example: web.whatsapp.com/ or same hostname
    };

    var page = {};
    var lastPageId = uuid();
    var lastSendPath;

    var payload = {
      version: version,
      bot: bot,
      hostname: definedHostname,
    };

    // Send data via image
    var sendData = function (data, callback) {
      data = assign(payload, data);
      var image = new Image();
      if (callback) {
        image.onerror = callback;
        image.onload = callback;
      }
      image.src = fullApiUrl + endpointPath + "?" + qs(data);
    };

    var sendError = function (errorOrMessage) {
      errorOrMessage = errorOrMessage.message || errorOrMessage;
      warn(errorOrMessage);
      sendData({
        type: errorText,
        error: errorOrMessage,
        url: definedHostname + loc.pathname,
      });
    };

    var flayyers = function () {
      var urls = [];
      // meta[property^="og:image"][content*="flayyer.host"], meta[name^="twitter:image"][content*="flayyer.host"]
      var metaimageElements = doc.querySelectorAll(
        'meta[property^="og:image"][content*="' +
          endpointBase +
          '"], meta[name^="twitter:image"][content*="' +
          endpointBase +
          '"]'
      );
      metaimageElements.forEach(function (node) {
        var content = node.content.split(endpointBase)[1];
        urls.indexOf(content) > -1 || urls.push(content);
      });
      return urls;
    };

    var getPath = function (overwrite) {
      var path = overwrite || decodeURIComponentFunc(loc.pathname);
      return path;
    };

    var sendPageView = function (isPushState, deleteSourceInfo, sameSite) {
      // if (isPushState) sendOnLeave("" + lastPageId, true);
      lastPageId = uuid();
      page.id = lastPageId;

      var currentPage = definedHostname + getPath();
      var data = assign(
        page,
        deleteSourceInfo
          ? {
              referrer: sameSite ? referrer : null,
            }
          : source,
        {
          https: loc.protocol === https,
          timezone: timezone,
          type: pageviewsText,
        }
      );
      sendData(data);
      referrer = currentPage;
    };

    var pageview = function (isPushState, pathOverwrite) {
      // Do not execute if document is not using Flayyer
      var flayyerURLs = flayyers();
      if (!flayyerURLs.length) return;

      // Obfuscate personal data in URL by dropping the search and hash
      var path = getPath(pathOverwrite);

      // Don't send the last path again (this could happen when pushState is used to change the path hash or search)
      if (!path || lastSendPath === path) return;

      lastSendPath = path;

      var data = {
        path: path,
      };
      for (var fi = 0; fi < flayyerURLs.length; fi++) {
        data["f" + fi] = flayyerURLs[fi];
      }
      // TODO: does this produce a lighter min.js?
      // if (flayyerURLs[0]) data.f0 = flayyerURLs[0];
      // if (flayyerURLs[1]) data.f1 = flayyerURLs[1];
      // if (flayyerURLs[2]) data.f2 = flayyerURLs[2];
      // if (flayyerURLs[3]) data.f3 = flayyerURLs[4];

      if (nav[language]) data[language] = nav[language];

      // If a user does refresh we need to delete the referrer because otherwise it count double
      var perf = window.performance;
      var navigation = "navigation";

      // Check if back, forward or reload buttons are being used in modern browsers
      var userNavigated =
        perf &&
        perf.getEntriesByType &&
        perf.getEntriesByType(navigation)[0] &&
        perf.getEntriesByType(navigation)[0].type
          ? ["reload", "back_forward"].indexOf(
              perf.getEntriesByType(navigation)[0].type
            ) > -1
          : // Check if back, forward or reload buttons are being use in older browsers
            // 1: TYPE_RELOAD, 2: TYPE_BACK_FORWARD
            perf &&
            perf[navigation] &&
            [1, 2].indexOf(perf[navigation].type) > -1;

      // Check if referrer is the same as current hostname
      var sameSite = referrer
        ? referrer.split(slash)[0] === definedHostname
        : false;

      // We set unique variable based on pushstate or back navigation, if no match we check the referrer
      data.unique = isPushState || userNavigated ? false : !sameSite;
      // IMPORTANT: If true, the user came from outside the page and we should track it

      page = data;

      sendPageView(isPushState, isPushState || userNavigated, sameSite);
    };

    var ping = {};
    ping.e = function (event) {
      if (event.filename && event.filename.indexOf(endpointBase) > -1) {
        sendError(event.message);
      }
    };
    ping.init = function () {
      // Disable on development
      if (
        locationHostname.indexOf(".") === -1 ||
        /^[0-9]+$/.test(locationHostname.replace(/\./g, ""))
      ) {
        return warn("Will not ping from " + locationHostname);
      }
      pageview(0); // 1 is for SPAs
    };
    ping.flayyers = flayyers;
    return ping;
  } catch (e) {
    warn(e);
    if (sendError) {
      sendError(e);
    }
  }
};

module.exports = init;
