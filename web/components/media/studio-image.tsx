import Image from "next/image";

type StudioImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

export function StudioImage({
  src,
  alt,
  priority = false,
  className = "",
  sizes = "100vw",
}: StudioImageProps) {
  return (
    <div
      className={`relative overflow-hidden bg-[var(--sand)] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}
