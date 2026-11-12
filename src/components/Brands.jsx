"use client";

import Image from "next/image";
import { useState } from "react";
import { brandLabel, brands } from "@/data/profile";
import Lightbox from "@/components/Lightbox";
import SectionHeading from "@/components/SectionHeading";
import Icon from "@/components/svg/Icon";

export default function Brands() {
  const [open, setOpen] = useState(null);

  return (
    <section id="brands" className="scroll-mt-20 border-t border-line py-20 lg:py-28" tabIndex={-1} aria-labelledby="brands-title">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow="Stores" title="Brands I've built for" id="brands-title">
          Homepages captured from the live sites. Hover a frame to move through the shot, or open it.
        </SectionHeading>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => {
            const label = brandLabel(brand);
            return (
              <li key={brand.id} className="spotlight group rounded-lg border border-line bg-surface p-3">
                <button type="button" className="gallery-device" onClick={() => setOpen({ shot: brand, view: "desktop" })}>
                  <svg className="gallery-chrome" viewBox="0 0 320 28" preserveAspectRatio="none" aria-hidden="true">
                    <rect width="320" height="28" fill="#141416" />
                    <circle cx="14" cy="14" r="3.5" fill="#f07178" />
                    <circle cx="26" cy="14" r="3.5" fill="#e6c07b" />
                    <circle cx="38" cy="14" r="3.5" fill="#7fd99a" />
                  </svg>
                  <span className="gallery-screen">
                    <Image
                      src={brand.desktop.src}
                      alt={`${label} homepage`}
                      width={brand.desktop.width}
                      height={brand.desktop.height}
                      sizes="(min-width: 1024px) 340px, 100vw"
                      loading="lazy"
                      className="gallery-shot"
                    />
                  </span>
                </button>
                <div className="mt-3 flex items-start justify-between gap-3 px-1 pb-1">
                  <div>
                    <p className="text-sm font-semibold text-ink">{label}</p>
                    <p className="text-xs text-muted">{brand.domain}</p>
                  </div>
                  <a href={brand.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 text-xs font-medium text-accent no-underline">
                    Live site
                    <Icon name="external" className="h-3.5 w-3.5" />
                    <span className="sr-only"> for {label} (opens in a new tab)</span>
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <Lightbox shot={open?.shot} view={open?.view} onClose={() => setOpen(null)} />
    </section>
  );
}
