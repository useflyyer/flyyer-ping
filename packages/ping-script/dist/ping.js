(function () {

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
      var protocol = endpointProtocol + "://";
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
      var timezone;
      try {
        timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      } catch (e) {
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
      var definedHostname = locationHostname;
      var referrer =
        (doc.referrer || "")
          .replace(locationHostname, definedHostname)
          .replace(/^https?:\/\/((m|l|w{2,3}([0-9]+)?)\.)?([^?#]+)(.*)$/, "$4")
          .replace(/^([^/]+)$/, "$1") || undefinedVar;
      var utmRegexPrefix = "(utm_)?";
      var source = {
        source: getParams(utmRegexPrefix + "source|ref"),
        medium: getParams(utmRegexPrefix + "medium"),
        campaign: getParams(utmRegexPrefix + "campaign"),
        term: getParams(utmRegexPrefix + "term"),
        content: getParams(utmRegexPrefix + "content"),
        referrer: referrer,
      };
      var page = {};
      var lastPageId = uuid();
      var lastSendPath;
      var payload = {
        version: version,
        bot: bot,
        hostname: definedHostname,
      };
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
        var flayyerURLs = flayyers();
        if (!flayyerURLs.length) return;
        var path = getPath(pathOverwrite);
        if (!path || lastSendPath === path) return;
        lastSendPath = path;
        var data = {
          path: path,
        };
        for (var fi = 0; fi < flayyerURLs.length; fi++) {
          data["f" + fi] = flayyerURLs[fi];
        }
        if (nav[language]) data[language] = nav[language];
        var perf = window.performance;
        var navigation = "navigation";
        var userNavigated =
          perf &&
          perf.getEntriesByType &&
          perf.getEntriesByType(navigation)[0] &&
          perf.getEntriesByType(navigation)[0].type
            ? ["reload", "back_forward"].indexOf(
                perf.getEntriesByType(navigation)[0].type
              ) > -1
            :
              perf &&
              perf[navigation] &&
              [1, 2].indexOf(perf[navigation].type) > -1;
        var sameSite = referrer
          ? referrer.split(slash)[0] === definedHostname
          : false;
        data.unique = isPushState || userNavigated ? false : !sameSite;
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
        if (
          locationHostname.indexOf(".") === -1 ||
          /^[0-9]+$/.test(locationHostname.replace(/\./g, ""))
        ) {
          return warn("Will not ping from " + locationHostname);
        }
        pageview(0);
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
  var src = init;

  if (window) {
    var addEventListenerFunc = window.addEventListener;
    var ping = src(window);
    if (ping) {
      var f = false;
      addEventListenerFunc("load", ping.init, f);
      addEventListenerFunc("error", ping.e, f);
    }
  }

}());
