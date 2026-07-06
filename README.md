# Le harnais, barreau par barreau · Atelier 01

Le repo de l'atelier [Koality Academy](https://academy.koality.fr/ateliers-ete/) :
**apprendre à travailler avec un agent IA pour coder**, en gravissant un
harnais barreau par barreau, du vibe coding au pilotage maîtrisé.

Le produit construit en chemin (Cabinet Ronron, une réservation de
consultations) est un bac à sable jetable. **Ce qui compte, c'est ce qui
l'entoure** : le contexte, la spec, la boucle de vérification, les tools,
les automatismes. À la fin, le code aura peu de valeur ; le harnais, si.

> **Vous êtes en atelier, là, maintenant ?** Sur chaque branche, n'ouvrez
> que [`ATELIER.md`](ATELIER.md) : 10 lignes, c'est tout ce qu'il vous faut.
> Le reste est la lecture du soir et d'après.

## La montée

Une branche par barreau. Chaque barreau naît d'une douleur vécue, ajoute
UNE pièce de harnais qui la soigne, et nomme UN concept.

| Branche | La douleur | La pièce ajoutée | Le concept |
|---|---|---|---|
| `h0-vibe` | build vert, écran faux | aucune, exprès | la magie a un plafond |
| `h1-contexte` | l'agent devine, oublie | `CLAUDE.md`, le contrat | le contexte, fenêtre finie |
| `h2-spec` | réexpliquer à chaque prompt | une spec + `/goal` | la spec gagne |
| `h3-boucle` | « ça a l'air de marcher » | `/verifier` + le rapport | vérifier n'est pas builder |
| `h4-tools` | l'agent ne sait pas faire X | une prise MCP | capacités = tools |
| `h5-automatismes` | les gestes qui se répètent | un hook, une skill | encoder ses gestes |
| `h6-carte` |  | la carte complète | le spectre vibe → agentic |

Pour monter : `git checkout h0-vibe`, puis suivez les cartes. Pour voir ce
qu'un barreau a ajouté exactement : `git diff h1-contexte h2-spec`, le diff
EST la pièce. Et `git log --oneline` se lit comme un récit : c'est voulu.

## Essayer tout de suite (n'importe quelle branche)

```bash
npm install
npm run dev
```

- Parcours patient : http://localhost:3000
- Admin praticien (à partir de `h3-boucle`) : http://localhost:3000/admin?cle=ronron-demo

Tout tourne en **mode démo**, sans aucun service externe ni aucune clé.

## Les écarts sont vrais

Le mur de `h0` (un build vert, un écran faux), l'écart du fuseau horaire de
`h3` (le même « mar. 10h00 » qui désigne deux instants selon le serveur),
l'incident du test qui ne pouvait rien voir : **aucun n'est inventé**. Tous
ont été rencontrés en construisant ce repo, et chacun est reproductible
(`docs/LE-MUR.md`, `docs/boucles/`).

## Comment lire ce repo, après l'atelier

- `docs/CARTE-DU-HARNAIS.md` (branche `h6-carte`) : la synthèse, le modèle
  mental, où aller ensuite
- `docs/boucles/` : les plans et rapports de vérification, étiquetés
  testé / relu / non couvert
- `CLAUDE.md` + `.claude/` + `.mcp.json` : le harnais complet, versionné
  comme du code, parce que c'en est
- `docs/SPEC-TEMPLATE.md` + `docs/INTERVIEW.md` : de quoi rejouer la
  méthode sur VOTRE idée

## Les règles du repo

1. **Tout est committé** : specs, plans, config, `.env` de démo, mémoire de
   l'agent. Seuls les vendors sont ignorés. Aucune vraie clé, nulle part.
2. **La spec gagne toujours.** Quand le code diverge, on corrige le code ;
   quand le réel contredit la spec, on l'amende par écrit.
3. **Un rapport de vérification étiquette** : testé / relu / non couvert.

## L'ancien parcours

Les branches `step-0-setup` à `step-4-deploy` portent une version
antérieure de l'atelier, centrée sur les étapes du produit (maquette,
Supabase, Stripe, déploiement). Elles restent lisibles et fonctionnelles,
notamment `docs/DEPLOIEMENT.md` et `docs/COUTS.md` pour qui veut mettre
son produit en ligne pour de vrai.

---

Atelier conçu par [Koality Academy](https://academy.koality.fr). Repo
construit avec la méthode qu'il enseigne, boucles, écarts et incidents
compris.
