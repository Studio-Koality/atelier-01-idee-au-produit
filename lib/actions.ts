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

// ── Actions admin · boucle admin (spec §4) ─────────────────────
// Chaque action revérifie la clé : on ne fait JAMAIS confiance à
// l'affichage pour la sécurité (la page peut cacher un bouton, une
// requête forgée ne se cache pas).

import {
  setStatutReservation,
  ajouterCreneau,
  supprimerCreneau,
} from "./store";
import type { StatutReservation } from "./types";

function verifierCle(formData: FormData): void {
  const cle = String(formData.get("cle") ?? "");
  if (!process.env.ADMIN_SECRET || cle !== process.env.ADMIN_SECRET) {
    redirect("/");
  }
}

export async function changerStatut(formData: FormData) {
  verifierCle(formData);
  const id = String(formData.get("reservation") ?? "");
  const statut = String(formData.get("statut") ?? "") as StatutReservation;
  if (id && ["confirmee", "honoree", "annulee"].includes(statut)) {
    setStatutReservation(id, statut);
  }
  redirect(`/admin?cle=${formData.get("cle")}`);
}

export async function creerCreneau(formData: FormData) {
  verifierCle(formData);
  const consultationId = String(formData.get("consultation") ?? "");
  const dateHeure = String(formData.get("date_heure") ?? "");
  if (consultationId && dateHeure) {
    const iso = new Date(dateHeure).toISOString();
    ajouterCreneau(consultationId, iso);
  }
  redirect(`/admin?cle=${formData.get("cle")}`);
}

export async function retirerCreneau(formData: FormData) {
  verifierCle(formData);
  const id = String(formData.get("creneau") ?? "");
  if (id) supprimerCreneau(id); // refuse seul si réservé (couche données)
  redirect(`/admin?cle=${formData.get("cle")}`);
}
