"use client";

import { useState } from "react";

// Créneaux disponibles pour la réservation
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
      `Merci ${nom}, votre rendez-vous du ${creneau?.jour} à ${creneau?.heure} est confirmé !`
    );
    setSelection(null);
    setNom("");
  };

  return (
    <div className="min-h-screen">
      {/* En-tête */}
      <header className="bg-brand py-8 text-center shadow-lg">
        <h1 className="text-3xl font-bold text-white">
          Réservez votre consultation
        </h1>
        <p className="mt-2 text-brand-light">
          Choisissez un créneau, c&apos;est simple et rapide
        </p>
      </header>

      <main className="mx-auto max-w-2xl p-8">
        {/* Message de confirmation */}
        {confirmation && (
          <div className="mb-6 rounded-lg bg-brand-light p-4 text-brand-dark">
            {confirmation}
          </div>
        )}

        {/* Liste des créneaux */}
        <div className="grid grid-cols-2 gap-4">
          {CRENEAUX.map((creneau) => {
            const estReserve = reserves.includes(creneau.id);
            const estSelectionne = selection === creneau.id;
            return (
              <button
                key={creneau.id}
                disabled={estReserve}
                onClick={() => setSelection(creneau.id)}
                className={`rounded-lg border p-4 text-left shadow-sm transition ${
                  estReserve
                    ? "cursor-not-allowed opacity-40"
                    : estSelectionne
                      ? "border-brand bg-brand-light"
                      : "border-gray-200 hover:border-brand"
                }`}
              >
                <div className="font-semibold">{creneau.jour}</div>
                <div className="text-brand">{creneau.heure}</div>
                {estReserve && <div className="mt-1 text-sm">✓ Réservé</div>}
              </button>
            );
          })}
        </div>

        {/* Formulaire */}
        {selection !== null && (
          <div className="mt-8 rounded-lg border border-gray-200 p-6 shadow-sm">
            <label className="block font-semibold" htmlFor="nom">
              Votre nom
            </label>
            <input
              id="nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Jean Dupont"
              className="mt-2 w-full rounded-lg border border-gray-200 p-3"
            />
            <button
              onClick={reserver}
              className="mt-4 w-full rounded-lg bg-brand p-3 font-semibold text-white hover:bg-brand-dark"
            >
              Confirmer la réservation
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
