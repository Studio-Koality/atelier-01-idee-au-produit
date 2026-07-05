// Client Stripe — boucle 5 (étape 4).
// Mode TEST uniquement : une clé live est refusée par principe dans ce repo.

import Stripe from "stripe";

const cle = process.env.STRIPE_SECRET_KEY;

export const modePaiement =
  !!cle && cle !== "A_REMPLACER" && cle.startsWith("sk_test_");

if (cle && cle !== "A_REMPLACER" && !cle.startsWith("sk_test_")) {
  // Garde-fou : ce repo est un support d'atelier, jamais de clé live ici.
  throw new Error(
    "Clé Stripe non-test détectée. Ce projet n'accepte que des clés sk_test_.",
  );
}

let client: Stripe | null = null;
export function stripe(): Stripe {
  client ??= new Stripe(cle!);
  return client;
}
