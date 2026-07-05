// Écran 2 — Détail & réservation (maquette/maquette.html, écran 2).
// Créneaux en pastilles, formulaire minimal, un seul bouton d'action.

import Link from "next/link";
import { notFound } from "next/navigation";
import { getConsultation, getCreneauxDisponibles } from "@/lib/store";
import { reserver } from "@/lib/actions";
import { formatCreneau } from "@/lib/format";

export default async function Detail({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ erreur?: string }>;
}) {
  const { id } = await params;
  const { erreur } = await searchParams;
  const consultation = getConsultation(id);
  if (!consultation) notFound();

  const creneaux = getCreneauxDisponibles(id);

  return (
    <main className="mx-auto max-w-md p-6">
      <Link href="/" className="text-sm opacity-60 hover:opacity-100">
        ← Toutes les consultations
      </Link>
      <h1 className="mt-3 text-3xl font-bold">{consultation.nom}</h1>
      <p className="mb-6 mt-1 text-lg opacity-65">
        {consultation.duree_minutes} min ·{" "}
        <span className="font-bold text-(--roux)">
          {consultation.prix_euros} €
        </span>
      </p>

      {erreur === "creneau" && (
        <p className="mb-4 rounded-xl bg-(--roux)/10 p-3 text-sm">
          Ce créneau vient d&apos;être réservé par quelqu&apos;un d&apos;autre.
          Choisissez-en un autre.
        </p>
      )}
      {erreur === "champs" && (
        <p className="mb-4 rounded-xl bg-(--roux)/10 p-3 text-sm">
          Il manque un créneau, votre nom ou un email valide.
        </p>
      )}

      {creneaux.length === 0 ? (
        <p className="rounded-2xl bg-white p-5 shadow-sm">
          Plus aucun créneau disponible pour cette consultation.
          Revenez bientôt, l&apos;agenda s&apos;ouvre chaque semaine.
        </p>
      ) : (
        <form action={reserver}>
          <fieldset className="mb-5">
            <legend className="mb-2 text-sm font-semibold">
              Créneaux disponibles
            </legend>
            <div className="flex flex-wrap gap-2">
              {creneaux.map((c) => (
                <label key={c.id} className="cursor-pointer">
                  <input
                    type="radio"
                    name="creneau"
                    value={c.id}
                    required
                    className="peer sr-only"
                  />
                  <span className="inline-block rounded-full border-[1.5px] border-(--sauge) px-3 py-1.5 text-sm text-(--sauge) peer-checked:bg-(--sauge) peer-checked:font-semibold peer-checked:text-white">
                    {formatCreneau(c.date_heure)}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="mb-1 block text-sm font-semibold" htmlFor="nom">
            Votre nom
          </label>
          <input
            id="nom"
            name="nom"
            type="text"
            required
            placeholder="Félix Chat"
            className="mb-4 w-full rounded-xl border-[1.5px] border-black/15 bg-white px-4 py-3"
          />
          <label className="mb-1 block text-sm font-semibold" htmlFor="email">
            Votre email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="felix@exemple.fr"
            className="w-full rounded-xl border-[1.5px] border-black/15 bg-white px-4 py-3"
          />

          <button
            type="submit"
            className="mt-6 w-full rounded-2xl bg-(--roux) py-4 text-lg font-bold text-white transition-opacity hover:opacity-90"
          >
            Réserver · {consultation.prix_euros} €
          </button>
        </form>
      )}
    </main>
  );
}
