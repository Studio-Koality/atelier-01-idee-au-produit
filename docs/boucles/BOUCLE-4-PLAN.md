# Boucle 4 — PLAN : l'admin du praticien

## Objectif de la boucle

La spec §4 : le praticien voit ses réservations, gère ses créneaux et
les statuts, sans développeur.

## Un trou dans la spec, détecté au moment du plan

La spec ne dit RIEN de la protection de l'admin. Qui peut ouvrir cette page ?
Le CLAUDE.md est clair : « si la spec est muette, pose la question au lieu
de décider ». Question posée, décision de l'humain :

> **Une clé d'accès simple dans l'URL** (`/admin?cle=...`), stockée dans `.env`.
> Pas de comptes (cohérent avec la spec), pas de page de connexion. Suffisant
> pour une v1 dont l'enjeu est un agenda de cabinet, réévalué si l'enjeu grandit.

La spec est mise à jour (§4) : le trou est rebouché à la source, pas dans le code.

## Ce que l'agent propose

1. `lib/db.ts` s'étend : lister les réservations (les plus proches d'abord,
   spec §4), changer un statut, lister/ajouter/supprimer des créneaux.
   La règle spec §5 (« un créneau réservé ne peut pas être supprimé,
   seulement annulé ») vit DANS la couche de données, pas dans l'interface :
   une interface se contourne, une couche de données non.
2. `app/admin/page.tsx` : une seule page, deux blocs (réservations, créneaux),
   protégée par la clé.
3. `lib/actions.ts` s'étend : les actions admin, chacune revérifiant la clé
   (jamais faire confiance à l'affichage pour la sécurité).

## Ce que la boucle NE fait PAS

- Pas de statistiques, pas d'export, pas d'emails : spec §6.

## Critère de fin de boucle

Le praticien peut faire les 3 gestes de la spec §4. Sans la clé : rien.
Supprimer un créneau réservé : refusé, même en trichant avec l'URL.
