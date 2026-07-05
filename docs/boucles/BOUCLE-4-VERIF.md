# Boucle 4 — VÉRIF : rapport de vérification

## Testé (exécuté, prouvé)

**Par HTTP, comme un navigateur :**
- `/admin` sans clé → 404 ✅ · mauvaise clé → 404 ✅ · bonne clé → 200 ✅
- Réservation de Félix visible dans l'admin, créneau marqué « réservé » ✅

**À la couche de données, directement (5 preuves) :**
- Réserver un créneau libre → accepté ✅
- Supprimer un créneau réservé → **refusé** ✅ (spec §5)
- Le créneau réservé existe toujours après la tentative ✅
- Supprimer un créneau libre → accepté ✅
- Re-réserver un créneau pris → refusé ✅ (spec §5, cas 1)

## L'incident de vérification (encore un, tant mieux)

Premier test de la suppression forgée : concluant en apparence, mais la page
admin n'expose l'identifiant que des créneaux LIBRES (les réservés n'ont pas
de formulaire). Le test forgeait donc peut-être la suppression... d'un créneau
libre. Preuve refaite à la couche de données, sans ambiguïté cette fois.
**Un test doit viser la règle, pas l'interface qui la reflète.**

## Rapport

| Conforme | Écarts / limites |
|---|---|
| Les 3 gestes du praticien (spec §4), testés | **Fuseau codé en dur** dans l'ajout de créneau (`+02:00` = heure d'été). En hiver, décalage d'une heure. Assumé v1, tracé : la gestion propre des fuseaux mérite une bibliothèque dédiée, pas un correctif de coin de table. |
| Accès par clé : 404 sans elle, actions revérifiées | La clé voyage dans l'URL (historique navigateur). Proportionné à l'enjeu v1, décision actée au plan et dans la spec. |
| Créneau réservé insupprimable, prouvé | — |
| Scope négatif respecté (pas de stats, pas d'export) | — |

## La leçon de la boucle

La spec était muette sur l'accès admin : l'agent a posé la question au lieu
de décider (règle CLAUDE.md), l'humain a tranché, la spec a été corrigée à la
source. Un produit dont la spec se répare à chaque trou découvert vieillit
bien ; un produit dont les trous se réparent dans le code devient illisible.

## Décision

Fuseau en dur : assumé v1, tracé ici. Étape 3 terminée : le produit fait
tout ce que la spec demande, sauf UNE chose, toujours la même : le paiement.
Direction l'étape 4.
