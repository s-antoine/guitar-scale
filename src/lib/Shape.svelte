<script>
  const sides = 12;
  const radius = 100;
  const cx = 150;
  const cy = 150;
  const circleRadius = 7;
  export let notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  export let activeNotes = ["C", "D#", "F", "G", "A#"];

  let points = [];
  for (let i = 0; i < sides; i++) {
    const angle = (2 * Math.PI * i) / sides - Math.PI / 2;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    points.push({ x, y });
  }

  $:innerIndices = activeNotes.map(note => notes.indexOf(note)).filter(index => index !== -1);
  $:innerPoints = innerIndices.map(i => points[i]);
  $:innerPointsString = innerPoints.map(p => `${p.x},${p.y}`).join(' ');
  $:outerPointsString = points.map(p => `${p.x},${p.y}`).join(' ');
</script>

<svg viewBox="0 0 300 300">
  <polygon points={outerPointsString} fill="#EEEEEE" stroke="none" stroke-width="2" />
  <polygon points={innerPointsString} fill="#45858C" stroke="none" />

  <!-- Sommets -->
  <circle 
  cx={points[0].x} 
  cy={points[0].y} 
  r={circleRadius} 
  fill="#D92B04" />
</svg>
