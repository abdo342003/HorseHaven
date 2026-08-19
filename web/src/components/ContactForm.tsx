"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = `Bonjour Horse Haven,\nNom : ${name}\nEmail : ${email || "non renseigné"}\nMessage : ${message}`;
    window.open(
      `https://wa.me/3368510101?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
  }

  const inputCls =
    "w-full rounded-xl border border-gold/40 bg-white px-4 py-2.5 text-sm text-navy placeholder:text-graytext focus:border-royalblue focus:outline-none focus:ring-2 focus:ring-royalblue/30";

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-gold/30 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="font-display text-xl font-semibold text-navy">{t("contact.formTitle")}</h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-sm font-semibold text-navy">
            {t("contact.name")} *
          </label>
          <input
            id="contact-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm font-semibold text-navy">
            {t("contact.email")}
          </label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls}
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-semibold text-navy">
          {t("contact.message")} *
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={inputCls}
        />
      </div>

      {sent ? (
        <p className="mt-5 rounded-lg bg-green/10 px-4 py-3 text-sm font-semibold text-green" role="status">
          {t("contact.sent")}
        </p>
      ) : (
        <button
          type="submit"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-8 py-3 text-sm font-bold text-navy shadow-lg transition-colors hover:bg-[#c2ae8d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          {t("contact.send")}
        </button>
      )}
    </form>
  );
}