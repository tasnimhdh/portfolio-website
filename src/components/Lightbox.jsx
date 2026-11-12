"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { brandLabel } from "@/data/profile";
import Icon from "@/components/svg/Icon";

export default function Lightbox({ shot, view = "desktop", onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!shot) return undefined;
    const previouslyFocused = document.activeElement;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !dialogRef.current) return;
      const items = [...dialogRef.current.querySelectorAll("a, button")];
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [shot, onClose]);

  if (!shot) return null;
  const label = brandLabel(shot);
  const images = view === "mobile" ? ["mobile", "desktop"] : ["desktop", "mobile"];

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lightbox-title"
        className="lightbox"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 id="lightbox-title" className="text-lg font-semibold text-ink">
              {label}
            </h3>
            <p className="text-sm text-muted">{shot.domain}</p>
          </div>
          <button ref={closeRef} type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line" aria-label="Close screenshot" onClick={onClose}>
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-4">
          {images.map((kind) => {
            const image = shot[kind];
            const alt = kind === "mobile" ? `${label} homepage on a phone` : `${label} homepage`;
            return (
              <Image
                key={kind}
                src={image.src}
                alt={alt}
                width={image.width}
                height={image.height}
                sizes="(min-width: 768px) 720px, 100vw"
                className="h-auto w-full rounded-md border border-line"
              />
            );
          })}
        </div>

        <a
          className="group mt-4 inline-flex h-11 items-center gap-2 text-sm font-semibold text-accent no-underline"
          href={shot.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit {shot.domain}
          <Icon name="external" className="h-4 w-4" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </div>
  );
}
