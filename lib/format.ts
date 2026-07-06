// Formatage des dates en français (« mar 14h30 »).

export function formatCreneau(iso: string): string {
  const date = new Date(iso);
  const jour = date.toLocaleDateString("fr-FR", { weekday: "short" });
  const [heure, minutes] = date
    .toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
    .split(":");
  return `${jour} ${Number(heure)}h${minutes}`;
}

export function formatDateLongue(iso: string): string {
  const date = new Date(iso);
  const texte = date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const [heure, minutes] = date
    .toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
    .split(":");
  return `${texte}, ${Number(heure)}h${minutes}`;
}
