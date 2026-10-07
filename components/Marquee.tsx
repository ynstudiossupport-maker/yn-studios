import type { CSSProperties, ReactNode } from "react";

type Props<T> = {
  items: T[];
  /** Render one item. `duplicate` is true for the looping copies (hide them from keyboard / screen readers). */
  render: (item: T, duplicate: boolean) => ReactNode;
  secondsPerItem?: number;
  className?: string;
};

/**
 * Seamless right-to-left marquee. The list is repeated until one group is wider than
 * any screen, then two identical groups slide left by half their combined width.
 */
export default function Marquee<T>({ items, render, secondsPerItem = 3, className = "" }: Props<T>) {
  if (!items.length) return null;
  const reps = Math.max(2, Math.ceil(12 / items.length));
  const duration = Math.max(24, items.length * reps * secondsPerItem);

  return (
    <div className={`marquee ${className}`} style={{ ["--marquee-duration" as string]: `${duration}s` } as CSSProperties}>
      {[0, 1].map((copy) => (
        <ul className={`marquee-group${copy ? " copy" : ""}`} key={copy} aria-hidden={copy ? true : undefined}>
          {Array.from({ length: reps }, (_, rep) =>
            items.map((item, i) => {
              const dup = rep > 0 || copy > 0;
              return (
                <li key={`${rep}-${i}`} className={dup ? "dup" : undefined} aria-hidden={dup ? true : undefined}>
                  {render(item, dup)}
                </li>
              );
            })
          )}
        </ul>
      ))}
    </div>
  );
}
