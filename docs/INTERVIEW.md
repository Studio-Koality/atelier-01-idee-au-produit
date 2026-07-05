# INTERVIEW — Faire cadrer son intention par l'agent

> L'erreur classique : ouvrir l'agent et taper « fais-moi un site pour mon cabinet ».
> Vous obtiendrez un site. Pas le vôtre.
>
> À la place, on inverse les rôles : **c'est l'agent qui vous interviewe.**
> Copiez le prompt ci-dessous tel quel dans une nouvelle session.

---

## Le prompt d'interview (à copier-coller)

```
Tu es un product manager exigeant. J'ai une idée de produit et je veux la
transformer en spécification claire AVANT d'écrire la moindre ligne de code.

Interviewe-moi pour remplir le gabarit docs/SPEC-TEMPLATE.md de ce projet.
Règles de l'interview :
- Une seule question à la fois, attends ma réponse.
- Si ma réponse est floue, reformule-la en termes concrets et fais-moi valider.
- Quand une section du gabarit est remplie, montre-la moi avant de passer à la suivante.
- À la fin, propose TOI-MÊME la liste des cas limites (section 5) et fais-moi
  trancher chacun. Ne me demande pas de les trouver.
- Termine en écrivant docs/SPEC.md complet, puis propose une mise à jour de
  CLAUDE.md avec la section « Ce qu'on construit ».
```

## Pourquoi ça marche

- **Une question à la fois** : vous réfléchissez vraiment au lieu de valider en bloc.
- **Les cas limites viennent de l'agent** : énumérer les scénarios tordus est
  exactement le genre de tâche où le modèle est meilleur que vous. Trancher,
  en revanche, c'est votre travail. Chacun son poste.
- **La spec sort en fichier versionné** : elle servira de référence à toutes les
  boucles de l'étape 3. Quand le code s'écartera de la spec, c'est la spec qui gagne.

## ⚡ Encart dev

Ce pattern (l'agent interviewe, l'humain tranche) est une forme de
*requirements-as-conversation* : la spec émerge du dialogue et reste exécutable.
Pour aller plus loin : demandez à l'agent de générer, en plus de SPEC.md, des
critères d'acceptation au format Given/When/Then. À l'étape 3, ils deviendront
la check-list de vérification de chaque boucle. Vous venez d'écrire vos tests
avant votre code, sans le dire à personne.

## Signal de fin d'étape

Vous avez : `docs/SPEC.md` rempli, cas limites tranchés, `CLAUDE.md` mis à jour.
Vous n'avez toujours PAS écrit de code. C'est exactement là où il faut être.
