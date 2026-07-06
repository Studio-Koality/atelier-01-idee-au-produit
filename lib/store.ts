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

// ── Fonctions admin · boucle admin (spec §4) ───────────────────

export function getReservations(): Reservation[] {
  // Les plus proches d'abord (spec §4) : tri par date du créneau réservé.
  return [...g.__reservations!].sort((a, b) => {
    const da = getCreneau(a.creneau_id)?.date_heure ?? "";
    const db = getCreneau(b.creneau_id)?.date_heure ?? "";
    return da.localeCompare(db);
  });
}

export function setStatutReservation(
  id: string,
  statut: Reservation["statut"],
): void {
  const resa = g.__reservations!.find((r) => r.id === id);
  if (resa) resa.statut = statut;
}

export function getTousCreneauxFuturs(): Creneau[] {
  const maintenant = new Date().toISOString();
  return g
    .__creneaux!.filter((c) => c.date_heure > maintenant)
    .sort((a, b) => a.date_heure.localeCompare(b.date_heure));
}

export function ajouterCreneau(
  consultationId: string,
  dateHeureIso: string,
): void {
  g.__creneaux!.push({
    id: `${consultationId}-${dateHeureIso}`,
    consultation_id: consultationId,
    date_heure: dateHeureIso,
    reserve: false,
  });
}

// Un créneau réservé ne peut PAS être supprimé (spec §5) : la règle
// vit ici, dans la couche de données. Une interface se contourne.
export function supprimerCreneau(id: string): boolean {
  const creneau = g.__creneaux!.find((c) => c.id === id);
  if (!creneau || creneau.reserve) return false;
  g.__creneaux = g.__creneaux!.filter((c) => c.id !== id);
  return true;
}
