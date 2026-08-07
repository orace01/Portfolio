import { type ChangeEvent, type FormEvent, useState } from 'react'
import PageShell from '@/components/layout/PageShell'
import GlowCard from '@/components/ui/GlowCard'
import { NeonButton } from '@/components/ui/NeonButton'
import { useCaine } from '@/context/CaineContext'
import { useCaineReaction } from '@/hooks/useCaineReaction'
import { HOVER_LINES } from '@/lib/caine-lines'

const SOCIALS = [
  { label: 'GITHUB', href: 'https://github.com/', reactionKey: 'social_github' },
  { label: 'LINKEDIN', href: 'https://linkedin.com/', reactionKey: 'social_linkedin' },
  { label: 'ARTSTATION', href: 'https://artstation.com/', reactionKey: 'social_artstation' },
]

const CONFIRM_LINES = [
  "Message received — Caine's forwarding it now.",
  "Logged, encrypted, and yelled down the hallway to him.",
  "Transmission successful. He'll reply once the coffee kicks in.",
  "Filed under 'urgent.' He'll disagree, but I filed it anyway.",
]

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface FormState {
  name: string
  email: string
  message: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

function validate(state: FormState): FormErrors {
  const errors: FormErrors = {}
  if (!state.name.trim()) errors.name = 'Tell Caine who you are.'
  if (!state.email.trim()) errors.email = 'An email is required to get a reply.'
  else if (!EMAIL_PATTERN.test(state.email.trim())) errors.email = "That doesn't look like a valid email."
  if (!state.message.trim()) errors.message = 'Silence spooks the circus — say something.'
  return errors
}

function SocialLink({ label, href, reactionKey }: { label: string; href: string; reactionKey: string }) {
  const reaction = useCaineReaction(HOVER_LINES[reactionKey])
  return (
    <a href={href} target="_blank" rel="noreferrer" className="bracket-btn" {...reaction}>
      [ {label} ]
    </a>
  )
}

export default function Contact() {
  const { say } = useCaine()
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const locationReaction = useCaineReaction(HOVER_LINES.contact_location)
  const emailReaction = useCaineReaction(HOVER_LINES.contact_email)
  const formReaction = useCaineReaction(HOVER_LINES['contact-form'])

  const updateField = (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    say(CONFIRM_LINES[Math.floor(Math.random() * CONFIRM_LINES.length)])
    setSubmitted(true)
  }

  const handleReset = () => {
    setForm({ name: '', email: '', message: '' })
    setErrors({})
    setSubmitted(false)
  }

  return (
    <PageShell title="CONTACT" subtitle="Direct line to the ringmaster. No hold music.">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-5">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <GlowCard tone="cyan" className="flex flex-col gap-5">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">Direct Info</h2>
            <div className="flex flex-col gap-4">
              <div tabIndex={0} className="rounded-lg outline-none" {...locationReaction}>
                <p className="text-xs uppercase tracking-wide text-slate-500">Location</p>
                <p className="neon-text-cyan text-lg font-semibold">Cotonou, Benin</p>
              </div>
              <div className="h-px w-full bg-white/10" />
              <a href="mailto:orace.honfin@epitech.eu" className="block rounded-lg outline-none" {...emailReaction}>
                <p className="text-xs uppercase tracking-wide text-slate-500">Email</p>
                <p className="neon-text-magenta break-all text-lg font-semibold">orace.honfin@epitech.eu</p>
              </a>
            </div>
          </GlowCard>

          <GlowCard tone="purple" className="flex flex-col gap-4">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">Elsewhere</h2>
            <div className="flex flex-wrap gap-5">
              {SOCIALS.map((s) => (
                <SocialLink key={s.label} {...s} />
              ))}
            </div>
          </GlowCard>
        </div>

        <GlowCard tone="magenta" className="lg:col-span-3" {...formReaction}>
          {submitted ? (
            <div className="flex flex-col items-center justify-center gap-4 py-14 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-magenta-neon">Transmission Received</p>
              <p className="neon-text-cyan text-lg font-semibold sm:text-xl">
                Message received — Caine's forwarding it now.
              </p>
              <button type="button" onClick={handleReset} className="bracket-btn mt-2">
                [ Send Another ]
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">Send A Transmission</h2>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs uppercase tracking-wide text-slate-400">
                  Name
                </label>
                <input
                  id="name"
                  value={form.name}
                  onChange={updateField('name')}
                  placeholder="Who's asking?"
                  aria-invalid={Boolean(errors.name)}
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:border-cyan-neon focus:outline-none"
                />
                {errors.name ? <p className="text-xs text-magenta-neon">{errors.name}</p> : null}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs uppercase tracking-wide text-slate-400">
                  Email
                </label>
                <input
                  id="email"
                  value={form.email}
                  onChange={updateField('email')}
                  placeholder="you@somewhere.dev"
                  aria-invalid={Boolean(errors.email)}
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:border-cyan-neon focus:outline-none"
                />
                {errors.email ? <p className="text-xs text-magenta-neon">{errors.email}</p> : null}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs uppercase tracking-wide text-slate-400">
                  Message
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={updateField('message')}
                  placeholder="Type kindly. Caine reads everything before he does."
                  rows={5}
                  aria-invalid={Boolean(errors.message)}
                  className="resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:border-cyan-neon focus:outline-none"
                />
                {errors.message ? <p className="text-xs text-magenta-neon">{errors.message}</p> : null}
              </div>

              <NeonButton type="submit" tone="magenta" className="self-start">
                Send Transmission
              </NeonButton>
            </form>
          )}
        </GlowCard>
      </div>
    </PageShell>
  )
}
