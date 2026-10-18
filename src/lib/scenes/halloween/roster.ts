/**
 * The Pumpkin Hollow Roster: every Creature that can appear in this Scene,
 * once the calendar has unlocked it (`halloween/calendar.ts`).
 *
 * A hillside pumpkin patch on Halloween eve. It opens with seven real animals
 * people link with Halloween, then a Newcomer every school day, each a little
 * more exciting than the last: magical critters in the first week, the big
 * friendly monsters in the second, and the giant Jack O. Lantern on the last
 * school day before Halloween. Spooky-cute, never scary.
 *
 * Slugs match the SVG filenames in `./creatures/`, and are unique across every
 * Scene, since names and facts are filed by slug. `width` is against a
 * 1920px-wide Scene. Ground animals walk the savanna's band among the
 * pumpkins, as in the forest, and the bat and the owl fly over the patch.
 */

import type { CreatureDef } from "$lib/scenes/types";

export const HALLOWEEN_ROSTER: CreatureDef[] = [
  // Common: the opening seven, and Monday's little ghost.
  {
    slug: "harvest-mouse",
    tier: "common",
    width: 30,
    motion: "trot",
    parts: ["part-tail", "part-ears"],
  },
  {
    slug: "garden-spider",
    tier: "common",
    width: 36,
    motion: "scuttle",
    parts: ["part-body"],
  },
  { slug: "toad", tier: "common", width: 38, motion: "hop", parts: [] },
  {
    slug: "brown-bat",
    tier: "common",
    width: 56,
    motion: "soar",
    parts: ["part-wings"],
  },
  {
    slug: "crow",
    tier: "common",
    width: 46,
    motion: "hop",
    parts: ["part-tail", "part-head"],
  },
  {
    slug: "barn-owl",
    tier: "common",
    width: 58,
    motion: "soar",
    parts: ["part-wings"],
  },
  {
    slug: "black-cat",
    tier: "common",
    width: 62,
    motion: "trot",
    parts: ["part-tail", "part-ears"],
  },
  {
    slug: "little-ghost",
    tier: "common",
    width: 54,
    motion: "hover",
    departure: "fade",
    parts: ["part-body"],
  },

  // Uncommon: the first week's magic, and Monday's vampire.
  {
    slug: "peekaboo-moon",
    tier: "uncommon",
    width: 70,
    motion: "drift",
    departure: "fade",
    parts: ["part-body"],
  },
  {
    slug: "gourdling",
    tier: "uncommon",
    width: 74,
    motion: "trot",
    parts: ["part-head", "part-ears", "part-tail"],
  },
  {
    slug: "scarecrow",
    tier: "uncommon",
    width: 110,
    motion: "graze",
    parts: ["part-arms", "part-head"],
  },
  {
    slug: "mummy",
    tier: "uncommon",
    width: 92,
    motion: "creep",
    parts: ["part-arms", "part-tail"],
  },
  {
    slug: "vampire",
    tier: "uncommon",
    width: 80,
    motion: "trot",
    parts: ["part-wings"],
  },

  // Rare: the big ones, one each per Session at most.
  {
    slug: "gargoyle",
    tier: "rare",
    width: 130,
    // Long stops between short walks: it holds still like a statue.
    motion: "graze",
    parts: ["part-tail", "part-wings"],
  },
  {
    slug: "werewolf",
    tier: "rare",
    width: 140,
    motion: "graze",
    parts: ["part-head", "part-ears", "part-tail"],
  },
  {
    slug: "great-boo",
    tier: "rare",
    width: 240,
    motion: "glide",
    departure: "fade",
    parts: ["part-body", "part-arms"],
  },
  {
    slug: "jack-o-lantern",
    tier: "rare",
    width: 360,
    motion: "stride",
    departure: "fade",
    parts: ["part-head", "part-arms", "part-pulse"],
  },
];
