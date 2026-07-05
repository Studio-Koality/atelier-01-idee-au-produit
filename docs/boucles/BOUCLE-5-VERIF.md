# Boucle 5 — VÉRIF : rapport de vérification

## Testé (exécuté, prouvé)

- Mode démo : **zéro régression**, parcours complet rejoué sur serveur neuf,
  bouton « Réserver » (sans paiement) ✅
- Webhook sans configuration → 400, rien ne se passe ✅
- **Garde-fou anti clé live** : `sk_live_...` → l'application refuse de
  démarrer, message explicite ✅ (testé en injectant une fausse clé live)
- Clé test `sk_test_...` → `modePaiement` s'active ✅

## Relu (plausible, pas prouvé ici)

- Le flux Stripe complet (checkout → webhook → réservation, abandon →
  libération) : demande un compte Stripe et un tunnel de webhook.
  **À exécuter au déploiement**, c'est la checklist de `DEPLOIEMENT.md`.

## Incident de vérification (pour la collection)

`modePaiement = undefined` au premier test... alors que le code était bon.
Coupable : l'outil de test (interop de modules), pas le module. Vérifié en
inspectant les exports réels. Deuxième occurrence de la même leçon :
**quand un test surprend, suspecter le test autant que le code.**

## Rapport

| Conforme | Écarts / décisions |
|---|---|
| Réserver = payer quand le paiement est actif (spec §3) | **Spec amendée** : libération à 30 min, pas 10. Stripe impose 30 min minimum d'expiration. Le cas limite avait été tranché à l'étape 1 sans connaître la contrainte de l'outil : normal, et c'est le bon moment pour amender. La spec suit le réel. |
| La réservation naît dans le webhook signé, jamais sur la page de retour | Page de retour : rechargement toutes les 2 s en attendant le webhook. Rustique, assumé v1. |
| Créneau pris avant paiement, libéré sur abandon (spec §5 cas 1 et 2) | — |
| Clés live refusées par principe (repo d'atelier) | — |

## La leçon de la boucle

Une spec écrite à l'étape 1 rencontre les contraintes du monde à l'étape 4 :
c'est le trajet normal. L'erreur serait de tordre le code en silence pour
« respecter » un chiffre devenu impossible. On remonte à la spec, on amende,
on trace. Le document reste la vérité, précisément parce qu'il sait changer.
