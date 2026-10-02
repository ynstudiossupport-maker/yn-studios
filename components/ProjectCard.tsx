"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/types";
import { Play } from "./Icons";

const looksLikeVideo = (category: string) => /reel|video|film/i.test(category);

/** Extract a YouTube video id from watch / youtu.be / shorts / embed links. */
export function youtubeId(url?: string | null) {
  if (!url) return null;
  const m = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : null;
}

export default function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const media = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const pointer = useRef("mouse");
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);

  const yt = youtubeId(project.video_url);
  const hasVideo = Boolean(project.video_url);
  const showBadge = hasVideo || looksLikeVideo(project.category);

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

  // Hover (mouse only) plays the preview; reduced-motion users must tap/click instead.
  const onEnter = () => {
    if (pointer.current !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    start();
  };

  // Touch / pen: tap toggles the preview.
  const onClick = () => {
    if (!hasVideo) return;
    if (pointer.current === "mouse") return;
    active ? stop() : start();
  };

  // Stop previews that scroll out of view (matters on touch devices).
  useEffect(() => {
    const el = media.current;
    if (!el || !hasVideo) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) stop();
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, [hasVideo]);

  return (
    <article className="project-card">
      <div
        ref={media}
        className={`project-card-media${hasVideo ? " has-video" : ""}${playing ? " is-playing" : ""}`}
        tabIndex={hasVideo ? 0 : undefined}
        aria-label={hasVideo ? `${project.title} — preview video` : undefined}
        onPointerDown={(e) => { pointer.current = e.pointerType; }}
        onPointerEnter={hasVideo ? onEnter : undefined}
        onPointerLeave={hasVideo ? () => { if (pointer.current === "mouse") stop(); } : undefined}
        // Keyboard focus previews the clip; pointer focus (tap / click) must not, or a tap would toggle twice.
        onFocus={hasVideo ? (e) => { if (e.currentTarget.matches(":focus-visible")) start(); } : undefined}
        onBlur={hasVideo ? stop : undefined}
        onClick={onClick}
      >
        <img src={project.image_url} alt={project.title} loading={priority ? "eager" : "lazy"} />

        {hasVideo && !yt && (
          <video
            ref={video}
            src={project.video_url!}
            poster={project.image_url}
            muted
            loop
            playsInline
            preload="none"
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
    </article>
  );
}
