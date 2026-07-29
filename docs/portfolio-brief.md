# Portfolio Dou — Brief de positionnement + pack de direction Claude Code

Version 1.0 — à déposer à la racine du repo `dou_Portofolio_website` sous `docs/portfolio-brief.md`.

---

## 0. Décision de cadrage (à valider avant toute ligne de code)

| Question | Décision retenue | Raison |
|---|---|---|
| Objet du site | **Machine de confiance**, pas galerie de projets | Un consultant IA se vend sur la preuve de méthode, pas sur le nombre de repos |
| Audience n°1 | Décideurs en environnement contraint (cabinets, éditeurs, DAF, DSI) + communautés builders | C'est là qu'est le budget et là que la rigueur se paie |
| Langue | FR par défaut, structure i18n prête, `/en` en phase 2 | Marché FR + ouverture Afrique de l'Ouest, puis international |
| Nombre de CTA | **Un seul** : réserver un appel (Cal.com) | Plusieurs CTA = zéro conversion |
| Statut des projets | Affiché honnêtement (`en développement`, `pilote`, `interne`) | Aucun résultat client inventé — la crédibilité est l'actif |
| Où se fait le travail | Contenu = ici. Build = Claude Code | Le contenu est le goulot, pas le code |

---

## 1. Positionnement

### Thèse (à mettre en H1 du site)

> **La plupart des pilotes IA ne passent jamais en production. Je construis ceux qui y arrivent — dans les métiers où une décision doit être justifiable.**

### Formule d'accroche (variante courte, à reprendre en bio LinkedIn et en headline)

> J'aide les organisations en **environnement normé** à passer du **pilote IA au système agentique en production**, avec une architecture où **l'IA propose, un moteur déterministe contrôle, l'humain approuve**.

### Les 3 différenciateurs (sous-titres du hero)

1. **Décision auditable** — contrôles déterministes bloquants au-dessus du probabiliste, machine d'état de la proposition à l'écriture, traçabilité de bout en bout.
2. **Preuve avant livraison** — harness d'évaluation en gate CI, corpus de référence versionné, critères d'acceptation testables.
3. **Souveraineté** — inférence auto-hébergeable, chiffrement par client, conformité FR/UE (et ouverture SYSCOHADA).

### Ce qu'on ne dit PAS

- Pas de « expert en IA », « passionné par l'IA », « transformer votre business grâce à l'IA ».
- Pas de liste d'outils en guise d'identité (n8n, LangGraph, Claude…) au-dessus du pli.
- Pas de chiffre de résultat client tant qu'il n'y a pas de client payant signé.

---

## 2. Architecture du site

```
/                      Thèse + 3 preuves + méthode en 4 temps + CTA unique
/systemes/             Index des systèmes construits
/systemes/[slug]       4 études de cas (format Contexte → Contrainte → Système → Preuve → Statut)
/methode               Plan → Build → Verify → Evolve, gates, evals, decision log
/offres                3 offres PASS (audit / build / exploitation)
/a-propos              Parcours, photo réelle, pourquoi ce positionnement
/contact               Cal.com embarqué + email
/design-system         Page interne d'exposition des tokens et composants
```

**Ordre de build strict** : `/design-system` → `/` → `/systemes/[slug]` → `/offres` → `/methode` → `/a-propos` → `/contact`.

---

## 3. Stack (décidée, non négociable pour v1)

| Couche | Choix | Pourquoi |
|---|---|---|
| Framework | **Astro 5** | Statique, zéro JS par défaut, content collections = projets comme données |
| Styles | **Tailwind CSS 4** + tokens centraux dans un seul fichier | Zéro hex en dur, scalable |
| Contenu | **MDX** dans `src/content/systemes/` | Ajouter un projet = ajouter un fichier, jamais toucher au code |
| Hébergement | **Cloudflare Pages** (ou Vercel) sur push `main` | Gratuit, rapide, domaine custom |
| Booking | **Cal.com** | Résidence de données UE — cohérent avec le discours souveraineté |
| Analytics | Plausible ou Umami | Sans cookie, cohérent RGPD |

Interdits v1 : CMS headless, base de données, auth, animations lourdes, framework JS full (Next/React app router).

---

## 4. Matrice de contenu — quoi publier, quoi masquer

> Règle absolue : **le portfolio expose des patterns et des artefacts de méthode, jamais des internes de projet ni des tiers nommés.**

| Projet | Ce qui est publiable | Ce qui reste privé (jamais en ligne) |
|---|---|---|
| **Ledgera** | Le problème métier, le pattern d'architecture (propose/contrôle/approuve), les principes de conformité, le harness d'évaluation, le statut « en développement » | Contenu du PRD et des deltas, résultats d'audit interne, noms de l'équipe de dev et des contacts, captures du produit client, corpus normatif |
| **AMNA Engine** | Le cas d'usage (sourcing pièces auto Afrique de l'Ouest), l'architecture copilote, le principe du corpus annoté | Noms de fournisseurs, volumes, marges, cas WhatsApp bruts |
| **DOU-AIOS / task-workflow** | Le système d'orchestration multi-agents, les gates de review, les hooks de sécurité | Chemins locaux, config machine, contenu des hooks |
| **Bibliothèque de skills** | Le principe (connaissance → actif réutilisable), le nombre, les conventions | Le contenu des skills client ou sous licence |
| **Réseau / conversations** | Rien | Toute conversation avec un cabinet, un auditeur, un proche ou un prospect |

---

## 5. Les 4 études de cas (contenu prêt à coller)

Format imposé, identique pour les 4 : `Contexte → Contrainte → Système → Preuve → Statut → Ce que ça démontre`.

### 5.1 `src/content/systemes/ledgera.mdx`

```mdx
---
titre: "Ledgera — moteur de décision agentique pour l'expertise comptable"
resume: "Une plateforme multi-agents où l'IA propose, un moteur déterministe contrôle et l'expert approuve."
statut: "Produit propriétaire — en développement"
domaine: "Comptabilité réglementée (FR / SYSCOHADA)"
stack: ["LangGraph", "Python", "PostgreSQL", "Qdrant", "vLLM", "Docker"]
ordre: 1
---

**Contexte.** Les cabinets d'expertise comptable traitent des masses de pièces
dans un cadre normé (plan comptable, normes professionnelles, réforme de la
facturation électronique). L'automatisation générique y échoue : une écriture
comptable n'est pas une réponse plausible, c'est une décision opposable.

**Contrainte.** Aucune sortie probabiliste ne peut engager le cabinet. Il faut
donc une frontière explicite entre ce que la machine propose et ce qu'un humain
assume — et cette frontière doit être visible, traçable et testable.

**Système.** Un pipeline multi-agents orchestré (extraction, classification,
écriture, validation, remédiation) posé sur trois principes :
- une **machine d'état** unique de la proposition à l'écriture comptabilisée,
  chaque transition horodatée et attribuée ;
- des **contrôles déterministes bloquants** qui priment toujours sur le score de
  confiance du modèle ;
- un **corpus normatif versionné**, jamais codé en dur dans le cœur applicatif :
  changer la règle ne veut pas dire redéployer le moteur.

**Preuve.** Un harness d'évaluation branché en gate d'intégration continue : un
corpus de cas de référence, des contrôles typés, des seuils de confiance mesurés
et non déclarés. Une évolution de périmètre ne passe que par un decision log,
avec des critères d'abandon écrits à l'avance.

**Statut.** En développement, pilote cabinet en préparation. Aucun résultat
client n'est revendiqué à ce stade.

**Ce que ça démontre.** Concevoir une architecture de décision auditable dans un
domaine régulé, et la tenir dans le temps face à une équipe de développement.
```

### 5.2 `src/content/systemes/amna-engine.mdx`

```mdx
---
titre: "AMNA Engine — sourcing de pièces automobiles en copilote"
resume: "Le même moteur de décision, transposé au commerce transfrontalier Europe / Afrique de l'Ouest."
statut: "Spécification complète — build en cours"
domaine: "Import-export, sourcing B2B"
stack: ["LangGraph", "PostgreSQL", "Docker", "WhatsApp"]
ordre: 2
---

**Contexte.** Le sourcing de pièces détachées vers l'Afrique de l'Ouest se joue
sur WhatsApp : demandes en langage naturel, références partielles, fournisseurs
dispersés sur plusieurs marchés. Le coût réel est le temps d'identification et
l'erreur de référence.

**Contrainte.** Mode **copilote strict** : l'agent ne commande jamais, ne
s'engage jamais sur un prix. Il prépare une décision, un humain la prend.

**Système.** Extraction de l'intention depuis la conversation, résolution de
référence contre un corpus de cas réels annotés, consultation multi-fournisseurs,
consolidation logistique, restitution d'une proposition chiffrée à valider.
Décisions d'architecture tracées en ADR, socle conteneurisé reproductible.

**Preuve.** Un corpus de cas réels annotés sert de base d'évaluation : la qualité
de résolution se mesure contre des cas connus, pas contre une impression.

**Statut.** Spécification technique complète, build en cours.

**Ce que ça démontre.** La généricité du moteur : mêmes primitives — proposition,
contrôle, validation humaine, corpus versionné — dans un domaine sans rapport
avec la comptabilité.
```

### 5.3 `src/content/systemes/dou-aios.mdx`

```mdx
---
titre: "DOU-AIOS — système d'exploitation d'agents et orchestration multi-agents"
resume: "Un harness personnel : compétences versionnées, gates de revue, garde-fous de sécurité."
statut: "En production interne"
domaine: "Outillage agentique / harness engineering"
stack: ["Claude Code", "MCP", "Python", "Docker", "Git"]
ordre: 3
---

**Contexte.** Un agent de codage seul produit du volume, pas de la fiabilité. Le
facteur limitant n'est pas le modèle, c'est le harness autour : contexte,
procédures, vérification, mémoire.

**Contrainte.** Aucune tâche ne doit être déclarée terminée sur parole. Aucune
commande destructrice ne doit pouvoir s'exécuter par accident.

**Système.** Un OS d'agents composé de compétences versionnées et routées sans
collision, d'une bibliothèque de références, de routines opérationnelles, et
d'une orchestration multi-agents où un fichier de tâche unique fait autorité —
planificateur, exécuteur, réviseurs de plan et de code, gates de passage.
Sécurité : hooks de blocage de commandes dangereuses, exécution en bac à sable
conteneurisé, signature des commits, jetons d'accès à portée fine.

**Preuve.** Chaque tâche exige des preuves typées avant clôture : log de build,
test exécuté, artefact produit. Le statut « terminé » n'est jamais déclaratif.

**Statut.** En production interne, utilisé quotidiennement.

**Ce que ça démontre.** Le harness engineering — savoir faire produire un
résultat vérifiable à une équipe d'agents, ce qui est exactement le problème des
entreprises bloquées au stade du pilote.
```

### 5.4 `src/content/systemes/bibliotheque-skills.mdx`

```mdx
---
titre: "Bibliothèque de compétences bilingue"
resume: "Transformer de la connaissance opérationnelle en actifs réutilisables, versionnés et routés."
statut: "Actif — enrichissement continu"
domaine: "Productisation de la connaissance"
stack: ["Markdown", "Git", "Claude Code"]
ordre: 4
---

**Contexte.** Une expertise qui vit dans la tête d'une personne ne se délègue
pas, ne s'audite pas et ne se vend pas deux fois.

**Contrainte.** Chaque compétence doit se déclencher au bon moment et jamais à la
place d'une autre — sinon la bibliothèque devient du bruit.

**Système.** Un format strict par compétence (déclencheurs explicites, routage
anti-collision, références séparées du corps), un pipeline de packaging et de
versionnement, et un appariement systématique FR/EN.

**Preuve.** Le routage est testé par formulation : une demande donnée doit
appeler une compétence et une seule.

**Statut.** Actif, plusieurs dizaines de compétences en service.

**Ce que ça démontre.** La capacité à industrialiser un savoir-faire — la brique
qui transforme une prestation en produit.
```

---

## 6. Page `/offres` — les 3 offres PASS

| # | Offre | Format | Livrable | Prix |
|---|---|---|---|---|
| 1 | **Audit Pilote → Production** | Forfait, 5–10 jours | Registre de gaps, matrice de contrôles, harness minimal, plan P0/P1/P2 | Forfait, 100 % à la commande |
| 2 | **Build de système agentique** | Projet cadré par gates | PRD gaté, architecture, build, evals en CI, transfert | Prix à la valeur : 20–30 % du ROI première année |
| 3 | **Exploitation & gouvernance** | Abonnement mensuel | Evals en continu, gouvernance du corpus, surveillance de dérive, sécurité, revue mensuelle | Retainer |

Séquence commerciale : offre 1 achète la confiance → offre 2 achète le résultat → offre 3 achète la durée.
Ne jamais afficher de taux horaire. Ne jamais afficher plus de 3 options.

---

## 7. Pack de direction Claude Code

> Coller les prompts **dans l'ordre**, un par session, en attendant le STOP à chaque fois.

### Brief projet (constant, à coller en tête de chaque prompt)

```
CONTEXTE
Repo : dou_Portofolio_website. Objectif business : convertir un visiteur froid
en appel réservé (Cal.com), en établissant la crédibilité d'un builder de
systèmes agentiques en environnement régulé. Public : décideurs techniques et
métier. Le contenu de référence est docs/portfolio-brief.md — c'est la source
de vérité, ne l'invente pas, ne le reformule pas librement.

STACK
Astro 5 + Tailwind 4 + MDX (content collections). Statique. Pas de base de
données, pas d'auth, pas de CMS, pas de React.

TOKENS
Thème : sombre technique, sobre, haute lisibilité.
Fond #0B0F14 / surface #131A22 / texte #E6EDF3 / secondaire #8B98A5.
Accent unique #3FB68B (CTA et états actifs uniquement).
Typo titres : Inter Tight 600. Typo corps : Inter 400, interligne 1.7.
Spacing sur échelle de 4. Radius 8px. Ombres : aucune, bordures 1px #1F2A35.
Largeur de contenu max 72ch pour le texte, 1200px pour les grilles.
```

### Prompt P0 — Inventaire (STOP obligatoire)

```
[BRIEF]

OBJECTIF
Inventorier l'état actuel du repo et produire un plan de build avant tout code.

FAIRE
1. Lister l'existant : fichiers, dépendances, pages, config de déploiement.
2. Produire design-plan.md : arborescence cible des 8 routes, liste des
   composants de base nécessaires, risques identifiés, ordre de build.
3. Signaler tout conflit entre l'existant et la stack cible.

NE PAS
- NE PAS écrire une ligne de code applicatif à cette étape.
- NE PAS installer de dépendance.
- NE PAS supprimer de fichier existant.
- NE PAS déployer.

PREUVE EXIGÉE
DOC : design-plan.md complet. DOC : arbre du repo avant modification.

STOP : présenter le plan et attendre ma validation explicite.
```

### Prompt P1 — Design system d'abord

```
[BRIEF]

OBJECTIF
Poser le socle visuel avant toute page de contenu, pour que chaque page suivante
consomme des tokens et jamais des valeurs en dur.

FAIRE
1. Initialiser Astro + Tailwind si absent.
2. Créer UN fichier de tokens central à partir de la section TOKENS du brief.
3. Créer les composants de base : Button (primaire/secondaire), Card, Section,
   Nav, Footer, Badge (pour le statut des projets), Prose.
4. Créer la page /design-system qui expose tous les tokens et tous les
   composants dans tous leurs états.

NE PAS
- NE PAS écrire un seul code hexadécimal en dur hors du fichier de tokens.
- NE PAS ajouter de librairie d'animation, d'icônes lourde ou de composants.
- NE PAS créer les pages de contenu à cette étape.
- NE PAS déployer.

PREUVE EXIGÉE
TEST : build sans erreur, log fourni.
TEST : grep confirmant zéro hex hors du fichier de tokens, sortie fournie.
ART : capture de /design-system en 1440px et en 390px.

STOP : preview local, URL + commande, puis attendre approbation.
```

### Prompt P2 — Pages de contenu

```
[BRIEF]

OBJECTIF
Construire les pages à partir du contenu de docs/portfolio-brief.md, une page
par commit, en commençant par la page qui convertit.

FAIRE
Dans cet ordre, un commit par page (feat(ui): nom-page) :
1. /  — H1 = la thèse, 3 différenciateurs, 4 cartes de systèmes, méthode en 4
   temps, CTA unique Cal.com répété 2 fois maximum.
2. Content collection systemes/ + les 4 fichiers MDX fournis dans le brief,
   rendus par /systemes/ et /systemes/[slug].
3. /offres — les 3 offres, aucun taux horaire, aucune quatrième option.
4. /methode, /a-propos, /contact.

NE PAS
- NE PAS inventer de contenu, de chiffre, de résultat client ou de témoignage.
- NE PAS ajouter un second CTA concurrent du bouton de réservation.
- NE PAS mentionner un nom de personne, de client, de cabinet ou de prospect.
- NE PAS utiliser d'image de banque d'images sur /a-propos : emplacement réservé
  pour une photo réelle.
- NE PAS déployer.

PREUVE EXIGÉE
Par page — TEST : build clean + zéro erreur console. ART : captures 1440 et 390.
TEST : chaque lien et chaque bouton cliqué, liste avec résultat.
DOC : diff résumé et tokens consommés.

STOP après chaque page : attendre validation avant la suivante.
```

### Prompt P3 — Vérification finale

```
[BRIEF]

OBJECTIF
Prouver que le site est livrable, sans le livrer.

FAIRE
1. Lighthouse sur / et sur une page /systemes/[slug] : accessibilité ≥ 90,
   performance ≥ 90.
2. Contrôle de contraste AA sur toutes les combinaisons texte/fond.
3. Responsive vérifié en 390 / 768 / 1440.
4. Métadonnées : title, description, Open Graph, favicon, sitemap, robots.txt.
5. README : commandes de dev, de build, procédure d'ajout d'un projet.

NE PAS
- NE PAS corriger un score en dégradant les tokens.
- NE PAS connecter d'analytics sans mon accord.
- NE PAS configurer ni déclencher le déploiement : la production est hors
  périmètre, je m'en charge.

PREUVE EXIGÉE
ART : rapports Lighthouse. TEST : tableau de contraste. DOC : README.

STOP : rapport final, puis fin de périmètre.
```

---

## 8. Couche PASS

- **Productisation** — ce pack (brief + squelette de prompts + design system) est un livrable vendable : « site de crédibilité pour consultant technique », livré en 3 jours.
- **Automatisation** — ajouter un projet = ajouter un MDX ; le déploiement se déclenche au push.
- **Subscription** — maintenance mensuelle : nouvelle étude de cas, mise à jour des offres, veille de performance.
- **Scale** — seul le bloc TOKENS et les fichiers MDX changent d'un client à l'autre ; le squelette de prompts ne se réécrit jamais.

---

## 9. Actions immédiates

1. Valider ou corriger la **thèse** de la section 1 — tout le site en découle.
2. Déposer ce fichier dans le repo sous `docs/portfolio-brief.md` et commiter.
3. Lancer **P0** dans Claude Code, valider le `design-plan.md`, puis enchaîner P1.
4. Ouvrir le compte **Cal.com**, créer l'événement « Appel de cadrage — 30 min », récupérer l'URL.
5. Faire une **photo réelle** exploitable (fond neutre, cadrage buste) — c'est le seul actif que Claude Code ne peut pas produire.
