<script lang="ts">
  /**
   * Scenery that is alive but is not a Creature, in Pumpkin Hollow: the
   * harvest moon and its glow, which breathes slowly, and the pumpkin patch's
   * pumpkins, jack-o'-lanterns, corn bundles and hay bales. Present from the
   * first second of every Session, never earned, never counted. Mist, falling
   * leaves and the far geese are ticket 06 in `.scratch/halloween/issues/`.
   *
   * The moon is its own piece rather than part of the backdrop because the
   * backdrop stretches with the screen, and a moon must stay round. Both
   * pieces are centred 78% across the landscape and 20% down, behind every
   * Creature, so the Great Boo loops in front of it.
   *
   * The artwork is `src/lib/scenes/halloween/ambient/`; the scatter below is
   * what places it. Positions are fixed rather than random, so the Scene
   * looks the same each time a teacher opens it.
   */

  import { AMBIENT_ART } from "$lib/scenes/halloween/artwork";
  import { groundLayer } from "$lib/scenes/motion";

  /**
   * Everything sitting in the patch. `x` is the piece's centre across the
   * landscape and `base` its distance from the bottom of the Scene, both in
   * %. The patch runs from in front of the trees' feet (base 29) to the
   * bottom; beyond it is open meadow, where nothing sits, and the giant
   * strides along the back of that (base 36 to 40). Ground animals walk the
   * whole depth, from 62% of the way down (base 38) to 97% (base 3). `width` is in px
   * against a 1920px-wide Scene at the middle of the patch: pieces scale with
   * depth exactly as the animals do (`Creature.svelte`), so a pumpkin is
   * always pumpkin-sized next to a cat. Each is layered by where it meets the
   * ground, so an animal walking the patch passes in front of some and behind
   * the rest.
   */
  const patch = [
    // Along the back row of the patch.
    { x: 24, base: 25.5, width: 80, art: "pumpkin-cluster" },
    { x: 41, base: 24.5, width: 48, art: "pumpkin-round" },
    { x: 58, base: 26, width: 44, art: "jack-o-lantern-2" },
    { x: 76, base: 25, width: 40, art: "corn-bundle" },
    { x: 91, base: 25.5, width: 56, art: "pumpkin-squat" },
    // In the straw and along the middle row.
    { x: 7, base: 20.5, width: 54, art: "pumpkin-warty" },
    { x: 66, base: 20, width: 80, art: "hay-bale" },
    { x: 15, base: 16.5, width: 54, art: "jack-o-lantern" },
    { x: 34, base: 15.5, width: 50, art: "pumpkin-striped" },
    { x: 52, base: 17, width: 56, art: "pumpkin-round" },
    { x: 84, base: 16, width: 100, art: "pumpkin-cluster" },
    // The front of the patch, nearest the room.
    { x: 2, base: 3, width: 100, art: "hay-bale" },
    { x: 27, base: 6, width: 52, art: "pumpkin-tall" },
    { x: 45, base: 4, width: 62, art: "jack-o-lantern" },
    { x: 64, base: 7, width: 58, art: "pumpkin-warty" },
    { x: 80, base: 4, width: 60, art: "jack-o-lantern-2" },
    { x: 95, base: 6.5, width: 64, art: "pumpkin-round" },
  ].map((piece, index) => {
    const ground = 1 - piece.base / 100;
    const depth = Math.min(1.15, Math.max(0, (ground - 0.62) / 0.35));
    return {
      ...piece,
      key: `${piece.art}:${index}`,
      size: (piece.width / 19.2) * (0.7 + depth * 0.7),
      layer: groundLayer(ground),
      lantern: piece.art.startsWith("jack-o-lantern"),
      corn: piece.art === "corn-bundle",
      // Out of step with each other, so no two flicker or sway together.
      beat: 4.2 + ((index * 7) % 13) / 5,
      delay: -((index * 1.3) % 5),
    };
  });
</script>

<div
  class="halloween-moon-glow pointer-events-none absolute"
  style="left:calc(var(--world-left) + 78 * var(--wu)); top:20%; width:calc(35.42 * var(--wu));"
>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html AMBIENT_ART["moon-glow"]}
</div>
<div
  class="halloween-moon pointer-events-none absolute"
  style="left:calc(var(--world-left) + 78 * var(--wu)); top:20%; width:calc(14.79 * var(--wu));"
>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html AMBIENT_ART.moon}
</div>

<!-- The patch: pumpkins, jack-o'-lanterns, corn and hay. -->
{#each patch as piece (piece.key)}
  <div
    class="halloween-piece pointer-events-none absolute"
    class:halloween-corn={piece.corn}
    class:halloween-lantern={piece.lantern}
    style="left:calc(var(--world-left) + {piece.x} * var(--wu)); bottom:{piece.base}%; width:calc({piece.size} * var(--wu)); z-index:{piece.layer}; animation-duration:{piece.beat}s; animation-delay:{piece.delay}s; --halloween-beat:{piece.beat}s; --halloween-delay:{piece.delay}s;"
  >
    {#if piece.lantern}
      <!-- Its glow, drawn to the lantern's own scale round it. -->
      <div class="halloween-lantern-glow">
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html AMBIENT_ART["lantern-glow"]}
      </div>
    {/if}
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html AMBIENT_ART[piece.art]}
  </div>
{/each}
