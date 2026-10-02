type IconProps = { size?: number; className?: string };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
});

export const ArrowDown = ({ size = 16, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M12 4v16M6 14l6 6 6-6" /></svg>
);
export const ChevronLeft = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M15 5l-7 7 7 7" /></svg>
);
export const ChevronRight = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}><path d="M9 5l7 7-7 7" /></svg>
);
export const Play = ({ size = 18, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden focusable="false"><path d="M8 5.5v13a.5.5 0 0 0 .77.42l10.2-6.5a.5.5 0 0 0 0-.84L8.77 5.08A.5.5 0 0 0 8 5.5Z" /></svg>
);
export const Instagram = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r=".6" fill="currentColor" />
  </svg>
);
export const Youtube = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
    <path d="M10.5 9.5v5l4.2-2.5-4.2-2.5Z" fill="currentColor" />
  </svg>
);
export const Linkedin = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
    <path d="M8 10.5V16M8 7.8v.01M12 16v-5.5M12 13c0-1.7 1-2.6 2.3-2.6 1.4 0 2 .9 2 2.6v3" />
  </svg>
);
