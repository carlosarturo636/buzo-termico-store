"use client";

import Image from "next/image";
import { useState } from "react";

export type MediaItem =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string; title: string };

export function ProductMedia({ media }: { media: MediaItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = media[activeIndex];

  return (
    <div className="product-media">
      <figure className="media-item">
        {activeItem.type === "image" ? (
          <Image src={activeItem.src} alt={activeItem.alt} fill priority={activeIndex === 0} sizes="(max-width: 800px) 100vw, 55vw" />
        ) : (
          <video key={activeItem.src} controls playsInline preload="metadata" poster={activeItem.poster} aria-label={activeItem.title}>
            <source src={activeItem.src} type="video/mp4" />
          </video>
        )}
      </figure>
      <div className="media-thumbnails" aria-label="Galería del producto">
        {media.map((item, index) => (
          <button
            className={index === activeIndex ? "media-thumb is-active" : "media-thumb"}
            type="button"
            key={`${item.type}-${item.src}`}
            aria-label={item.type === "image" ? `Ver ${item.alt}` : `Reproducir ${item.title}`}
            aria-pressed={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          >
            <Image
              src={item.type === "image" ? item.src : item.poster || "/media/black-flat-front.webp"}
              alt=""
              fill
              sizes="72px"
            />
            {item.type === "video" ? <span className="play-mark" aria-hidden="true">▶</span> : null}
          </button>
        ))}
      </div>
    </div>
  );
}
