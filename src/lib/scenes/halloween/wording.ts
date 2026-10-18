/**
 * What the menus and the Scene's sign say about Pumpkin Hollow on a given
 * day: that something new comes every school day, or how long is left.
 */

import { t, type UiKey } from "$lib/i18n/index.svelte";
import type { SceneId } from "$lib/scenes/types";
import { daysLeft, hollowPhase } from "./calendar";

/** A Scene's hint in a menu, under its name. */
export function sceneHint(id: SceneId, day: string | null): string {
  if (id === "halloween") {
    const phase = hollowPhase(day);
    if (phase === "unlocking") return t("hollow.daily");
    if (phase === "countdown") {
      const days = daysLeft(day!);
      return days === 1 ? t("hollow.lastDay") : t("hollow.closesIn", { days });
    }
  }
  return t(`scene.${id}.hint` as UiKey);
}

/** Whether a Scene is only on offer for a while, for a badge in the menus. */
export function isLimited(id: SceneId): boolean {
  return id === "halloween";
}

/**
 * A short day, "Tue 27", in the language on screen: the weekday alone would
 * not tell this Tuesday from next.
 */
export function shortDay(day: string, locale: string): string {
  const [y, m, d] = day.split("-").map(Number);
  // Weekday first in every language; Intl alone puts English's day first.
  const weekday = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, d)));
  return `${weekday} ${d}`;
}
