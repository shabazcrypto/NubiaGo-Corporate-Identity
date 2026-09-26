import { useEffect, useRef, useState, type ReactNode } from 'react';

type LazyMountProps = {
  children: ReactNode;
  /** Placeholder height before mount (keeps scroll stable). */
  minHeight?: number;
  /** Root margin for early mount ahead of viewport. */
  rootMargin?: string;
  className?: string;
};

/**
 * Mounts children only when the sentinel nears the viewport.
 * Used to virtualize long artboard catalogs without a virtual-list dependency.
 */
export function LazyMount({
  children,
  minHeight = 280,
  rootMargin = '400px 0px',
  className = ''
}: LazyMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible, rootMargin]);

  return (
    <div ref={ref} className={className} style={visible ? undefined : { minHeight }}>
      {visible ? (
        children
      ) : (
        <div
          className="flex items-center justify-center border border-dashed border-gray-200 bg-gray-50 text-[11px] uppercase tracking-[0.12em] text-gray-500"
          style={{ minHeight }}
          aria-hidden
        >
          Loading artboard…
        </div>
      )}
    </div>
  );
}
