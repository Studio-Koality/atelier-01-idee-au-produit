# TP n°2 · On travaille : vibe coding (~30 min)

**Atelier « Travailler avec une IA qui code » · Koality Academy**

Notions abordées :

- Travailler en direct avec un agent : demander, regarder, ajuster
- Ce qu'un agent décide tout seul quand on ne précise rien
- Tester ce qui a été produit (et ce que `npm run build` ne teste pas)
- La mémoire au fil du travail

## Objectifs du TP

Le setup est monté, on s'en sert. Dans ce TP vous construisez la
première version du produit en « vibe coding » : vous demandez, l'agent
produit, vous regardez, vous redemandez. C'est le mode de travail
naturel avec ces outils, il est puissant, et il a des limites qu'on ne
vous décrira pas à l'avance : vous les rencontrerez (ou pas) par
vous-même.

**Il n'y a AUCUN résultat attendu dans ce TP.** Votre produit sera
différent de celui du voisin : deux sessions d'agent ne donnent jamais
la même chose. Ce qui compte, c'est ce que vous allez observer en
travaillant. Gardez la grille du paragraphe 3 sous les yeux.

**Prérequis** : TP1 terminé, setup committé.

---

## 1. La commande du client

Vous travaillez pour le Cabinet Ronron. La demande du client, telle
qu'il vous l'a formulée au téléphone :

> « Je veux que mes patients puissent réserver leurs consultations en
> ligne. Ils choisissent le type de consultation, ils voient les
> créneaux libres, ils réservent. Voilà. »

C'est volontairement tout ce que vous avez. Lancez une session
(`claude`) et travaillez : formulez la demande comme vous voulez,
regardez ce qu'il propose, laissez-le produire, réagissez. Vous avez
20 minutes. Deux consignes seulement :

1. **Restez aux commandes.** Votre fichier de règles lui impose de
   proposer un plan avant de coder : lisez ce plan avant de dire oui.
2. **Utilisez la mémoire en passant.** Chaque fois qu'une vraie décision
   est prise (un choix d'écran, une couleur, un comportement), dites-lui :
   « retiens cette décision ». Ça vous servira cet après-midi.

## 2. Testez comme un patient

Quand vous avez quelque chose qui s'affiche, testez-le vraiment, comme
le ferait un patient, pas comme un dev pressé :

1. Le parcours complet : choisir, réserver, voir la confirmation.
2. **Rechargez la page.** Votre réservation existe-t-elle encore ?
3. Ouvrez un deuxième onglet : voit-il les mêmes créneaux ?
4. Et la vérification officielle :

```bash
npm run build
```

## 3. La grille d'observation

Remplissez-la pendant et après le travail (sur papier ou dans un
fichier, peu importe), on la met en commun au debrief :

| Question | Votre réponse |
|---|---|
| Qu'est-ce qui vous a bluffé ? | |
| Où avez-vous dû vous y reprendre à plusieurs fois ? | |
| Citez 3 décisions que l'agent a prises SANS vous demander | |
| Votre règle personnelle du TP1 a-t-elle été respectée ? | |
| Le build passe-t-il ? L'écran est-il juste pour autant ? | |
| Que reste-t-il de vos réservations après un rechargement ? | |

> **Pour comprendre · « vibe coding », le mot et la chose.**
> Travailler comme vous venez de le faire (décrire l'intention en
> langage naturel, laisser l'agent produire, réagir à ce qu'on voit,
> sans lire chaque ligne de code) porte un nom : le vibe coding. Ce
> n'est ni un gros mot ni une méthode honteuse : c'est le mode
> d'exploration le plus rapide qui existe, parfait pour prototyper,
> essayer une idée, apprendre. Ses limites, vous venez peut-être d'en
> toucher certaines, sont toujours les mêmes : les décisions se
> prennent sans trace, rien ne garantit que le résultat est juste, et
> rien ne survit d'une session à l'autre. La suite de la journée ne
> remplace pas ce mode : elle l'encadre pour pouvoir aller plus loin.

> **Pour comprendre · pourquoi vos résultats divergent.**
> Un modèle de langage est probabiliste : à demande identique, deux
> sessions produisent deux codes différents. Chaque trou dans votre
> demande (quelles données ? stockées où ? quel design ?) a été comblé
> par un choix statistiquement plausible, pas par VOTRE choix. Ce n'est
> pas un défaut de l'outil, c'est sa nature : il fera toujours quelque
> chose. La question du reste de la journée : comment faire pour que ce
> quelque chose soit votre produit, pas un produit probable.

> **Pour comprendre · ce que le build vérifie.**
> `npm run build` vérifie que le code est cohérent avec lui-même :
> syntaxe, types, imports. Il ne sait pas ce que le produit devait
> faire. Un build vert signifie « ça peut tourner », jamais « c'est
> juste ». Si votre écran est correct ET votre build vert, les deux
> informations restent indépendantes.

## 4. Le debrief (ensemble)

Mise en commun des grilles. Les questions qu'on va se poser, à partir de
VOS résultats et de rien d'autre :

- Combien de décisions produit ont été prises cet après-midi... et par qui ?
- Qu'est-ce que personne n'avait précisé, et qui aurait dû l'être ?
- À quoi ressemblerait la liste complète de ce que le client veut
  vraiment ? Qui la connaît ? Où est-elle écrite ?

C'est exactement le sujet du TP3.

---

## Avant de passer au TP3

- [ ] Un produit s'affiche (quel que soit son état, il est à vous)
- [ ] La grille d'observation est remplie
- [ ] Au moins 2 décisions sont dans la mémoire de l'agent (`cat .claude/memoire.json`)
- [ ] Committez l'état du moment : `git add -A && git commit -m "premier jet en vibe coding"`

*Rien à rattraper si votre session a déraillé : le TP3 travaille sur ce
que vous avez, quel que soit son état. Un produit bancal donne même un
meilleur TP3.*
