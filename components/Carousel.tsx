"use client";

import { Children, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "./Icons";

type Props = {
  children: ReactNode;
  label: string;
  /** Show prev/next buttons (always on the team carousel on mobile). */
  arrows?: boolean;
  className?: string;
};

/**
 * Scroll-snap carousel. Native scrolling does the work (touch, trackpad,
 * keyboard); the dashes and arrows just reflect and drive scroll position.
 */
export default function Carousel({ children, label, arrows = false, className = "" }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);

  const itemCount = Children.count(children);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const { scrollWidth, clientWidth, scrollLeft } = el;
    const max = scrollWidth - clientWidth;
    // Not laid out yet (hidden / zero width) or nothing to scroll: single page.
    if (clientWidth <= 0 || !Number.isFinite(max) || max <= 2) {
      setPages(1);
      setPage(0);
      return;
    }
    const raw = Math.ceil(scrollWidth / clientWidth - 0.05);
    const count = Math.min(Math.max(1, itemCount), Math.max(1, Number.isFinite(raw) ? raw : 1));
    setPages(count);
    setPage(count <= 1 ? 0 : Math.min(count - 1, Math.max(0, Math.round((scrollLeft / max) * (count - 1)))));
  }, [itemCount]);

  useEffect(() => {
    measure();
    const el = track.current;
    if (!el) return;
    el.addEventListener("scroll", measure, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", measure);
      ro.disconnect();
    };
  }, [measure]);

  const goTo = (index: number) => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const target = pages <= 1 ? 0 : (index / (pages - 1)) * max;
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  const items = Children.toArray(children);

  return (
    <div className={`carousel ${className}`} role="region" aria-roledescription="carousel" aria-label={label}>
      <div className="carousel-track" ref={track} tabIndex={0}>
        {items.map((item, i) => (
          <div className="carousel-item" key={i}>
            {item}
          </div>
        ))}
      </div>

      {arrows && pages > 1 && (
        <>
          <button type="button" className="carousel-arrow prev" onClick={() => goTo(page - 1)} disabled={page === 0} aria-label="Previous">
            <ChevronLeft />
          </button>
          <button type="button" className="carousel-arrow next" onClick={() => goTo(page + 1)} disabled={page === pages - 1} aria-label="Next">
            <ChevronRight />
          </button>
        </>
      )}

      {pages > 1 && (
        <div className="dashes" role="group" aria-label={`${label} pages`}>
          {Array.from({ length: Math.max(0, Math.min(pages, 50)) }, (_, i) => (
            <button
              type="button"
              key={i}
              className={i === page ? "dash active" : "dash"}
              onClick={() => goTo(i)}
              aria-label={`Go to page ${i + 1}`}
              aria-current={i === page}
            />
          ))}
        </div>
      )}
    </div>
  );
}
