// Données de démonstration du bac à sable.
// Choix assumé : des données locales suffisent, le produit est un prétexte.

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
//
// Les heures du cabinet sont des heures de PARIS, pas des heures du serveur
// (leçon de la vérification de la boucle admin : sans fuseau explicite, le
// même « 10h00 » désignait un instant différent selon le serveur).
// Offset d'été codé en dur : assumé pour un bac à sable, une vraie prod
// utiliserait une bibliothèque de fuseaux.
const OFFSET_CABINET = "+02:00";

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
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    for (const [consultationId, heures] of Object.entries(horaires)) {
      for (const h of heures) {
        const hh = String(Math.floor(h)).padStart(2, "0");
        const mn = String((h % 1) * 60).padStart(2, "0");
        const instant = new Date(`${y}-${m}-${d}T${hh}:${mn}:00${OFFSET_CABINET}`);
        liste.push({
          id: `${consultationId}-${instant.toISOString()}`,
          consultation_id: consultationId,
          date_heure: instant.toISOString(),
          reserve: false,
        });
      }
    }
  }
  return liste;
}

export const creneaux: Creneau[] = creneauxDemo();
