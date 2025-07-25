import Soundfont from "soundfont-player";

let audioCtx: AudioContext | null = null;
let instrument: any = null;
let activeNotes: any[] = []; // pour stocker les notes jouées

export async function playScale(notes: string[]) {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }

  if (!instrument) {
    instrument = await Soundfont.instrument(audioCtx, "acoustic_guitar_nylon");
  }

  // --- Construction de la gamme ---
  const tonic = notes[0];
  const baseOctave = 4;
  const noteOrder = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

  const notes4 = notes.map(note => {
    const tonicIndex = noteOrder.indexOf(tonic);
    const noteIndex = noteOrder.indexOf(note);
    const octave = noteIndex < tonicIndex ? baseOctave + 1 : baseOctave;
    return `${note}${octave}`;
  });

  const notes5 = notes4.map(n => {
    const note = n.slice(0, -1);
    const octave = parseInt(n.slice(-1)) + 1;
    return `${note}${octave}`;
  });

  const notesUp = [`${tonic}${parseInt(notes5[0].slice(-1)) + 1}`];

  const up = [...notes4, ...notes5, ...notesUp];
  const down = [...notes5.reverse(), ...notes4.reverse()];
  const scale = [...up, ...down];

  // --- Lecture avec délais + sauvegarde des notes ---
  let delay = 0;
  activeNotes = []; // reset

  scale.forEach(note => {
    const when = audioCtx!.currentTime + delay;
    const node = instrument.play(note, when, { duration: 0.45 });
    activeNotes.push(node);
    delay += 0.5;
  });
}

export function stopScale() {
  if (activeNotes.length > 0) {
    activeNotes.forEach(node => node.stop());
    activeNotes = [];
  }
}
