"use client";

import { FormEvent, useState } from "react";

export type FormText = {
  namePlaceholder: string;
  emailPlaceholder: string;
  typePlaceholder: string;
  types: string[];
  messagePlaceholder: string;
  submitLabel: string;
  sendingLabel: string;
  success: string;
  /** Digits with country code; empty disables the WhatsApp hand-off. */
  whatsappNumber: string;
  whatsappGreeting: string;
};

export default function ContactForm({ text }: { text: FormText }) {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  const waNumber = text.whatsappNumber.replace(/\D/g, "");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    // WhatsApp hand-off: open a chat with the enquiry pre-filled. A copy is still
    // saved in the background, and a failed save never blocks the WhatsApp message.
    if (waNumber) {
      const lines = [
        text.whatsappGreeting,
        "",
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        ...(data.project_type ? [`Interested in: ${data.project_type}`] : []),
        "",
        data.message,
      ];
      const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(lines.join("\n"))}`;

      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        keepalive: true,
      }).catch(() => {});

      // Opened synchronously inside the click so popup blockers allow it.
      const win = window.open(url, "_blank");
      if (win) win.opener = null;
      else window.location.href = url;
      form.reset();
      setStatus(text.success);
      return;
    }

    setSending(true);
    setStatus("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || "Something went wrong.");
      form.reset();
      setStatus(text.success);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not send your message.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="field"><input name="name" placeholder={text.namePlaceholder} aria-label={text.namePlaceholder} required /></div>
      <div className="field"><input name="email" type="email" placeholder={text.emailPlaceholder} aria-label={text.emailPlaceholder} required /></div>
      {text.types.length > 0 && (
        <div className="field">
          <select name="project_type" defaultValue="" aria-label={text.typePlaceholder}>
            <option value="" disabled>{text.typePlaceholder}</option>
            {text.types.map((type) => <option key={type}>{type}</option>)}
          </select>
        </div>
      )}
      <div className="field"><textarea name="message" placeholder={text.messagePlaceholder} aria-label={text.messagePlaceholder} required /></div>
      <button className="btn btn-solid submit" type="submit" disabled={sending}>{sending ? text.sendingLabel : text.submitLabel}</button>
      {status && <p className="form-status" role="status">{status}</p>}
    </form>
  );
}
