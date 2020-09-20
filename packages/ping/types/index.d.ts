export interface FlayyerPing {
  /**
   * Start
   */
  go(): void
  /**
   * Stop
   */
  no(): void
  /**
   * Manually ping
   */
  ping(event: any): void
  /**
   * Get current Flayyer URLs
   */
  urls(): string[]
}

export interface FlayyerPingOptions {
  fetch?: typeof fetch | null;

  /**
   * A dot prefix is required (eg: `".jpeg"`).
   * Defaults to `".gif"`
   */
  ext?: string | null;
}

/**
 * Init Flayyer Ping object with methods to start and stop.
 * This script only works on browser environments.
 */
declare function init(window: Window & typeof globalThis, opts?: FlayyerPingOptions): FlayyerPing | undefined;

export default init;
