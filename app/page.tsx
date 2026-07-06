"use client";

import { useState } from "react";

// Créneaux de démonstration : ils vivent encore en dur dans la page.
// Le contrat a réglé les conventions, pas le produit : ce qu'on construit
// exactement reste à préciser (c'est le barreau suivant).
const CRENEAUX = [
  { id: 1, jour: "Lundi 14 juillet", heure: "09h00" },
  { id: 2, jour: "Lundi 14 juillet", heure: "10h30" },
  { id: 3, jour: "Mardi 15 juillet", heure: "14h00" },
  { id: 4, jour: "Mercredi 16 juillet", heure: "09h00" },
  { id: 5, jour: "Mercredi 16 juillet", heure: "16h30" },
  { id: 6, jour: "Jeudi 17 juillet", heure: "11h00" },
];

export default function Home() {
  const [selection, setSelection] = useState<number | null>(null);
  const [nom, setNom] = useState("");
  const [reserves, setReserves] = useState<number[]>([]);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const reserver = () => {
    if (selection === null || !nom) return;
    setReserves([...reserves, selection]);
    const creneau = CRENEAUX.find((c) => c.id === selection);
    setConfirmation(
      `Merci ${nom}, votre rendez-vous du ${creneau?.jour} à ${creneau?.heure} est confirmé.`
    );
    setSelection(null);
    setNom("");
  };

  return (
    <div className="min-h-screen">
      <header className="border-b border-encre/10 py-8 text-center">
        <h1 className="text-3xl font-bold">Cabinet Ronron</h1>
        <p className="mt-2 opacity-70">
          Réservez votre consultation, sans téléphone ni allers-retours
        </p>
      </header>

      <main className="mx-auto max-w-2xl p-8">
        {confirmation && (
          <div className="mb-6 rounded-lg border border-sauge bg-sauge/10 p-4">
            {confirmation}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          {CRENEAUX.map((creneau) => {
            const estReserve = reserves.includes(creneau.id);
            const estSelectionne = selection === creneau.id;
            return (
              <button
                key={creneau.id}
                disabled={estReserve}
                onClick={() => setSelection(creneau.id)}
                className={`rounded-lg border p-4 text-left transition ${
                  estReserve
                    ? "cursor-not-allowed opacity-40"
                    : estSelectionne
                      ? "border-encre bg-white"
                      : "border-encre/15 hover:border-encre/40"
                }`}
              >
                <div className="font-semibold">{creneau.jour}</div>
                <div className="opacity-70">{creneau.heure}</div>
                {estReserve && (
                  <div className="mt-1 text-sm text-sauge">Réservé</div>
                )}
              </button>
            );
          })}
        </div>

        {selection !== null && (
          <div className="mt-8 rounded-lg border border-encre/15 bg-white p-6">
            <label className="block font-semibold" htmlFor="nom">
              Votre nom
            </label>
            <input
              id="nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Félix Chat"
              className="mt-2 w-full rounded-lg border border-encre/15 p-3"
            />
            {/* L'accent roux du contrat : un seul par écran, sur l'action. */}
            <button
              onClick={reserver}
              className="mt-4 w-full rounded-lg bg-roux p-3 font-semibold text-creme hover:opacity-90"
            >
              Confirmer la réservation
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
