"use client";

import { useRef } from "react";
import ContactForm, { type FormText } from "./ContactForm";

type Props = {
  label: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  form: FormText;
};

/** "Contact Us" button that opens the enquiry form in a native modal dialog. */
export default function ContactDialog({ label, title, email, phone, location, form }: Props) {
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
        <div className="contact-dialog-inner">
          <div className="contact-dialog-head">
            <h2 id="contact-dialog-title">{title}</h2>
            <button type="button" className="dialog-close" onClick={() => dialog.current?.close()} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            </button>
          </div>
          <div className="contact-dialog-details">
            {email && <a href={`mailto:${email}`}>{email}</a>}
            {phone && <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>}
            {location && <span>{location}</span>}
          </div>
          <ContactForm text={form} />
        </div>
      </dialog>
    </>
  );
}
