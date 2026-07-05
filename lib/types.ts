// Les types du domaine, dérivés de docs/SPEC.md section 2.
// Si un type ne correspond plus à la spec, c'est le type qu'on corrige.

export type Consultation = {
  id: string;
  nom: string;
  duree_minutes: number;
  prix_euros: number;
  description: string;
};

// Un créneau est un couple consultation + date/heure (spec §2).
export type Creneau = {
  id: string;
  consultation_id: string;
  date_heure: string; // ISO 8601
  reserve: boolean;
};

export type StatutReservation = "confirmee" | "honoree" | "annulee";

export type Reservation = {
  id: string;
  creneau_id: string;
  nom_patient: string;
  email_patient: string;
  statut: StatutReservation;
  creee_le: string; // ISO 8601
};
