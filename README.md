# Portfolio — Papa Amadou BA

Site de crédibilité pour un builder de systèmes agentiques en environnement
normé. Objectif unique : convertir un visiteur froid en appel de cadrage réservé.

La source de vérité du contenu est [`docs/portfolio-brief.md`](docs/portfolio-brief.md).
Le code ne réinvente pas le contenu, il le rend.

---

## Commandes

| Commande | Effet |
|---|---|
| `npm install` | Installe les dépendances |
| `npm run dev` | Serveur de développement — <http://localhost:4321> |
| `npm run build` | Génère le site statique dans `dist/` |
| `npm run preview` | Sert `dist/` localement pour contrôle avant mise en ligne |
| `npm run check` | Vérification de types Astro / TypeScript |

Le dossier de sortie est **`dist/`**. Il est ignoré par git : c'est un artefact
de build, jamais un livrable versionné.

> Sur WSL2, `npm run build` prend plusieurs minutes (le processus est bloqué en
> I/O, autour de 25 % de CPU). Ce n'est pas un défaut du site : le résultat
> produit pèse moins de 500 Ko.

---

## Ce qui reste à faire, et ce qui ne bloque plus

Le site part en ligne tel quel. Rien de ce qui suit n'empêche de publier ;
chacun le rend meilleur.

| Point | État | Geste |
|---|---|---|
| `CTA.reservation` | pointe sur un courriel pré-rempli | Créer l'événement « Appel de cadrage — 30 min » sur Cal.com et coller l'URL. **Une seule chaîne à changer** dans `src/config/site.ts`. |
| Photo | absente, et invisible | Déposer une photo réelle dans `public/`, puis remettre la `<Section>` supprimée dans `src/pages/a-propos.astro` (le commentaire indique où). |
| Domaine | `dousicap.github.io/dou_Portofolio_website` | Acheter le domaine, ajouter un `CNAME`, mettre `SITE.url` à l'origine réelle et `SITE.base` à `'/'`. Aucun autre fichier à toucher. |
| Récit `/a-propos` | deux précisions retirées | Durée réelle de l'import-export, intitulé de la formation. Les phrases tiennent sans, elles gagnent avec. |

Un bouton qui mène à une page inexistante coûte plus cher que l'absence de
réservation en ligne : c'est pourquoi le CTA est un courriel pré-rempli tant que
Cal.com n'existe pas, et non une URL `REMPLACER-MOI`.

---

## Ajouter un système au portfolio

Ajouter **un fichier MDX** dans `src/content/systemes/`. Aucune page n'est à
modifier : l'index `/systemes`, la page de détail `/systemes/[slug]`, les cartes
de l'accueil et le sitemap se mettent à jour seuls. Le nom du fichier devient
l'URL (`ledgera.mdx` → `/systemes/ledgera`).

```mdx
---
titre: "Nom du système — ce qu'il fait"
resume: "Une phrase. Ce qui est démontré, pas ce qui est promis."
statut: "En développement"        # affiché tel quel dans le badge
domaine: "Secteur d'application"
stack: ["LangGraph", "Python"]
ordre: 5                          # ordre d'affichage, croissant
---

**Contexte.** …

**Contrainte.** …

**Système.** …

**Preuve.** …

**Statut.** …

**Ce que ça démontre.** …
```

Le schéma est validé au build (`src/content.config.ts`) : un champ manquant ou
mal typé fait échouer `npm run build` plutôt que de produire une page cassée.

Trois règles de contenu, non négociables :

1. **Le format des six temps est imposé** et identique pour tous les systèmes.
   Le rendu s'appuie dessus (l'intertitre en gras est promu et passe à l'accent).
2. **Le statut affiché est le statut réel.** « En développement » se dit.
3. **Aucun interne de projet, aucun tiers nommé.** On expose des patterns et des
   artefacts de méthode. Voir la matrice de publication, brief §4.

---

## Architecture

```
src/
  config/site.ts          Constantes — URL Cal.com, email, navigation, domaine
  styles/tokens.css       SEUL fichier autorisé à contenir un code hexadécimal
  content.config.ts       Schéma de la collection systemes
  content/systemes/*.mdx  Les études de cas — le contenu vit ici
  components/             Bouton, Carte, Section, Nav, PiedDePage, Badge,
                          Prose, AppelAction
  layouts/Base.astro      <head>, métadonnées, Open Graph, lien d'évitement
  pages/                  Une page = un fichier
public/                   favicon
docs/portfolio-brief.md   Source de vérité du contenu
```

Routes : `/`, `/systemes`, `/systemes/[slug]`, `/methode`, `/offres`,
`/a-propos`, `/contact`, plus `/design-system` (page interne, `noindex`, non
liée depuis la navigation).

### Stack

Astro 7 · Tailwind CSS 4 · MDX · statique, zéro JavaScript expédié au client.

Pas de base de données, pas d'authentification, pas de CMS, pas de React, pas de
librairie d'animation. Les polices sont auto-hébergées (`@fontsource-variable`) :
aucune requête ne part vers un tiers, ce qui est cohérent avec le discours de
souveraineté du site.

> **Écart assumé au brief §3**, qui fige Astro 5. La branche 5.x porte huit avis
> de sécurité ouverts (XSS via `define:vars`, spread props, transitions de vue ;
> SSRF par en-tête `Host`) et **aucune version corrigée** n'existe sur cette
> branche. Astro 7.1.1 les corrige et tient l'intégralité de l'intention du §3.
> `npm audit` remonte 0 vulnérabilité.

---

## Invariants vérifiables

Ces contrôles doivent rester verts. Ils sont la raison pour laquelle le site
reste modifiable sans se dégrader.

```bash
# 1. Aucun code hexadécimal hors du fichier de tokens
grep -rEn '#[0-9a-fA-F]{3,8}\b' src/ | grep -v 'src/styles/tokens.css'

# 2. Aucune URL de réservation ni email codés en dur hors des constantes
grep -rn 'cal\.com\|papamadouba' src/ | grep -v 'src/config/site.ts'

# 3. Le build passe
npm run build

# 4. Aucun lien interne ne perd le préfixe de base (sinon : 404 en production)
grep -rohE 'href="/[^"]*"' dist --include='*.html' | grep -v 'href="/dou_Portofolio_website'
```

Les 1, 2 et 4 doivent renvoyer un résultat vide, le 3 sortir en succès. Le
quatrième est aussi joué par le workflow de déploiement : un lien qui perd la
base ne casse pas le build, seulement le site en ligne.

### Contraste

Toutes les combinaisons texte/fond passent WCAG 2.1 AA. Deux tokens de bordure
coexistent délibérément :

- `--color-trait` (`#1F2A35`, 1,32:1) — **séparateurs décoratifs uniquement**,
  exempts du critère 1.4.11 ;
- `--color-trait-controle` (`#546878`, 3,32:1 sur le fond) — **bordure des
  contrôles cliquables**, seul moyen de délimiter un bouton secondaire.

Ne pas employer `--color-trait` pour délimiter un élément interactif : c'est un
échec d'accessibilité, pas un choix esthétique.

---

## Déploiement

Automatique. Tout `push` sur `main` déclenche
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) : `npm ci`,
`npm run build`, contrôle des liens internes, publication sur GitHub Pages.

**Réglage à faire une seule fois** — Settings > Pages > Source : choisir
**GitHub Actions**. Tant que la source reste « Deploy from a branch », Pages
tente un build Jekyll, ne produit rien, et continue de servir l'ancien
déploiement. C'est exactement la raison pour laquelle ce site n'a jamais été
publié jusqu'ici.

Redéployer sans commit : onglet Actions > « Deploiement du site » > Run workflow.

### Changer de domaine plus tard

Trois gestes, aucun code à réécrire : ajouter le domaine dans Settings > Pages,
mettre `SITE.url` à la nouvelle origine et `SITE.base` à `'/'`. La fonction
`lien()` devient l'identité, les liens continuent de fonctionner.
