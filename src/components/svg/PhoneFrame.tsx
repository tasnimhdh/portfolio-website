export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="phone-frame">
      <svg className="phone-shell" viewBox="0 0 140 286" aria-hidden="true">
        <rect x="2" y="2" width="136" height="282" rx="22" fill="#111113" stroke="#3f3f46" strokeWidth="3" />
        <rect x="50" y="12" width="40" height="7" rx="3.5" fill="#27272a" />
      </svg>
      <div className="phone-screen">{children}</div>
    </div>
  );
}
