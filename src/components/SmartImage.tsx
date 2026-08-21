import { forwardRef, useState } from "react";
import { Mountain } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePlaceImage } from "@/lib/media";

interface SmartImageProps {
  /** Preferred source (e.g. the database image). */
  src?: string | null;
  /** Search phrase used to resolve a real photo when no source is available. */
  query?: string | null;
  alt: string;
  className?: string;
  /** Rendered while nothing could be resolved. */
  fallbackIconClassName?: string;
}

/**
 * Image that always shows something meaningful: the stored photo when present,
 * otherwise a real photo resolved from an open image index, otherwise a branded
 * placeholder.
 */
const SmartImage = forwardRef<HTMLElement, SmartImageProps>(
  ({ src, query, alt, className, fallbackIconClassName }, ref) => {
    const [failed, setFailed] = useState(false);
    const needsLookup = !src || failed;
    const { data: resolved, isLoading } = usePlaceImage(query, needsLookup);
    const finalSrc = failed ? resolved : src || resolved;

    if (!finalSrc) {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          className={cn(
            "flex items-center justify-center bg-gradient-forest",
            isLoading && "animate-pulse",
            className,
          )}
          role="img"
          aria-label={alt}
        >
          <Mountain className={cn("w-8 h-8 text-primary/40", fallbackIconClassName)} />
        </div>
      );
    }

    return (
      <img
        ref={ref as React.Ref<HTMLImageElement>}
        src={finalSrc}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className={className}
      />
    );
  },
);

SmartImage.displayName = "SmartImage";

export default SmartImage;
