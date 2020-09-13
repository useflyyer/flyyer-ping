var init = require("@flayyer/ping");

var ping = function () {
  if (!window) return;

  var addEventListenerFunc = window.addEventListener;
  var ping = init(window);

  if (ping) {
    var f = false;
    addEventListenerFunc("load", ping.init, f);
    addEventListenerFunc("error", ping.e, f);
  }
};

module.exports = ping;
