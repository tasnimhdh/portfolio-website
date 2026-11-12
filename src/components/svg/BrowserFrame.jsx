export default function BrowserFrame({ domain, children }) {
  return (
    <div className="browser-frame">
      <svg className="browser-chrome" viewBox="0 0 640 40" preserveAspectRatio="none" aria-hidden="true">
        <rect width="640" height="40" fill="#141416" />
        <circle cx="22" cy="20" r="5" fill="#f07178" />
        <circle cx="40" cy="20" r="5" fill="#e6c07b" />
        <circle cx="58" cy="20" r="5" fill="#7fd99a" />
        <rect x="168" y="10" width="304" height="20" rx="6" fill="#0c0c0e" stroke="#27272a" />
        <text x="320" y="24" textAnchor="middle" fill="#a1a1aa" fontSize="11" fontFamily="ui-monospace, monospace">
          {domain}
        </text>
      </svg>
      <div className="browser-screen">{children}</div>
    </div>
  );
}
