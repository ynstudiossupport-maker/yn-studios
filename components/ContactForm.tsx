"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || "Something went wrong.");
      form.reset();
      setStatus("Thanks. We’ll get back to you soon.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not send your message.");
    } finally {
      setSending(false);
    }
  }

  return <form className="contact-form" onSubmit={submit}>
    <div className="field"><input name="name" placeholder="Your name" required /></div>
    <div className="field"><input name="email" type="email" placeholder="Your email" required /></div>
    <div className="field">
      <select name="project_type" defaultValue="">
        <option value="" disabled>What do you need?</option>
        <option>Photography</option><option>Reels & Video</option><option>Meta Ads</option><option>Website</option><option>Something else</option>
      </select>
    </div>
    <div className="field"><textarea name="message" placeholder="Tell us a little about the project" required /></div>
    <button className="submit" type="submit" disabled={sending}>{sending ? "Sending" : "Send"}</button>
    {status && <p className="form-status" role="status">{status}</p>}
  </form>;
}
