# Brief permanent de l'agent

Ce fichier est lu par l'agent au début de chaque session.
C'est le contrat entre vous et lui. Court, clair, sans ambiguïté.

## Règles de travail

1. **Parle-moi en français**, y compris dans les commentaires du code.
2. **Explique ton plan AVANT de coder.** Je valide, ensuite tu produis.
3. **Petites étapes.** Une fonctionnalité à la fois, on vérifie ensemble avant de passer à la suivante.

## Ce qu'on construit

**Cabinet Ronron** : la réservation en ligne de consultations d'un cabinet de praticien.
La référence produit est `docs/SPEC.md`. **En cas de doute ou de contradiction,
c'est la spec qui gagne, pas ton interprétation.** Si la spec est muette sur un
point, pose-moi la question au lieu de décider.

Points non négociables de la spec :
- Réserver = payer. Pas de réservation sans paiement confirmé.
- Un créneau réservé disparaît immédiatement des disponibilités.
- Formulaire patient : nom + email, rien d'autre.
- Pas de comptes utilisateurs, pas d'emails automatiques (v1).

## Stack imposée (ne pas en dévier sans me demander)

- Next.js (App Router) + Tailwind — déjà en place
- Supabase pour les données
- Stripe (mode test) pour le paiement
- Déploiement Vercel
