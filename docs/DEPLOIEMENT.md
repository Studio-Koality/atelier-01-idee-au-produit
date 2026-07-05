# DEPLOIEMENT — Mettre le cabinet en ligne

> Ordre conseillé : d'abord SANS services (mode démo en ligne, 5 minutes),
> puis Supabase, puis Stripe. Chaque palier fonctionne seul : si le temps
> manque, vous repartez quand même avec un produit en ligne.

## Palier 1 — En ligne en mode démo (5 min)

1. Poussez votre repo sur GitHub (public ou privé).
2. Sur [vercel.com](https://vercel.com) : **Add New → Project** → importez le repo.
3. Ne configurez RIEN. Deploy.
4. Votre produit est en ligne. Données en mémoire : chaque redémarrage les
   remet à zéro, c'est le mode vitrine.

> `vercel.json` épingle la région `cdg1` (Paris) : vos utilisateurs sont ici,
> votre serveur aussi. L'infra se décrit dans un fichier versionné, comme le reste.

## Palier 2 — De vraies données (Supabase, ~10 min)

1. Sur [supabase.com](https://supabase.com) : **New project** (région Paris/Francfort).
2. Éditeur SQL → collez le contenu de `supabase/schema.sql` → Run.
3. Réglages du projet → API : copiez l'URL et la clé `service_role`.
4. Dans Vercel → Settings → Environment Variables :
   - `SUPABASE_URL` = l'URL du projet
   - `SUPABASE_SERVICE_ROLE_KEY` = la clé service_role
   - `ADMIN_SECRET` = votre clé admin, changez `ronron-demo`
5. Redéployez. **Checklist de la boucle 3 (le mode base n'a jamais été exécuté) :**
   - [ ] Le catalogue s'affiche (données de la base, plus de la mémoire)
   - [ ] Une réservation complète fonctionne
   - [ ] Le créneau réservé disparaît pour un AUTRE navigateur (onglet privé)
   - [ ] Deux réservations simultanées du même créneau → une seule passe
   - [ ] L'admin liste la réservation

## Palier 3 — Le paiement (Stripe, ~10 min)

1. Sur [stripe.com](https://stripe.com) : compte en **mode test** (bandeau orange).
2. Développeurs → Clés API : copiez la clé secrète `sk_test_...`
   (le repo REFUSE les clés live, c'est voulu).
3. Développeurs → Webhooks → **Add endpoint** :
   - URL : `https://votre-app.vercel.app/api/stripe/webhook`
   - Événements : `checkout.session.completed` et `checkout.session.expired`
   - Copiez le secret de signature `whsec_...`
4. Dans Vercel, ajoutez :
   - `STRIPE_SECRET_KEY` = `sk_test_...`
   - `STRIPE_WEBHOOK_SECRET` = `whsec_...`
   - `APP_URL` = `https://votre-app.vercel.app`
5. Redéployez. **Checklist de la boucle 5 :**
   - [ ] Le bouton dit maintenant « Réserver et payer »
   - [ ] Carte de test `4242 4242 4242 4242` (n'importe quelle date future, n'importe quel CVC)
   - [ ] Paiement validé → confirmation, réservation dans l'admin
   - [ ] Paiement abandonné (fermer l'onglet Stripe) → le créneau réapparaît après l'expiration

## En local avec Stripe (⚡ dev)

Le webhook ne peut pas atteindre `localhost` depuis les serveurs Stripe. Deux options :
- `stripe listen --forward-to localhost:3000/api/stripe/webhook` (CLI Stripe,
  elle affiche le `whsec_...` à mettre dans `.env`)
- ou tester directement sur Vercel (les previews ont chacune leur URL)

## Ce qui peut mordre

| Symptôme | Cause probable |
|---|---|
| Heures décalées de 2h en ligne | Vous avez retiré le fuseau explicite (leçon boucle 2) |
| « Un instant... » qui tourne sans fin | Webhook mal configuré : mauvaise URL, mauvais secret, ou événements non cochés |
| Le catalogue en ligne ignore vos ajouts admin | Vous êtes encore en mode démo (variables Supabase absentes ou `A_REMPLACER`) |
| L'app refuse de démarrer en parlant de clé Stripe | Vous avez mis une clé live. C'est le garde-fou. Mode test. |
