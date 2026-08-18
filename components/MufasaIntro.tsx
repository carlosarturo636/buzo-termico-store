"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

type IntroState = "visible" | "exiting" | "hidden";
const SESSION_KEY = "mufasa-intro-seen";
const subscribeToHydration = () => () => {};

export function MufasaIntro() {
  const isHydrated = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  if (!isHydrated) return null;

  try {
    if (sessionStorage.getItem(SESSION_KEY) === "true") return null;
  } catch {}

  return <MufasaIntroPlayer />;
}

function MufasaIntroPlayer() {
  const [state, setState] = useState<IntroState>("visible");

  useEffect(() => {
    if (state !== "visible" && state !== "exiting") return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [state]);

  function finishIntro() {
    try {
      sessionStorage.setItem(SESSION_KEY, "true");
    } catch {}
    setState("exiting");
  }

  if (state === "hidden") return null;

  return (
    <div
      className={`mufasa-intro${state === "exiting" ? " is-exiting" : ""}`}
      aria-label="Intro de MUFASA"
      onTransitionEnd={(event) => {
        if (event.target === event.currentTarget && state === "exiting") setState("hidden");
      }}
    >
      <video
        className="mufasa-intro__video"
        src="/media/hoodie-360-intro.mp4"
        width="460"
        height="720"
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        onEnded={finishIntro}
        onError={finishIntro}
      />
      <button className="mufasa-intro__skip" type="button" onClick={finishIntro}>
        Omitir intro
      </button>
    </div>
  );
}
