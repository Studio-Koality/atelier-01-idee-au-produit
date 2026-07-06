# Boucle admin · VÉRIF (temps 3 sur 3) : le rapport

> Vérification exécutée avec la commande `/verifier` du harnais.
> Chaque affirmation porte son étiquette : **testé** (exécuté, prouvé),
> **relu** (plausible, pas prouvé), **non couvert** (dit franchement).

## Le parcours joué (pas relu : exécuté)

Serveur lancé, parcours complet joué au niveau HTTP, sans navigateur :

1. `GET /consultation/suivi` → pastilles de créneaux ✅
2. `POST` du formulaire (multipart, comme un navigateur sans JavaScript)
   → `303 See Other`, `Location: /confirmation/resa-1` ✅
3. `GET /confirmation/resa-1` → récapitulatif complet ✅
4. Re-`GET /consultation/suivi` → **le créneau a disparu** ✅ (spec §3, critère 1)
5. `GET /admin?cle=ronron-demo` → la réservation de Félix Chat, statut Confirmée ✅ (spec §3, critère 3)
6. `GET /admin` sans clé → **404** ✅ (décision ADMIN-PLAN.md)

## L'écart attrapé (et l'histoire vraie de sa détection)

**Fuseau horaire.** Les heures du cabinet étaient des heures DU SERVEUR :
la génération des créneaux et leur affichage suivaient tous deux la machine.

Le piège, vécu pendant cette vérification : relancer le serveur avec
`TZ=UTC` affichait... exactement les mêmes heures. Le test « ne voyait
rien » parce que les deux bugs se compensaient à l'écran. C'est la preuve
par l'identifiant qui a tranché :

- serveur à Paris : `suivi-...T08:00:00.000Z`, affiché « mar. 10h00 »
- serveur en UTC : `suivi-...T10:00:00.000Z`, affiché « mar. 10h00 »

**Le même « mar. 10h00 » désignait deux instants différents selon le
serveur.** Un test qui passe ne prouve quelque chose que si on sait CE
qu'il regarde. L'écran ne suffisait pas ; il fallait inspecter la donnée.

Correction (dans cette boucle) : les heures du cabinet sont épinglées sur
le fuseau du cabinet aux trois endroits où le temps entre ou sort du
système : génération (`lib/data.ts`), affichage (`lib/format.ts`),
saisie admin (`lib/actions.ts`). Re-testé en `TZ=UTC` : mêmes instants,
même affichage. Invariance prouvée.

## Rapport

| Affirmation | Étiquette |
|---|---|
| Parcours patient complet, créneau retiré immédiatement (spec §3) | **testé** |
| Réservation visible côté admin, statuts modifiables (spec §4) | **testé** (liste) / **relu** (changement de statut : le formulaire existe et revérifie la clé, pas exécuté au niveau HTTP) |
| Admin sans clé : 404, actions revérifiées côté serveur | **testé** (404) / **relu** (revérification des actions) |
| Heures invariantes au fuseau du serveur | **testé** (avant/après, preuve par identifiant) |
| Créneau réservé insupprimable (spec §5) | **relu** (la règle vit dans la couche de données, lisible en 5 lignes) |
| Deux réservations au même instant exact (spec §5, cas 1) | **non couvert** : un seul processus en dev, le magasin tranche ; en multi-instances la garantie tombe. Assumé pour un bac à sable |
| Offset +02:00 codé en dur (heure d'été) | **relu**, limite assumée et commentée dans le code : un vrai produit prendrait une bibliothèque de fuseaux |

## La leçon de la boucle

Le build était vert du début à la fin. L'écart, lui, ne pouvait se voir
que de deux façons : en EXÉCUTANT le parcours (ce qui a prouvé ce qui
marche), et en RELISANT en critique « qu'est-ce qui casserait ailleurs ? »
(ce qui a trouvé le fuseau). Vérifier n'est pas builder, et un rapport
honnête étiquette ce qu'il sait : testé, relu, non couvert.
