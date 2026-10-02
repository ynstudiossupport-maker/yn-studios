"use client";

import { useRef } from "react";
import ContactForm, { type FormText } from "./ContactForm";
import { Mail, MapPin, Phone } from "./Icons";

type Props = {
  label: string;
  title: string;
  eyebrow: string;
  intro: string;
  email: string;
  phone: string;
  location: string;
  form: FormText;
};

/** "Contact Us" button that opens a roomy two-panel enquiry dialog. */
export default function ContactDialog({ label, title, eyebrow, intro, email, phone, location, form }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      {label && (
        <button type="button" className="btn btn-outline" onClick={() => dialog.current?.showModal()}>
          {label}
        </button>
      )}

      <dialog
        ref={dialog}
        className="contact-dialog"
        aria-labelledby="contact-dialog-title"
        onClick={(event) => {
          // Clicking the backdrop (the dialog element itself) closes it.
          if (event.target === dialog.current) dialog.current?.close();
        }}
      >
        <button type="button" className="dialog-close" onClick={() => dialog.current?.close()} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>

        <div className="cd-layout">
          <aside className="cd-aside">
            <div>
              {eyebrow && <p className="eyebrow">{eyebrow}</p>}
              <h2 id="contact-dialog-title">{title}</h2>
              {intro && <p className="cd-intro">{intro}</p>}
            </div>
            <ul className="cd-details">
              {email && (
                <li>
                  <Mail />
                  <a href={`mailto:${email}`}>{email}</a>
                </li>
              )}
              {phone && (
                <li>
                  <Phone />
                  <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
                </li>
              )}
              {location && (
                <li>
                  <MapPin />
                  <span>{location}</span>
                </li>
              )}
            </ul>
          </aside>

          <div className="cd-form">
            <ContactForm text={form} />
          </div>
        </div>
      </dialog>
    </>
  );
}
