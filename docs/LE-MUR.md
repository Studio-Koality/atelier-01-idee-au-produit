# Le mur du barreau h0 · reproduire la panne en 60 secondes

> Vous venez de vibe-coder. Ça marchait presque. Voici le mur, reproductible
> à la demande, pour le regarder en face.

## Reproduire

```bash
npm install
npm run build   # ✅ vert, aucun avertissement
npm run dev     # puis ouvrez http://localhost:3000
```

Ce que vous voyez : un titre blanc posé sur fond crème (illisible), des
boutons fantômes sans couleur, une bannière de confirmation invisible.
Le build est vert. L'écran est faux.

## Ce qui s'est passé (à lire APRÈS avoir constaté)

L'agent a créé un `tailwind.config.js` avec une palette `brand`, et utilisé
`bg-brand`, `text-brand`, `border-brand` partout. C'est la façon de faire de
**Tailwind v3**, majoritaire dans son entraînement. Ce projet est en
**Tailwind v4**, qui n'utilise plus ce fichier : les classes `brand`
ne génèrent AUCUN CSS, silencieusement.

Preuve :

```bash
grep -c ".bg-brand" .next/static/css/*.css   # → 0
```

## Les deux leçons du barreau

1. **Le build vérifie que le code est cohérent avec lui-même**, pas qu'il est
   juste. Aucun outil ne signalait le problème : seul un humain qui REGARDE
   l'écran pouvait le voir.
2. L'agent n'a commis aucune faute : il a fait le choix le plus probable vu
   son entraînement. **Il lui manquait une information sur CE projet, et
   personne ne la lui avait donnée.** Où écrire ce genre d'information une
   fois pour toutes, c'est exactement le barreau suivant.

Au passage : les réservations vivent dans l'état React de la page.
Rechargez, tout disparaît. Ce mur-là attendra son barreau.
