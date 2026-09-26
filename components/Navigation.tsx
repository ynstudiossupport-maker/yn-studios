"use client";
import { useState } from "react";

const links = [["Home", "home"], ["Projects", "projects"], ["About", "about"], ["Members", "members"], ["Contact", "contact"]];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  return <>
    <header className="site-header">
      <a className="logo" href="#home" aria-label="YN Studios home"><span>YN</span><small>STUDIOS</small></a>
      <nav className="desktop-nav">{links.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
      <button className="menu-btn" onClick={() => setOpen(v => !v)} aria-expanded={open}>{open ? "Close" : "Menu"}</button>
    </header>
    <div className={`menu-panel ${open ? "open" : ""}`}>
      <nav>{links.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}</nav>
      <p>Photography · Reels · Meta Ads · Websites</p>
    </div>
  </>;
}
