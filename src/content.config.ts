import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Ajouter un système au portfolio = ajouter un fichier MDX dans
 * src/content/systemes/. Aucune page n'est à modifier. Voir le README.
 */
const systemes = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/systemes' }),
  // `image()` fait valider le chemin au build ET rend le fichier optimisable
  // par <Image> : formats modernes, dimensions posees, pas de saut de mise en
  // page au chargement. Un chemin errone casse le build plutot que de produire
  // une image cassee en ligne.
  schema: ({ image }) => z.object({
    titre: z.string(),
    resume: z.string(),
    /** Statut honnête, affiché tel quel dans le badge. Aucun euphémisme. */
    statut: z.string(),
    domaine: z.string(),
    stack: z.array(z.string()),
    /** Ordre d'affichage dans l'index et sur l'accueil. */
    ordre: z.number(),
    /**
     * Capture du systeme en fonctionnement. Facultative : la plupart des
     * systemes n'ont rien de montrable sans exposer un interne de projet.
     * Ce qui est montre doit tourner et ne contenir aucune donnee reelle.
     */
    image: image().optional(),
    /** Description pour lecteur d'ecran. Obligatoire des qu'il y a une image. */
    imageAlt: z.string().optional(),
    /** Legende sous l'image : ce que le lecteur doit y voir. */
    imageLegende: z.string().optional(),
  }),
});

export const collections = { systemes };
