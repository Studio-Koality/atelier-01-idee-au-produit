// Webhook Stripe — boucle 5 (étape 4).
// C'est ICI que la réservation naît ou que le créneau se libère :
// jamais sur la page de retour (elle peut ne jamais être ouverte),
// toujours sur l'événement signé de Stripe.

import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { creerReservationPayee, libererCreneau } from "@/lib/db";

export async function POST(request: NextRequest) {
  const corps = await request.text();
  const signature = request.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !secret || secret === "A_REMPLACER") {
    return NextResponse.json({ erreur: "webhook non configuré" }, { status: 400 });
  }

  // Signature vérifiée AVANT toute action : un webhook non signé,
  // c'est une porte d'entrée publique sur votre base.
  let evenement;
  try {
    evenement = await stripe().webhooks.constructEventAsync(
      corps,
      signature,
      secret,
    );
  } catch {
    return NextResponse.json({ erreur: "signature invalide" }, { status: 400 });
  }

  if (
    evenement.type === "checkout.session.completed" ||
    evenement.type === "checkout.session.expired"
  ) {
    const session = evenement.data.object;
    const { creneau_id, nom, email } = session.metadata ?? {};
    if (!creneau_id) return NextResponse.json({ recu: true });

    if (evenement.type === "checkout.session.completed") {
      // Paiement validé → la réservation existe (spec §3 : réserver = payer).
      await creerReservationPayee(creneau_id, nom!, email!, session.id);
    } else {
      // Paiement abandonné → le créneau redevient disponible (spec §5, cas 2).
      await libererCreneau(creneau_id);
    }
  }

  return NextResponse.json({ recu: true });
}
