import { FlayyerPing, FlayyerPingOptions } from "@flayyer/ping";

/**
 * Init Flayyer Ping object with methods to start and stop.
 * This script only works on browser environments.
 */
declare function init(opts?: FlayyerPingOptions): FlayyerPing | undefined;

export default init;
