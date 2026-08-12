import Image from "next/image";

type GalleryImage = {
  src: string;
  alt: string;
};

/** In-body case-study image sequence: a row of illustrative UI frames. */
export function Gallery({ images }: { images: GalleryImage[] }) {
  return (
    <div className="not-prose mt-8 grid gap-4 sm:grid-cols-3">
      {images.map((image) => (
        <div
          key={image.src}
          className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[var(--line)] bg-[#f8fafc]"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover object-top"
          />
        </div>
      ))}
    </div>
  );
}
