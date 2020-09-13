import init from "@flayyer/ping";

if (window) {
  var addEventListenerFunc = window.addEventListener;
  var ping = init(window);

  if (ping) {
    var f = false;
    addEventListenerFunc("load", ping.init, f);
    addEventListenerFunc("error", ping.e, f);
  }
}
