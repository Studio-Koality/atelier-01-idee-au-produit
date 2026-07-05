# RÉFÉRENCE VISUELLE — Cabinet Ronron

> Ce fichier est le contrat visuel du produit. À l'étape 3, l'agent le reçoit
> avec la spec : il **applique** ces choix, il ne les réinvente pas.
> Issu des itérations de maquettage (voir `PROMPT-STITCH.md`).

## Les couleurs (tokens)

| Token | Valeur | Usage |
|---|---|---|
| `--creme` | `#faf6f0` | Fond général |
| `--encre` | `#2b2118` | Texte |
| `--roux` | `#e07a3f` | Accent : boutons d'action, prix, éléments actifs |
| `--sauge` | `#7a9b76` | Confirmations, états positifs, disponibilité |

Règle d'usage : **un seul accent roux par écran** (le bouton de l'action principale).
Si deux éléments se battent pour l'attention, l'un des deux est en trop.

## La typographie et les formes

- Police système, pas de webfont en v1 (rapidité > raffinement)
- Titres : gras, grands, bruns encre. Jamais de roux sur les titres.
- Cartes : coins arrondis (`rounded-2xl`), ombre légère, fond blanc cassé
- Espacements généreux : le calme inspire confiance, on vend du soin

## Le parcours (3 écrans, linéaire, sans menu)

1. **Catalogue** : les types de consultation en cartes (nom, durée, prix,
   description courte). Toute la carte est cliquable.
2. **Détail + réservation** : les créneaux disponibles en grille de pastilles,
   le formulaire (nom, email), le bouton unique « Réserver et payer ».
3. **Confirmation** : récapitulatif, ton chaleureux, aucune action concurrente.

## Ce que la maquette interdit

- Pas de carrousel, pas de pop-up, pas de menu hamburger
- Pas de champ de formulaire au-delà de nom + email (c'est dans la spec)
- Pas de page d'accueil séparée : le catalogue EST l'accueil
