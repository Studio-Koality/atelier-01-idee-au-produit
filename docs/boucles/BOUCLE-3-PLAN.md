# Boucle 3 — PLAN : de vraies données (Supabase)

## Objectif de la boucle

Remplacer le magasin en mémoire par une vraie base : les réservations
survivent au redémarrage, et deux patients simultanés sont départagés
par la base, pas par la chance.

## Ce que l'agent propose

1. `supabase/schema.sql` : les 3 tables (consultations, creneaux, reservations),
   miroir exact de `lib/types.ts`, avec les données de démo incluses.
2. `lib/db.ts` : la couche d'accès aux données. **Un seul point de décision** :
   si les clés Supabase sont présentes dans `.env`, mode base ; sinon, mode
   démo (le magasin mémoire de la boucle 2). Les écrans ne changent PAS :
   ils parlent à `lib/db.ts`, ils ne savent pas qui répond.
3. La concurrence (spec §5, cas 1) : la réservation devient un
   `UPDATE ... WHERE reserve = false` — si la ligne a déjà basculé, la base
   refuse, le second patient est renvoyé au choix des créneaux. Le premier
   paiement validé gagne, personne ne « croit » avoir réservé.
4. `.env` committé avec des valeurs de démo À REMPLACER (les vraies clés de
   test sont distribuées le jour J).

## Ce que la boucle NE fait PAS

- Pas de paiement (étape 4, toujours tracé)
- Pas d'admin (boucle 4)

## Critère de fin de boucle

En mode démo, tout marche comme avant (aucune régression).
En mode base, le parcours complet fonctionne et une double réservation
simultanée ne crée qu'UNE réservation.
