"use client";

import Image from "next/image";
import { useState } from "react";
import { brandLabel } from "@/data/profile";
import BrowserFrame from "@/components/svg/BrowserFrame";
import PhoneFrame from "@/components/svg/PhoneFrame";

export default function ShotStage({ shots, onOpen }) {
  const [index, setIndex] = useState(0);
  const shot = shots[index];
  const label = brandLabel(shot);

  return (
    <div className="flex flex-col gap-3">
      {shots.length > 1 ? (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Choose store screenshot">
          {shots.map((item, itemIndex) => (
            <button
              key={item.id}
              type="button"
              className={`rounded-md border px-2.5 py-1 text-xs ${
                itemIndex === index ? "border-accent text-ink" : "border-line text-muted"
              }`}
              aria-pressed={itemIndex === index}
              onClick={() => setIndex(itemIndex)}
            >
              {brandLabel(item)}
            </button>
          ))}
        </div>
      ) : null}

      <div className="shot-stage">
        <BrowserFrame domain={shot.domain}>
          <button type="button" className="shot-button" onClick={() => onOpen(shot, "desktop")}>
            <Image
              src={shot.desktop.src}
              alt={`${label} homepage`}
              fill
              sizes="(min-width: 1024px) 520px, 100vw"
              loading="lazy"
              className="object-cover object-top"
            />
          </button>
        </BrowserFrame>
        <PhoneFrame>
          <button type="button" className="shot-button" onClick={() => onOpen(shot, "mobile")}>
            <Image
              src={shot.mobile.src}
              alt={`${label} homepage on a phone`}
              fill
              sizes="140px"
              loading="lazy"
              className="object-cover object-top"
            />
          </button>
        </PhoneFrame>
      </div>
    </div>
  );
}
