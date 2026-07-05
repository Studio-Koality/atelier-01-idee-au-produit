---
description: Vérifie le travail de la boucle en cours contre la spec et la maquette
---

Tu viens de terminer la production d'une boucle. Avant de me la présenter,
exécute cette vérification et rends-moi le rapport.

1. **Build** : lance `npm run build`. S'il échoue, corrige et relance avant tout le reste.
2. **Conformité spec** : relis `docs/SPEC.md`, section par section. Pour chaque
   exigence touchée par cette boucle, réponds : respectée / non respectée / hors périmètre
   de la boucle. Cite la ligne de la spec.
3. **Conformité maquette** : compare ce qui est rendu à `maquette/REFERENCE-VISUELLE.md`.
   Vérifie en particulier : les tokens de couleur, la règle « un seul accent roux
   par écran », et la section « Ce que la maquette interdit ».
4. **Scope négatif** : as-tu ajouté quelque chose que la spec ne demande pas ?
   Si oui, liste-le. C'est un écart, même si c'est « mieux ».
5. **Rapport** : termine par un tableau à deux colonnes, « Conforme » / « Écarts »,
   sans complaisance. Un écart caché maintenant coûte une boucle plus tard.

Ne corrige RIEN de toi-même après le rapport : on décide ensemble de ce qui
mérite une correction dans cette boucle et de ce qui attend la suivante.
