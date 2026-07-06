// Magasin en mémoire : copie mutable des données de démo.
// Assez vrai pour vivre le parcours, assez simple pour rester lisible.

import { consultations, creneaux as creneauxInitiaux } from "./data";
import type { Consultation, Creneau, Reservation } from "./types";

// globalThis pour survivre au rechargement à chaud du serveur de dev.
const g = globalThis as unknown as {
  __creneaux?: Creneau[];
  __reservations?: Reservation[];
};
g.__creneaux ??= creneauxInitiaux.map((c) => ({ ...c }));
g.__reservations ??= [];

export function getConsultations(): Consultation[] {
  return consultations;
}

export function getConsultation(id: string): Consultation | undefined {
  return consultations.find((c) => c.id === id);
}

export function getCreneauxDisponibles(consultationId: string): Creneau[] {
  const maintenant = new Date().toISOString();
  return g.__creneaux!.filter(
    (c) =>
      c.consultation_id === consultationId &&
      !c.reserve &&
      c.date_heure > maintenant, // un créneau passé est indisponible (spec §2)
  );
}

export function reserverCreneau(
  creneauId: string,
  nom: string,
  email: string,
): Reservation | null {
  const creneau = g.__creneaux!.find((c) => c.id === creneauId);
  // Créneau inconnu ou déjà pris : le premier arrivé gagne (spec §5).
  if (!creneau || creneau.reserve) return null;
  creneau.reserve = true;
  const reservation: Reservation = {
    id: `resa-${g.__reservations!.length + 1}`,
    creneau_id: creneauId,
    nom_patient: nom,
    email_patient: email,
    statut: "confirmee",
    creee_le: new Date().toISOString(),
  };
  g.__reservations!.push(reservation);
  return reservation;
}

export function getReservation(id: string): Reservation | undefined {
  return g.__reservations!.find((r) => r.id === id);
}

export function getCreneau(id: string): Creneau | undefined {
  return g.__creneaux!.find((c) => c.id === id);
}
