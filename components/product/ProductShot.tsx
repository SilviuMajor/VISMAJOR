"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Product photography wrapper. The hero/ingredient shots are on pure white,
 * so `melt` (mix-blend-multiply) drops the background onto the paper with no
 * visible frame. Grey-bg shots (squeeze/detail) should pass melt={false} and
 * sit in a panel.
 */
export function ProductShot({
  src,
  alt,
  priority = false,
  melt = true,
  hover = false,
  sizes = "(max-width: 768px) 90vw, 45vw",
  className = "",
  imgClassName = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  melt?: boolean;
  hover?: boolean;
  sizes?: string;
  className?: string;
  imgClassName?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative aspect-[1122/1402] w-full overflow-hidden ${
        loaded ? "" : "img-skeleton"
      } ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        className={`object-contain transition-transform duration-[600ms] ease-[cubic-bezier(0.2,0,0,1)] ${
          melt ? "melt" : ""
        } ${hover ? "group-hover:scale-[1.04]" : ""} ${
          loaded ? "opacity-100" : "opacity-0"
        } ${imgClassName}`}
      />
    </div>
  );
}
