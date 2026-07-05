// Couche d'accès aux données — boucle 3.
// UN SEUL point de décision : clés Supabase présentes → mode base,
// sinon → mode démo (le magasin mémoire de la boucle 2).
// Les écrans parlent à ce fichier, ils ne savent pas qui répond.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Consultation, Creneau, Reservation } from "./types";
import * as memoire from "./store";

const url = process.env.SUPABASE_URL;
const cle = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const modeDemo = !url || !cle || url === "A_REMPLACER";

let client: SupabaseClient | null = null;
function supabase(): SupabaseClient {
  client ??= createClient(url!, cle!);
  return client;
}

export async function getConsultations(): Promise<Consultation[]> {
  if (modeDemo) return memoire.getConsultations();
  const { data, error } = await supabase()
    .from("consultations")
    .select("*")
    .order("prix_euros", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getConsultation(
  id: string,
): Promise<Consultation | undefined> {
  if (modeDemo) return memoire.getConsultation(id);
  const { data } = await supabase()
    .from("consultations")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  return data ?? undefined;
}

export async function getCreneauxDisponibles(
  consultationId: string,
): Promise<Creneau[]> {
  if (modeDemo) return memoire.getCreneauxDisponibles(consultationId);
  const { data, error } = await supabase()
    .from("creneaux")
    .select("*")
    .eq("consultation_id", consultationId)
    .eq("reserve", false)
    .gt("date_heure", new Date().toISOString()) // créneau passé = indisponible (spec §2)
    .order("date_heure");
  if (error) throw error;
  return data;
}

export async function reserverCreneau(
  creneauId: string,
  nom: string,
  email: string,
): Promise<Reservation | null> {
  if (modeDemo) return memoire.reserverCreneau(creneauId, nom, email);

  // La concurrence se règle ICI : l'UPDATE ne passe que si le créneau
  // est encore libre. Deux patients simultanés → la base n'en laisse
  // passer qu'un. Le premier arrivé gagne (spec §5, cas 1).
  const { data: creneau } = await supabase()
    .from("creneaux")
    .update({ reserve: true })
    .eq("id", creneauId)
    .eq("reserve", false)
    .select()
    .maybeSingle();
  if (!creneau) return null;

  const { data, error } = await supabase()
    .from("reservations")
    .insert({ creneau_id: creneauId, nom_patient: nom, email_patient: email })
    .select()
    .single();
  if (error) {
    // L'insertion a échoué après la prise du créneau : on le relâche.
    await supabase()
      .from("creneaux")
      .update({ reserve: false })
      .eq("id", creneauId);
    throw error;
  }
  return data;
}

export async function getReservation(
  id: string,
): Promise<Reservation | undefined> {
  if (modeDemo) return memoire.getReservation(id);
  const { data } = await supabase()
    .from("reservations")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  return data ?? undefined;
}

export async function getCreneau(id: string): Promise<Creneau | undefined> {
  if (modeDemo) return memoire.getCreneau(id);
  const { data } = await supabase()
    .from("creneaux")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  return data ?? undefined;
}

// ── Fonctions paiement — boucle 5 ──────────────────────────────

// Prendre le créneau sans créer de réservation : le paiement décidera.
// Même arbitrage que reserverCreneau : l'UPDATE conditionnel tranche.
export async function prendreCreneau(id: string): Promise<Creneau | null> {
  if (modeDemo) return memoire.prendreCreneau(id);
  const { data } = await supabase()
    .from("creneaux")
    .update({ reserve: true })
    .eq("id", id)
    .eq("reserve", false)
    .select()
    .maybeSingle();
  return data;
}

// Paiement abandonné : le créneau redevient disponible (spec §5, cas 2).
export async function libererCreneau(id: string): Promise<void> {
  if (modeDemo) return memoire.libererCreneau(id);
  await supabase().from("creneaux").update({ reserve: false }).eq("id", id);
}

export async function creerReservationPayee(
  creneauId: string,
  nom: string,
  email: string,
  sessionId: string,
): Promise<Reservation> {
  if (modeDemo)
    return memoire.creerReservationPayee(creneauId, nom, email, sessionId);
  const { data, error } = await supabase()
    .from("reservations")
    .insert({
      creneau_id: creneauId,
      nom_patient: nom,
      email_patient: email,
      stripe_session_id: sessionId,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getReservationParSession(
  sessionId: string,
): Promise<Reservation | undefined> {
  if (modeDemo) return memoire.getReservationParSession(sessionId);
  const { data } = await supabase()
    .from("reservations")
    .select("*")
    .eq("stripe_session_id", sessionId)
    .maybeSingle();
  return data ?? undefined;
}

// ── Fonctions admin — boucle 4 ─────────────────────────────────

export async function getReservations(): Promise<Reservation[]> {
  if (modeDemo) return memoire.getReservations();
  // Les plus proches d'abord (spec §4) : tri par date du créneau réservé.
  const { data, error } = await supabase()
    .from("reservations")
    .select("*, creneaux(date_heure)")
    .order("date_heure", { referencedTable: "creneaux", ascending: true });
  if (error) throw error;
  return (data as (Reservation & { creneaux: { date_heure: string } })[])
    .sort((a, b) => a.creneaux.date_heure.localeCompare(b.creneaux.date_heure))
    .map(({ creneaux: _c, ...r }) => r);
}

export async function setStatutReservation(
  id: string,
  statut: Reservation["statut"],
): Promise<void> {
  if (modeDemo) return memoire.setStatutReservation(id, statut);
  const { error } = await supabase()
    .from("reservations")
    .update({ statut })
    .eq("id", id);
  if (error) throw error;
}

export async function getTousCreneauxFuturs(): Promise<Creneau[]> {
  if (modeDemo) return memoire.getTousCreneauxFuturs();
  const { data, error } = await supabase()
    .from("creneaux")
    .select("*")
    .gt("date_heure", new Date().toISOString())
    .order("date_heure");
  if (error) throw error;
  return data;
}

export async function ajouterCreneau(
  consultationId: string,
  dateHeureIso: string,
): Promise<void> {
  if (modeDemo) return memoire.ajouterCreneau(consultationId, dateHeureIso);
  const { error } = await supabase().from("creneaux").insert({
    id: `${consultationId}-${dateHeureIso}`,
    consultation_id: consultationId,
    date_heure: dateHeureIso,
  });
  if (error) throw error;
}

// Un créneau réservé ne peut PAS être supprimé (spec §5) : la règle
// vit dans la couche de données, l'interface ne fait que la refléter.
export async function supprimerCreneau(id: string): Promise<boolean> {
  if (modeDemo) return memoire.supprimerCreneau(id);
  const { data } = await supabase()
    .from("creneaux")
    .delete()
    .eq("id", id)
    .eq("reserve", false) // la condition EST la règle
    .select()
    .maybeSingle();
  return data !== null;
}
