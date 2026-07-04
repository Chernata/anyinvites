import { useEffect, useRef, useState } from "react";
import introVideo from "./anyinvites-intro.mp4";
import introPoster from "./anyinvites-intro-poster.jpg";

interface IntroOverlayProps {
  onFinish: () => void;
}

// Full-screen intro splash: shows the closed envelope (video frame 0 / poster),
// plays the opening animation on click, then fades out and reveals the site.
export function IntroOverlay({ onFinish }: IntroOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [opened, setOpened] = useState(false);
  const [fading, setFading] = useState(false);

  // Lock page scroll while the splash is visible.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    const v = videoRef.current;
    if (v) {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    }
  };

  const handleEnded = () => {
    // Fade the splash out, then hand off to the site.
    setFading(true);
    window.setTimeout(onFinish, 420);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#eae6dc] transition-opacity duration-[400ms] ease-out ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={introVideo}
        poster={introPoster}
        playsInline
        muted
        preload="auto"
        onEnded={handleEnded}
      />
      <button
        onClick={handleOpen}
        aria-label="Open the envelope"
        className={`absolute inset-0 z-[2] cursor-pointer border-0 bg-transparent p-0 ${
          opened ? "pointer-events-none" : ""
        }`}
      />
    </div>
  );
}
