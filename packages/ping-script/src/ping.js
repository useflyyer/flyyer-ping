import init from "@flayyer/ping";

if (typeof window !== "undefined") {
  var ping = init(window);

  if (ping) {
    ping.go();
  }
  // return ping; // TODO
}
