# Boucle 5 — PLAN : le paiement (étape 4)

> L'étape 4 ne change pas de méthode : c'est une boucle de plus. Elle rembourse
> la dette annoncée depuis la boucle 2 : « Réserver » devient « Réserver et payer ».

## Objectif de la boucle

Spec §3 : réserver = payer. Le paiement passe par Stripe Checkout en mode TEST
(cartes de test uniquement, `4242 4242 4242 4242`).

## Le flux proposé (et pourquoi)

1. Le patient soumet le formulaire → le créneau est PRIS immédiatement
   (UPDATE conditionnel, boucle 3 : personne d'autre ne peut le prendre).
2. Redirection vers la page de paiement Stripe (session à durée limitée).
3. **Paiement validé** (webhook `checkout.session.completed`) → la réservation
   est créée, le patient revient sur la confirmation.
4. **Paiement abandonné** (webhook `checkout.session.expired`) → le créneau
   est LIBÉRÉ. C'est le cas limite 2 de la spec : « le créneau est libéré
   au bout de 10 minutes sans paiement confirmé ».

## Ce que l'agent propose

- `lib/stripe.ts` : le client Stripe (mode test)
- `lib/actions.ts` : `reserver` branche vers Stripe quand la clé est configurée ;
  sinon le mode démo actuel (sans paiement) reste tel quel
- `app/api/stripe/webhook/route.ts` : le point d'entrée des événements Stripe,
  signature vérifiée (jamais de webhook sans vérification de signature)
- `app/confirmation/stripe/page.tsx` : le retour de paiement
- `supabase/schema.sql` : colonne `stripe_session_id` sur les réservations

## Ce que la boucle NE fait PAS

- Pas de remboursement en ligne (spec §6)
- Pas de mode LIVE : les clés live sont refusées par principe dans ce repo

## Critère de fin de boucle

En mode démo : rien ne change (zéro régression).
En mode Stripe test : payer crée la réservation, abandonner libère le créneau.
