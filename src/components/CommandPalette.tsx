"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { brandLabel, brands, navItems, profile } from "@/data/profile";
import { copyText, scrollToId } from "@/lib/scroll";

function buildItems() {
  return [
    ...navItems.map((item) => ({
      id: item.id,
      label: item.label,
      group: "Go to",
      run: () => scrollToId(item.id),
    })),
    { id: "brands", label: "Brands", group: "Go to", run: () => scrollToId("brands") },
    { id: "copy-email", label: "Copy email", group: "Actions", run: () => copyText(profile.email) },
    ...profile.socials
      .filter((social) => !social.placeholder)
      .map((social) => ({ id: social.label, label: social.label, group: "Links", href: social.href })),
    ...brands.map((brand) => ({
      id: brand.id,
      label: brandLabel(brand),
      group: "Live sites",
      href: brand.url,
    })),
  ];
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<any>(null);
  const dialogRef = useRef<any>(null);
  const previousRef = useRef<any>(null);
  const openRef = useRef(false);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    const all = buildItems();
    if (!q) return all;
    return all.filter((item) => `${item.label} ${item.group}`.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    const onKey = (event: any) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (openRef.current) {
          setOpen(false);
          return;
        }
        setQuery("");
        setActive(0);
        setOpen(true);
      }
    };
    const onOpen = () => {
      setQuery("");
      setActive(0);
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("command-palette:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("command-palette:open", onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    previousRef.current = document.activeElement;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 20);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      if (previousRef.current instanceof HTMLElement) previousRef.current.focus();
    };
  }, [open]);

  if (!open) return null;

  const close = () => setOpen(false);

  const activate = (item: any) => {
    if (!item) return;
    if (item.href) window.open(item.href, "_blank", "noopener,noreferrer");
    else item.run?.();
    close();
  };

  const onKeyDown = (event: any) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => (items.length ? (index + 1) % items.length : 0));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => (items.length ? (index - 1 + items.length) % items.length : 0));
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      activate(items[active]);
    }
  };

  return (
    <div className="lightbox-backdrop" onClick={close}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="palette"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <input
          ref={inputRef}
          className="field-input"
          role="combobox"
          aria-expanded="true"
          aria-controls="command-list"
          aria-activedescendant={items[active] ? `command-${items[active].id}` : undefined}
          placeholder="Jump to a section or open a brand"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
          }}
        />
        <ul id="command-list" role="listbox" className="mt-3 max-h-80 overflow-auto">
          {items.map((item, index) => (
            <li key={item.id}>
              <button
                id={`command-${item.id}`}
                type="button"
                role="option"
                aria-selected={index === active}
                className={`flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm ${
                  index === active ? "bg-white/5 text-ink" : "text-muted"
                }`}
                onMouseEnter={() => setActive(index)}
                onClick={() => activate(item)}
              >
                <span>{item.label}</span>
                <span className="text-xs text-muted">{item.group}</span>
              </button>
            </li>
          ))}
          {items.length === 0 ? <li className="px-3 py-3 text-sm text-muted">No matches</li> : null}
        </ul>
      </div>
    </div>
  );
}
