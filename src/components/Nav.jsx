"use client";

import { useEffect, useRef, useState } from "react";
import { navItems, profile } from "@/data/profile";
import { scrollToId } from "@/lib/scroll";
import Icon from "@/components/svg/Icon";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const buttonRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const closeMenu = () => setOpen(false);
    window.addEventListener("command-palette:open", closeMenu);
    return () => window.removeEventListener("command-palette:open", closeMenu);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    panelRef.current?.querySelector("a")?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (event, id) => {
    event.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5">
        <a href="#top" className="shrink-0 text-sm font-semibold text-ink no-underline" onClick={(event) => go(event, "top")}>
          {profile.name}
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`group inline-flex items-center gap-1.5 text-sm no-underline ${
                activeId === item.id ? "font-medium text-ink" : "text-muted hover:text-ink"
              }`}
              aria-current={activeId === item.id ? "true" : undefined}
              onClick={(event) => go(event, item.id)}
            >
              <Icon name={item.icon} className="h-3.5 w-3.5 text-accent" />
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="group hidden h-10 items-center gap-2 rounded-md border border-line px-3 text-xs text-muted hover:text-ink lg:inline-flex"
            onClick={() => window.dispatchEvent(new CustomEvent("command-palette:open"))}
          >
            <Icon name="command" className="h-3.5 w-3.5" />
            Search
            <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">Ctrl K</kbd>
          </button>
          <a
            href="#contact"
            className="btn-primary group inline-flex h-10 items-center gap-1.5 rounded-md px-3 text-sm font-semibold no-underline"
            onClick={(event) => go(event, "contact")}
          >
            Contact
            <Icon name="arrow" className="h-3.5 w-3.5" />
          </a>
          <button
            ref={buttonRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-menu" ref={panelRef} className="border-t border-line lg:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-5 py-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="group flex items-center gap-2 py-3 text-base text-ink no-underline"
                  aria-current={activeId === item.id ? "true" : undefined}
                  onClick={(event) => go(event, item.id)}
                >
                  <Icon name={item.icon} className="h-4 w-4 text-accent" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
