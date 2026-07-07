# TP n°3 · On consolide : la spec et la boucle (~60 min)

**Atelier « Travailler avec une IA qui code » · Koality Academy**

Notions abordées :

- La spécification comme source de vérité du produit
- L'interview inversée : l'agent questionne, vous décidez
- Les cas limites (qui les trouve) et le périmètre négatif (ce qu'on ne fait pas)
- La commande `/verifier` et le rapport en trois étiquettes : testé / relu / non couvert
- La boucle de travail : plan, production, vérification

## Objectifs du TP

Le TP2 a produit un premier jet, et le debrief a posé la question : où
est écrit ce que le client veut vraiment ? Dans ce TP, vous allez
d'abord produire cette référence (la spécification), sans partir d'une
page blanche : l'agent vous interviewe, vous décidez. Ensuite vous
confronterez VOTRE produit du TP2 à VOTRE spécification, avec une
commande de vérification que vous allez créer. Le rapport dira ce qui
tient, ce qui manque, ce qui déborde. Et vous corrigerez UN écart,
proprement, en trois temps.

On ne repart pas de zéro : on consolide ce qui existe. C'est du vrai
travail, sur votre vrai code.

**Prérequis** : TP2 terminé, premier jet committé.

---

## 1. L'interview inversée

Vous jouez le client : le praticien du Cabinet Ronron. Trois contraintes
de rôle (le client y tient, vous comprendrez leur effet au TP4) :

1. Pas de paiement en ligne : le prix s'affiche, on règle au cabinet.
2. Pas de comptes patients : pas de mot de passe, pas d'espace personnel.
3. Un seul praticien, un seul agenda.

Le reste : décidez librement, c'est VOTRE cabinet.

Ouvrez une session neuve et copiez-collez exactement :

```
Tu es un product manager exigeant. J'ai une idée de produit et je veux la
transformer en spécification claire.

Interviewe-moi pour remplir le gabarit docs/SPEC-TEMPLATE.md de ce projet.
Règles de l'interview :
- Une seule question à la fois, attends ma réponse.
- Si ma réponse est floue, reformule-la en termes concrets et fais-moi valider.
- Quand une section du gabarit est remplie, montre-la moi avant de passer à la suivante.
- À la fin, propose TOI-MÊME la liste des cas limites (section 5) et fais-moi
  trancher chacun. Ne me demande pas de les trouver.
- Termine en écrivant docs/SPEC.md complet, puis mets à jour la section
  « Ce qu'on construit » de CLAUDE.md pour qu'elle pointe vers la spec.
```

Deux consignes de posture :

- **Répondez court et décidez vraiment.** Pas de « comme tu veux » :
  c'est vous le client.
- **Au moment des cas limites, prenez le temps.** Deux patients sur le
  même créneau au même instant, un créneau supprimé alors qu'il est
  réservé... Chaque décision prise là vous économise un aller-retour
  pénible plus tard.

> **Pour comprendre · chacun son poste.**
> Énumérer les scénarios tordus est un travail d'exhaustivité : le
> modèle y est meilleur que vous, il en a lu des milliers. DÉCIDER ce
> que le produit fait dans chaque scénario est un travail de
> responsabilité : lui n'a aucune légitimité pour ça, et il décidera
> pourtant, en silence, si vous ne le faites pas. Vous l'avez constaté
> au TP2 : comptez vos « 3 décisions prises sans demander » de la grille.

> **Vérification.** `docs/SPEC.md` existe et contient : l'intention en
> une phrase, le catalogue, l'action de réservation, la partie du
> praticien, un tableau de cas limites avec VOS décisions, et la section
> « ce que le produit NE fait PAS » (vos trois contraintes de rôle
> doivent y être). `CLAUDE.md` pointe maintenant vers la spec.

## 2. Créer la commande de vérification

Le TP2 l'a montré : « le build passe » et « c'est juste » sont deux
informations indépendantes. On outille la deuxième.

> **Pour comprendre · les commandes personnalisées.**
> Une commande personnalisée n'a rien de magique : c'est un fichier
> markdown rangé dans `.claude/commands/`. Son NOM devient le nom de la
> commande (`verifier.md` donne `/verifier`), son CONTENU est le texte
> envoyé à l'agent quand vous la tapez. Autrement dit : c'est un prompt
> que vous avez écrit une bonne fois, soigneusement, au calme, au lieu
> de le réimproviser en moins bien à chaque session. Tout geste que
> vous répétez est candidat. Comme le reste du setup, ces fichiers sont
> versionnés : une équipe qui les partage se transmet ses réflexes par
> git, comme du code.

Créez le fichier `.claude/commands/verifier.md` :

```markdown
---
description: Vérifie le travail contre la spec, et rend un rapport honnête
---

Vérifie l'état du produit avant de me le présenter.

1. Build : lance `npm run build`. S'il échoue, corrige et relance avant
   tout le reste. Un build vert ne prouve rien d'autre que la cohérence
   du code avec lui-même.
2. Exécute, ne te contente pas de relire : lance le serveur, joue le
   parcours comme le ferait un utilisateur, inspecte les réponses.
3. Conformité : relis docs/SPEC.md section par section. Pour chaque
   exigence : respectée / non respectée / hors périmètre. Cite la spec.
4. Périmètre négatif : as-tu (ou a-t-on) ajouté quelque chose que la
   spec ne demande pas ? Liste-le. C'est un écart, même si c'est « mieux ».
5. Relis en critique : qu'est-ce qui marche ICI mais casserait AILLEURS
   (autre machine, autre fuseau horaire, plusieurs utilisateurs, prod) ?
6. Le rapport, chaque affirmation étiquetée :
   - testé : exécuté, prouvé
   - relu : plausible à la lecture, pas prouvé
   - non couvert : pas vérifié, dit franchement
   « Tout est OK » ne veut rien dire si on ne sait pas comment c'est su.

Ne corrige RIEN après le rapport : on décide ensemble.
```

Elle sera disponible sous le nom `/verifier` dans vos sessions.

Relisez le fichier point par point, chaque ligne soigne un problème
précis :

- **Point 1 (build d'abord)** : on ne vérifie pas un code qui ne compile
  pas, et on rappelle à l'agent que le build vert ne prouve rien d'autre.
- **Point 2 (exécuter, pas relire)** : un agent adore conclure « ça a
  l'air bon » après relecture. Relire n'est pas exécuter : on exige le
  parcours joué.
- **Point 3 (la spec comme référence)** : sans référence écrite, une
  vérification n'a rien à comparer. C'est pour ça que la spec est venue
  AVANT dans ce TP.
- **Point 4 (le périmètre négatif)** : l'ajout non demandé est un écart
  même s'il est « mieux ». Sinon le produit gonfle en silence.
- **Point 5 (casserait ailleurs)** : votre machine n'est pas la
  production. Fuseau horaire, plusieurs utilisateurs, autre système :
  les bugs classiques du « ça marche chez moi ».
- **Point 6 (les étiquettes)** : voir l'encadré du paragraphe suivant.
- **La dernière ligne (ne corrige rien)** : la vérification CONSTATE,
  l'humain DÉCIDE ce qui mérite correction. Deux temps séparés, sinon
  l'agent « corrige » des choses que vous n'avez jamais arbitrées.

## 3. Votre produit face à votre spec

Le moment de vérité. Dans une session neuve :

```
/verifier
```

Lisez le rapport EN ENTIER, à deux si possible. Il va probablement
lister des écarts : des choses de la spec que le premier jet ne fait
pas, des choses que le premier jet fait et que la spec interdit, des
« non couvert » honnêtes. C'est le but : vous savez enfin OÙ VOUS EN
ÊTES, avec des preuves.

> **Pour comprendre · les trois étiquettes.**
> Un rapport utile distingue ce qui a été **testé** (exécuté, prouvé),
> ce qui a été **relu** (plausible, pas prouvé) et ce qui n'est **pas
> couvert** (dit franchement). La troisième étiquette rend les deux
> autres crédibles : un rapport sans « non couvert » est un rapport
> qui vous ment par omission.

## 4. Une boucle de consolidation

Choisissez UN écart du rapport (le plus gênant pour le client) et
corrigez-le en trois temps, sans en sauter :

1. **Plan** : demandez le plan de correction. Lisez-le. Validez ou
   amendez.
2. **Production** : l'agent exécute le plan validé, rien d'autre.
3. **Vérification** : `/verifier` à nouveau. L'écart a-t-il disparu ?
   Un autre est-il apparu ?

S'il vous reste du temps : une deuxième boucle sur l'écart suivant.
Sinon, notez les écarts restants, c'est votre reste à faire, tracé.

Avant de conclure, deux gestes :

```bash
git add -A && git commit -m "consolidation : spec + première boucle"
```

Et dites à l'agent : « retiens les décisions de spec importantes qu'on a
prises dans cette session ».

> **Pour comprendre · la spec gagne.**
> À partir de maintenant, le produit vit dans `docs/SPEC.md`, pas dans
> le code, ni dans le dernier prompt. Quand le code et la spec
> divergent : on corrige le code, ou on amende la spec PAR ÉCRIT. Jamais
> l'inverse en silence. Et quand la spec est muette, on la complète
> avant de coder. Votre spec et celle du voisin sont différentes, et
> les deux sont défendables : chaque décision y est tracée et elle est
> de vous.

---

## Avant de passer au TP4

- [ ] `docs/SPEC.md` existe, cas limites tranchés PAR VOUS, périmètre négatif écrit
- [ ] `/verifier` existe et vous avez lu un rapport en entier
- [ ] Au moins un écart corrigé en trois temps (plan, production, vérification)
- [ ] L'état est committé, les décisions clés sont en mémoire
- [ ] Vous savez expliquer pourquoi un rapport sans « non couvert » est suspect

## Réutiliser chez vous

- **L'interview inversée** marche pour n'importe quel produit : le
  gabarit `docs/SPEC-TEMPLATE.md` est écrit pour être rempli avec VOTRE
  sujet (un catalogue de choses à montrer, une action à déclencher :
  la quasi-totalité des idées de produit rentrent dans ce moule).
  Recopiez gabarit + prompt d'interview, c'est tout.
- **`/verifier` est recopiable presque tel quel** : la seule adaptation
  est le point 3 (le chemin de votre spec) et éventuellement le point 1
  (votre commande de build). Les points 2, 4, 5, 6 sont universels.
- **La boucle en trois temps** (plan validé, production, vérification)
  n'a rien de spécifique à ce projet : c'est LA façon de déléguer une
  correction ou une fonctionnalité sans perdre la main.

*Si votre dépôt est dans un état irrécupérable (fichiers supprimés,
projet qui ne démarre plus) : `git checkout setup-complet` vous redonne
un environnement propre pour refaire l'interview et continuer. Vous
perdez votre premier jet, pas votre après-midi.*
