(function (
  window,
  version,
  endpointProtocol,
  endpointSubdomain,
  endpointBase,
  endpointPath
) {
  if (!window) return;
  try {
    var errorText = "error";

    var baseUrl = endpointBase;
    var protocol = endpointProtocol + "://"; // "https://"
    var apiUrlPrefix = endpointSubdomain;

    var fullApiUrl = protocol + apiUrlPrefix + baseUrl;

    var undefinedVar = undefined;
    var nullVar = null;

    var con = window.console;
    var nav = window.navigator;
    var loc = window.location;
    var locationHostname = loc.hostname;
    var doc = window.document;
    var userAgent = nav.userAgent;
    var encodeURIComponentFunc = encodeURIComponent;
    var decodeURIComponentFunc = decodeURIComponent;
    var addEventListenerFunc = window.addEventListener;
    var documentElement = doc.documentElement || {};

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

    var payload = {
      version: version,
      bot: bot,
    };

    // Find the script element where options can be set on
    var scriptElement = doc.querySelector('script[src*="' + baseUrl + '"]');
    var attr = function (scriptElement, attribute) {
      return scriptElement && scriptElement.getAttribute("data-" + attribute);
    };

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

    // Allow override
    var definedHostname = attr(scriptElement, "hostname") || locationHostname;

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
      referrer: referrer,
    };

    // Send data via image
    var sendData = function (data, callback) {
      var image = new Image();
      if (callback) {
        image.onerror = callback;
        image.onload = callback;
      }
      image.src =
        fullApiUrl +
        "/dot.gif?" +
        Object.keys(data)
          .filter(function (key) {
            return data[key] !== undefinedVar || data[key] !== nullVar;
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

    var sendError = function (errorOrMessage) {
      errorOrMessage = errorOrMessage.message || errorOrMessage;
      warn(errorOrMessage);
      sendData({
        type: errorText,
        error: errorOrMessage,
        url: definedHostname + loc.pathname,
      });
    };

    addEventListenerFunc(
      errorText,
      function (event) {
        if (event.filename && event.filename.indexOf(endpointBase) > -1) {
          sendError(event.message);
        }
      },
      false
    );

    if (
      locationHostname.indexOf(".") === -1 ||
      /^[0-9]+$/.test(locationHostname.replace(/\./g, ""))
    ) {
      return warn("Will not ping from " + locationHostname);
    }
  } catch (e) {
    sendError(e);
    warn(e);
  }
})(window, 1, "https", "ping.", "flayyer.host", "/v1/p");
