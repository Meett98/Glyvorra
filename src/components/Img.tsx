import { imageUrl } from "../lib/utils";

interface Props {
  src: string;
  alt: string;
  width?: number;
  className?: string;
  eager?: boolean;
}

export default function Img({ src, alt, width = 900, className = "", eager = false }: Props) {
  return (
    <img
      src={imageUrl(src, width)}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
