// Écran 1 · Le catalogue (spec §2). Le catalogue EST l'accueil.

import Link from "next/link";
import { getConsultations } from "@/lib/store";

// Rendu à la demande : le catalogue reflète le magasin, pas le moment du build.
export const dynamic = "force-dynamic";

export default function Catalogue() {
  const consultations = getConsultations();
  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-3xl font-bold">Cabinet Ronron 🐈</h1>
      <p className="mb-6 mt-1 text-lg opacity-65">
        Choisissez votre consultation
      </p>

      <ul className="flex flex-col gap-4">
        {consultations.map((c) => (
          <li key={c.id}>
            <Link
              href={`/consultation/${c.id}`}
              className="block rounded-2xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <h2 className="text-lg font-semibold">{c.nom}</h2>
              <p className="my-1 flex gap-3 text-sm">
                <span className="opacity-60">{c.duree_minutes} min</span>
                <span className="font-bold text-roux">{c.prix_euros} €</span>
              </p>
              <p className="text-sm leading-snug opacity-75">
                {c.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
