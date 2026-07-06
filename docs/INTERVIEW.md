# INTERVIEW · Faire cadrer son intention par l'agent

> L'erreur classique : ouvrir l'agent et taper « fais-moi un site pour mon cabinet ».
> Vous obtiendrez un site. Pas le vôtre. Vous l'avez d'ailleurs vécu au barreau h0.
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
- **La spec sort en fichier versionné** : elle devient la source de vérité.
  Quand le code s'écartera de la spec, c'est la spec qui gagne. Et quand le
  RÉEL contredira la spec, c'est la spec qu'on amende, par écrit.

## Le scope négatif, la section qui rapporte le plus

La section 6 (« ce que le produit NE fait PAS ») est celle que tout le monde
saute et c'est la plus rentable : chaque « non » écrit économise une boucle
entière plus tard. Un agent sans scope négatif AJOUTE, avec les meilleures
intentions du monde. C'est sa pente naturelle : elle se corrige par écrit,
pas en le lui reprochant.

## Signal de fin de barreau

Vous avez : `docs/SPEC.md` rempli, cas limites tranchés, `CLAUDE.md` qui pointe
vers la spec. Vous n'avez toujours PAS écrit de code. C'est exactement là où
il faut être.
