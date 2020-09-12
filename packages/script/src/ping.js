var initializer = require("./initializer");

(function (window) {
  if (!window) return;
  var addEventListenerFunc = window.addEventListener;
  var ping = initializer(
    window,
    "1",
    "https",
    "ping.",
    "flayyer.host",
    "/v1/ping.gif"
  );
  if (ping) {
    var f = false;
    addEventListenerFunc("load", ping.init, f);
    addEventListenerFunc("error", ping.e, f);
  }
})(window);
