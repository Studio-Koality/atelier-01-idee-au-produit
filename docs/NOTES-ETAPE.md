# 📍 Vous êtes ici : Étape 2 — Le produit a un visage

> Branche `step-2-maquette`. Toujours zéro ligne de code produit. C'est voulu.

## Ce qui vient de se passer

1. On a dérivé un **prompt de maquettage** depuis la spec (`maquette/PROMPT-STITCH.md`) : chaque phrase du prompt vient de `docs/SPEC.md`, rien n'est inventé.
2. On a itéré dans **Google Stitch** jusqu'à ce que les 3 écrans racontent le parcours. Pas jusqu'à ce que ce soit parfait : jusqu'à ce que ce soit **juste**.
3. Les choix actés sont figés dans `maquette/REFERENCE-VISUELLE.md` (tokens, formes, interdits).
4. `maquette/maquette.html` est la référence : double-cliquez dessus, c'est le produit cible.

## Pourquoi maquetter AVANT de coder ?

Changer une couleur dans Stitch : 10 secondes. La même correction une fois le code
écrit : une boucle entière de l'étape 3. La maquette attrape les malentendus au
moment où ils sont les moins chers. C'est de la **vérification en amont**.

## Si vous faites l'atelier avec VOTRE idée

Dérivez votre prompt Stitch de VOTRE `SPEC.md` (le canevas est dans
`PROMPT-STITCH.md`). Gardez la structure 3 écrans : catalogue, détail + action,
confirmation. C'est le même squelette pour tout le monde.

## ⚡ Encart dev

`REFERENCE-VISUELLE.md` transforme la maquette en **design tokens exploitables par
l'agent**. Une image seule laisse l'agent interpréter ; des tokens hex + des règles
d'usage (« un seul accent roux par écran ») + des interdits explicites réduisent
l'espace des interprétations à presque rien. Maquette = spec visuelle, tokens = son
API. Notez aussi la section « Ce que la maquette interdit » : le scope négatif,
encore lui.

## Étape suivante

`git checkout step-3-boucles` : maintenant, et seulement maintenant, on code. Enfin... on fait coder.
