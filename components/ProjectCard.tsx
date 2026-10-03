"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/types";
import { normalizeLink } from "@/lib/links";
import { Play } from "./Icons";

const looksLikeVideo = (category: string) => /reel|video|film/i.test(category);

/** Extract a YouTube video id from watch / youtu.be / shorts / embed links. */
export function youtubeId(url?: string | null) {
  if (!url) return null;
  const m = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : null;
}

type Props = { project: Project; priority?: boolean; linkLabel?: string };

export default function ProjectCard({ project, priority = false, linkLabel = "" }: Props) {
  const media = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);

  const yt = youtubeId(project.video_url);
  const hasVideo = Boolean(project.video_url);
  const hasImage = Boolean(project.image_url);
  const showBadge = hasVideo || looksLikeVideo(project.category);
  const link = normalizeLink(project.link_url);

  const start = () => {
    setActive(true);
    video.current?.play().catch(() => {});
  };
  const stop = () => {
    setActive(false);
    setPlaying(false);
    const v = video.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  // Touch screens have no hover, so previews play while the card is mostly on screen.
  // Mouse users get hover (below). Reduced-motion users never get autoplay.
  useEffect(() => {
    const el = media.current;
    if (!el || !hasVideo) return;
    if (!window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [hasVideo]);

  const onEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    start();
  };
  const onLeave = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") stop();
  };

  const body = (
    <>
      <div ref={media} className={`project-card-media${hasVideo ? " has-video" : ""}${playing ? " is-playing" : ""}`}>
        {hasImage && <img src={project.image_url} alt={project.title} loading={priority ? "eager" : "lazy"} />}

        {hasVideo && !yt && (
          <video
            ref={video}
            src={hasImage ? project.video_url! : `${project.video_url}#t=0.1`}
            poster={hasImage ? project.image_url : undefined}
            muted
            loop
            playsInline
            preload={hasImage ? "none" : "metadata"}
            className={hasImage ? undefined : "no-poster"}
            onPlaying={() => setPlaying(true)}
            aria-hidden
          />
        )}
        {hasVideo && yt && active && (
          <iframe
            className="yt-frame"
            src={`https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&mute=1&controls=0&loop=1&playlist=${yt}&playsinline=1&modestbranding=1&rel=0`}
            title={`${project.title} preview`}
            allow="autoplay; encrypted-media"
            tabIndex={-1}
            onLoad={() => setPlaying(true)}
          />
        )}

        {showBadge && (
          <span className="play-badge" aria-hidden>
            <Play size={16} />
          </span>
        )}
      </div>
      <h3>{project.title}</h3>
      {project.description && <p>{project.description}</p>}
      {link && linkLabel && <span className="project-link-label">{linkLabel}</span>}
      {link?.external && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  );

  const handlers = {
    onPointerEnter: hasVideo ? onEnter : undefined,
    onPointerLeave: hasVideo ? onLeave : undefined,
    // Keyboard focus previews the clip; pointer focus must not.
    onFocus: hasVideo ? (e: React.FocusEvent<HTMLElement>) => { if (e.currentTarget.matches(":focus-visible")) start(); } : undefined,
    onBlur: hasVideo ? stop : undefined,
  };

  return (
    <article className={`project-card${link ? " is-linked" : ""}`}>
      {link ? (
        <a
          className="project-card-link"
          href={link.href}
          {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...handlers}
        >
          {body}
        </a>
      ) : (
        <div className="project-card-link" tabIndex={hasVideo ? 0 : undefined} {...handlers}>
          {body}
        </div>
      )}
    </article>
  );
}
