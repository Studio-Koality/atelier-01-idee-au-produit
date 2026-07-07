# TP n°4 · On va plus loin : déléguer avec /goal (~40 min)

**Atelier « Travailler avec une IA qui code » · Koality Academy**

Notions abordées :

- Déléguer une fonctionnalité entière au lieu de piloter message par message
- La commande `/goal` : donner un objectif tiré de la spec
- Superviser : les points où l'humain reprend la main
- La mémoire comme journal de bord de la journée

## Objectifs du TP

Jusqu'ici vous avez piloté l'agent au message : demander, regarder,
redemander. Avec une spec écrite et une vérification outillée, vous
pouvez déléguer plus gros : une fonctionnalité entière, d'un coup, en
gardant trois points de contrôle (le plan, les questions, la
réception). Dans ce TP, l'agent construit toute la partie « côté
praticien » de votre produit pendant que vous supervisez. C'est le mode
de travail qui change vraiment la donne au quotidien, et il ne
fonctionne QUE parce que les TP précédents ont posé la spec et la
vérification.

**Prérequis** : TP3 terminé. `docs/SPEC.md` et `/verifier` en place.

---

## 1. Ce qu'est /goal, avant de le créer

`/goal` est une commande personnalisée, comme votre `/verifier` du TP3 :
un fichier markdown dans `.claude/commands/`, rien de plus. Ce qui
change, c'est ce qu'elle fait faire à l'agent.

Le problème qu'elle règle : en travail au message (le vibe coding du
TP2), l'agent optimise toujours votre DERNIER message. Dites « ajoute un
bouton », il ajoute un bouton, même si ce bouton contredit une décision
d'il y a une heure. Il n'a pas de but, il a une suite de demandes.
`/goal` inverse ça : vous donnez un OBJECTIF, la commande lui impose
d'aller le chercher dans la spec et de travailler JUSQU'À l'atteindre.

La ligne `$ARGUMENTS` dans le fichier est remplacée par ce que vous
tapez après la commande : `/goal construis la partie praticien` envoie
tout le contenu du fichier avec votre objectif inséré. C'est le seul
mécanisme « technique » du fichier, tout le reste est de la méthode
écrite en français.

**Quand l'utiliser, quand s'en passer** : `/goal` vaut pour tout ce qui
dépasse la retouche (une fonctionnalité, une refonte, un chantier). Pour
corriger une typo ou déplacer un bouton, une demande directe suffit :
dérouler des critères et un plan pour ça serait du théâtre.

Créez le fichier `.claude/commands/goal.md` :

```markdown
---
description: Déroule le travail vers un objectif tiré de la spec
---

Objectif de la session : $ARGUMENTS

1. Charge docs/SPEC.md. Reformule l'objectif en critères observables :
   qu'est-ce qui sera vrai à l'écran et dans le code quand ce sera fini ?
2. Plan d'abord. Montre-le moi, attends mon accord UNE fois, puis
   enchaîne les étapes sans me redemander entre chacune.
3. À chaque étape, relis la section « ce que le produit NE fait PAS »
   de la spec. Si tu veux ajouter quelque chose qu'elle ne demande pas :
   ne le fais pas, note-le, propose-le à la fin.
4. Si la spec est muette sur un point bloquant : arrête-toi, pose-moi
   LA question, propose une réponse par défaut, et trace la décision
   dans la spec avant de continuer.
5. Termine par l'état des critères du point 1 : atteint / pas atteint /
   hors périmètre, sans complaisance.
```

Relisez-le point par point, chaque ligne a une raison d'être :

- **Point 1 (les critères observables)** : « fais l'admin » est
  invérifiable ; « le praticien voit la liste des réservations » se
  constate à l'écran. En forçant l'agent à traduire l'objectif en
  critères AVANT de commencer, vous savez tous les deux à quoi
  ressemble « fini ». C'est aussi votre grille de réception au
  paragraphe 4.
- **Point 2 (un seul accord)** : c'est le cœur de la délégation. Vous
  validez le plan UNE fois, puis il enchaîne sans revenir vous voir
  entre chaque étape. Sans cette ligne, il redemande sans arrêt (et
  vous ne gagnez rien) ou il ne demande jamais (et vous perdez la main).
- **Point 3 (le périmètre négatif relu à chaque étape)** : un agent qui
  travaille longtemps sans supervision a le temps d'AJOUTER. Cette
  ligne canalise sa pente naturelle : les idées hors spec sont notées
  et proposées à la fin, pas implémentées.
- **Point 4 (la spec muette)** : LE point de contrôle le plus important.
  Quand il rencontre une décision que la spec ne couvre pas, il
  s'arrête et vous la fait prendre, puis la TRACE dans la spec. C'est
  ce qui empêche les décisions silencieuses du TP2.
- **Point 5 (l'état final sans complaisance)** : il termine en
  confrontant son travail aux critères du point 1, y compris ce qui
  n'est PAS atteint. Le pendant du rapport de `/verifier`.

La différence avec le TP2 tient en une phrase : en vibe coding, l'agent
optimise votre DERNIER message ; avec `/goal`, il optimise un BUT écrit,
et votre spec définit ce but.

## 2. Déléguez la partie praticien

Votre spec contient une section sur ce que le praticien doit pouvoir
faire (voir les réservations, gérer ses créneaux...). Personne ne l'a
encore construite. Dans une session neuve :

```
/goal construis la partie praticien décrite dans la spec
```

## 3. Supervisez (c'est un rôle actif)

Pendant que ça tourne, votre travail :

1. **Le plan.** Il arrive en premier : lisez-le VRAIMENT. C'est votre
   seul « oui » global, tout le reste en découle. Un point du plan vous
   gêne ? C'est maintenant qu'on le dit.
2. **Les questions.** Si l'agent s'arrête pour vous demander quelque
   chose, c'est le point 4 de votre commande qui agit : la spec est
   muette sur un point qu'il n'a pas le droit de trancher seul (souvent :
   comment le praticien accède à sa page, protégée ou pas). Décidez,
   et vérifiez que la décision est bien TRACÉE dans `docs/SPEC.md`.
3. **Le reste du temps : regardez-le travailler.** Les étapes
   s'enchaînent sans vous. C'est déstabilisant la première fois, c'est
   normal. Notez ce que vous ressentez, on en parle en synthèse.

> **Si rien ne se passe comme décrit ci-dessus** (pas de question, un
> plan étrange, un résultat à côté) : rien n'est perdu, c'est la matière
> du paragraphe 4. Le rapport de vérification dira précisément où on en
> est, et une boucle du TP3 corrige le tir. C'est exactement pour ça
> qu'elles existent.

## 4. Réceptionnez le travail

Quand il annonce avoir fini (il termine par l'état de ses critères,
c'est le point 5 de la commande) :

```
/verifier
```

Lisez le rapport avec l'œil du TP3 : testé, relu, non couvert. Puis
testez VOUS-MÊME le parcours du praticien dans le navigateur, comme au
TP2 vous aviez testé celui du patient. Si le rapport ou votre test
révèle des écarts : une boucle (plan, production, vérification) sur
l'écart le plus gênant.

Puis committez :

```bash
git add -A && git commit -m "partie praticien, construite sous supervision"
```

> **Vérification.** Votre produit a maintenant ses deux faces (patient
> et praticien), toutes deux confrontées à la spec, avec un rapport qui
> dit ce qui est prouvé et ce qui ne l'est pas. Regardez le chemin
> parcouru depuis la coquille de ce matin.

## 5. La mémoire, relue

Dernière chose avant la synthèse. Dans une session neuve :

```
Qu'as-tu retenu d'important sur ce projet ? Liste tout.
```

L'agent restitue les décisions de la journée : celles du vibe coding,
celles de l'interview, celles de la supervision. Comparez avec le
fichier brut :

```bash
cat .claude/memoire.json
```

> **Pour comprendre · pourquoi ça compte.**
> Ce fichier est le journal de bord que personne n'a eu à tenir. Demain,
> une session neuve repartira avec vos règles (CLAUDE.md), votre produit
> (SPEC.md) ET vos décisions (la mémoire). Les trois pièces couvrent les
> trois choses qu'un agent oublie : comment vous travaillez, ce que vous
> construisez, ce que vous avez décidé en route.

## 6. Si vous êtes en avance

Choisissez une évolution qui vous fait envie et jouez la séquence
complète en autonomie : si elle est dans le périmètre de la spec,
`/goal` directement ; si la spec l'interdit ou n'en parle pas, amendez
d'abord la spec (par écrit, décision tracée), puis `/goal`. Réception
au `/verifier`. Vous venez de dérouler seul toute la méthode de la
journée.

---

## Avant la synthèse

- [ ] `/goal` existe et vous l'avez vu dérouler un plan vers un objectif
- [ ] La partie praticien existe, vérifiée par `/verifier` ET testée par vous
- [ ] Les décisions prises en supervision sont tracées dans la spec
- [ ] La mémoire restitue les décisions de la journée
- [ ] Tout est committé

## Réutiliser chez vous

`/goal` se recopie tel quel : sa seule dépendance est un `docs/SPEC.md`
qui existe (le TP3 vous a donné la méthode pour en produire un sur
n'importe quel sujet). Le trio se suffit :

1. Une spec qui fait référence (avec son périmètre négatif).
2. `/goal` pour confier un chantier.
3. `/verifier` pour le réceptionner.

Le rythme de croisière sur un vrai projet : une fonctionnalité = un
`/goal`, une réception = un `/verifier`, et chaque décision prise en
route atterrit dans la spec. Si vous ne deviez retenir qu'une habitude
de la journée, c'est celle-là.

*Point de comparaison si besoin : la branche `secours-admin` du repo
contient une partie praticien de référence, construite avec la même
méthode pendant la préparation de l'atelier.*
