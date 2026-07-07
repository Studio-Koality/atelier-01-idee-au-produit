# TP n°1 · Monter son environnement de travail (~45 min)

**Atelier « Travailler avec une IA qui code » · Koality Academy**

Notions abordées :

- L'agent de code : un modèle qui agit sur votre machine
- Le fichier de règles `CLAUDE.md` : le contexte permanent du projet
- Les permissions : ce que l'agent peut faire seul, ce qui lui est interdit
- La mémoire entre sessions (serveur MCP)

## Objectifs du TP

Dans ce TP, vous montez un environnement de travail complet pour coder
avec un agent IA : l'outil lui-même, puis les trois pièces qui
transforment un chatbot génial mais amnésique en collègue fiable : des
règles écrites, des permissions, une mémoire. Tout ce que vous créez ici
est un fichier : vérifiable, versionnable, réutilisable tel quel sur
n'importe lequel de vos futurs projets.

À la fin du TP, vous n'aurez encore rien produit. C'est normal : on
monte l'atelier avant de travailler.

---

## 1. Les outils

Installation guidée avec l'animateur (compter 20 min, réseau compris) :

1. **Node.js** LTS : https://nodejs.org
2. **Git** : déjà présent sur Mac (`git --version`), sinon
   https://git-scm.com
3. **Claude Code**, l'agent qu'on utilise aujourd'hui :

```bash
curl -fsSL https://claude.ai/install.sh | bash     # Mac
# Windows (PowerShell) : irm https://claude.ai/install.ps1 | iex
```

4. Connexion : au premier lancement de `claude`, le navigateur s'ouvre.
   Utilisez l'accès fourni par l'animateur.

> **Vérification.** `node -v` affiche v20 ou plus, et `claude doctor`
> est au vert.

> **Pour comprendre · qu'est-ce qu'un agent de code ?**
> Claude Code n'est pas un chat qui répond : c'est un modèle de langage
> AUTORISÉ À AGIR sur votre machine. Le mécanisme, dépouillé : le modèle
> ne sait rien faire d'autre que produire du texte, mais on lui fournit
> des « outils » (lire un fichier, écrire un fichier, lancer une
> commande) qu'il peut demander à utiliser. Il travaille en boucle :
> il demande un outil, reçoit le résultat, décide de la suite, et
> recommence jusqu'à estimer la tâche finie. C'est pour ça qu'il peut
> coder, builder, tester et committer tout seul, et c'est aussi pour ça
> qu'on va encadrer ce qu'il a le droit de faire (paragraphe 4).
> Tous les agents de code du marché fonctionnent sur ce principe : ce
> que vous montez aujourd'hui se transpose ailleurs.

## 2. Le projet

Le bac à sable du jour : le site de réservation d'un cabinet de
praticien (le « Cabinet Ronron »). Récupérez-le et placez-vous sur
l'état de départ :

```bash
git clone https://github.com/Studio-Koality/atelier-01-idee-au-produit.git
cd atelier-01-idee-au-produit
git checkout setup-depart
npm install
npm run dev
```

> **Vérification.** `http://localhost:3000` affiche « La coquille
> fonctionne. » Le projet est une application Next.js vide qui démarre,
> rien de plus. Tout le reste, c'est vous qui allez le monter.

## 3. Première pièce : le fichier de règles

> **Pour comprendre · le contexte, la seule chose qui compte.**
> Un agent démarre CHAQUE session avec une mémoire vide. Il ne connaît
> ni vos conventions, ni vos choix techniques, ni vos manies. Tout ce
> qu'il sait de votre projet tient dans ce qu'on lui donne à lire au
> démarrage : son **contexte**. Sans règles écrites, il comble les
> trous avec le plus probable vu son entraînement, et le plus probable
> n'est pas forcément votre projet. Le fichier `CLAUDE.md`, lu
> automatiquement au début de chaque session, est la partie PERMANENTE
> de ce contexte : écrite une fois, servie à chaque session.

À la racine du projet, créez le fichier `CLAUDE.md` avec ce contenu :

```markdown
# Règles du projet

## Façon de travailler
1. Parle-moi en français, y compris dans les commentaires du code.
2. Explique ton plan AVANT de coder. Je valide, ensuite tu produis.
3. Petites étapes : une fonctionnalité à la fois.

## Règles techniques (non négociables)
- Next.js 15 + TypeScript.
- Tailwind v4 : le thème se déclare dans app/globals.css avec @theme.
  Ne crée JAMAIS de tailwind.config.js (syntaxe v3, ignorée ici).
- Palette du projet : crème #faf6f0, encre #2b2118, roux #e07a3f,
  sauge #7a9b76. Un seul accent roux par écran.

## Ce qu'on construit
Cabinet Ronron : un praticien veut que ses patients réservent leurs
consultations en ligne, sans appels téléphoniques.
```

Puis **ajoutez une règle personnelle** à la section « Façon de
travailler » : la vôtre. Exemples : « nomme les variables en français »,
« ne touche jamais à plus de 3 fichiers sans me prévenir », « tutoie-moi ».
Vous vérifierez cet après-midi qu'elle est respectée sans jamais la
répéter.

Chaque ligne de ce fichier a une histoire. La règle Tailwind, par
exemple : sans elle, la plupart des agents écrivent du Tailwind version 3
(majoritaire dans leur entraînement), que ce projet ignore sans un
message d'erreur. Résultat : un site qui compile parfaitement avec des
styles qui n'existent pas. Une ligne de contexte ferme cette porte.

## 4. Deuxième pièce : les permissions

Un agent de code AGIT : il crée des fichiers, lance des commandes. La
question n'est pas de lui faire confiance, c'est de décider ce qu'il
peut faire sans vous demander, et ce qu'il ne peut pas faire du tout.

Créez le fichier `.claude/settings.json` (créez le dossier `.claude`) :

```json
{
  "permissions": {
    "allow": [
      "Bash(npm install)",
      "Bash(npm run dev:*)",
      "Bash(npm run build)",
      "Bash(git status)",
      "Bash(git diff:*)",
      "Bash(git log:*)",
      "Bash(git add:*)",
      "Bash(git commit:*)",
      "Read(**)",
      "Edit(**)",
      "Write(**)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(git push --force:*)"
    ]
  }
}
```

Lecture : la liste `allow` évite qu'il vous demande la permission
27 fois par heure pour builder ou committer. La liste `deny` lui
interdit le destructif, MÊME si vous le lui demandez par mégarde. Un
garde-fou ne repose jamais sur la bonne volonté, ni la vôtre ni la
sienne.

## 5. Troisième pièce : la mémoire

Le fichier de règles est permanent mais statique : c'est vous qui
l'écrivez. Il manque une mémoire que l'agent remplit LUI-MÊME au fil du
travail : les décisions prises, les préférences découvertes.

> **Pour comprendre · MCP, la prise standard.**
> On a vu que les capacités de l'agent sont ses outils. MCP (Model
> Context Protocol) est le standard qui permet d'en BRANCHER de
> nouveaux : un « serveur MCP » est un petit programme qui expose des
> outils supplémentaires, et le fichier `.mcp.json` à la racine du
> projet dit à l'agent quoi brancher au démarrage. Celui qu'on installe
> ici donne des outils de mémoire (retenir, chercher dans ses
> souvenirs). Le même geste de branchement donne, sur d'autres
> serveurs : la recherche web, un navigateur que l'agent pilote, vos
> bases de données, vos outils métier. L'écosystème se compte en
> milliers de serveurs. Le revers, à connaître : un serveur MCP est du
> code qui tourne chez vous. Mêmes réflexes que pour une dépendance
> npm : source connue, droits minimaux.

Branchez la mémoire en créant le fichier `.mcp.json`, à la racine :

```json
{
  "mcpServers": {
    "memoire": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"],
      "env": {
        "MEMORY_FILE_PATH": ".claude/memoire.json"
      }
    }
  }
}
```

Huit lignes, aucune clé, aucun compte : le serveur tourne sur votre
machine et écrit dans un fichier du projet. Préchargez-le une fois
(sinon le premier usage télécharge le paquet au pire moment) :

```bash
npx -y @modelcontextprotocol/server-memory < /dev/null
```

Testez : lancez une session (`claude`, dans le dossier du projet, il
vous demandera d'approuver le nouveau serveur) et tapez :

```
Utilise ta mémoire pour retenir : le client s'appelle Cabinet Ronron,
et il préfère qu'on dise « le cabinet », jamais « le docteur ».
```

> **Vérification.** Le fichier `.claude/memoire.json` existe maintenant
> et contient votre phrase (`cat .claude/memoire.json`). La mémoire de
> votre agent n'est pas de la magie : c'est un fichier. Il se lit, se
> corrige, se versionne. Si une information est fausse, on l'efface et
> l'agent « oublie ».

## 6. Versionnez votre setup

Ce que vous venez de monter fait partie du projet, au même titre que le
code :

```bash
git add -A
git commit -m "mon environnement de travail : règles, permissions, mémoire"
```

> **Vérification finale du TP.** `git show --stat` liste vos trois
> pièces : `CLAUDE.md`, `.claude/settings.json`, `.mcp.json`. La branche
> `setup-complet` du repo contient la version de référence de ce setup :
> l'animateur l'affiche, comparez avec la vôtre.

---

## Avant de passer au TP2

- [ ] `claude doctor` au vert, la coquille s'affiche sur localhost:3000
- [ ] `CLAUDE.md` existe, avec votre règle personnelle dedans
- [ ] `.claude/settings.json` existe : vous savez dire ce que fait `deny`
- [ ] La mémoire répond : `.claude/memoire.json` contient votre premier fait
- [ ] Le tout est committé

## Réutiliser chez vous

Ce setup est générique. Pour l'installer sur UN DE VOS projets :

1. `CLAUDE.md` : gardez les 3 règles de façon de travailler, remplacez
   les règles techniques par celles de VOTRE stack (framework, versions,
   conventions de nommage, ce qu'il ne faut jamais toucher). La bonne
   question pour le remplir : « qu'est-ce que je répète à chaque fois,
   ou qu'un nouveau venu sur le projet devrait savoir ? »
2. `.claude/settings.json` : gardez la structure, adaptez les commandes
   de la liste `allow` à vos scripts (`npm test`, `make build`...). La
   liste `deny` est un bon défaut partout.
3. `.mcp.json` : recopiable tel quel.

Dix minutes par projet, et chaque session d'agent y démarre équipée.
