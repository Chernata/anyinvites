import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Component376Romantic from "@/imports/376Romantic-3/index";
import { MobileMenu } from "./components/mobile-menu";
import { CountdownOrbit } from "./components/countdown-orbit";
import { IntroOverlay } from "./components/intro-overlay";
// Renders the imported 376Romantic wedding design with scroll-triggered entrance animations.

// Top-level section data-names, in document order.
const SECTION_NAMES = [
  "Component 2",
  "Countdown",
  "Event details",
  "Our story",
  "RSVP",
  "Registry",
  "Event schedule",
  "Menu",
  "Guest book",
  "Photo",
  "Footer",
];

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerHeightRef = useRef(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [countdownHost, setCountdownHost] = useState<HTMLElement | null>(null);
  const [introDone, setIntroDone] = useState(false);

  const handleNavigate = (sectionDataName: string) => {
    setMenuOpen(false);
    const mainDiv = containerRef.current?.querySelector<HTMLElement>(
      '[data-name="376-romantic"]'
    );
    const target = mainDiv?.querySelector<HTMLElement>(
      `:scope > [data-name="${sectionDataName}"]`
    );
    if (target) {
      // Let the menu begin closing before scrolling; offset for the pinned header.
      setTimeout(() => {
        const top =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerHeightRef.current;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      }, 60);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mainDiv = container.querySelector<HTMLElement>('[data-name="376-romantic"]');
    if (!mainDiv) return;

    // Wire the hero hamburger icon (top-right) to open the mobile menu.
    const hero = mainDiv.querySelector<HTMLElement>('[data-name="Component 2"]');
    const burger = hero?.querySelector<HTMLElement>('[data-name="Menu"]');
    const burgerHit = (burger?.parentElement ?? burger) as HTMLElement | null;
    const openMenu = () => setMenuOpen(true);
    if (burgerHit) {
      burgerHit.style.cursor = "pointer";
      burgerHit.addEventListener("click", openMenu);
    }

    // Pin the hero header to the top of the viewport with the site's beige background.
    const header = hero?.querySelector<HTMLElement>('[data-name="Header"]');
    if (header) {
      header.style.position = "fixed";
      header.style.top = "0";
      header.style.left = "0";
      header.style.right = "0";
      header.style.zIndex = "40";
      header.style.backgroundColor = "#f0eee6";
      headerHeightRef.current = header.offsetHeight;
    }

    // Countdown: replace ONLY the counter (the Timer digits block), keeping the
    // rest of the block (decorative stars, glow) intact. Portal the orbit
    // animation in the Timer's place.
    const countdown = mainDiv.querySelector<HTMLElement>(
      '[data-name="Countdown"]'
    );
    if (countdown) {
      const timer = countdown.querySelector<HTMLElement>('[data-name="Timer"]');
      if (timer) timer.style.display = "none";

      // Remove the decorative Star left / Star right groups — they clash with
      // the orbiting comets of the new counter.
      countdown
        .querySelectorAll<HTMLElement>(
          '[data-name="Star left"], [data-name="Star right"]'
        )
        .forEach((el) => {
          el.style.display = "none";
        });

      let host = countdown.querySelector<HTMLElement>(".cdo-host");
      if (!host) {
        host = document.createElement("div");
        host.className = "cdo-host";
        host.style.cssText =
          "position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:376px;height:276px;pointer-events:none;z-index:1;";
        countdown.appendChild(host);
      }
      setCountdownHost(host);
    }

    const children = Array.from(mainDiv.children) as HTMLElement[];
    const sections = children.filter((el) => {
      const name = el.getAttribute("data-name");
      return name != null && SECTION_NAMES.includes(name);
    });

    // Hide every section up front (entrance transition is prepared here); the
    // reveal itself is triggered later, once the intro splash is dismissed —
    // otherwise the animations play behind the splash and are never seen.
    sections.forEach((el, i) => {
      el.style.opacity = "0";
      if (i === 0) {
        // Hero must NOT use transform — a transformed ancestor would break the
        // pinned (position: fixed) header nested inside it. Opacity-only entrance.
        el.style.transition =
          "opacity 0.85s cubic-bezier(0.22,1,0.36,1) 0.1s";
      } else {
        el.style.transform = "translateY(36px)";
        el.style.transition =
          "opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)";
      }
    });

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Prep (but don't yet play) the hero image mask reveal and text fade.
    if (!reduceMotion) {
      const heroImg = mainDiv.querySelector<HTMLElement>(
        '[data-name="image 1"] img'
      );
      if (heroImg) {
        // Soft-edged wedge reveal via a feathered gradient mask (no resizing of the image).
        const grad =
          "linear-gradient(to top right, #000 var(--hg-a), transparent var(--hg-b)), linear-gradient(to top left, #000 var(--hg-a), transparent var(--hg-b))";
        heroImg.style.maskImage = grad;
        (heroImg.style as unknown as { webkitMaskImage: string }).webkitMaskImage = grad;
        heroImg.style.maskRepeat = "no-repeat";
        (heroImg.style as unknown as { webkitMaskRepeat: string }).webkitMaskRepeat = "no-repeat";
        heroImg.style.maskComposite = "add";
        (heroImg.style as unknown as { webkitMaskComposite: string }).webkitMaskComposite = "source-over";
        heroImg.style.willChange = "mask-image, opacity";
      }

      const heroTextBlock = (Array.from(hero?.children ?? []) as HTMLElement[]).find(
        (c) => !c.getAttribute("data-name")
      );
      if (heroTextBlock) {
        heroTextBlock.style.opacity = "0";
        heroTextBlock.style.willChange = "opacity";
      }
    }

    // Gentle swaying motion for the cherub / angel images and the Our story photo cards.
    const swayers = Array.from(
      mainDiv.querySelectorAll<HTMLElement>(
        '[data-name^="Angel"], [data-name="Photo 1"], [data-name="Photo 2"], [data-name="Photo 3"]'
      )
    );
    swayers.forEach((el, i) => {
      el.style.transformOrigin = "50% 50%";
      el.style.willChange = "transform";
      el.style.animation = `angelSway ${5.5 + (i % 3) * 0.9}s ease-in-out ${
        (i % 4) * 0.6
      }s infinite`;
    });

    return () => {
      if (burgerHit) burgerHit.removeEventListener("click", openMenu);
    };
  }, []);

  // Trigger the entrance reveal only after the intro splash has finished, so the
  // fade-ins are actually visible to the user.
  useEffect(() => {
    if (!introDone) return;
    const mainDiv = containerRef.current?.querySelector<HTMLElement>(
      '[data-name="376-romantic"]'
    );
    if (!mainDiv) return;

    let observer: IntersectionObserver | undefined;

    // Wait a beat after the splash is fully gone, so the entrance animations
    // clearly play on-screen instead of right as the overlay disappears.
    const timer = window.setTimeout(() => {
      const sections = (Array.from(mainDiv.children) as HTMLElement[]).filter(
        (el) => {
          const name = el.getAttribute("data-name");
          return name != null && SECTION_NAMES.includes(name);
        }
      );

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement;
              el.style.opacity = "1";
              // Only reset transform on sections that had one (not the hero).
              if (el.style.transform) el.style.transform = "translateY(0)";
              observer?.unobserve(el);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
      );
      sections.forEach((el) => observer!.observe(el));

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (!reduceMotion) {
        const heroImg = mainDiv.querySelector<HTMLElement>(
          '[data-name="image 1"] img'
        );
        if (heroImg) {
          heroImg.style.animation =
            "heroGrow 2.3s cubic-bezier(0.33,0,0.2,1) 0.15s both";
        }
        const hero = mainDiv.querySelector<HTMLElement>(
          '[data-name="Component 2"]'
        );
        const heroTextBlock = (
          Array.from(hero?.children ?? []) as HTMLElement[]
        ).find((c) => !c.getAttribute("data-name"));
        if (heroTextBlock) {
          heroTextBlock.style.animation = "heroTextIn 1.2s ease-out 0.95s both";
        }
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      observer?.disconnect();
    };
  }, [introDone]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full overflow-x-clip bg-[#f0eee6]"
    >
      <style>{`
        @property --hg-a { syntax: '<length-percentage>'; inherits: false; initial-value: 30%; }
        @property --hg-b { syntax: '<length-percentage>'; inherits: false; initial-value: 66%; }
        @keyframes heroGrow {
          0%   { opacity: 0; --hg-a: 30%; --hg-b: 66%; }
          30%  { opacity: 1; }
          100% { opacity: 1; --hg-a: 100%; --hg-b: 132%; }
        }
        @keyframes heroTextIn {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
        /* Event Details: the Time value shipped as white; match Date/Place (black). */
        [data-name="Time"] > div:last-child { color: #28282a; }
        /* Event Details: the clipping lives on the inner wrapper div, not the section.
           Let the swaying cherub overflow the top (keep horizontal clipping intact). */
        [data-name="376-romantic"] > [data-name="Event details"] > div {
          overflow-x: clip;
          overflow-y: visible;
        }
        /* Countdown: recolor the "Counting down to our special day" heading to black,
           keeping the "UNTIL WE SAY I DO" label (first line) green. */
        [data-name="Countdown"] [data-name="Header"] p { color: #28282a; }
        [data-name="Countdown"] [data-name="Header"] p:first-child { color: #7b9261; }
        /* Hide the page scrollbar entirely (scrolling still works via wheel/touch). */
        html, body { scrollbar-width: none; -ms-overflow-style: none; }
        html::-webkit-scrollbar, body::-webkit-scrollbar { display: none; }

        /* Guest Book comments: horizontal-only scroll, invisible scrollbar, bleeds to the right edge. */
        [data-name="Comments"] {
          overflow-x: auto;
          overflow-y: hidden;
          max-width: calc(100% - 16px);
          padding-bottom: 16px;
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
        }
        [data-name="Comments"]::-webkit-scrollbar { display: none; }

        /* Photo Gallery feed: horizontal-only scroll, invisible scrollbar, photos run off the right edge. */
        [data-name="Photo feed"] {
          overflow-x: auto;
          overflow-y: hidden;
          width: calc(100% + 16px);
          max-width: none;
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
        }
        [data-name="Photo feed"]::-webkit-scrollbar { display: none; }
        @keyframes angelSway {
          0%   { transform: rotate(-2deg) translateY(0px); }
          50%  { transform: rotate(2deg) translateY(-6px); }
          100% { transform: rotate(-2deg) translateY(0px); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-name^="Angel"],
          [data-name="Photo 1"],
          [data-name="Photo 2"],
          [data-name="Photo 3"] { animation: none !important; }
        }
      `}</style>
      <Component376Romantic />
      {countdownHost && createPortal(<CountdownOrbit />, countdownHost)}
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={handleNavigate}
      />
      {!introDone && <IntroOverlay onFinish={() => setIntroDone(true)} />}
    </div>
  );
}
