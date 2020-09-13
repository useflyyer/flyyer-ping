
declare interface Ping {
  e(event: any): void
  init(): void
}

/**
 * Add event listeners to work with Flayyer Ping.
 */
declare function init(window: Window & typeof globalThis): Ping | undefined;

export default init;
