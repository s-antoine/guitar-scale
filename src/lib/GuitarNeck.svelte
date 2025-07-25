<script lang="ts">
  export let notes: string[][] = [
    ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E"],
    ["B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
    ["G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G"],
    ["D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D"],
    ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A"],
    ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E"]
  ];
  export let activeNotes: string[] = [
    "A", "C", "D", "E", "G"
  ];
  export let hasNut: boolean = true;
  export let displayNotes: boolean = true;
  export let displayAccidentals: boolean = false;
  export let neckSize: number = 12;

  const totalNeckSize = hasNut ? neckSize + 1 : neckSize;

  $: gridStyle = `grid-template-columns: repeat(${totalNeckSize}, 1.2fr);`;
  const rows = 6;
  const total = totalNeckSize * rows;

  const getCellStyle = (i: number) => {
    let style = "";

    // Première colonne → pas de bordure
    if (hasNut && i % totalNeckSize === 0) {
      style += "border-color: #FFF; border-width: 0px;";
    }

    // Sillet → bordure gauche plus épaisse
    if (hasNut &&  i % totalNeckSize === 1) {
      style += "border-left: solid black 4px;";
    }

    // Dernière ligne → pas de bordure + bordure haut
    if (i >= total - (neckSize)) {
      style += "border: 0px; border-top: solid black 1px;";
    }

    return style;
  };
</script>

<main>
  <div class="guitar" style={gridStyle}>
    {#each Array(totalNeckSize * 6) as _, i}
      <div class="cell" style={getCellStyle(i)}>
        <div class={`note ${activeNotes.includes(notes[Math.floor(i / totalNeckSize)][i % totalNeckSize]) ? 'active' : ''} ${activeNotes.indexOf(notes[Math.floor(i / totalNeckSize)][i % totalNeckSize]) === 0 ? 'tonic' : ''}`}>
            {#if displayNotes && (displayAccidentals || !notes[Math.floor(i / totalNeckSize)][i % totalNeckSize].includes("#"))}
              {notes[Math.floor(i / totalNeckSize)][i % totalNeckSize]}
            {/if}
        </div>
      </div>
    {/each}
  </div>
</main>

<style lang="scss">
  .guitar {
    margin-top: calc(250px / 5);
    height: 250px;
    display: grid;
    grid-template-rows: repeat(6, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }

  .guitar .cell {
    //   &:nth-child(13n - 12) { border-color: #FFF; border-width: 0px; }
    //   &:nth-child(13n - 11) { border-left: solid black 4px; }
    //   &:nth-last-child(-n + 12) { border: 0px; border-top: solid black 1px; }

    position: relative;
    border: solid black;
    border-width: 1px 2px;
    background-color: white;
    width: 100%;
    height: 100%;

    .note {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1.2em;
      font-weight: bold;
      height: 1.5em;
      width: 1.5em;
      border-radius: 50%;
      
      &.active {
        color: rgba(255, 255, 255, 0.8);
        background-color: #45858c;
      }

      &.tonic {
        background-color: #D92B04;
      }
    }
  }
</style>
