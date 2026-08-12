import Link from "next/link";
import type { ComponentProps } from "react";
import { localePath, type Locale } from "@/lib/i18n";

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  locale: Locale;
  href: string;
};

export function LocaleLink({ locale, href, ...props }: LocaleLinkProps) {
  return <Link href={localePath(locale, href)} {...props} />;
}
