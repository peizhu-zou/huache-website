type PlatformMediaProps = {
  media: {
    kind: "image" | "video";
    src: string;
    alt: string;
    poster?: string;
  };
  compact?: boolean;
};

export default function PlatformMedia({ media, compact = false }: PlatformMediaProps) {
  return (
    <div className={`platform-media${compact ? " platform-media-compact" : ""}`}>
      {media.kind === "video" ? (
        <video
          className="platform-media-asset"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={media.poster}
          aria-label={media.alt}
        >
          <source src={media.src} />
        </video>
      ) : (
        <img
          className="platform-media-asset"
          src={media.src}
          alt={media.alt}
          loading="lazy"
          decoding="async"
        />
      )}
      <div className="platform-media-label" aria-hidden="true">
        <span>3D MODEL</span>
        <strong>三维结构演示</strong>
      </div>
    </div>
  );
}
