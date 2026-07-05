# Boucle 3 — VÉRIF : rapport de vérification

## Le parcours re-testé (régression, mode démo)

Serveur relancé À NEUF, parcours complet rejoué : catalogue → créneau →
formulaire → confirmation → créneau disparu. ✅ Aucune régression : les
écrans branchés sur `lib/db.ts` se comportent exactement comme avant.

## L'incident de vérification (à raconter, il vaut de l'or)

Notre premier test de régression est passé... contre l'ANCIEN serveur,
qui tournait encore (le `pkill` ne matchait pas le nom réel du processus).
Indice qui a tout déclenché : la réservation s'appelait `resa-2` alors
qu'un serveur neuf aurait dit `resa-1`. Un détail qui cloche = on creuse.

**Leçon : un test qui passe ne prouve quelque chose que si le dispositif
de test est sain. Vérifiez aussi votre vérification.**

## Rapport

| Conforme | Écarts / limites |
|---|---|
| Mode démo : parcours complet, zéro régression (testé) | **Le mode Supabase n'a PAS été exécuté ici** : pas de projet Supabase dans cet environnement. Le code est relu, le schéma est cohérent avec les types, mais relire n'est pas exécuter. À tester le jour J avec les vraies clés de test (checklist dans DEPLOIEMENT.md, étape 4). |
| Concurrence : UPDATE conditionnel, la base tranche (spec §5 cas 1) | Même limite : la preuve par l'exécution reste à faire en conditions réelles. |
| schema.sql miroir exact de lib/types.ts | — |
| .env de démo committé, aucune vraie clé (règle du repo) | — |
| Créneau passé filtré aussi côté base (spec §2) | — |

## La leçon de la boucle

Un rapport de vérification honnête distingue **testé** (exécuté, prouvé),
**relu** (plausible, pas prouvé) et **non couvert**. Les trois existent dans
ce rapport, et ils sont étiquetés. C'est cette honnêteté qui rend le rapport
utile : « tout est OK » ne veut rien dire si on ne sait pas comment c'est su.

## Décision

Rien à corriger en mode démo. Test du mode base : reporté à l'étape 4,
tracé dans la checklist de déploiement. Boucle suivante : l'admin.
