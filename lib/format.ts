// Formatage des dates en français (« mar 14h30 »).
// Fuseau EXPLICITE : le serveur qui rend la page (un hébergeur = souvent UTC)
// n'est pas dans le fuseau du cabinet. Sans ça, les heures affichées suivent
// la machine qui rend la page, pas le cabinet. (Vérification, boucle admin.)

const FUSEAU_CABINET = "Europe/Paris";

export function formatCreneau(iso: string): string {
  const date = new Date(iso);
  const jour = date.toLocaleDateString("fr-FR", {
    weekday: "short",
    timeZone: FUSEAU_CABINET,
  });
  const [heure, minutes] = date
    .toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: FUSEAU_CABINET,
    })
    .split(":");
  return `${jour} ${Number(heure)}h${minutes}`;
}

export function formatDateLongue(iso: string): string {
  const date = new Date(iso);
  const texte = date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: FUSEAU_CABINET,
  });
  const [heure, minutes] = date
    .toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: FUSEAU_CABINET,
    })
    .split(":");
  return `${texte}, ${Number(heure)}h${minutes}`;
}
