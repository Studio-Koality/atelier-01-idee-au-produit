"use server";

// L'action serveur de réservation — boucle 2.
// Elle valide, enregistre, puis redirige vers la confirmation.

import { redirect } from "next/navigation";
import {
  reserverCreneau,
  getCreneau,
  getConsultation,
  prendreCreneau,
} from "./db";
import { stripe, modePaiement } from "./stripe";
import { formatDateLongue } from "./format";

export async function reserver(formData: FormData) {
  const creneauId = String(formData.get("creneau") ?? "");
  const nom = String(formData.get("nom") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();

  // Le formulaire ne demande QUE nom et email (spec §3) : chaque champ
  // en plus fait fuir un patient. La validation reste donc minimale.
  if (!creneauId || !nom || !email.includes("@")) {
    redirect(
      `/consultation/${await creneauIdVersConsultation(creneauId)}?erreur=champs`,
    );
  }

  // Mode paiement (boucle 5) : le créneau est pris AVANT le paiement
  // (personne d'autre ne peut le prendre), puis Stripe encaisse. S'il
  // n'encaisse pas à temps, le webhook libérera le créneau.
  if (modePaiement) {
    const creneau = await prendreCreneau(creneauId);
    if (!creneau) {
      redirect(
        `/consultation/${await creneauIdVersConsultation(creneauId)}?erreur=creneau`,
      );
    }
    const consultation = (await getConsultation(creneau.consultation_id))!;
    const session = await stripe().checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: consultation.prix_euros * 100,
            product_data: {
              name: `${consultation.nom} — ${formatDateLongue(creneau.date_heure)}`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: { creneau_id: creneauId, nom, email },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // minimum Stripe : 30 min
      success_url: `${process.env.APP_URL}/confirmation/stripe?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL}/consultation/${creneau.consultation_id}`,
    });
    redirect(session.url!);
  }

  // Mode démo : réservation directe, sans paiement (boucles 2-4).
  const reservation = await reserverCreneau(creneauId, nom, email);
  if (!reservation) {
    // Créneau parti entre-temps : premier arrivé gagne (spec §5),
    // l'autre revient au choix des créneaux.
    redirect(
      `/consultation/${await creneauIdVersConsultation(creneauId)}?erreur=creneau`,
    );
  }

  redirect(`/confirmation/${reservation.id}`);
}

async function creneauIdVersConsultation(creneauId: string): Promise<string> {
  return (await getCreneau(creneauId))?.consultation_id ?? "";
}

// ── Actions admin — boucle 4 ───────────────────────────────────
// Chaque action revérifie la clé : on ne fait JAMAIS confiance à
// l'affichage pour la sécurité (la page peut cacher un bouton, une
// requête forgée ne se cache pas).

import {
  setStatutReservation,
  ajouterCreneau,
  supprimerCreneau,
} from "./db";
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
    await setStatutReservation(id, statut);
  }
  redirect(`/admin?cle=${formData.get("cle")}`);
}

export async function creerCreneau(formData: FormData) {
  verifierCle(formData);
  const consultationId = String(formData.get("consultation") ?? "");
  const dateHeure = String(formData.get("date_heure") ?? "");
  if (consultationId && dateHeure) {
    // datetime-local envoie une heure SANS fuseau : on la fixe au
    // fuseau du cabinet avant de la stocker en ISO (leçon boucle 2).
    const iso = new Date(`${dateHeure}:00+02:00`).toISOString();
    await ajouterCreneau(consultationId, iso);
  }
  redirect(`/admin?cle=${formData.get("cle")}`);
}

export async function retirerCreneau(formData: FormData) {
  verifierCle(formData);
  const id = String(formData.get("creneau") ?? "");
  if (id) await supprimerCreneau(id); // refuse seul si réservé (couche données)
  redirect(`/admin?cle=${formData.get("cle")}`);
}
