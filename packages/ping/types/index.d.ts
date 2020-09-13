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

/**
 * Init Flayyer Ping object with methods to start and stop.
 * This script only works on browser environments.
 */
declare function init(window: Window & typeof globalThis): FlayyerPing | undefined;

export default init;
