import { useState, type FormEvent } from 'react'
import { contact } from '../data/siteContent'
import { GlassCard } from './GlassCard'

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitted'>('idle')

  function validate(): FormErrors {
    const next: FormErrors = {}
    if (form.name.trim().length < 2) next.name = 'Merci d’indiquer votre nom.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Adresse e-mail invalide.'
    if (form.message.trim().length < 10) next.message = 'Merci de détailler votre demande (10 caractères minimum).'
    return next
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length === 0) {
      setStatus('submitted')
    }
  }

  return (
    <>
      <section id="cabinet" className="relative mx-auto max-w-6xl px-6 pt-32">
        <div className="mx-auto mb-16 max-w-xl text-center">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Le cabinet</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <GlassCard>
            <h3 className="text-lg font-medium text-white">{contact.practiceName}</h3>
            <dl className="mt-4 space-y-3 text-sm text-muted">
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted/70">Adresse</dt>
                <dd className="text-white">{contact.address}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted/70">Téléphone</dt>
                <dd>
                  <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="text-white hover:text-cyan">
                    {contact.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted/70">E-mail</dt>
                <dd>
                  <a href={`mailto:${contact.email}`} className="text-white hover:text-cyan">
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted/70">Horaires</dt>
                <dd className="space-y-1">
                  {contact.hours.map((slot) => (
                    <div key={slot.day} className="flex justify-between gap-4">
                      <span>{slot.day}</span>
                      <span className="text-white">{slot.time}</span>
                    </div>
                  ))}
                </dd>
              </div>
            </dl>
          </GlassCard>

          <GlassCard className="flex items-center justify-center">
            {contact.mapEmbedUrl ? (
              <iframe
                title="Localisation du cabinet"
                src={contact.mapEmbedUrl}
                className="h-64 w-full rounded-xl"
                loading="lazy"
              />
            ) : (
              <div
                role="img"
                aria-label="Emplacement du cabinet — carte à intégrer"
                className="flex h-64 w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line text-center text-sm text-muted"
              >
                <span aria-hidden="true" className="text-2xl">
                  📍
                </span>
                Carte d'accès à intégrer
              </div>
            )}
          </GlassCard>
        </div>
      </section>

      <section id="contact" className="relative mx-auto max-w-6xl px-6 py-32">
        <div className="mx-auto mb-16 max-w-xl text-center">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Prendre rendez-vous</h2>
          <p className="mt-4 text-muted">
            Décrivez brièvement votre demande, ou utilisez directement notre outil de prise de rendez-vous.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <GlassCard>
            <a
              href={contact.bookingUrl}
              className="mb-4 inline-block w-full rounded-full bg-cyan px-6 py-3 text-center text-sm font-medium text-black transition-transform hover:scale-[1.02]"
              aria-label={`${contact.bookingCta} (lien de démonstration)`}
            >
              {contact.bookingCta}
            </a>
            <p className="text-xs text-muted">
              Lien de démonstration — aucun service de prise de rendez-vous n'est connecté. Intégrez ici votre outil
              (Calendly, Doctolib, etc.).
            </p>
          </GlassCard>

          <GlassCard>
            {status === 'submitted' ? (
              <p role="status" className="text-sm text-cyan">
                Formulaire de démonstration : votre message n'a pas été envoyé, aucun service n'est connecté à ce
                formulaire pour le moment.
              </p>
            ) : (
              <form noValidate onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="mb-1 block text-xs uppercase tracking-wide text-muted/70">
                    Nom
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className="w-full rounded-lg border border-line bg-abyss/60 px-3 py-2 text-sm text-white outline-none focus:border-cyan"
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-xs text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="mb-1 block text-xs uppercase tracking-wide text-muted/70">
                    E-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className="w-full rounded-lg border border-line bg-abyss/60 px-3 py-2 text-sm text-white outline-none focus:border-cyan"
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-xs text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="mb-1 block text-xs uppercase tracking-wide text-muted/70">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className="w-full rounded-lg border border-line bg-abyss/60 px-3 py-2 text-sm text-white outline-none focus:border-cyan"
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-xs text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full border border-cyan/60 px-6 py-3 text-sm text-cyan transition-colors hover:bg-cyan/10"
                >
                  Envoyer le message
                </button>
              </form>
            )}
          </GlassCard>
        </div>
      </section>
    </>
  )
}
