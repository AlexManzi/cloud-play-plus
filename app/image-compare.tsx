"use client";

import Image from "next/image";
import { PointerEvent, useRef, useState } from "react";

import styles from "./page.module.css";

const comparePresets = [
  {
    id: "1",
    filterOnSrc: "/filterOn.png",
    filterOffSrc: "/filterOff.png",
    filterOnAlt: "Cloud gaming stream with sharpening filter applied",
    filterOffAlt: "Cloud gaming stream without sharpening filter applied",
  },
  {
    id: "2",
    filterOnSrc: "/filterOnBF2.webp",
    filterOffSrc: "/filterOffBF2.webp",
    filterOnAlt: "Battlefield stream with sharpening filter applied",
    filterOffAlt: "Battlefield stream without sharpening filter applied",
  },
  {
    id: "3",
    filterOnSrc: "/filterOnForza.webp",
    filterOffSrc: "/filterOffForza.webp",
    filterOnAlt: "Racing game stream with sharpening filter applied",
    filterOffAlt: "Racing game stream without sharpening filter applied",
  },
] as const;

export function ImageCompare() {
  const [position, setPosition] = useState(58);
  const [activePresetId, setActivePresetId] = useState("1");
  const frameRef = useRef<HTMLDivElement>(null);
  const activePreset =
    comparePresets.find((preset) => preset.id === activePresetId) ??
    comparePresets[0];

  function updateFromPointer(clientX: number) {
    const frame = frameRef.current;
    if (!frame) {
      return;
    }

    const bounds = frame.getBoundingClientRect();
    const nextPosition = ((clientX - bounds.left) / bounds.width) * 100;
    setPosition(Math.min(100, Math.max(0, nextPosition)));
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromPointer(event.clientX);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if ((event.buttons & 1) !== 1) {
      return;
    }

    updateFromPointer(event.clientX);
  }

  return (
    <div className={styles.compareWrap}>
      <div
        ref={frameRef}
        className={styles.compareFrame}
        style={{ "--compare-position": `${position}%` } as React.CSSProperties}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      >
        <div className={styles.compareBase}>
          <Image
            src={activePreset.filterOnSrc}
            alt={activePreset.filterOnAlt}
            fill
            sizes="(max-width: 920px) 100vw, 1120px"
            className={styles.compareImage}
          />
          <span className={`${styles.compareBadge} ${styles.compareBadgeRight}`}>
            Filter On
          </span>
        </div>

        <div className={styles.compareOverlay}>
          <Image
            src={activePreset.filterOffSrc}
            alt={activePreset.filterOffAlt}
            fill
            sizes="(max-width: 920px) 100vw, 1120px"
            className={styles.compareImage}
          />
          <span className={`${styles.compareBadge} ${styles.compareBadgeLeft}`}>
            Filter Off
          </span>
        </div>

        <div className={styles.compareDivider} aria-hidden="true">
          <span className={styles.compareHandle} />
        </div>

        <div className={styles.compareHotspot} aria-hidden="true" />
      </div>

      <div
        className={styles.comparePresetControls}
        aria-label="Choose a compare image"
        role="group"
      >
        {comparePresets.map((preset) => (
          <button
            key={preset.id}
            type="button"
            className={styles.comparePresetButton}
            data-active={preset.id === activePresetId}
            onClick={() => setActivePresetId(preset.id)}
            aria-pressed={preset.id === activePresetId}
          >
            {preset.id}
          </button>
        ))}
      </div>
    </div>
  );
}
