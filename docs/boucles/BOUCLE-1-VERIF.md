# Boucle 1 — VÉRIF : rapport de vérification

> Vérification exécutée avec la commande `/verifier` du harnais.
> Règle du rapport : sans complaisance. Un écart caché maintenant
> coûte une boucle plus tard.

## Build

`npm run build` : ✅ passe.

## Rapport

| Conforme | Écarts |
|---|---|
| Les 3 consultations de la spec, avec nom, durée, prix, description (spec §2) | **Le prix ne s'affichait PAS en roux.** La classe `text-[--roux]` (syntaxe Tailwind v3) ne génère aucun CSS en Tailwind v4 : le build passait, l'écran était faux. Corrigé en `text-(--roux)`. |
| Cartes cliquables entières, coins arrondis, un seul accent par écran | Les cartes pointent vers `/consultation/[id]` qui n'existe pas encore : un clic mène sur une 404. Assumé, c'est le périmètre de la boucle 2. |
| Le catalogue est l'accueil, pas de menu (interdits maquette) | — |
| Aucun ajout hors spec (scope négatif respecté) | — |

## La leçon de la boucle

**« Le build passe » ne veut pas dire « c'est conforme ».** Le build vérifie que
le code est cohérent avec lui-même ; il ne sait pas que le prix devait être roux.
Ça, seule la comparaison à la référence visuelle pouvait l'attraper. C'est
exactement la différence entre builder et vérifier, et c'est pour ça que la
boucle a trois temps et pas deux.

## Décision

Écart couleur : corrigé dans cette boucle (10 secondes).
Écart 404 : reporté en boucle 2 (c'est son périmètre).
