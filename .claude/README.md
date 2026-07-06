# .claude/ · Le harnais de votre agent

Ce dossier configure la façon dont l'agent travaille DANS ce projet.
Il est versionné exprès : le harnais fait partie du produit, au même titre
que `CLAUDE.md`.

## Ce qu'il contient aujourd'hui (étape 0)

- `settings.json` : les permissions de l'agent.
  - **allow** : ce qu'il peut faire sans vous demander (installer, builder,
    committer, lire et modifier les fichiers du projet).
  - **deny** : ce qu'il ne peut PAS faire, même si vous le lui demandez par
    mégarde (`rm -rf`, `git push --force`). Un garde-fou ne repose jamais
    sur la bonne volonté, ni la vôtre ni celle de l'agent.

## Ce qu'il contiendra plus tard

À l'étape 3, on y ajoutera une commande personnalisée (`commands/verifier.md`) :
le harnais grandit avec le produit. Retenez la règle des proportions :
**un agent, c'est ~10% de modèle et ~90% de harnais.** Quand quelque chose
déraille, on débogue d'abord ici, pas dans le modèle.
