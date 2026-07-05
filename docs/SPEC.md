# SPEC — Cabinet Ronron

> Instanciation du gabarit `SPEC-TEMPLATE.md` pour le fil rouge de l'atelier :
> le cabinet d'un praticien qui veut que ses patients réservent en ligne.
> Cette spec est sortie d'une interview de cadrage réelle (protocole : `INTERVIEW.md`).

---

## 1. L'intention en une phrase

Mon produit permet à **un patient** de **réserver une consultation** parmi
**les créneaux proposés par le cabinet**, sans **appels téléphoniques ni allers-retours**.

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
- L'action est payante : **OUI** — prix **fixe par type de consultation**,
  réglé en ligne à la réservation
- Une réservation réussie, c'est :
  1. le créneau **disparaît immédiatement** des disponibilités pour les autres visiteurs
  2. le patient voit un **écran de confirmation** avec le récapitulatif
  3. la réservation apparaît côté admin

## 4. Le côté admin (le praticien)

Sans développeur, le praticien doit pouvoir :
(Accès : une clé simple dans l'URL, stockée dans la config. Pas de comptes.
Décision prise en boucle 4, la spec était muette : voir BOUCLE-4-PLAN.md.)
- **Voir la liste des réservations** (qui, quoi, quand), les plus proches d'abord
- **Ajouter / retirer des créneaux** de disponibilité
- **Marquer une réservation comme honorée ou annulée**

## 5. Les cas limites (énumérés par l'agent, tranchés par l'humain)

| Cas limite soulevé par l'agent | Décision |
|---|---|
| Deux patients réservent le même créneau au même moment | Le premier paiement validé gagne ; l'autre voit « créneau plus disponible » et revient au catalogue |
| Le patient ferme la page pendant le paiement | Le créneau est libéré au bout de 10 minutes sans paiement confirmé |
| Le patient se trompe d'email | Assumé v1 : pas de vérification d'email, le récap à l'écran fait foi |
| Le praticien supprime un créneau déjà réservé | Interdit dans l'admin : un créneau réservé ne peut pas être supprimé, seulement annulé (statut) |
| Réservation à 2h du matin pour le jour même | Autorisé : aucune règle de délai en v1, à observer sur données réelles |

## 6. Ce que le produit NE fait PAS (aujourd'hui)

- Pas de **comptes patients** (pas de mot de passe, pas d'espace personnel)
- Pas d'**emails automatiques** (confirmation, rappel) — v2
- Pas de **récurrence** ni d'agenda synchronisé (Google Calendar) — v2
- Pas de **remboursement en ligne** — se gère hors produit en v1
- Pas de **multi-praticiens** — un seul cabinet, un seul agenda
