# Boucle 1 — PLAN : le catalogue

> Chaque boucle commence par un plan que l'agent propose et que l'humain valide.
> Ce fichier est committé AVANT le code : le plan fait partie de l'historique.

## Objectif de la boucle

L'écran 1 de la maquette : le catalogue des consultations, conforme à
`maquette/REFERENCE-VISUELLE.md`, avec les 3 types de consultation de la spec.

## Ce que l'agent propose

1. `lib/types.ts` : les types du domaine (Consultation, Creneau, Reservation),
   directement dérivés de la section 2 de la spec.
2. `lib/data.ts` : les données de démonstration (3 consultations, créneaux sur
   les jours à venir). **Choix assumé : données locales d'abord.** Supabase
   arrive en boucle 3, quand le produit mérite une base.
3. `app/page.tsx` : le catalogue en cartes cliquables (nom, durée, prix,
   description), tokens de la référence visuelle.

## Ce que la boucle NE fait PAS

- Pas de page détail (boucle 2)
- Pas de base de données (boucle 3)
- Pas d'admin (boucle 4)

## Critère de fin de boucle

`npm run build` passe, le catalogue affiché ressemble à l'écran 1 de
`maquette/maquette.html`, et `/verifier` ne remonte pas d'écart bloquant.
