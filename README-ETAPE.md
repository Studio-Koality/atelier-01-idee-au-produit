# 📍 Vous êtes ici : Étape 1 — L'intention cadrée

> Branche `step-1-intention`. Le produit existe maintenant... sur papier. Zéro ligne de code produit.

## Ce qui vient de se passer

1. L'agent nous a **interviewés** (protocole : `docs/INTERVIEW.md`) au lieu de recevoir un prompt vague.
2. L'interview a rempli le gabarit `docs/SPEC-TEMPLATE.md` → résultat : `docs/SPEC.md`.
3. L'agent a **énuméré lui-même les cas limites**, nous avons tranché chacun (section 5 de la spec).
4. `CLAUDE.md` connaît maintenant le produit et sa règle d'or : *la spec gagne toujours*.

## Le fichier important

`docs/SPEC.md` — tout le reste de l'atelier s'appuie dessus. La maquette (étape 2)
l'illustre, les boucles (étape 3) l'implémentent, la vérification s'y réfère.

## Si vous faites l'atelier avec VOTRE idée

Rejouez le protocole : copiez le prompt de `docs/INTERVIEW.md` dans une nouvelle
session et remplissez `SPEC-TEMPLATE.md` avec votre sujet. Le squelette de
l'application est le même pour tout le monde : des choses à montrer (catalogue),
une action à déclencher. Seule la spec change de peau.

## ⚡ Encart dev

Notez la section « Ce que le produit NE fait PAS » : c'est du scope negatif
explicite. Sans elle, l'agent « améliore » spontanément (comptes utilisateurs,
emails...) et chaque amélioration non demandée est une boucle de correction.
Le scope négatif dans CLAUDE.md est le garde-fou le moins cher du projet.

## Étape suivante

`git checkout step-2-maquette` : on donne un visage au produit, toujours sans coder.
