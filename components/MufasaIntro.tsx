"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

type IntroState = "visible" | "exiting" | "hidden";
const SESSION_KEY = "mufasa-intro-seen";
const subscribeToHydration = () => () => {};

export function MufasaIntro() {
  const isHydrated = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  if (!isHydrated) return <MufasaIntroPoster />;

  try {
    if (sessionStorage.getItem(SESSION_KEY) === "true") return null;
  } catch {}

  return <MufasaIntroPlayer />;
}

function MufasaIntroPoster() {
  return (
    <div className="mufasa-intro" aria-label="Intro de MUFASA">
      <Image
        className="mufasa-intro__poster"
        src="/media/hoodie-360-intro-poster.webp"
        width={440}
        height={690}
        alt=""
        unoptimized
      />
      <span className="mufasa-intro__skip" aria-hidden="true">Omitir intro</span>
    </div>
  );
}

function MufasaIntroPlayer() {
  const [state, setState] = useState<IntroState>("visible");

  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "true");
    } catch {}
    setState("exiting");
  }, []);

  useEffect(() => {
    if (state !== "visible") return;
    const timer = window.setTimeout(finishIntro, 4350);
    return () => window.clearTimeout(timer);
  }, [finishIntro, state]);

  useEffect(() => {
    if (state !== "visible" && state !== "exiting") return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [state]);

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
        poster="/media/hoodie-360-intro-poster.webp"
        width="440"
        height="690"
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
