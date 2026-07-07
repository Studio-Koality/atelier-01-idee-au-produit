# Travailler avec une IA qui code · Atelier 01

Le repo de l'atelier [Koality Academy](https://academy.koality.fr/ateliers-ete/) :
une journée pour apprendre à travailler avec un agent IA, en montant un
vrai environnement de travail et en s'en servant pour produire. Le
produit construit en chemin (Cabinet Ronron, la réservation en ligne
d'un cabinet de praticien) est un bac à sable : ce qu'on garde, c'est
tout ce qu'il y a autour.

## L'atelier en 5 TP

Chaque sujet est à la fois l'énoncé du jour J et le support de cours à
emporter : tout ce qui est créé y est expliqué, justifié, avec sa
notice d'adaptation pour VOS projets.

| Sujet | Ce qu'on y fait | Durée |
|---|---|---|
| [TP1 · Le setup](docs/tp/TP1-le-setup.md) | monter l'environnement : règles, permissions, mémoire | ~45 min |
| [TP2 · Vibe coding](docs/tp/TP2-vibe-coding.md) | travailler en direct, observer ce que ça donne | ~30 min |
| [TP3 · Spec et boucle](docs/tp/TP3-spec-et-boucle.md) | la spec par interview, la vérification outillée, une boucle | ~60 min |
| [TP4 · Déléguer avec /goal](docs/tp/TP4-deleguer-avec-goal.md) | confier une fonctionnalité entière, superviser, réceptionner | ~40 min |
| [TP5 · Synthèse](docs/tp/TP5-synthese.md) | l'inventaire, le mémo à emporter, les portes ouvertes | ~20 min |

## Démarrer

```bash
git clone https://github.com/Studio-Koality/atelier-01-idee-au-produit.git
cd atelier-01-idee-au-produit
git checkout setup-depart
```

Puis ouvrez le TP1 et suivez. Tout tourne en local, sans aucun service
externe ni aucune clé.

## Les branches utiles

| Branche | Contenu |
|---|---|
| `setup-depart` | l'état de départ du TP1 : une coquille Next.js vide, et les 5 sujets dans `docs/tp/` |
| `setup-complet` | la correction du TP1 : règles, permissions, mémoire en place |
| `secours-produit` | un produit de référence (parcours patient + spec), si le vôtre est irrécupérable |
| `secours-admin` | idem, avec la partie praticien construite |

Les états de référence ont été construits avec la méthode que l'atelier
enseigne, pendant sa préparation : rien n'y est décoratif.

## Les règles du repo

1. **Tout est committé** : les règles de l'agent, sa config, ses
   commandes, sa mémoire. Cet outillage fait partie du projet, au même
   titre que le code. Seuls les vendors sont ignorés.
2. **Aucune vraie clé, nulle part.** La seule « clé » du projet est
   celle de l'admin de démo, committée exprès.
3. **La spec gagne.** Quand le code et `docs/SPEC.md` divergent, on
   corrige le code ou on amende la spec par écrit. Jamais l'inverse en
   silence.

## L'ancien parcours

Les branches `step-0-setup` à `step-4-deploy` portent une version
antérieure de l'atelier, orientée étapes produit (maquette, Supabase,
Stripe, déploiement). Elles restent lisibles, notamment
`docs/DEPLOIEMENT.md` et `docs/COUTS.md` pour qui veut mettre son
produit en ligne pour de vrai.

---

Atelier conçu par [Koality Academy](https://academy.koality.fr). Repo
construit avec la méthode qu'il enseigne.
