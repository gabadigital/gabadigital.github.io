import { MDXRemote } from "next-mdx-remote/rsc";

const components = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-12 font-display text-3xl tracking-tight text-[var(--ink)] first:mt-0"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mt-8 font-display text-2xl tracking-tight text-[var(--ink)]"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mt-4 text-lg leading-relaxed text-[var(--ink-muted)]" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="mt-4 list-disc space-y-2 pl-6 text-lg text-[var(--ink-muted)]"
      {...props}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="mt-4 list-decimal space-y-2 pl-6 text-lg text-[var(--ink-muted)]"
      {...props}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="font-medium text-[var(--teal)] underline-offset-4 hover:underline"
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="mt-8 border-l-2 border-[var(--teal)] pl-6 font-display text-2xl leading-snug text-[var(--ink)]"
      {...props}
    />
  ),
};

export function MdxContent({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
