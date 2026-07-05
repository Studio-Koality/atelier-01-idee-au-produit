# De l'idée au produit · Créer avec l'IA — Atelier 01

Le repo fil rouge de l'atelier [Koality Academy](https://academy.koality.fr/ateliers-ete/) :
**Cabinet Ronron**, la réservation en ligne d'un cabinet de praticien, construite
en 3h30 avec un agent IA, en gardant la main à chaque étape.

Ce repo n'est pas seulement le résultat : **c'est la méthode, rejouable**.
Chaque étape de l'atelier est une branche, chaque boucle de travail est
tracée dans l'historique, chaque écart trouvé en vérification est documenté.

> **Vous êtes en atelier, là, maintenant ?** N'ouvrez que [`ATELIER.md`](ATELIER.md) :
> 10 lignes par étape, c'est tout ce qu'il vous faut. Le reste de ce repo est
> la lecture du soir et d'après.

## La carte

| Branche | Vous y trouvez | L'idée clé |
|---|---|---|
| `step-0-setup` | La coquille + le harnais de l'agent | Le produit commence dans CLAUDE.md, pas dans le code |
| `step-1-intention` | La spec, née d'une interview | L'agent interviewe, l'humain tranche, la spec gagne |
| `step-2-maquette` | La référence visuelle | Vérifier AVANT de coder est la vérification la moins chère |
| `step-3-boucles` | Le produit, en 4 boucles tracées | Plan → production → vérification, et l'historique raconte tout |
| `step-4-deploy` | Paiement, mise en ligne, coûts | La spec entière, le monde réel, la facture qui se lit |
| `main` | Tout, plus ce guide | — |

**Perdu pendant l'atelier ?** `git checkout step-N-...` et vous repartez de
l'état propre de l'étape N. Le fichier `README-ETAPE.md` de chaque branche
vous dit où vous êtes.

## Essayer tout de suite

```bash
npm install
npm run dev
```

- Parcours patient : http://localhost:3000
- Admin praticien : http://localhost:3000/admin?cle=ronron-demo

Tout tourne en **mode démo** sans aucun service externe. Pour brancher
Supabase, Stripe (test) et mettre en ligne : `docs/DEPLOIEMENT.md`.

## L'archétype : transposez à VOTRE idée

Ce produit est une instance de l'archétype **catalogue → détail → action** :
des choses à montrer, une action à déclencher, un petit admin. Un prof de
yoga, une créatrice de bijoux, une asso, un consultant : même squelette.

Pour transposer : rejouez l'interview (`docs/INTERVIEW.md`) avec votre sujet,
remplissez `docs/SPEC-TEMPLATE.md`, et déroulez les mêmes boucles.
**Le produit vit dans la spec, pas dans le code** : c'est la leçon centrale,
et ce repo en est la preuve.

## Comment lire ce repo

- `git log --oneline` : le journal de bord, il se lit comme un récit
- `docs/boucles/` : chaque boucle, son plan, sa vérification, ses écarts RÉELS
  (aucun n'est inventé, tous ont été trouvés en construisant)
- `CLAUDE.md` + `.claude/` : le contexte et le harnais de l'agent, versionnés
  comme du code, parce que c'en est
- Les encarts **⚡ dev** dans les README d'étapes : le niveau au-dessus,
  sans bloquer personne

## Les règles du repo

1. **Tout est committé** : specs, plans, config, `.env` de démo. Seuls les
   vendors sont ignorés. (Aucune vraie clé : les clés du jour J sont des
   clés de TEST, distribuées séparément.)
2. **La spec gagne toujours.** Quand le code et la spec divergent, on corrige
   le code ou on amende la spec, jamais on ne laisse flotter.
3. **Un rapport de vérification étiquette** : testé / relu / non couvert.

---

Atelier conçu par [Koality Academy](https://academy.koality.fr). Repo construit
avec la méthode qu'il enseigne, boucles, écarts et incidents compris.
