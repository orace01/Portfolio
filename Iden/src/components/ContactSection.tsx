import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { contact } from "../data/siteContent";
import { useReveal } from "../hooks/useReveal";

export default function ContactSection() {
  const revealInfo = useReveal();
  const revealForm = useReveal(0.15);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Aucun service d'envoi n'est connecté : on empêche simplement le
    // rechargement de page et on informe la personne visuellement.
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="border-b border-line">
      <div className="bg-mocha px-6 py-16 text-center md:px-10">
        <Mail className="mx-auto mb-4 h-7 w-7 text-paper" strokeWidth={1.4} aria-hidden="true" />
        <h2 className="font-script mb-3 text-4xl text-paper sm:text-5xl">{contact.bandTitle}</h2>
        <a
          href="#contact-form"
          className="inline-block border-b border-linen text-xs uppercase tracking-wide text-linen"
        >
          {contact.bandCta}
        </a>
      </div>

      <div className="px-6 py-24 md:px-10">
        <div className="mx-auto max-w-[1320px]">
          <p className="mb-14 max-w-xl text-base leading-relaxed text-ink">{contact.intro}</p>

          <div className="grid grid-cols-1 gap-16 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
            <motion.div {...revealInfo}>
              <dl className="mb-8 flex flex-col gap-5">
                <div>
                  <dt className="mb-1 text-[11px] uppercase tracking-wide text-mocha">E-mail</dt>
                  <dd className="text-[15px]">
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </dd>
                </div>
                <div>
                  <dt className="mb-1 text-[11px] uppercase tracking-wide text-mocha">
                    Téléphone
                  </dt>
                  <dd className="text-[15px]">
                    <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
                  </dd>
                </div>
                <div>
                  <dt className="mb-1 text-[11px] uppercase tracking-wide text-mocha">Adresse</dt>
                  <dd className="text-[15px]">{contact.address}</dd>
                </div>
                <div>
                  <dt className="mb-1 text-[11px] uppercase tracking-wide text-mocha">Horaires</dt>
                  <dd className="text-[15px]">{contact.hours}</dd>
                </div>
              </dl>
              <div className="flex h-[200px] items-center justify-center border border-line bg-champagne">
                <span className="text-xs uppercase tracking-wide text-walnut">
                  {contact.mapPlaceholder}
                </span>
              </div>
            </motion.div>

            <motion.div {...revealForm} id="contact-form">
              <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate={false}>
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-[11px] uppercase tracking-wide text-mocha">
                    Nom
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Votre nom"
                    className="w-full border-0 border-b border-line bg-transparent py-2.5 text-[15px] text-ink focus:border-walnut"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-[11px] uppercase tracking-wide text-mocha">
                    E-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="vous@exemple.fr"
                    className="w-full border-0 border-b border-line bg-transparent py-2.5 text-[15px] text-ink focus:border-walnut"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="mb-1.5 block text-[11px] uppercase tracking-wide text-mocha">
                    Entreprise
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Nom de votre entreprise (facultatif)"
                    className="w-full border-0 border-b border-line bg-transparent py-2.5 text-[15px] text-ink focus:border-walnut"
                  />
                </div>
                <div>
                  <label htmlFor="need" className="mb-1.5 block text-[11px] uppercase tracking-wide text-mocha">
                    Type de besoin
                  </label>
                  <select
                    id="need"
                    name="need"
                    className="w-full border-0 border-b border-line bg-transparent py-2.5 text-[15px] text-ink focus:border-walnut"
                  >
                    {contact.needTypes.map((need) => (
                      <option key={need}>{need}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-[11px] uppercase tracking-wide text-mocha">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    required
                    placeholder="Décrivez votre besoin en quelques mots"
                    className="w-full resize-none border-0 border-b border-line bg-transparent py-2.5 text-[15px] text-ink focus:border-walnut"
                  />
                </div>
                <button
                  type="submit"
                  className="self-start border border-walnut bg-walnut px-8 py-4 text-sm font-semibold text-paper transition-colors hover:bg-[#5c3319]"
                >
                  {contact.submitLabel}
                </button>
                <p role="status" className="text-xs italic text-mocha">
                  {submitted
                    ? "Merci ! Ce formulaire de démonstration n'envoie pas encore réellement de message — voir le README pour le connecter."
                    : contact.formNote}
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
