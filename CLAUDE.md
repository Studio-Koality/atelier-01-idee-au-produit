# Règles du projet

Ce fichier est lu par l'agent au début de chaque session. C'est le
contrat entre vous et lui : court, clair, sans ambiguïté. Quand l'agent
déraille, on corrige d'abord ICI, pas dans le prompt suivant.

## Façon de travailler

1. **Parle-moi en français**, y compris dans les commentaires du code.
2. **Explique ton plan AVANT de coder.** Je valide, ensuite tu produis.
3. **Petites étapes.** Une fonctionnalité à la fois, on vérifie ensemble
   avant de passer à la suivante.

## Règles techniques (non négociables)

- Next.js 15 (App Router) + TypeScript.
- **Tailwind v4.** Le thème se déclare dans `app/globals.css` avec
  `@theme`. Ne crée JAMAIS de `tailwind.config.js` : c'est la syntaxe
  v3, ce projet l'ignore silencieusement.
- Palette du projet : crème `#faf6f0`, encre `#2b2118`, roux `#e07a3f`,
  sauge `#7a9b76`. **Un seul accent roux par écran.**
- Composants serveur par défaut. `"use client"` seulement quand il y a
  une vraie interaction.

## Ce qu'on construit

Cabinet Ronron : un praticien veut que ses patients réservent leurs
consultations en ligne, sans appels téléphoniques.

(Une phrase suffit pour démarrer. La spécification complète sera écrite
dans `docs/SPEC.md` pendant l'atelier, et ce paragraphe pointera vers
elle.)
