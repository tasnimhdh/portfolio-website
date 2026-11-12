const PATHS = [
  "M2 28 C18 26 24 12 40 16 C56 20 62 8 80 12 C98 16 104 22 118 10",
  "M2 22 C16 24 28 8 46 14 C64 20 72 28 90 16 C104 8 112 18 118 12",
  "M2 16 C20 18 28 30 46 22 C66 12 78 8 96 18 C108 24 112 14 118 8",
  "M2 26 C14 20 30 10 48 18 C68 28 80 14 98 12 C108 11 114 20 118 16",
];

export default function Sparkline({ index = 0 }) {
  return (
    <svg className="sparkline" viewBox="0 0 120 36" aria-hidden="true">
      <path d={PATHS[index % PATHS.length]} />
    </svg>
  );
}
