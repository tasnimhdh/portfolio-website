const COLS = 8;
const ROWS = 5;

function buildNodes() {
  const nodes = [];
  for (let y = 0; y < ROWS; y += 1) {
    for (let x = 0; x < COLS; x += 1) {
      nodes.push({
        x: 40 + x * 104,
        y: 28 + y * 90,
        lit: (x * 3 + y) % 5 === 0,
        extra: (x + y) % 2 === 1,
      });
    }
  }
  return nodes;
}

const NODES = buildNodes();

function hLines() {
  const lines = [];
  for (let y = 0; y < ROWS; y += 1) {
    for (let x = 0; x < COLS - 1; x += 1) {
      const a = NODES[y * COLS + x];
      const b = NODES[y * COLS + x + 1];
      lines.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, key: `h-${x}-${y}` });
    }
  }
  return lines;
}

function vLines() {
  const lines = [];
  for (let x = 0; x < COLS; x += 1) {
    for (let y = 0; y < ROWS - 1; y += 1) {
      const a = NODES[y * COLS + x];
      const b = NODES[(y + 1) * COLS + x];
      lines.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, key: `v-${x}-${y}` });
    }
  }
  return lines;
}

const FLOWS = [
  "40,28 248,28 248,208 560,208 560,388",
  "768,28 560,28 560,118 352,118 352,298 144,298",
  "144,28 144,208 352,208 352,388",
];

export default function HeroCircuit({ glowRef }) {
  return (
    <svg className="hero-circuit" viewBox="0 0 820 430" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <filter id="circuit-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g className="circuit-shift">
        {hLines().map((line) => (
          <line key={line.key} className="circuit-line" x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} />
        ))}
        {vLines().map((line) => (
          <line key={line.key} className="circuit-line" x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} />
        ))}
        {FLOWS.map((points) => (
          <polyline key={points} className="circuit-flow" points={points} />
        ))}
        {NODES.map((node) => (
          <circle
            key={`${node.x}-${node.y}`}
            className={`circuit-node${node.lit ? " is-lit" : ""}${node.extra ? " is-extra" : ""}`}
            cx={node.x}
            cy={node.y}
            r={node.lit ? 3.4 : 2.2}
          />
        ))}
      </g>
      <circle ref={glowRef} className="circuit-cursor" cx="520" cy="180" r="110" />
    </svg>
  );
}
