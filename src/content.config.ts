import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Ajouter un système au portfolio = ajouter un fichier MDX dans
 * src/content/systemes/. Aucune page n'est à modifier. Voir le README.
 */
const systemes = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/systemes' }),
  schema: z.object({
    titre: z.string(),
    resume: z.string(),
    /** Statut honnête, affiché tel quel dans le badge. Aucun euphémisme. */
    statut: z.string(),
    domaine: z.string(),
    stack: z.array(z.string()),
    /** Ordre d'affichage dans l'index et sur l'accueil. */
    ordre: z.number(),
  }),
});

export const collections = { systemes };
