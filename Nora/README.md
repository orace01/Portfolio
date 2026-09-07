# Portfolio — Chirurgie du rachis & traumatologie

Site vitrine pour un chirurgien orthopédiste spécialisé dans la colonne
vertébrale, avec une animation 3D de colonne vertébrale pilotée précisément
par le défilement de la page (vidéo découpée en frames, rendues dans un
`<canvas>` HTML5 et synchronisées via GSAP ScrollTrigger).

> Toutes les données affichées (nom du praticien, chiffres, formations,
> coordonnées…) sont des **données de démonstration** — voir
> [`src/data/siteContent.ts`](src/data/siteContent.ts) pour les remplacer.

## Stack technique

- React 19 + Vite + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`)
- GSAP + ScrollTrigger
- Canvas HTML5 (aucune lecture vidéo native pendant le scroll)
- FFmpeg pour découper la vidéo source en frames WebP

## Installation

```bash
npm install
```

### 1. Installer FFmpeg

Le découpage de la vidéo en frames nécessite FFmpeg (et `ffprobe`, fourni
avec) sur la machine :

```bash
# macOS
brew install ffmpeg

# Ubuntu / Debian
sudo apt install ffmpeg

# Fedora
sudo dnf install ffmpeg

# Windows
# https://ffmpeg.org/download.html
```

### 2. Placer la vidéo source

Placez votre vidéo à cet emplacement exact :

```text
public/source/spine.mp4
```

### 3. Générer les frames

```bash
npm run extract-frames
```

Ce script (`scripts/extract-frames.js`) :

- lit `public/source/spine.mp4` et sa durée (via `ffprobe`) ;
- calcule automatiquement la fréquence d'extraction pour viser ~120 frames
  (ajustable avec `--frames=150` ou la variable d'env `FRAME_COUNT`) ;
- découpe la vidéo en images WebP (qualité 80) avec FFmpeg, à
  `public/frames/spine_0001.webp`, `spine_0002.webp`, etc. ;
- floute automatiquement le coin bas-droit (watermark du générateur vidéo
  IA fourni avec ce projet) — désactivable avec `--no-watermark-mask` si vous
  utilisez un autre clip ;
- écrit `public/frames/manifest.json` (`{ count, prefix, ext, digits }`) afin
  que l'application détecte automatiquement le nombre total de frames, sans
  valeur codée en dur côté React.

Les frames et le manifeste sont regénérables (`.gitignore`) : relancez la
commande après tout remplacement de la vidéo source.

### 4. Lancer le projet

```bash
npm run dev       # serveur de développement
npm run build     # build de production (tsc + vite build)
npm run preview   # prévisualiser le build de production
npm run lint      # oxlint
```

## Architecture de l'animation

- `src/hooks/useImageSequence.ts` — précharge toutes les images listées dans
  `public/frames/manifest.json`, expose la progression du chargement, et
  dégrade proprement en cas d'erreur (manifeste manquant, frame en échec).
- `src/components/SpineCanvas.tsx` — canvas `position: fixed` en arrière-plan
  (`z-0`, `pointer-events: none`). Un `ScrollTrigger` (trigger = tout le
  document, `scrub: 0.5`) convertit la progression de scroll (0→1) en index
  de frame borné, dessiné en `contain` (sans déformation), avec prise en
  charge du `devicePixelRatio` et du redimensionnement. Le rendu est
  découplé du scroll via une boucle `requestAnimationFrame` qui ne redessine
  que si l'index a changé.
- `src/components/Preloader.tsx` — overlay affichant le compteur
  (`72 / 120 frames`) et la barre de progression pendant le chargement ;
  permet de continuer vers le site même si le manifeste ou certaines frames
  sont indisponibles.
- `prefers-reduced-motion` : si activé, `SpineCanvas` affiche une frame fixe
  (aucun `ScrollTrigger` créé) ; voir `src/hooks/usePrefersReducedMotion.ts`.

## Remplacer le contenu

Toutes les données du site (praticien, navigation, sections, coordonnées)
sont centralisées dans [`src/data/siteContent.ts`](src/data/siteContent.ts).
Le formulaire de contact et le bouton de prise de rendez-vous sont des
démonstrations côté client : aucun service n'est réellement connecté
(`contact.bookingUrl` est un lien placeholder, clairement indiqué dans le
code et à l'écran).

## Vérifications effectuées

- `npx tsc -b` : aucune erreur.
- `npx oxlint` : aucun avertissement.
- `npm run build` : build de production réussi.
- Vérification visuelle (Playwright, dev server) : préchargement des 120
  frames, canvas sans déformation, frame affichée qui change bien avec le
  scroll (0 %, 40 %, 90 %), rendu mobile (390px, menu burger) et rendu avec
  `prefers-reduced-motion: reduce` (frame fixe, pas de scrub).
