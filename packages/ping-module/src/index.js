var init = require("@flayyer/ping");

var ping = function () {
  if (typeof window !== "undefined") return init(window);
};

module.exports = ping;
