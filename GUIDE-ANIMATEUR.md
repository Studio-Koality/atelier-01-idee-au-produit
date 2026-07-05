# GUIDE ANIMATEUR — De l'idée au produit (3h30)

> Usage interne. Timings, points de bascule, et les pièges RÉELLEMENT
> rencontrés en construisant ce repo (aucun n'est théorique).

## Le principe pédagogique : faire d'abord, nommer après

**~38 min de talk sur 3h30, tout le reste en TP.** Chaque étape suit le même
rythme : consigne courte (la carte `ATELIER.md` de la branche) → les
participants FONT → un debrief court met des mots sur ce qu'ils viennent de
vivre. Une seule idée nommée par étape.

Les concepts du whitepaper (harnais 10/90, 80/20, conductor/orchestrator,
chiffres METR) ne sont PAS en slides : ils sont **en réserve** dans les notes
speaker (marqueur 📦), à distiller à l'oral au moment précis où un participant
vit la situation correspondante. Un concept nommé sur du vécu s'ancre ; le même
en slide préalable s'oublie. Le spectre vibe → agentic n'apparaît qu'en
clôture, comme carte de la journée.

## Le déroulé minuté

| Heure | Bloc | Le geste | Le concept à planter |
|---|---|---|---|
| 00:00 | Accueil & cadrage (25') | Tour de table : idée / dev / sceptique | « La génération de code est un problème résolu. Les goulots : la spec et la vérification. » |
| 00:25 | Étape 1 — Intention (35') | Interview inversée, SPEC-TEMPLATE rempli | L'agent énumère les cas limites, l'humain tranche. Scope négatif = garde-fou le moins cher |
| 01:00 | Étape 2 — Maquette (25') | Stitch, prompt dérivé de la spec | Vérification en amont : 10 s dans Stitch vs une boucle dans le code |
| 01:25 | ☕ Pause (10') | | |
| 01:35 | Étape 3 — Boucles (70') | 15' démo fil rouge, 45' sur leur projet, 10' mise en commun | Agent = 10% modèle + 90% harnais. Vérifier ≠ builder. Conductor → orchestrator |
| 02:45 | Étape 4 — En ligne (30') | Palier 1 pour tous (démo en ligne), paliers 2-3 en démo animateur | Le test local ne voit pas ce que la prod verra. La facture se lit (`/cost`) |
| 03:15 | Clôture (15') | `/cost` collectif, transposition live | « Ce qu'on a fait = premier cran du spectre. Le cran suivant : les évals. L'IA amplifie votre culture, bonnes pratiques ET défauts » |

## Les moments préparés (dans le repo, rejouables)

1. **« Le build passait, l'écran était faux »** (boucle 1) : `git checkout 6997b14`,
   le prix est noir au lieu de roux, le build est vert. Vérifier n'est pas builder.
2. **Le fuseau horaire** (boucle 2) : parfait en local, +2h faux en prod.
   Le test local ne voit pas ce que la prod verra.
3. **Le faux positif du test** (boucle 3) : le test passait contre l'ancien
   serveur resté en vie. Indice : `resa-2` au lieu de `resa-1`. Un détail qui
   cloche = on creuse.
4. **La spec muette** (boucle 4) : qui a accès à l'admin ? L'agent doit poser
   la question, pas décider. Vérifier que le CLAUDE.md des participants a la règle.
5. **La spec amendée par le réel** (boucle 5) : 10 min voulues, 30 min imposées
   par Stripe. On amende la spec, on ne tord pas le code en silence.

## Les pièges du jour J (vécus pendant la construction)

- **Le gitignore global** : sur certaines machines, `~/.gitignore_global` exclut
  `CLAUDE.md` et `.claude/` en silence. Le `.gitignore` du repo les ré-inclut
  (`!CLAUDE.md`), mais si un participant crée SON repo, il tombera dedans.
  Symptôme : « git ne voit pas mon CLAUDE.md ».
- **Les processus zombies** : `pkill` approximatif + serveur Next qui reste en
  vie = tests contre le mauvais serveur. Faire vérifier avec `pgrep -fl next`.
- **Tailwind v4 vs v3** : les agents produisent souvent la syntaxe v3
  (`text-[--var]`), silencieusement morte en v4 (`text-(--var)`). Le build ne
  bronche pas, l'écran est faux. C'est le moment préparé n°1, autant le provoquer.
- **datetime-local et les fuseaux** : l'ajout de créneau admin code `+02:00` en
  dur (heure d'été). Assumé et documenté (BOUCLE-4-VERIF), à raconter si un
  participant pointe le problème : c'est un arbitrage v1 tracé, pas un oubli.

## Gestion de salle

- **Le participant perdu** : `git checkout step-N` + `README-ETAPE.md`. Ne pas
  le faire rattraper en live, le raccrocher à l'étape courante.
- **Le dev qui s'ennuie** : les encarts ⚡ des README d'étapes, puis
  lâchez-le sur la checklist palier 2-3 de `DEPLOIEMENT.md` (Supabase + Stripe
  réels), ou sur le cas limite « deux onglets, même créneau ».
- **Le sceptique** : lui confier le rôle de vérificateur en étape 3. C'est le
  poste où le scepticisme est une compétence.
- **L'idée qui ne rentre pas dans l'archétype** (jeu, chatbot, app mobile) :
  « aujourd'hui on construit la version catalogue + action de ton idée » ;
  quasi toute idée en a une. Sinon : fil rouge commun.

## Matériel jour J

- [ ] Clés Supabase de test (un projet par binôme, ou un projet partagé)
- [ ] Compte Stripe test + cartes `4242 4242 4242 4242`
- [ ] Vrais exports Stitch dans `maquette/exports/` (remplacer la maquette HTML)
- [ ] Vérifier que le repo est clonable (accès réseau salle)
- [ ] `ADMIN_SECRET` changé si l'instance de démo est publique
