# Boucle 2 — VÉRIF : rapport de vérification

> Vérification exécutée avec `/verifier`, PLUS un test du parcours réel :
> serveur lancé, formulaire soumis comme le ferait un navigateur, réponses inspectées.

## Le parcours testé (pas juste relu : exécuté)

1. `GET /` → le catalogue, les 3 consultations ✅
2. `GET /consultation/suivi` → pastilles de créneaux, formulaire nom + email ✅
3. `POST` du formulaire (créneau lun. 10h00, Félix Chat) → redirection `/confirmation/resa-1` ✅
4. `GET /confirmation/resa-1` → « C'est réservé, Félix. », récapitulatif complet ✅
5. **Re-`GET /consultation/suivi` → le créneau lun. 10h00 a disparu** ✅ (spec §3, critère 1)

## Rapport

| Conforme | Écarts |
|---|---|
| Parcours complet catalogue → confirmation (spec §1) | **Fuseau horaire.** Les heures étaient formatées avec le fuseau du SERVEUR. En local (Paris) : parfait. Sur Vercel (UTC) : toutes les heures décalées de 2h. Détecté en relecture, PAS par le test local, qui ne pouvait pas le voir. Corrigé : fuseau explicite `Europe/Paris`. |
| Formulaire : nom + email, rien d'autre (spec §3) | **Paiement absent.** « Réserver » sans payer viole la spec (§3 : réserver = payer). Dette ANNONCÉE au plan, tracée, remboursée à l'étape 4 avec Stripe. |
| Créneau réservé retiré immédiatement (spec §3) | **Concurrence naïve.** Deux patients au même instant : le magasin mémoire tranche, mais un seul processus serveur. En production multi-instances, la garantie tombe. Boucle 3 (la base tranchera). |
| Créneau passé jamais proposé (spec §2) | — |
| Message doux si créneau parti (spec §5, cas 1) | — |

## La leçon de la boucle

Deux catégories d'écarts, deux détections différentes :
- Le **test réel** attrape ce qui casse ici et maintenant (et prouve ce qui marche).
- La **relecture critique** attrape ce qui cassera AILLEURS (le fuseau en prod).
Un environnement local qui marche ne dit presque rien de la production :
c'est tout l'enjeu de l'étape 4.

## Décision

Fuseau : corrigé dans cette boucle. Paiement : étape 4 (tracé).
Concurrence : boucle 3 (tracé). Rien d'autre à corriger.
