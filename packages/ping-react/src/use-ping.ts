import { useEffect } from "react";
import init, { FlayyerPingOptions } from "@flayyer/ping";

/**
 * Make sure to call this only once.
 * This hook ignores the rule of hooks about adding its arguments to `useState` dependencies and re-triggering it since we only care about the mounting phase.
 */
export default function useFlayyerPing(opts?: FlayyerPingOptions) {
  useEffect(() => {
    const ping = init(window, opts);
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
