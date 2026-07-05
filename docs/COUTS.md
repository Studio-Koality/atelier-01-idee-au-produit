# COUTS — Lire sa facture, comprendre ce qui la fait

> La facture ne se devine pas, elle se lit. Cette page apprend OÙ la lire
> et QUOI en conclure. Les chiffres exacts sont les vôtres : remplissez le
> tableau en fin de page avec votre session du jour.

## Où lire

- Dans Claude Code : la commande `/cost` en fin de session
- Sur la console du fournisseur : l'historique d'utilisation, par jour et par modèle
- Sur Vercel / Supabase / Stripe : gratuits aux volumes d'un atelier
  (et longtemps après : un cabinet qui remplit son agenda tient très
  largement dans les paliers gratuits)

## Ce qui fait le prix : le contexte, pas la conversation

À chaque tour de boucle, l'agent relit TOUT son contexte. Votre facture,
c'est essentiellement :

```
(contexte statique + contexte dynamique) × nombre de tours
```

**Le contexte statique** est relu à CHAQUE tour :
- `CLAUDE.md` (le nôtre : ~40 lignes, c'est un choix)
- les règles, la mémoire, les garde-fous

**Le contexte dynamique** n'entre que quand il sert :
- les fichiers que l'agent ouvre pour la tâche en cours
- les résultats de commandes, les diffs

D'où deux règles économiques directes :

1. **Un CLAUDE.md court et dense n'est pas de l'élégance, c'est de l'argent.**
   Chaque ligne du brief permanent est refacturée à chaque tour de chaque session.
2. **Des boucles petites coûtent moins cher que des grandes.** Une boucle qui
   dérive accumule du contexte dynamique (fichiers ouverts, erreurs, corrections) ;
   la plupart du temps, mieux vaut clore et repartir propre.

## Ce que ce fil rouge a montré

- La quasi-totalité du coût part dans les boucles de l'étape 3-4 (le code),
  presque rien dans les étapes 1-2 (la spec, la maquette). **Là où c'est
  le moins cher est là où on corrige le mieux** : cadrez fort, maquettez tôt.
- Les incidents de vérification (le faux serveur de la boucle 3, le test
  ambigu de la boucle 4) ont coûté des tours supplémentaires. La vérification
  n'est pas gratuite, mais un écart NON détecté se paie plus tard, avec intérêts,
  en boucles de correction.

## ⚡ Encart dev

- **Petit modèle pour le routinier, grand modèle pour l'architecture** : les
  tâches mécaniques (renommages, formatage, extractions) n'ont pas besoin du
  modèle le plus cher. Les décisions de structure, si.
- **Le cache de prompt** : les fournisseurs facturent bien moins cher un
  contexte déjà vu récemment. Des sessions concentrées (plutôt qu'étalées)
  maximisent les hits de cache.
- La règle des proportions revient : ~10% modèle, ~90% harnais. Côté coûts
  c'est pareil : on optimise d'abord le harnais (contexte, taille des boucles),
  pas le choix du modèle.

## Votre session du jour (à remplir)

| Poste | Votre relevé |
|---|---|
| Tours de boucle (étape 3) | |
| Coût total session (`/cost`) | |
| Coût ÷ nombre de boucles | |
| Vercel / Supabase / Stripe | 0 € (paliers gratuits) |
| Le produit en ligne, au total | |

La dernière ligne est celle qui compte : c'est le prix réel de « de l'idée
au produit », et c'est probablement moins qu'un déjeuner.
