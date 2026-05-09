"use client";

import Image from "next/image";
import { PointerEvent, useRef, useState } from "react";

import styles from "./page.module.css";

export function ImageCompare() {
  const [position, setPosition] = useState(58);
  const frameRef = useRef<HTMLDivElement>(null);

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
            src="/filterOn.png"
            alt="Cloud gaming stream with sharpening filter applied"
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
            src="/filterOff.png"
            alt="Cloud gaming stream without sharpening filter applied"
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
    </div>
  );
}
