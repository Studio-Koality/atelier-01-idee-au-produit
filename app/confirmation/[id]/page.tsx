// Écran 3 — Confirmation (maquette/maquette.html, écran 3).
// Récapitulatif, ton chaleureux, aucune action concurrente.

import { notFound } from "next/navigation";
import {
  getReservation,
  getCreneau,
  getConsultation,
} from "@/lib/db";
import { formatDateLongue } from "@/lib/format";

export default async function Confirmation({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const reservation = await getReservation(id);
  if (!reservation) notFound();
  const creneau = (await getCreneau(reservation.creneau_id))!;
  const consultation = (await getConsultation(creneau.consultation_id))!;

  const prenom = reservation.nom_patient.split(" ")[0];

  return (
    <main className="mx-auto max-w-md p-6 pt-16 text-center">
      <div className="mx-auto mb-5 flex h-18 w-18 items-center justify-center rounded-full bg-(--sauge) text-3xl text-white">
        ✓
      </div>
      <h1 className="text-3xl font-bold">C&apos;est réservé, {prenom}.</h1>
      <p className="mt-2 text-lg opacity-65">
        Votre créneau vous attend, on a hâte de vous voir.
      </p>

      <dl className="mt-8 rounded-2xl bg-white p-5 text-left shadow-sm">
        <div className="flex justify-between py-1.5 text-sm">
          <dt>Consultation</dt>
          <dd className="font-semibold">
            {consultation.nom} · {consultation.duree_minutes} min
          </dd>
        </div>
        <div className="flex justify-between py-1.5 text-sm">
          <dt>Date</dt>
          <dd className="font-semibold">
            {formatDateLongue(creneau.date_heure)}
          </dd>
        </div>
        <div className="flex justify-between py-1.5 text-sm">
          <dt>Montant</dt>
          <dd className="font-semibold">{consultation.prix_euros} €</dd>
        </div>
      </dl>
    </main>
  );
}
