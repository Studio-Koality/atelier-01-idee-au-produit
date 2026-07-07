# TP n°5 · Synthèse : ce que vous avez monté (~20 min)

**Atelier « Travailler avec une IA qui code » · Koality Academy**

Pas de nouveau code dans cette partie : on relit la journée, on nomme ce
qui a été construit, et on ouvre les portes pour la suite. Document à
relire à tête reposée.

---

## 1. L'inventaire

Regardez ce que contient votre projet en dehors du code :

```bash
ls CLAUDE.md .mcp.json docs/SPEC.md .claude/
```

| Pièce | Ce qu'elle règle | Montée au |
|---|---|---|
| `CLAUDE.md` | comment l'agent travaille chez vous | TP1 |
| `.claude/settings.json` | ce qu'il peut faire seul, ce qui est interdit | TP1 |
| `.mcp.json` + `memoire.json` | ce qu'il retient d'une session à l'autre | TP1 |
| `docs/SPEC.md` | ce qu'on construit, décisions tracées | TP3 |
| `.claude/commands/verifier.md` | comment on sait où on en est | TP3 |
| `.claude/commands/goal.md` | comment on délègue gros | TP4 |

Deux constats :

1. **Aucune de ces pièces n'est du code.** Des fichiers texte, lisibles,
   versionnés avec le projet. L'ensemble se remonte en 30 minutes sur
   n'importe quel projet, et il ne dépend pas du modèle du moment :
   changez d'IA demain, tout ça reste.
2. **Chaque pièce a été montée en réponse à quelque chose que vous avez
   VÉCU aujourd'hui**, pas à un dogme. Le vibe coding du TP2 sans spec
   a produit un produit probable ; la spec l'a rendu vôtre. « Ça a l'air
   de marcher » ne prouvait rien ; `/verifier` étiquette ce qui est
   prouvé.

Cet ensemble de pièces autour du modèle porte un nom dans l'industrie :
le **harnais** (harness). Retenez la proportion qui va avec : dans un
agent qui travaille bien, il y a un peu de modèle et beaucoup de
harnais. Quand ça déraille, cherchez la pièce de harnais manquante
avant d'accuser le modèle : c'est presque toujours elle.

## 2. Votre journée sur une carte

Vous avez traversé, dans l'ordre, les deux grands modes de travail avec
une IA qui code :

- **Le matin, côté « vibe »** : demander, regarder, réagir. Rapide,
  grisant, parfait pour explorer et prototyper. Les décisions se
  prennent toutes seules, quelque part, sans trace.
- **L'après-midi, côté « délégation encadrée »** : une spec qui fait
  référence, une vérification qui étiquette, un objectif qu'on confie.
  Plus lent à mettre en place, et c'est ce qui permet de déléguer gros
  sans perdre la main.

Entre les deux, un curseur, pas une morale. Se placer dessus est un
choix PAR TÂCHE : on vibe-code un prototype du vendredi soir, on ne
vibe-code pas la facturation. Ce qui est grave, ce n'est pas d'être à
gauche : c'est de ne pas savoir où on est.

## 3. Pour aller plus loin (les portes ouvertes)

Chacune de ces portes s'appuie sur ce que vous savez déjà faire :

- **Les automatismes.** Un geste que vous répétez à chaque session peut
  se déclencher tout seul. Exemple concret, à essayer chez vous : un
  « hook » qui lance la vérification des types après chaque modification
  de fichier par l'agent (dans `.claude/settings.json`, section
  `hooks`). L'agent se fait corriger par votre outillage, sans vous.
- **Les sous-agents.** Un agent qui vérifie le travail d'un autre :
  votre `/verifier` devient un dialogue entre deux sessions, votre
  rapport devient un débat contradictoire.
- **L'agent dans l'intégration continue.** Le même `/verifier`, lancé
  automatiquement sur chaque proposition de changement de votre équipe.
- **Les évaluations.** Aujourd'hui vous avez vérifié à la main. L'étape
  d'après : des vérifications qui notent le travail de l'agent
  automatiquement, et qui vous disent si un changement de règles
  améliore ou dégrade ses résultats.

Rien de tout ça n'est une autre magie : ce sont les mêmes pièces que
vos six fichiers, assemblées plus loin.

## 4. Chez vous, cette semaine

Le meilleur exercice pour ancrer la journée :

1. Recopiez votre setup du TP1 dans un de VOS projets (10 minutes,
   adaptez les règles techniques).
2. Rejouez l'interview inversée du TP3 sur VOTRE idée de produit, avec
   le gabarit `docs/SPEC-TEMPLATE.md`. C'est là que la méthode prend
   toute sa valeur : sur un sujet dont vous êtes vraiment le client.
3. Une fonctionnalité par `/goal`, une réception par `/verifier`.

Le repo de l'atelier reste public, avec vos points de repère : la
branche `setup-complet` (le setup de référence), `secours-produit` et
`secours-admin` (les états construits pendant la préparation).

---

## Le mémo à emporter

Toute la journée en un tableau. Pour chaque pièce : le fichier, ce
qu'il faut adapter sur vos projets, et le TP où tout est expliqué.

| Pièce | Fichier | À adapter chez vous | Détail |
|---|---|---|---|
| Règles | `CLAUDE.md` | vos règles techniques, vos manies | TP1 §3 |
| Permissions | `.claude/settings.json` | vos commandes dans `allow` | TP1 §4 |
| Mémoire | `.mcp.json` | rien, recopiable | TP1 §5 |
| Spec | `docs/SPEC.md` | tout : c'est VOTRE produit (gabarit + interview fournis) | TP3 §1 |
| Vérification | `.claude/commands/verifier.md` | le chemin de la spec, la commande de build | TP3 §2 |
| Délégation | `.claude/commands/goal.md` | rien, recopiable | TP4 §1 |

Et les trois réflexes qui vont avec les fichiers :

1. Quand l'agent déraille : corriger la règle, pas le prompt suivant.
2. Quand une décision se prend : elle atterrit dans la spec ou dans la
   mémoire, jamais nulle part.
3. Quand un travail se termine : un rapport étiqueté (testé / relu /
   non couvert), et c'est vous qui décidez de la suite.

## La journée en une phrase

Vous êtes arrivés avec un outil impressionnant et imprévisible ; vous
repartez avec un environnement de travail où cette imprévisibilité est
encadrée par des fichiers que VOUS écrivez : des règles, une mémoire,
une spec, une vérification. Le modèle ne vous appartiendra jamais ;
tout le reste, si.
