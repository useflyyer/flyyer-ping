import { useEffect } from "react";
import init from "@flayyer/ping";

/**
 * Make sure to call this only once
 */
export default function useFlayyerPing() {
  useEffect(() => {
    const ping = init(window);
    if (ping) {
      window.addEventListener("load", ping.init, false);
      window.addEventListener("error", ping.e, false);
    }
    return function () {
      if (ping) {
        window.removeEventListener("load", ping.init, false);
        window.removeEventListener("error", ping.e, false);
      }
    }
  }, []);
}
