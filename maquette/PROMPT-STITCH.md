# PROMPT-STITCH — Maquetter avant de coder

> Outil : [Google Stitch](https://stitch.withgoogle.com). On lui donne l'intention,
> il propose des écrans. La maquette n'est PAS une décoration : c'est une
> **spécification visuelle** que l'agent devra respecter à l'étape 3.

---

## Le prompt (dérivé de la spec, pas inventé)

À coller dans Stitch. Remarquez que chaque phrase vient de `docs/SPEC.md` :

```
Application web de réservation pour un cabinet de praticien, en français.
3 écrans :
1. Catalogue : liste des types de consultation (nom, durée, prix, description
   courte), chaque carte mène au choix d'un créneau.
2. Détail et réservation : les créneaux disponibles d'une consultation
   (date, heure), un formulaire minimal (nom, email), un bouton unique
   « Réserver et payer ».
3. Confirmation : récapitulatif (consultation, date, prix), ton chaleureux.

Style : chaleureux et rassurant, fond crème (#faf6f0), texte brun encre (#2b2118),
accent roux (#e07a3f), touches vert sauge (#7a9b76). Coins arrondis, généreux
en espace, aucune surcharge. Pas de menu complexe : le parcours est linéaire.
```

## La règle du jeu

- **On itère dans Stitch, pas dans le code.** Changer une couleur ici coûte
  10 secondes. La même correction à l'étape 3 coûte une boucle entière.
- **On s'arrête quand les 3 écrans racontent le parcours de la spec**, pas quand
  c'est « joli ». Le perfectionnisme visuel est une impasse à ce stade.
- **On exporte** : captures des écrans dans `maquette/exports/`, et les choix
  actés dans `REFERENCE-VISUELLE.md`.

## Fallback sans Stitch

Le fichier `maquette/maquette.html` de ce dossier contient les 3 écrans en HTML
statique : c'est la référence visuelle du fil rouge. Double-cliquez dessus pour
l'ouvrir. Si Stitch est indisponible le jour J, cette maquette fait foi.

## ⚡ Encart dev

Une maquette est une forme de **vérification en amont** : elle attrape les
malentendus avant qu'ils ne coûtent du code. À l'étape 3, on donnera à l'agent
la maquette HTML ET les tokens de `REFERENCE-VISUELLE.md`. Un agent qui reçoit
des tokens précis (couleurs hex, espacements) ne « créative » pas : il applique.
C'est le même principe que le scope négatif : réduire l'espace des interprétations.
