/**
 * Constantes du site — source unique.
 *
 * Toute valeur susceptible de changer avant la mise en ligne vit ici et
 * nulle part ailleurs. Aucun composant ne doit coder une de ces valeurs en dur.
 * Voir la section « À remplacer avant mise en ligne » du README.
 */

export const SITE = {
  /**
   * Origine de production. Sert au sitemap et aux URL canoniques.
   *
   * Aujourd'hui : GitHub Pages, site de projet, donc servi sous `base`.
   * Le jour ou un domaine propre existe : mettre l'origine ici et repasser
   * `base` a '/'. Aucun autre fichier n'est a toucher.
   */
  url: 'https://dousicap.github.io',
  /** Chemin de deploiement. '/' des qu'un domaine propre remplace github.io. */
  base: '/dou_Portofolio_website',
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
  /**
   * UNE SEULE VALEUR A CHANGER quand l'evenement Cal.com existe.
   *
   * En attendant, le CTA pointe sur un courriel pre-rempli plutot que sur une
   * URL Cal.com inexistante : un bouton qui mene a une page 404 coute plus cher
   * que l'absence de reservation en ligne. Le parcours reste a une seule action.
   */
  reservation:
    'mailto:papamadouba@gmail.com?subject=Appel%20de%20cadrage%20%E2%80%94%2030%20min&body=Contexte%20metier%20%3A%0AContrainte%20reglementaire%20%3A%0AOu%20le%20pilote%20bloque%20aujourd%27hui%20%3A%0A',
  libelle: 'Demander un appel de cadrage',
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
