import { Mail, Phone } from "lucide-react";
import { brand, contact, footer, navLinks } from "../data/siteContent";

export default function Footer() {
  return (
    <footer className="bg-ink px-6 pb-10 pt-20 text-paper md:px-10">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid grid-cols-1 gap-10 border-b border-walnut pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-14">
          <div>
            <div className="mb-4 flex items-center gap-4">
              <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center border border-amber font-script text-2xl text-amber">
                {brand.monogram}
              </span>
              <span className="font-script text-2xl text-paper">{brand.name}</span>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-jute">{footer.tagline}</p>
            <div className="flex gap-4">
              {footer.socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs uppercase tracking-wide text-jute hover:text-amber"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Navigation du pied de page" className="flex flex-col gap-2.5">
            <span className="mb-1 text-[11px] uppercase tracking-wide text-amber">Navigation</span>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-paper hover:text-amber">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-2.5">
            <span className="mb-1 text-[11px] uppercase tracking-wide text-amber">
              Informations légales
            </span>
            {footer.legalLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-sm text-paper hover:text-amber">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[11px] uppercase tracking-wide text-amber">Contact</span>
            <div className="flex items-center gap-2.5">
              <Mail className="h-[15px] w-[15px] text-amber" strokeWidth={1.4} aria-hidden="true" />
              <a href={`mailto:${contact.email}`} className="text-sm text-paper">
                {contact.email}
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="h-[15px] w-[15px] text-amber" strokeWidth={1.4} aria-hidden="true" />
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="text-sm text-paper">
                {contact.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 pt-7 sm:flex-row sm:justify-between">
          <span className="text-xs text-jute">{footer.copyright}</span>
          <span className="font-script text-base text-amber">{footer.signature}</span>
        </div>
      </div>
    </footer>
  );
}
