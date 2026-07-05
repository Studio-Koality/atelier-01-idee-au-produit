// Données de démonstration — boucle 1.
// Choix assumé : on commence avec des données locales pour valider l'interface.
// Supabase les remplacera en boucle 3, sans toucher aux écrans.

import type { Consultation, Creneau } from "./types";

export const consultations: Consultation[] = [
  {
    id: "premiere",
    nom: "Première consultation",
    duree_minutes: 60,
    prix_euros: 75,
    description:
      "Un premier rendez-vous pour faire connaissance et poser le cadre du suivi.",
  },
  {
    id: "suivi",
    nom: "Consultation de suivi",
    duree_minutes: 45,
    prix_euros: 55,
    description: "La séance régulière, pour avancer à votre rythme.",
  },
  {
    id: "decouverte",
    nom: "Séance découverte",
    duree_minutes: 30,
    prix_euros: 35,
    description:
      "Un format court pour découvrir la pratique avant de vous engager.",
  },
];

// Créneaux générés sur les jours à venir, à heures fixes par consultation.
// La date de génération est volontairement relative : les créneaux sont
// toujours « la semaine prochaine », quel que soit le jour de l'atelier.
function creneauxDemo(): Creneau[] {
  const horaires: Record<string, number[]> = {
    premiere: [9, 14],
    suivi: [10, 14.5, 16.5],
    decouverte: [11, 17],
  };
  const liste: Creneau[] = [];
  const base = new Date();
  base.setHours(0, 0, 0, 0);
  for (let jour = 1; jour <= 6; jour++) {
    const date = new Date(base);
    date.setDate(date.getDate() + jour);
    if (date.getDay() === 0) continue; // fermé le dimanche
    for (const [consultationId, heures] of Object.entries(horaires)) {
      for (const h of heures) {
        const creneau = new Date(date);
        creneau.setHours(Math.floor(h), (h % 1) * 60);
        liste.push({
          id: `${consultationId}-${creneau.toISOString()}`,
          consultation_id: consultationId,
          date_heure: creneau.toISOString(),
          reserve: false,
        });
      }
    }
  }
  return liste;
}

export const creneaux: Creneau[] = creneauxDemo();
