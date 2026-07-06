# Boucle admin · PLAN (temps 1 sur 3)

> La boucle a trois temps : plan, production, vérification.
> Ce fichier est le premier temps, écrit par l'agent, validé par l'humain
> AVANT toute production.

## L'objectif (tiré de la spec §4)

Le praticien doit pouvoir, sans développeur : voir les réservations (les
plus proches d'abord), ajouter ou retirer des créneaux, marquer une
réservation honorée ou annulée.

## La question que la spec laissait ouverte

**Comment le praticien accède-t-il à cette page ?** La spec §4 liste ses
gestes mais ne dit rien de l'accès. L'agent s'est arrêté (règle du /goal :
si la spec est muette, on tranche AVANT de coder) et a proposé trois options :

1. Pas de protection du tout (une URL cachée) : indéfendable, un crawler la trouve.
2. Comptes + mots de passe : hors de proportion pour un praticien seul, et
   le scope négatif dit « pas de comptes ».
3. **Une clé simple dans l'URL, stockée dans la config.** Pas de session,
   pas de table utilisateurs, révocable en changeant une variable.

**Décision de l'humain : option 3.** La spec est amendée dans ce commit,
la décision est tracée ici. Une spec muette qui le reste devient un piège ;
une spec amendée par écrit devient une mémoire.

## Le découpage annoncé

1. Couche de données : lister les réservations triées, lister les créneaux
   futurs, ajouter un créneau, retirer un créneau, changer un statut.
   La règle « un créneau réservé ne peut pas être supprimé » (spec §5)
   vit ICI, dans la couche de données : une interface se contourne.
2. Actions serveur : chaque action revérifie la clé. On ne fait jamais
   confiance à l'affichage pour la sécurité.
3. L'écran : une page, deux blocs (réservations, créneaux).

## Ce que cette boucle ne fait PAS

Pas de statistiques, pas d'export, pas d'emails. La spec §4 liste trois
gestes, la boucle en livre trois.
