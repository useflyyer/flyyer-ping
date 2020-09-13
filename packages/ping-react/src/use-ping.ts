import { useEffect } from "react";
import init from "@flayyer/ping";

/**
 * Make sure to call this only once
 */
export default function useFlayyerPing() {
  useEffect(() => {
    const ping = init(window);
    if (ping) {
      ping.go();
    }
    return function () {
      if (ping) {
        ping.no();
      }
    }
  }, []);
}
