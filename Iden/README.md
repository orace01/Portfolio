# Fortune Honfin — Portfolio expertise comptable

Portfolio éditorial "Modern Print" pour une experte-comptable indépendante,
construit avec React, Vite, TypeScript et Tailwind CSS.

## Commandes

```bash
npm install
npm run dev       # serveur de développement
npm run build     # vérification TypeScript + build de production dans dist/
npm run preview   # prévisualise le build de production
npm run lint       # ESLint
```

## Contenu à personnaliser

Tous les textes, coordonnées et chiffres du site sont centralisés dans
[`src/data/siteContent.ts`](src/data/siteContent.ts). Modifiez ce fichier
pour remplacer :

- les coordonnées (e-mail, téléphone, adresse, horaires) ;
- les chiffres clés — actuellement des **données de démonstration**
  (`stats.isDemoData`), à remplacer avant mise en ligne ;
- les témoignages — également des **données de démonstration**
  (`testimonials.isDemoData`) ;
- les textes de chaque section.

## Photos

Chaque emplacement photo (hero, section « La comptabilité, autrement »,
les quatre blocs de la section Méthode, et le portrait « À propos »)
utilise le composant [`PhotoPlaceholder`](src/components/PhotoPlaceholder.tsx)
tant qu'aucune photo définitive n'est fournie. Pour remplacer un
emplacement par une vraie photo, remplacez le composant `<PhotoPlaceholder />`
correspondant par une balise `<img>` (avec un texte alternatif pertinent)
dans le composant de section concerné, et placez le fichier image dans
`public/images/`.

## Formulaire de contact

Le formulaire de la section Contact ([`ContactSection.tsx`](src/components/ContactSection.tsx))
est un formulaire de démonstration : il n'est connecté à aucun service
d'envoi d'e-mail ni de prise de rendez-vous. À la soumission, il affiche
simplement un message indicatif sans envoyer de données. Pour le rendre
fonctionnel, connectez-le à un service tiers (par exemple Formspree,
Resend, ou un backend dédié) dans la fonction `handleSubmit`.

## Palette et typographie

Les couleurs sont définies comme variables CSS dans
[`src/styles/globals.css`](src/styles/globals.css) et exposées comme
couleurs Tailwind dans [`tailwind.config.ts`](tailwind.config.ts)
(`bg-linen`, `text-walnut`, `bg-amber`, etc.).

La typographie combine **Parisienne** (titres, chiffres, citations —
classe utilitaire `font-script`) et **Inter** (texte courant), chargées
depuis Google Fonts dans `index.html`.

## Accessibilité

- HTML sémantique (`nav`, `main`, `section`, `footer`, `dl`, `figure`) ;
- navigation au clavier et états de focus visibles ;
- lien d'évitement vers le contenu principal ;
- champs de formulaire associés à des `<label>` ;
- animations désactivées si `prefers-reduced-motion` est actif.
