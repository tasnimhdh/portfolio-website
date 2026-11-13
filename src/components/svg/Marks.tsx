export function CheckMark() {
  return (
    <svg className="check-draw" viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="18" />
      <path d="M15 25l6 6 12-14" />
    </svg>
  );
}

export function NodeMark() {
  return (
    <svg className="timeline-node" viewBox="0 0 16 16" aria-hidden="true">
      <circle className="node-ring" cx="8" cy="8" r="6" />
      <circle className="node-core" cx="8" cy="8" r="3" />
    </svg>
  );
}
