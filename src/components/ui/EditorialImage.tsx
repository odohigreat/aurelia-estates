import { cn } from '../../lib/utils';

// The same four Unsplash photographs used by the listings and hero, so no new image sources are introduced.
const PHOTOS = {
  estate: 'photo-1600596542815-ffad4c1539a9',
  poolside: 'photo-1512917774080-9991f1c4c750',
  modern: 'photo-1613977257363-707ba9348227',
  alpine: 'photo-1510798831971-661eb04b3739',
} as const;

export type EditorialPhoto = keyof typeof PHOTOS;

const WIDTHS = [480, 800, 1200, 1600];

interface EditorialImageProps {
  photo: EditorialPhoto;
  alt: string;
  /** Width ÷ height of the crop, also used to reserve layout space before the image loads. */
  ratio?: number;
  sizes?: string;
  className?: string;
}

// Lazy, responsive and dimensioned, so below-the-fold imagery never delays the page or shifts its layout.
export function EditorialImage({ photo, alt, ratio = 4 / 3, sizes = '(min-width: 1024px) 50vw, 100vw', className }: EditorialImageProps) {
  const url = (width: number) => `https://images.unsplash.com/${PHOTOS[photo]}?auto=format&fit=crop&crop=center&w=${width}&h=${Math.round(width / ratio)}&q=75`;
  return (
    <img
      src={url(800)}
      srcSet={WIDTHS.map(width => `${url(width)} ${width}w`).join(', ')}
      sizes={sizes}
      width={800}
      height={Math.round(800 / ratio)}
      loading="lazy"
      decoding="async"
      alt={alt}
      style={{ aspectRatio: ratio }}
      className={cn('block w-full h-auto object-cover bg-surface-hover', className)}
    />
  );
}
