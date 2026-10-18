/**
 * What day it is on this computer, for the one Scene that cares: Pumpkin
 * Hollow, which is only open for a few weeks and grows by the day
 * (`scenes/halloween/calendar.ts`).
 *
 * Unknown (null) until the page is running in a browser: the page is
 * prerendered with no idea of the date, and hydration must find exactly the
 * Scenes it was rendered with. Checked again every minute, so a tab left open
 * overnight moves on to the next day.
 *
 * In development `?today=2026-10-30` pretends it is that day, for walking
 * the calendar without waiting for it.
 */

import { browser, dev } from "$app/environment";
import { isDay, localDay } from "$lib/scenes/halloween/calendar";

const CHECK_MS = 60_000;

function override(): string | null {
  if (!dev) return null;
  const asked = new URLSearchParams(location.search).get("today");
  return asked && isDay(asked) ? asked : null;
}

class Today {
  day = $state<string | null>(null);
  #interval: ReturnType<typeof setInterval> | undefined;

  /** Start keeping track. Returns a teardown. */
  start() {
    if (!browser) return () => {};
    const check = () => (this.day = override() ?? localDay(new Date()));
    check();
    clearInterval(this.#interval);
    this.#interval = setInterval(check, CHECK_MS);
    return () => clearInterval(this.#interval);
  }
}

export const today = new Today();
