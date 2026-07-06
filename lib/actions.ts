"use server";

// L'action serveur de réservation : elle valide, enregistre, redirige.

import { redirect } from "next/navigation";
import { reserverCreneau, getCreneau } from "./store";

export async function reserver(formData: FormData) {
  const creneauId = String(formData.get("creneau") ?? "");
  const nom = String(formData.get("nom") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();

  // Le formulaire ne demande QUE nom et email (spec §3) : chaque champ
  // en plus fait fuir un patient. La validation reste donc minimale.
  if (!creneauId || !nom || !email.includes("@")) {
    redirect(`/consultation/${consultationDe(creneauId)}?erreur=champs`);
  }

  const reservation = reserverCreneau(creneauId, nom, email);
  if (!reservation) {
    // Créneau parti entre-temps : premier arrivé gagne (spec §5),
    // l'autre revient au choix des créneaux.
    redirect(`/consultation/${consultationDe(creneauId)}?erreur=creneau`);
  }

  redirect(`/confirmation/${reservation.id}`);
}

function consultationDe(creneauId: string): string {
  return getCreneau(creneauId)?.consultation_id ?? "";
}
