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
