import Image, { StaticImageData } from "next/image";
import React, { FC } from "react";
import "./avatar.css";

type AvatarProps = {
  imageUrl?: StaticImageData | string | undefined | null;
  alt?: string;
  className?: string;
  isSize?: "sm" | "md" | "lg" | "xl" | "2xl";
};

const Avatar: FC<AvatarProps> = ({
  imageUrl,
  alt,
  className,
  isSize = "sm",
}) => {
  const sizeClass =
    isSize === "sm"
      ? "w-8 h-8"
      : isSize === "md"
      ? "w-12 h-12"
      : isSize === "lg"
      ? "w-16 h-16"
      : isSize === "xl"
      ? "w-24 h-24"
      : "w-32 h-32";

  return (
    <span className={`relative ${sizeClass}`}>
      {imageUrl && (
        <Image
          className={`rounded-full overflow-hidden object-cover ${sizeClass}`}
          src={imageUrl}
          alt={`${alt}`}
          quality={100}
          fill
        />
      )}
      <span className="absolute ltr:right-0 rtl:left-0 bottom-0 w-4 h-4 rounded-full"></span>
    </span>
  );
};

export default Avatar;
