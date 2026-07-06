# SPEC-TEMPLATE · L'archétype « Catalogue → Détail → Action »

> **Ce fichier est un gabarit à trous.** Vous le remplissez avec VOTRE sujet pendant
> l'interview de cadrage (voir `INTERVIEW.md`). La quasi-totalité des idées de produit
> a une version « catalogue + action » : des choses à montrer, une action à déclencher.
>
> Le squelette de l'application ne changera pas. Seule cette spec change.
> **C'est la leçon centrale de l'atelier : le produit vit dans la spec, pas dans le code.**

---

## 1. L'intention en une phrase

Mon produit permet à **[QUI : le visiteur type]** de **[ACTION : ce qu'il vient faire]**
parmi **[ITEMS : ce que je propose]**, sans **[FRICTION : ce que ça remplace]**.

*Exemple : « Mon produit permet à un patient de réserver une consultation parmi les
créneaux du cabinet, sans passer par le téléphone. »*

## 2. Le catalogue

- Mes items sont des : **[ITEMS]** (cours, produits, créneaux, événements, offres...)
- Chaque item a ces attributs visibles : **[ATTRIBUT 1]**, **[ATTRIBUT 2]**, **[ATTRIBUT 3]**
  (nom, prix, durée, date, photo, description...)
- Un item peut être indisponible quand : **[RÈGLE DE DISPONIBILITÉ]**

## 3. L'action

- Quand le visiteur a choisi un item, il veut : **[ACTION]** (réserver, acheter, s'inscrire...)
- Pour ça, j'ai besoin de lui demander : **[CHAMPS DU FORMULAIRE]** (nom, email...)
- L'action est payante : **[OUI / NON]**, si oui, le prix est **[FIXE PAR ITEM / VARIABLE]**
- Une action réussie, c'est : **[CRITÈRE DE SUCCÈS observable]**
  *(ex : « le créneau n'est plus proposé aux autres et le patient voit une confirmation »)*

## 4. Le côté admin (moi)

- Ce que je dois pouvoir faire sans développeur : **[GESTES ADMIN]**
  (ajouter un item, voir les actions reçues, marquer comme traité...)

## 5. Les cas limites (à faire énumérer par l'agent, PAS de tête)

> Demandez à l'agent : « Liste les cas limites de cette spec. » Puis tranchez chacun.

- **[CAS LIMITE 1]** → décision : **[...]**
- **[CAS LIMITE 2]** → décision : **[...]**
- **[CAS LIMITE 3]** → décision : **[...]**

## 6. Ce que le produit NE fait PAS (aujourd'hui)

> Aussi important que le reste. Chaque « non » économise une boucle.

- Pas de **[...]**
- Pas de **[...]**
