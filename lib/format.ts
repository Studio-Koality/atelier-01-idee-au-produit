// Formatage des dates en français, façon maquette (« mar 14h30 »).

export function formatCreneau(iso: string): string {
  const date = new Date(iso);
  const jour = date.toLocaleDateString("fr-FR", { weekday: "short" });
  const heure = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${jour} ${heure}h${minutes}`;
}

export function formatDateLongue(iso: string): string {
  const date = new Date(iso);
  const texte = date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${texte}, ${date.getHours()}h${minutes}`;
}
