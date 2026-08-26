/**
 * Préfixe un chemin interne par la base de déploiement du site.
 *
 * Pourquoi ce fichier existe : sur GitHub Pages, un site de projet est servi
 * sous `/<nom-du-depot>/`, pas à la racine du domaine. Astro connaît cette base
 * (`base` dans astro.config.mjs) et l'applique à ses propres URL, mais **pas**
 * aux `href` écrits en dur dans le markup. Un `href="/systemes"` pointe alors
 * vers la racine du domaine et renvoie un 404, en production seulement : le
 * serveur de développement sert à la racine et ne montre jamais le défaut.
 *
 * Tout lien interne passe donc par `lien()`. Les liens externes (mailto, Cal.com)
 * ne doivent PAS y passer.
 *
 * Le jour où le site vit sur son propre domaine, `base` repasse à `/` et cette
 * fonction devient l'identité : aucun appel n'est à retirer.
 */

/** Toujours terminé par « / », y compris quand la base vaut « / ». */
const BASE = import.meta.env.BASE_URL;

export function lien(chemin: string): string {
  return `${BASE.replace(/\/$/, '')}/${chemin.replace(/^\//, '')}`;
}
