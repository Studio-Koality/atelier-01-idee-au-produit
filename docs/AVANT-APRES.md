# La démo du barreau h1 · la même demande, avec et sans contrat

> Deux sessions, le même prompt, deux mondes. C'est la démo la plus simple
> de l'atelier et c'est celle qui convainc.

## Le protocole

1. **Sans** : checkout `h0-vibe`, session neuve, prompt
   « fais-moi une page de réservation de consultations ».
   L'agent invente une palette, crée un `tailwind.config.js` (v3),
   commente en anglais. Build vert, écran faux.
2. **Avec** : checkout `h1-contexte`, session neuve, LE MÊME prompt.
   L'agent suit `@theme`, la palette du cabinet, le français, et propose
   un plan avant de coder.

Le diff entre les deux résultats, c'est la valeur du fichier. Rien d'autre
n'a changé : ni le modèle, ni le prompt, ni vous.

## Pourquoi ça marche (à nommer au debrief, pas avant)

L'agent démarre chaque session avec une mémoire vide. Tout ce qu'il sait
de VOTRE projet tient dans ce qu'on lui donne à lire au départ : c'est le
**contexte**, et sa fenêtre est finie. `CLAUDE.md` est la partie permanente
de ce contexte : payée une fois, servie à chaque session.

Deux familles à distinguer :

- **Contexte permanent** : conventions, palette, règles de travail.
  Ça va dans le contrat.
- **Contexte de session** : la tâche du moment, les fichiers ouverts,
  la conversation. Ça se donne au fil de l'eau, et ça s'évapore.

Le symptôme de h0 se relit avec ça : l'agent n'était pas mauvais, il
complétait avec le plus probable vu son entraînement (Tailwind v3).
Une ligne de contexte permanent a suffi à fermer la porte.

## Où creuser ensuite (montré, pas construit)

- `/context` dans Claude Code : voir ce qui remplit la fenêtre, et ce
  qu'elle coûte.
- Le contrat est hiérarchique : `~/.claude/CLAUDE.md` (global, vos règles
  à vous) puis `CLAUDE.md` du projet, puis `CLAUDE.local.md` (non versionné).
- Quand la fenêtre sature : résumés automatiques, sous-agents qui lisent
  à votre place et ne rapportent que la conclusion.
