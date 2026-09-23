"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

export default function SectionLink({
  href,
  onClick,
  ...rest
}: ComponentProps<typeof Link> & { onClick?: () => void }) {
  const pathname = usePathname();
  const hrefString = href.toString();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.();

    const [path, hash] = hrefString.split("#");
    const targetPath = path || "/";

    if (!hash || pathname !== targetPath) {
      return;
    }

    const target = document.getElementById(hash);
    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
    window.history.pushState(null, "", hrefString);
  }

  return (
    <Link href={href} onClick={handleClick} {...rest} />
  );
}
