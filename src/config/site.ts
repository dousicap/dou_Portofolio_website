/**
 * Constantes du site — source unique.
 *
 * Toute valeur susceptible de changer avant la mise en ligne vit ici et
 * nulle part ailleurs. Aucun composant ne doit coder une de ces valeurs en dur.
 * Voir la section « À remplacer avant mise en ligne » du README.
 */

export const SITE = {
  /** Domaine de production. Sert au sitemap et aux URL canoniques. */
  url: 'https://papaamadouba.fr',
  nom: 'Papa Amadou BA',
  /** Utilisé dans le <title> de chaque page et l'Open Graph. */
  titre: 'Papa Amadou BA — systèmes agentiques en environnement normé',
  description:
    "La plupart des pilotes IA ne passent jamais en production. Je construis ceux qui y arrivent, dans les métiers où une décision doit être justifiable.",
  langue: 'fr',
} as const;

/**
 * CTA unique du site. Un seul bouton primaire, répété au plus deux fois par page.
 *
 * `reservation` est un placeholder : créer l'événement « Appel de cadrage — 30 min »
 * sur Cal.com, puis remplacer cette seule chaîne.
 */
export const CTA = {
  reservation: 'https://cal.com/REMPLACER-MOI/cadrage-30min',
  libelle: 'Réserver un appel de cadrage',
  /** Repli textuel discret sous le bouton — jamais un second bouton concurrent. */
  email: 'papamadouba@gmail.com',
} as const;

/** Navigation principale. L'ordre est celui du parcours de conversion. */
export const NAV = [
  { href: '/systemes', libelle: 'Systèmes' },
  { href: '/methode', libelle: 'Méthode' },
  { href: '/offres', libelle: 'Offres' },
  { href: '/a-propos', libelle: 'À propos' },
  { href: '/contact', libelle: 'Contact' },
] as const;
