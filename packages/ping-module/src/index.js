var init = require("@flayyer/ping");

var ping = function (opts) {
  if (typeof window !== "undefined") return init(window, opts);
};

module.exports = ping;
