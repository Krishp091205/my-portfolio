"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import Lenis from "lenis";

type ScrollApi = {
  scrollTo: (target: number | string) => void;
  stop: () => void;
  start: () => void;
};

const ScrollContext = createContext<ScrollApi>({
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export function useSmoothScroll() {
  return useContext(ScrollContext);
}

const scrollApi: ScrollApi = { scrollTo: () => {}, stop: () => {}, start: () => {} };

// expo-out — starts fast, decelerates to a near-invisible stop
const expoOut = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: expoOut,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 0.9,
    });

    scrollApi.scrollTo = (target) => {
      lenis.scrollTo(target, {
        offset: -76,
        duration: 1.4,
        easing: expoOut,
      });
    };
    scrollApi.stop = () => lenis.stop();
    scrollApi.start = () => lenis.start();

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