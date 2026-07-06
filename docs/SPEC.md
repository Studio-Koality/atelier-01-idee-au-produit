# SPEC · Cabinet Ronron

> Instanciation du gabarit `SPEC-TEMPLATE.md` pour le bac à sable de
> l'atelier : le cabinet d'un praticien qui veut que ses patients réservent
> en ligne. Cette spec est sortie d'une interview inversée (protocole :
> `INTERVIEW.md`). C'est la source de vérité : quand le code s'en écarte,
> c'est la spec qui gagne ; quand le réel la contredit, on l'amende par écrit.

---

## 1. L'intention en une phrase

Mon produit permet à **un patient** de **réserver une consultation** parmi
**les créneaux proposés par le cabinet**, sans **appels téléphoniques ni
allers-retours**.

## 2. Le catalogue

- Mes items sont des : **consultations** (types de rendez-vous proposés par le cabinet)
- Chaque item a ces attributs visibles : **nom** (ex. « Première consultation »),
  **durée** (minutes), **prix** (euros), **description courte**
- Un créneau est un couple **consultation + date/heure**. Un créneau est
  indisponible quand : **il est déjà réservé** ou **il est dans le passé**

## 3. L'action

- Quand le patient a choisi un créneau, il veut : **le réserver**
- Pour ça, on lui demande : **nom**, **email** (rien d'autre : chaque champ
  en plus fait fuir un patient)
- L'action est payante : **NON**, le prix est affiché, il se règle au
  cabinet. (Décision d'atelier : le paiement en ligne est un sujet entier,
  il n'apprend rien de plus sur le harnais.)
- Une réservation réussie, c'est :
  1. le créneau **disparaît immédiatement** des disponibilités pour les autres visiteurs
  2. le patient voit un **écran de confirmation** avec le récapitulatif
  3. la réservation apparaît côté admin

## 4. Le côté admin (le praticien)

Sans développeur, le praticien doit pouvoir :
(Accès : une clé simple dans l'URL, stockée dans la config. Pas de comptes.
Décision prise en boucle admin, la spec était muette : voir
`docs/boucles/ADMIN-PLAN.md`.)

- **Voir la liste des réservations** (qui, quoi, quand), les plus proches d'abord
- **Ajouter / retirer des créneaux** de disponibilité
- **Marquer une réservation comme honorée ou annulée**

## 5. Les cas limites (énumérés par l'agent, tranchés par l'humain)

| Cas limite soulevé par l'agent | Décision |
|---|---|
| Deux patients réservent le même créneau au même moment | Le premier enregistré gagne ; l'autre voit « créneau plus disponible » et revient au choix |
| Le patient se trompe d'email | Assumé v1 : pas de vérification d'email, le récap à l'écran fait foi |
| Le praticien supprime un créneau déjà réservé | Interdit : un créneau réservé ne peut pas être supprimé, seulement annulé (statut). La règle vit dans la couche de données, pas dans l'interface |
| Réservation à 2h du matin pour le jour même | Autorisé : aucune règle de délai en v1, à observer sur données réelles |

## 6. Ce que le produit NE fait PAS (aujourd'hui)

- Pas de **paiement en ligne** (le prix s'affiche, se règle au cabinet)
- Pas de **comptes patients** (pas de mot de passe, pas d'espace personnel)
- Pas d'**emails automatiques** (confirmation, rappel)
- Pas de **récurrence** ni d'agenda synchronisé (Google Calendar)
- Pas de **multi-praticiens** : un seul cabinet, un seul agenda
