# 📍 Vous êtes ici : Étape 3 — Le produit existe

> Branche `step-3-boucles`. Quatre boucles plan → production → vérification,
> et le produit fait (presque) tout ce que la spec demande.

## Ce qui vient de se passer

Quatre boucles, chacune en trois temps, chacune tracée dans `docs/boucles/` :

| Boucle | Objectif | La leçon qu'elle a laissée |
|---|---|---|
| 1 | Le catalogue | Le build passait, l'écran était faux : **vérifier n'est pas builder** |
| 2 | Réserver un créneau | Le fuseau du serveur : **le test local ne voit pas ce que la prod verra** |
| 3 | Supabase, la base arbitre | **Testé ≠ relu ≠ non couvert** : un rapport honnête étiquette les trois |
| 4 | L'admin du praticien | Spec muette → question posée, **la spec se répare à la source** |

Aucune de ces leçons n'était prévue. Toutes viennent d'écarts réels attrapés
par la vérification. C'est ça, le cœur de la méthode : la boucle ne produit
pas seulement du code, elle produit de la connaissance sur votre produit.

## Comment lire cette étape

- L'historique git EST le support : `git log --oneline` raconte les boucles.
- Chaque `BOUCLE-N-PLAN.md` dit ce qu'on va faire ET ce qu'on ne va pas faire.
- Chaque `BOUCLE-N-VERIF.md` dit ce qui est prouvé, ce qui est plausible,
  ce qui reste ouvert. Sans complaisance : les écarts y sont, les incidents aussi.

## Essayer

```bash
npm install && npm run dev
```

- Le parcours patient : http://localhost:3000
- L'admin : http://localhost:3000/admin?cle=ronron-demo
- Tout tourne en mode démo (données en mémoire), aucun service externe requis.

## ⚡ Encart dev

Trois patterns à retenir de ces boucles :
1. **Le harnais grandit avec le produit** : `/verifier` est arrivé en boucle 1,
   les règles métier sont descendues dans la couche de données en boucle 4.
2. **`lib/db.ts` comme frontière** : les écrans ignorent qui répond (mémoire ou
   Supabase). Changer de backend n'a pas touché un seul écran.
3. **L'historique comme documentation** : commits atomiques par temps de boucle
   (plan / production / vérification). `git log` se lit comme un journal de bord,
   et `git diff boucle-N..boucle-M` montre exactement ce qu'une décision a coûté.

## Étape suivante

`git checkout step-4-deploy` : la dette annoncée depuis la boucle 2 (le paiement),
la mise en ligne, et la facture réelle.
