const MOTION = {
  arrow: "icon-nudge",
  external: "icon-nudge",
  copy: "icon-nudge",
  send: "icon-nudge",
  recharge: "icon-spin",
  cli: "icon-nudge",
  menu: "icon-draw",
  close: "icon-draw",
};

function paths(name) {
  switch (name) {
    case "about":
      return (
        <>
          <circle cx="12" cy="8" r="3" />
          <path d="M5 19c1.2-3 3.4-4.5 7-4.5S17.8 16 19 19" />
        </>
      );
    case "projects":
      return (
        <>
          <rect x="4" y="4" width="7" height="7" rx="1.2" />
          <rect x="13" y="4" width="7" height="7" rx="1.2" />
          <rect x="4" y="13" width="7" height="7" rx="1.2" />
          <rect x="13" y="13" width="7" height="7" rx="1.2" />
        </>
      );
    case "skills":
    case "layout":
      return (
        <>
          <path d="M12 4l8 4-8 4-8-4 8-4z" />
          <path d="M4 12l8 4 8-4" />
          <path d="M4 16l8 4 8-4" />
        </>
      );
    case "experience":
      return (
        <>
          <path d="M12 6v12" />
          <circle cx="12" cy="6" r="2" />
          <circle cx="12" cy="18" r="2" />
          <path d="M12 10h5M12 14H7" />
        </>
      );
    case "contact":
      return (
        <>
          <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
          <path d="M4 7l8 6 8-6" />
        </>
      );
    case "arrow":
      return (
        <>
          <path d="M5 12h14" />
          <path d="M13 6l6 6-6 6" />
        </>
      );
    case "external":
      return (
        <>
          <path d="M14 5h5v5" />
          <path d="M19 5l-8 8" />
          <path d="M10 6H6.5A1.5 1.5 0 0 0 5 7.5v10A1.5 1.5 0 0 0 6.5 19h10a1.5 1.5 0 0 0 1.5-1.5V14" />
        </>
      );
    case "copy":
      return (
        <>
          <rect x="8" y="8" width="11" height="11" rx="1.5" />
          <path d="M6 16H5.5A1.5 1.5 0 0 1 4 14.5v-9A1.5 1.5 0 0 1 5.5 4h9A1.5 1.5 0 0 1 16 5.5V6" />
        </>
      );
    case "send":
      return <path d="M4 12l16-7-6 16-2.5-6.5L4 12z" />;
    case "menu":
      return (
        <>
          <path d="M4 8h16" />
          <path d="M4 16h16" />
        </>
      );
    case "close":
      return (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6L6 18" />
        </>
      );
    case "command":
      return (
        <>
          <circle cx="11" cy="11" r="6" />
          <path d="M15.5 15.5L20 20" />
        </>
      );
    case "code":
      return (
        <>
          <path d="M9 8L5 12l4 4" />
          <path d="M15 8l4 4-4 4" />
        </>
      );
    case "liquid":
      return <path d="M12 3s5.5 6 5.5 9.5a5.5 5.5 0 0 1-11 0C6.5 9 12 3 12 3z" />;
    case "javascript":
      return (
        <>
          <path d="M8 7.5c-2 0-3 1.2-3 2.4" />
          <path d="M8 16.5c-2 0-3-1.2-3-2.4" />
          <path d="M16 7.5c2 0 3 1.2 3 2.4" />
          <path d="M16 16.5c2 0 3-1.2 3-2.4" />
          <path d="M10 9.5v5M14 9.5v5" />
        </>
      );
    case "typescript":
      return (
        <>
          <path d="M8 8h8" />
          <path d="M12 8v9" />
          <path d="M8 17h4" />
          <rect x="4" y="4" width="16" height="16" rx="2" />
        </>
      );
    case "html":
      return (
        <>
          <path d="M8 8L4.5 12 8 16" />
          <path d="M16 8l3.5 4L16 16" />
          <path d="M13 6l-2 12" />
        </>
      );
    case "css":
      return (
        <>
          <path d="M7 8h7.5A3.5 3.5 0 0 1 14 15H9" />
          <path d="M9 12h5" />
        </>
      );
    case "shopify":
      return (
        <>
          <path d="M6 8h12l-1 11H7L6 8z" />
          <path d="M9 8V7a3 3 0 0 1 6 0v1" />
        </>
      );
    case "json":
      return (
        <>
          <path d="M9 6c-2 0-2.5 1.5-2.5 3S7 12 9 12s2.5 1.5 2.5 3S11 18 9 18" />
          <path d="M15 6c2 0 2.5 1.5 2.5 3S17 12 15 12s-2.5 1.5-2.5 3S13 18 15 18" />
        </>
      );
    case "schema":
      return (
        <>
          <path d="M4 8h16" />
          <path d="M4 16h16" />
          <circle cx="9" cy="8" r="2" />
          <circle cx="15" cy="16" r="2" />
        </>
      );
    case "react":
      return (
        <>
          <circle cx="12" cy="12" r="2" />
          <ellipse cx="12" cy="12" rx="8" ry="3.2" />
          <ellipse cx="12" cy="12" rx="8" ry="3.2" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="8" ry="3.2" transform="rotate(120 12 12)" />
        </>
      );
    case "next":
      return <path d="M6 6l12 6-12 6V6z" />;
    case "tailwind":
      return (
        <>
          <path d="M4 15c2-4 4-6 6-6 3 0 3 3 5 3 2 0 3.2-1.2 5-3-2 4-4 6-6 6-3 0-3-3-5-3-2 0-3.2 1.2-5 3z" />
        </>
      );
    case "cli":
      return (
        <>
          <rect x="3.5" y="5" width="17" height="14" rx="1.5" />
          <path d="M7 10l2.5 2L7 14" />
          <path d="M12 14h5" />
        </>
      );
    case "api":
      return (
        <>
          <circle cx="6" cy="12" r="2" />
          <circle cx="18" cy="7" r="2" />
          <circle cx="18" cy="17" r="2" />
          <path d="M8 12h6M14 12l2-4M14 12l2 4" />
        </>
      );
    case "loox":
      return <path d="M12 4.5l2.1 4.3 4.7.7-3.4 3.3.8 4.7L12 15.7 7.8 17.5l.8-4.7L5.2 9.5l4.7-.7L12 4.5z" />;
    case "recharge":
      return (
        <>
          <path d="M19 12a7 7 0 0 1-12 5" />
          <path d="M5 12a7 7 0 0 1 12-5" />
          <path d="M16 4h3v3" />
          <path d="M8 20H5v-3" />
        </>
      );
    case "upsell":
      return (
        <>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M12 8v8M8 12h8" />
        </>
      );
    case "pagefly":
      return (
        <>
          <rect x="4" y="5" width="16" height="5" rx="1" />
          <rect x="4" y="12" width="7" height="7" rx="1" />
          <rect x="13" y="12" width="7" height="7" rx="1" />
        </>
      );
    case "git":
      return (
        <>
          <circle cx="7" cy="6" r="2" />
          <circle cx="7" cy="18" r="2" />
          <circle cx="17" cy="12" r="2" />
          <path d="M7 8v8M9 12h6" />
        </>
      );
    case "github":
      return (
        <>
          <circle cx="12" cy="12" r="8" />
          <path d="M9 14.5c.6 1.2 1.7 2 3 2s2.4-.8 3-2" />
          <path d="M9.5 11h.01M14.5 11h.01" />
        </>
      );
    case "vercel":
      return <path d="M12 5l7 12H5l7-12z" />;
    case "lighthouse":
      return (
        <>
          <path d="M12 4v3" />
          <path d="M8 21h8" />
          <path d="M10 21V11h4v10" />
          <path d="M9 11l3-4 3 4" />
          <path d="M5 8l2 1M19 8l-2 1" />
        </>
      );
    case "spark":
    case "claude":
      return (
        <>
          <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
          <path d="M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3" />
        </>
      );
    case "codex":
      return (
        <>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M8 9l2 2-2 2" />
          <path d="M12 15h4" />
        </>
      );
    case "chatgpt":
      return (
        <>
          <path d="M6 16.5V8.5A3.5 3.5 0 0 1 9.5 5h5A3.5 3.5 0 0 1 18 8.5v4a3.5 3.5 0 0 1-3.5 3.5H9l-3 2.5z" />
        </>
      );
    case "cursor":
      return <path d="M6 4l5 16 2.2-6.2L19 11.5 6 4z" />;
    default:
      return <circle cx="12" cy="12" r="4" />;
  }
}

export default function Icon({ name, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`icon ${MOTION[name] || "icon-draw"} ${className}`}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths(name)}
    </svg>
  );
}
