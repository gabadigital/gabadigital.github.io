import Image from "next/image";

type UiFrameProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

/** Browser-chrome frame so mockups read as product UI, not stock photos. */
export function UiFrame({
  src,
  alt,
  priority = false,
  className = "",
  sizes = "(max-width: 1024px) 100vw, 720px",
}: UiFrameProps) {
  return (
    <figure
      className={`overflow-hidden rounded-[1.35rem] border border-[var(--line)] bg-[#0f172a] shadow-[0_24px_80px_rgba(16,24,40,0.18)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" aria-hidden />
        <span className="ml-3 truncate rounded-full bg-white/8 px-3 py-1 text-[11px] text-white/55">
          app.gabadigital.com
        </span>
      </div>
      <div className="relative aspect-[16/10] bg-[#f8fafc]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover object-top"
        />
      </div>
    </figure>
  );
}
