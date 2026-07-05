# 📍 Vous êtes ici : Étape 4 — En ligne, payé, facturé

> Branche `step-4-deploy`. Le produit est complet : la spec est entière,
> y compris le paiement, et le chemin vers la mise en ligne est balisé.

## Ce qui vient de se passer

1. **La dette du paiement est remboursée** (boucle 5) : « Réserver » est devenu
   « Réserver et payer ». Le créneau est pris avant le paiement, le webhook Stripe
   décide de la suite : validé → réservation, abandonné → créneau libéré.
2. **La spec a été amendée en connaissance de cause** : elle disait « libéré à
   10 minutes », Stripe impose 30. On ne tord pas le code en silence : on remonte
   à la spec, on amende, on trace (voir `docs/boucles/BOUCLE-5-VERIF.md`).
3. **Le déploiement est écrit en paliers** (`docs/DEPLOIEMENT.md`) : démo en ligne
   en 5 min, puis Supabase, puis Stripe. Chaque palier tient debout seul.
4. **La facture s'apprend** (`docs/COUTS.md`) : ce qui coûte, c'est le contexte
   relu à chaque tour, fois le nombre de tours. Un CLAUDE.md court est une
   décision économique.

## Les garde-fous de cette étape

- Une clé Stripe **live** fait refuser le démarrage : ce repo est un atelier,
  il n'encaissera jamais un vrai euro.
- Le webhook vérifie sa signature avant d'agir : un webhook ouvert est une
  porte d'entrée publique sur votre base.
- La réservation naît dans le webhook, jamais sur la page de retour : une page
  peut ne jamais être ouverte, un événement signé arrive toujours.

## ⚡ Encart dev

Le flux paiement est un exemple de **machine à états pilotée par événements** :
l'état du créneau (libre → pris → réservé ou re-libre) ne change que sur des
événements sûrs (UPDATE conditionnel, webhook signé). La page de retour n'est
qu'une VUE sur cet état, elle n'en décide rien. Ce découpage rend le système
insensible aux pages fermées, aux doubles clics et aux retours mal synchronisés.

## Étape suivante

`git checkout main` : le bilan, la carte complète du repo, et le guide animateur.
