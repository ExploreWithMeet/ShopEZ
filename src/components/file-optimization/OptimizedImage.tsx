"use client";
import Image from "next/image";
import { useState } from "react";

interface OptimizedImageProps {
  image: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
    sizes?: {
      thumbnail?: { url: string; width?: number; height?: number };
      card?: { url: string; width?: number; height?: number };
      hero?: { url: string; width?: number; height?: number };
    };
  };
  size?: "thumbnail" | "card" | "hero";
  className?: string;
}

export function OptimizedImage({
  image,
  size = "card",
  className = "",
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Smart fallback: use the requested size, or fallback to smaller size, or original
  const getSrc = () => {
    // Try requested size
    if (image.sizes?.[size]?.url && !image.sizes[size].url.includes("null")) {
      return image.sizes[size].url;
    }

    // Fallback chain based on requested size
    if (size === "hero") {
      // Try card, then thumbnail, then original
      if (image.sizes?.card?.url && !image.sizes.card.url.includes("null")) {
        return image.sizes.card.url;
      }
      if (
        image.sizes?.thumbnail?.url &&
        !image.sizes.thumbnail.url.includes("null")
      ) {
        return image.sizes.thumbnail.url;
      }
    }

    if (size === "card") {
      // Try thumbnail, then original
      if (
        image.sizes?.thumbnail?.url &&
        !image.sizes.thumbnail.url.includes("null")
      ) {
        return image.sizes.thumbnail.url;
      }
    }

    // Final fallback to original
    return image.url;
  };

  const src = getSrc();

  // Get actual dimensions from the image or use defaults
  const getDimensions = () => {
    // Try to get dimensions from the selected size
    if (image.sizes?.[size]?.width && image.sizes?.[size]?.height) {
      return {
        width: image.sizes[size].width!,
        height: image.sizes[size].height!,
      };
    }

    // Use original image dimensions if available
    if (image.width && image.height) {
      return {
        width: image.width,
        height: image.height,
      };
    }

    // Default dimensions as fallback
    const defaults = {
      thumbnail: { width: 400, height: 300 },
      card: { width: 800, height: 600 },
      hero: { width: 1600, height: 1200 },
    };

    return defaults[size];
  };

  const { width, height } = getDimensions();

  return (
    <div
      className={`relative overflow-hidden transition-all bg-muted ${className}`}
    >
      <Image
        src={src}
        width={width}
        height={height}
        alt={image.alt}
        loading="lazy"
        quality={85}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`
          object-cover w-full h-full
          duration-300 ease-in-out
          ${isLoading ? "scale-105 blur-sm" : "scale-100 blur-0"}
        `}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
