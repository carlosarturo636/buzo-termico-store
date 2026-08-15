import Image from "next/image";

export type MediaItem =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string; title: string };

export function ProductMedia({ media }: { media: MediaItem[] }) {
  return (
    <div className="media-grid">
      {media.map((item, index) => (
        <figure className={`media-item media-item--${index + 1}`} key={`${item.type}-${item.src}`}>
          {item.type === "image" ? (
            <Image src={item.src} alt={item.alt} fill priority={index === 0} sizes="(max-width: 800px) 100vw, 55vw" />
          ) : (
            <video controls playsInline preload="metadata" poster={item.poster} aria-label={item.title}>
              <source src={item.src} />
            </video>
          )}
        </figure>
      ))}
    </div>
  );
}
