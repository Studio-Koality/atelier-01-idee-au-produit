---
description: Vérifie le travail de la boucle en cours contre la spec, et rend un rapport honnête
---

Tu viens de terminer la production d'une boucle. Avant de me la présenter,
exécute cette vérification et rends-moi le rapport.

1. **Build** : lance `npm run build`. S'il échoue, corrige et relance avant
   tout le reste. Et souviens-toi : un build vert ne prouve RIEN d'autre que
   la cohérence du code avec lui-même.
2. **Exécute, ne te contente pas de relire.** Lance le serveur, joue le
   parcours touché par cette boucle comme le ferait un utilisateur, inspecte
   les réponses. Un test qui n'a pas tourné n'est pas un test.
3. **Conformité spec** : relis `docs/SPEC.md`, section par section. Pour
   chaque exigence touchée par cette boucle : respectée / non respectée /
   hors périmètre. Cite la ligne de la spec.
4. **Scope négatif** : as-tu ajouté quelque chose que la spec ne demande
   pas ? Si oui, liste-le. C'est un écart, même si c'est « mieux ».
5. **Relis en critique** : qu'est-ce qui marcherait ICI mais casserait
   AILLEURS (autre machine, autre fuseau, plusieurs utilisateurs, prod) ?
6. **Le rapport**, avec chaque affirmation étiquetée :
   - **testé** : exécuté, prouvé, reproductible
   - **relu** : plausible à la lecture, pas prouvé
   - **non couvert** : pas vérifié, dit franchement
   « Tout est OK » ne veut rien dire si on ne sait pas comment c'est su.

Ne corrige RIEN de toi-même après le rapport : on décide ensemble de ce qui
mérite une correction dans cette boucle et de ce qui attend la suivante.
