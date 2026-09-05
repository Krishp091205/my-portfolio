"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import Lenis from "lenis";

type ScrollApi = {
  scrollTo: (target: number | string) => void;
};

const ScrollContext = createContext<ScrollApi>({ scrollTo: () => {} });

export function useSmoothScroll() {
  return useContext(ScrollContext);
}

const scrollApi: ScrollApi = { scrollTo: () => {} };

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
    });

    scrollApi.scrollTo = (target) => {
      lenis.scrollTo(target, { offset: -76, duration: 1.2 });
    };

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return <ScrollContext.Provider value={scrollApi}>{children}</ScrollContext.Provider>;
}