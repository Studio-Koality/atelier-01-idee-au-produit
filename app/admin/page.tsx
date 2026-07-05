// L'admin du praticien — boucle 4 (spec §4).
// Une seule page, deux blocs : les réservations, les créneaux.
// Accès par clé (décision boucle 4, spec mise à jour).

import { notFound } from "next/navigation";
import {
  getReservations,
  getTousCreneauxFuturs,
  getConsultations,
  getCreneau,
} from "@/lib/db";
import { changerStatut, creerCreneau, retirerCreneau } from "@/lib/actions";
import { formatDateLongue, formatCreneau } from "@/lib/format";

export const dynamic = "force-dynamic";

const LIBELLES = {
  confirmee: "Confirmée",
  honoree: "Honorée",
  annulee: "Annulée",
} as const;

export default async function Admin({
  searchParams,
}: {
  searchParams: Promise<{ cle?: string }>;
}) {
  const { cle } = await searchParams;
  // Sans la bonne clé, cette page n'existe pas (404, pas de formulaire de
  // connexion : rien à attaquer). Les actions revérifient de leur côté.
  if (!process.env.ADMIN_SECRET || cle !== process.env.ADMIN_SECRET) {
    notFound();
  }

  const [reservations, creneaux, consultations] = await Promise.all([
    getReservations(),
    getTousCreneauxFuturs(),
    getConsultations(),
  ]);
  const nomConsultation = (id: string) =>
    consultations.find((c) => c.id === id)?.nom ?? id;

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-3xl font-bold">Le cabinet, côté praticien</h1>
      <p className="mb-8 mt-1 opacity-65">Réservations et créneaux</p>

      {/* ── Bloc 1 : les réservations, les plus proches d'abord ── */}
      <h2 className="mb-3 text-xl font-semibold">Réservations</h2>
      {reservations.length === 0 ? (
        <p className="mb-8 rounded-2xl bg-white p-5 text-sm opacity-70 shadow-sm">
          Aucune réservation pour l&apos;instant.
        </p>
      ) : (
        <ul className="mb-8 flex flex-col gap-3">
          {await Promise.all(
            reservations.map(async (r) => {
              const creneau = await getCreneau(r.creneau_id);
              return (
                <li
                  key={r.id}
                  className="rounded-2xl bg-white p-4 shadow-sm"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-semibold">{r.nom_patient}</span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        r.statut === "confirmee"
                          ? "bg-(--roux)/15 text-(--roux)"
                          : r.statut === "honoree"
                            ? "bg-(--sauge)/20 text-(--sauge)"
                            : "bg-black/10 opacity-60"
                      }`}
                    >
                      {LIBELLES[r.statut]}
                    </span>
                  </div>
                  <p className="mt-1 text-sm opacity-70">
                    {creneau && formatDateLongue(creneau.date_heure)} ·{" "}
                    {creneau && nomConsultation(creneau.consultation_id)} ·{" "}
                    {r.email_patient}
                  </p>
                  {r.statut === "confirmee" && (
                    <div className="mt-3 flex gap-2">
                      {(["honoree", "annulee"] as const).map((statut) => (
                        <form action={changerStatut} key={statut}>
                          <input type="hidden" name="cle" value={cle} />
                          <input type="hidden" name="reservation" value={r.id} />
                          <input type="hidden" name="statut" value={statut} />
                          <button className="rounded-full border-[1.5px] border-black/15 px-3 py-1 text-xs font-semibold hover:bg-black/5">
                            Marquer {LIBELLES[statut].toLowerCase()}
                          </button>
                        </form>
                      ))}
                    </div>
                  )}
                </li>
              );
            }),
          )}
        </ul>
      )}

      {/* ── Bloc 2 : les créneaux ── */}
      <h2 className="mb-3 text-xl font-semibold">Créneaux à venir</h2>
      <form
        action={creerCreneau}
        className="mb-4 flex flex-wrap items-end gap-2 rounded-2xl bg-white p-4 shadow-sm"
      >
        <input type="hidden" name="cle" value={cle} />
        <label className="flex-1 text-sm">
          <span className="mb-1 block font-semibold">Consultation</span>
          <select
            name="consultation"
            className="w-full rounded-xl border-[1.5px] border-black/15 bg-white px-3 py-2"
          >
            {consultations.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nom}
              </option>
            ))}
          </select>
        </label>
        <label className="flex-1 text-sm">
          <span className="mb-1 block font-semibold">Date et heure</span>
          <input
            type="datetime-local"
            name="date_heure"
            required
            className="w-full rounded-xl border-[1.5px] border-black/15 bg-white px-3 py-2"
          />
        </label>
        <button className="rounded-xl bg-(--roux) px-4 py-2 text-sm font-bold text-white">
          Ajouter
        </button>
      </form>

      <ul className="flex flex-col gap-1.5">
        {creneaux.map((c) => (
          <li
            key={c.id}
            className="flex items-center justify-between rounded-xl bg-white px-4 py-2 text-sm shadow-sm"
          >
            <span>
              {formatCreneau(c.date_heure)} ·{" "}
              {nomConsultation(c.consultation_id)}
            </span>
            {c.reserve ? (
              <span className="text-xs font-semibold text-(--sauge)">
                réservé
              </span>
            ) : (
              <form action={retirerCreneau}>
                <input type="hidden" name="cle" value={cle} />
                <input type="hidden" name="creneau" value={c.id} />
                <button className="text-xs opacity-50 hover:opacity-100">
                  retirer
                </button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
