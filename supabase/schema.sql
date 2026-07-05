-- Schéma Supabase — Cabinet Ronron
-- Miroir exact de lib/types.ts : si l'un bouge, l'autre bouge.
-- À exécuter dans l'éditeur SQL de Supabase (une seule fois).

create table consultations (
  id text primary key,
  nom text not null,
  duree_minutes integer not null,
  prix_euros integer not null,
  description text not null
);

create table creneaux (
  id text primary key,
  consultation_id text not null references consultations(id),
  date_heure timestamptz not null,
  reserve boolean not null default false
);

create table reservations (
  id uuid primary key default gen_random_uuid(),
  creneau_id text not null references creneaux(id),
  nom_patient text not null,
  email_patient text not null,
  statut text not null default 'confirmee'
    check (statut in ('confirmee', 'honoree', 'annulee')),
  creee_le timestamptz not null default now(),
  -- Boucle 5 : lien vers la session de paiement Stripe (mode test).
  stripe_session_id text unique
);

-- L'app passe par la clé service_role (côté serveur uniquement) :
-- on verrouille tout accès direct via l'API publique.
alter table consultations enable row level security;
alter table creneaux enable row level security;
alter table reservations enable row level security;

-- Les données de démo (les mêmes que lib/data.ts).
insert into consultations values
  ('premiere', 'Première consultation', 60, 75,
   'Un premier rendez-vous pour faire connaissance et poser le cadre du suivi.'),
  ('suivi', 'Consultation de suivi', 45, 55,
   'La séance régulière, pour avancer à votre rythme.'),
  ('decouverte', 'Séance découverte', 30, 35,
   'Un format court pour découvrir la pratique avant de vous engager.');

-- Créneaux sur les 6 prochains jours (hors dimanche), heures fixes
-- par consultation, fuseau du cabinet.
insert into creneaux (id, consultation_id, date_heure)
select
  c.consultation_id || '-' || to_char(c.dh at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
  c.consultation_id,
  c.dh
from (
  select consultation_id,
         ((current_date + j) + make_interval(mins => (h * 60)::int))
           at time zone 'Europe/Paris' as dh
  from generate_series(1, 6) as j,
       (values ('premiere', 9.0), ('premiere', 14.0),
               ('suivi', 10.0), ('suivi', 14.5), ('suivi', 16.5),
               ('decouverte', 11.0), ('decouverte', 17.0))
         as horaires(consultation_id, h)
  where extract(dow from current_date + j) <> 0 -- fermé le dimanche
) as c;
