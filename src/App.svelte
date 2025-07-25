<script lang="ts">
  import GuitarNeck from "./lib/GuitarNeck.svelte";
  import Shape from "./lib/Shape.svelte";
  import { playScale, stopScale } from "./lib/Player";

  let key = "C"; // La tonalité de la gamme active
  const notes = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];

  let scaleNotes = [
    ["B", "C", "C#", "D", "D#"],
    ["F#", "G", "G#", "A", "A#"],
    ["D", "D#", "E", "F", "F#"],
    ["A", "A#", "B", "C", "C#"],
    ["E", "F", "F#", "G", "G#"],
    ["B", "C", "C#", "D", "D#"],
  ];

  let types = [
    {
      id: 0,
      name: "Occidental",
      active: true,
    },
    {
      id: 1,
      name: "Other",
      active: false,
    },
  ];

  let scales = [
    {
      name: "Major Pentatonic",
      type: 0,
      notes: ["C", "D", "E", "G", "A"],
      active: true,
      relativeScale: "Major Pentatonic",
    },
    {
      name: "Ionian (major)",
      type: 0,
      notes: ["C", "D", "E", "F", "G", "A", "B"],
      active: false,
      relativeScale: "Major Pentatonic",
    },
    {
      name: "Dorian",
      type: 0,
      notes: ["C", "D", "D#", "F", "G", "A", "A#"],
      active: false,
      relativeScale: "Major Pentatonic",
    },
    {
      name: "Phrygian",
      type: 0,
      notes: ["C", "C#", "D#", "F", "G", "G#", "A#"],
      active: false,
      relativeScale: "Major Pentatonic",
    },
    {
      name: "Lydian",
      type: 0,
      notes: ["C", "D", "E", "F#", "G", "A", "B"],
      active: false,
      relativeScale: "Major Pentatonic",
    },
    {
      name: "Mixolydian",
      type: 0,
      notes: ["C", "D", "E", "F", "G", "A", "A#"],
      active: false,
      relativeScale: "Major Pentatonic",
    },
    {
      name: "Aeolian (natural minor)",
      type: 0,
      notes: ["C", "D", "D#", "F", "G", "G#", "A#"],
      active: false,
      relativeScale: "Major Pentatonic",
    },
    {
      name: "Locrian",
      type: 0,
      notes: ["C", "C#", "D#", "F", "F#", "G#", "A#"],
      active: false,
      relativeScale: "Major Pentatonic",
    },
    {
      name: "Minor Pentatonic",
      type: 0,
      notes: ["C", "D#", "F", "G", "A#"],
      active: false,
      relativeScale: "Minor Pentatonic",
    },
    {
      name: "Harmonic Minor",
      type: 0,
      notes: ["C", "D", "D#", "F", "G", "G#", "B"],
      active: false,
      relativeScale: "Major Pentatonic",
    },
    {
      name: "Melodic Minor",
      type: 0,
      notes: ["C", "D", "D#", "F", "G", "A", "B"],
      active: false,
      relativeScale: "Major Pentatonic",
    },
    {
      name: "Blues Pentatonic",
      type: 0,
      notes: ["C", "D#", "F", "F#", "G", "A#"],
      active: false,
      relativeScale: "Major Pentatonic",
    },
    {
      name: "Neutral Pentatonic",
      type: 0,
      notes: ["C", "D", "F", "G", "A#"],
      active: false,
      relativeScale: "Major Pentatonic",
    },

    {
      name: "Chinese",
      type: 1,
      notes: ["C", "E", "F#", "G", "B"],
      active: false,
      relativeScale: "Major Pentatonic",
    },
    {
      name: "Arabic",
      type: 1,
      notes: ["C", "D", "D#", "F", "F#", "G#", "A", "B"],
      active: false,
      relativeScale: "Major Pentatonic",
    },
    {
      name: "Hawaiian",
      type: 1,
      notes: ["C", "D", "D#", "F", "G", "A", "B"],
      active: false,
      relativeScale: "Major Pentatonic",
    },
    {
      name: "Iwato",
      type: 1,
      notes: ["C", "C#", "F", "F#", "A#"],
      active: false,
      relativeScale: "Major Pentatonic",
    },
    {
      name: "Spanish Gypsy",
      type: 1,
      notes: ["C", "C#", "E", "F", "G", "G#", "A#"],
      active: false,
      relativeScale: "Major Pentatonic",
    },
    {
      name: "Japanese",
      type: 1,
      notes: ["C", "D", "F", "G", "G#"],
      active: false,
      relativeScale: "Major Pentatonic",
    },
  ];

  const transpose = (targetKey: string, notes: string[]) => {
    const noteIndex = [
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "F",
      "F#",
      "G",
      "G#",
      "A",
      "A#",
      "B",
    ].indexOf(targetKey);
    return notes.map((note) => {
      const currentIndex = [
        "C",
        "C#",
        "D",
        "D#",
        "E",
        "F",
        "F#",
        "G",
        "G#",
        "A",
        "A#",
        "B",
      ].indexOf(note);
      const transposedIndex = (currentIndex + noteIndex) % 12;
      return ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][
        transposedIndex
      ];
    });
  };

  const changeScale = (scaleName: string) => {
    scales = scales.map((scale) => ({
      ...scale,
      active: scale.name === scaleName,
    }));
  };

  const changeType = (typeName: string) => {
    types = types.map((type) => ({
      ...type,
      active: type.name === typeName,
    }));
  };

  $: activeType = types.find((type) => type.active);
  $: activeScale = scales.find((scale) => scale.active);
</script>

<main>
  <div class="scales" style="display: flex; gap: 10px; margin-bottom: 20px;">
    <select bind:value={key} style="padding: 5px; font-size: 16px;">
      {#each notes as note}
        <option value={note} selected={note === key}>{note}</option>
      {/each}
    </select>
    <div
      class="types"
      style="display: flex; justify-content: center; align-items: centerx; flex-wrap: wrap; gap: 10px;"
    >
      {#each types as type}
        <button
          onclick={() => changeType(type.name)}
          class={`type ${type.active ? "active" : ""}`}
        >
          {type.name}
        </button>
      {/each}
    </div>
  </div>

  <div class="carousel">
    {#each scales.filter((scale) => scale.type === activeType?.id) as scale}
      <button
        onclick={() => changeScale(scale.name)}
        class={`scale ${scale.active ? "active" : ""}`}
      >
        {scale.name}
      </button>
    {/each}
  </div>

  <div style="width: 100%">
    <div class="guitar-neck">
      <GuitarNeck activeNotes={transpose(key, activeScale?.notes || [])} />
    </div>
    <div
      style="display: flex; flex-wrap: wrap-reverse; width: 100%; justify-content: center;"
    >
      <div style="flex: 1; min-width: 300px; max-width: 600px; ">
        <GuitarNeck
          displayNotes={false}
          neckSize={5}
          hasNut={false}
          notes={scaleNotes}
          activeNotes={activeScale?.notes || []}
        />
      </div>

      <div style="width: 300px;">
        <Shape activeNotes={activeScale?.notes || []} />
      </div>
    </div>
    <div style="margin-top: 5px">
      <button
        onclick={() => playScale(transpose(key, activeScale?.notes || []))}
      >
        Play
      </button>
      <button onclick={() => stopScale()}> Stop </button>
    </div>
  </div>
</main>

<style>
  button.type.active {
    background-color: #bad1c0;
  }

  .carousel {
    display: flex;
    flex-wrap: wrap;
    /* pour un scroll fluide sur iOS */
    gap: 0.5rem; /* espace entre les boutons */
    padding: 1rem 0;
  }

  /* Media query pour les écrans plus petits */
  @media (max-width: 650px) {
    .carousel {
      flex-wrap: nowrap;
      overflow-x: auto;
      scrollbar-width: 0px;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
    }

    .guitar-neck {
      display: none;
    }
  }

  .scale {
    flex: 0 0 auto; /* empêche de rétrécir et s’étirer */
    scroll-snap-align: start;
    cursor: pointer;
    transition: background 0.2s;
  }

  .scale:hover {
    background: #ccc;
  }
</style>
