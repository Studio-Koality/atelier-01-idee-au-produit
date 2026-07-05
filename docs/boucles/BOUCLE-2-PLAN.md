# Boucle 2 — PLAN : réserver un créneau

## Objectif de la boucle

Les écrans 2 et 3 de la maquette : choisir un créneau, laisser nom + email,
voir la confirmation. La réservation fonctionne de bout en bout, en local.

## Ce que l'agent propose

1. `lib/store.ts` : un magasin en mémoire (copie mutable des données de démo).
   **Choix assumé** : la réservation vit en mémoire le temps de valider le
   parcours. La vraie persistance (Supabase) est la boucle 3, la concurrence
   entre deux patients aussi.
2. `app/consultation/[id]/page.tsx` : détail d'une consultation, créneaux en
   pastilles (grille), formulaire nom + email, bouton unique « Réserver ».
3. `lib/actions.ts` : l'action serveur `reserver` — valide le créneau, enregistre,
   marque le créneau comme pris, redirige vers la confirmation.
4. `app/confirmation/[id]/page.tsx` : le récapitulatif, ton chaleureux (écran 3).

## Ce que la boucle NE fait PAS

- Pas de paiement : le bouton dit « Réserver », il dira « Réserver et payer »
  quand Stripe arrivera (étape 4). La spec n'est PAS encore respectée sur ce
  point, et c'est tracé ici pour ne pas l'oublier.
- Pas de gestion de la concurrence réelle (deux patients, même créneau) : boucle 3.

## Critère de fin de boucle

Une réservation complète : catalogue → créneau → formulaire → confirmation,
et le créneau réservé n'est plus proposé (spec §3, critère 1).
