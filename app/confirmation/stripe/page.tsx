// Retour de paiement Stripe — boucle 5 (étape 4).
// La réservation est créée par le WEBHOOK, pas par cette page : elle
// peut donc arriver quelques secondes après le retour du patient.
// On recharge poliment en attendant.

import { getReservationParSession } from "@/lib/db";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function RetourStripe({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  if (!session_id) redirect("/");

  const reservation = await getReservationParSession(session_id);
  if (reservation) redirect(`/confirmation/${reservation.id}`);

  return (
    <main className="mx-auto max-w-md p-6 pt-24 text-center">
      {/* Le webhook n'est pas encore passé : on attend, sans paniquer personne. */}
      <meta httpEquiv="refresh" content="2" />
      <span className="text-4xl">🐈</span>
      <h1 className="mt-4 text-2xl font-bold">Un instant...</h1>
      <p className="mt-2 opacity-65">
        Votre paiement est en cours de confirmation, la page se met à jour
        toute seule.
      </p>
    </main>
  );
}
