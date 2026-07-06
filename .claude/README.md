# .claude/ · le harnais de votre agent

Ce dossier configure la façon dont l'agent travaille DANS ce projet.
Il est versionné exprès : le harnais fait partie du produit, au même
titre que `CLAUDE.md`.

## Ce qu'il contient à ce barreau (h1)

- `settings.json` : les permissions de l'agent.
  - **allow** : ce qu'il peut faire sans vous demander (installer, builder,
    committer, lire et modifier les fichiers du projet).
  - **deny** : ce qu'il ne peut PAS faire, même si vous le lui demandez
    par mégarde (`rm -rf`, `git push --force`). Un garde-fou ne repose
    jamais sur la bonne volonté, ni la vôtre ni celle de l'agent.

## Ce qu'il contiendra en montant

Le harnais grandit barreau par barreau :

- **h2** : une commande maison, `/goal` (`commands/goal.md`)
- **h3** : la commande `/verifier` et son format de rapport
- **h4** : des tools branchés par MCP (`.mcp.json` à la racine)
- **h5** : des hooks et des skills, les gestes qui se déclenchent seuls
