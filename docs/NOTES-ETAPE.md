# 📍 Vous êtes ici : Étape 0 — Le point de départ

> Branche `step-0-setup`. Si vous lisez ceci, vous avez la coquille de départ. Tout va bien.

## Ce que contient cette étape

- Une application Next.js **vide** : elle démarre, elle affiche une page, c'est tout.
- Un fichier `CLAUDE.md` : le brief permanent de votre agent, avec 3 règles de travail.
- Un dossier `.claude/` : le **harnais** de l'agent (ses permissions, ses garde-fous). Lisez son `README.md`, il est court.
- Un `.gitignore` volontairement minimal : dans cet atelier, **tout est committé** (la config, les specs, les plans, le contexte de l'agent). Seuls les dossiers reconstruisibles (`node_modules`) sont ignorés.

## Pourquoi si peu de code ?

Parce que le code n'est pas le sujet. À cette étape, la seule chose qui compte,
c'est que votre environnement fonctionne et que votre agent connaît ses règles.

## Vérifier que ça marche

```bash
npm install
npm run dev
```

Ouvrez http://localhost:3000 : vous devez voir la page d'accueil de la coquille.

## ⚡ Encart dev

Le `CLAUDE.md` est hiérarchique : `~/.claude/CLAUDE.md` (global, toutes vos sessions)
puis `CLAUDE.md` à la racine du projet, puis `CLAUDE.local.md` (non versionné d'habitude,
versionné ici pour la pédagogie). L'agent fusionne le tout. Traitez ces fichiers comme
du code : relus, versionnés, améliorés à chaque friction.

## Étape suivante

`git checkout step-1-intention` ou suivez l'animateur : on va cadrer l'intention.
