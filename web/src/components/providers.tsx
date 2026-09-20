"use client";

/**
 * Клиентская обвязка: гидратация стора (язык/тема) и плавная прокрутка Lenis.
 * Lenis выключается при prefers-reduced-motion — тогда работает нативный скролл.
 */
import { useEffect } from "react";
import Lenis from "lenis";
import { useApp } from "@/lib/store";

let lenis: Lenis | null = null;

export function lockScroll() {
  lenis?.stop();
  document.documentElement.classList.add("lenis-stopped");
}

export function unlockScroll() {
  lenis?.start();
  document.documentElement.classList.remove("lenis-stopped");
}

export function Providers({ children }: { children: React.ReactNode }) {
  const hydrate = useApp((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    let frame = 0;
    const raf = (time: number) => {
      lenis?.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return <>{children}</>;
}
