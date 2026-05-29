"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const PRELOAD_IMAGES = [
  "/assets/decor/up-left.png",
  "/assets/decor/up-right.png",
  "/assets/decor/down-left.png",
  "/assets/decor/down-right.png",
  "/assets/decor/hand-tile.png",
  "/assets/decor/header-temple.svg",
  "/assets/decor/header-kiln.svg",
] as const;

const FADE_MS = 700;

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

function waitForPaint(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

function TileSpinner() {
  return (
    <div
      className="flex flex-col items-center gap-3"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <Image
        src="/assets/tiles/terracotta-dot.svg"
        alt=""
        width={64}
        height={64}
        className="size-16 animate-kiln-spin rounded-sm border-2 border-kiln-ink motion-reduce:animate-none"
        priority
        unoptimized
      />
    </div>
  );
}

export function InitialLoader({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [loaderGone, setLoaderGone] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const prepare = async () => {
      await document.fonts.ready;
      await Promise.all(PRELOAD_IMAGES.map(preloadImage));
      await waitForPaint();
      if (!cancelled) setReady(true);
    };

    void prepare();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = loaderGone ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loaderGone]);

  const onLoaderTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName !== "opacity" || !ready || loaderGone) return;
    setLoaderGone(true);
  };

  return (
    <>
      {!loaderGone && (
        <div
          className={`fixed inset-0 z-[200] flex items-center justify-center bg-kiln-page transition-opacity ease-in-out motion-reduce:transition-none ${
            ready ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          style={{ transitionDuration: `${FADE_MS}ms` }}
          onTransitionEnd={onLoaderTransitionEnd}
        >
          <TileSpinner />
        </div>
      )}

      <div
        className={`min-h-dvh transition-opacity ease-out motion-reduce:transition-none ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDuration: `${FADE_MS}ms` }}
        aria-hidden={!ready}
      >
        {children}
      </div>
    </>
  );
}
