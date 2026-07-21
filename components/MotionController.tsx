"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = "[data-reveal]";

export default function MotionController() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactViewport = window.matchMedia("(max-width: 840px)");
    const registered = new WeakSet<Element>();
    let observer: IntersectionObserver | null = null;

    const shouldUseLiteMotion = () => reducedMotion.matches || compactViewport.matches;

    const applyMotionMode = () => {
      root.classList.toggle("lite-motion", shouldUseLiteMotion());
    };

    const show = (element: Element) => {
      element.classList.add("is-visible");
      observer?.unobserve(element);
    };

    const register = (element: Element) => {
      if (registered.has(element)) return;
      registered.add(element);

      // Hero elements are rendered visible on the server and never depend on JS.
      if (element.getAttribute("data-reveal") === "immediate") {
        show(element);
        return;
      }

      if (shouldUseLiteMotion() || !("IntersectionObserver" in window)) {
        show(element);
        return;
      }

      // Elements already inside the viewport should not wait for an observer tick.
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.96 && rect.bottom > 0) {
        requestAnimationFrame(() => show(element));
        return;
      }

      observer?.observe(element);
    };

    applyMotionMode();
    root.classList.add("motion-enabled");

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) show(entry.target);
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
      );
    }

    const scan = (scope: ParentNode = document) => {
      scope.querySelectorAll(REVEAL_SELECTOR).forEach(register);
      if (scope instanceof Element && scope.matches(REVEAL_SELECTOR)) register(scope);
    };

    // Two frames cover both the initial commit and streamed route content.
    const firstFrame = requestAnimationFrame(() => {
      scan();
      requestAnimationFrame(() => scan());
    });

    // App Router may insert cached/streamed nodes after the effect has run.
    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) scan(node);
        });
      }
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    const revealAll = () => {
      document.querySelectorAll(REVEAL_SELECTOR).forEach(show);
    };

    const onMotionPreferenceChange = () => {
      applyMotionMode();
      if (shouldUseLiteMotion()) revealAll();
      else scan();
    };

    reducedMotion.addEventListener("change", onMotionPreferenceChange);
    compactViewport.addEventListener("change", onMotionPreferenceChange);

    const onVisibilityChange = () => {
      root.classList.toggle("motion-paused", document.hidden);
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelAnimationFrame(firstFrame);
      observer?.disconnect();
      mutationObserver.disconnect();
      reducedMotion.removeEventListener("change", onMotionPreferenceChange);
      compactViewport.removeEventListener("change", onMotionPreferenceChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      root.classList.remove("motion-enabled");
    };
  }, []);

  return null;
}
