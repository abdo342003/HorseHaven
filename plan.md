# Horse Haven Website — Build Plan

**Stack:** Next.js 16 (App Router) + TypeScript + Tailwind CSS • Sanity CMS • next-intl (FR défaut `/`, AR `/ar` RTL, EN `/en`) • Vercel + `horsehaven.store`

**Décisions:**
| Item | Choix |
|---|---|
| Scope | Full e-commerce (panier + commande + ordres) |
| CMS | Sanity (produits, catégories, commandes, contenu) |
| Langues | FR (défaut) + AR (RTL) + EN |
| Paiements | COD + virement + WhatsApp (COD-first), CMI plus tard |
| Hébergement | Vercel |
| Police | Source Sans Pro (cohérence avec le PDF) |
| Seed | 14 produits de démonstration, prix réalistes de l'étude |

**Palette:** navy `#1A2744` • royalblue `#2B5A83` • gold `#D4C5A9` • lightblue `#F2F6FB` • green `#006B3F` • red `#CC3333` • graytext `#667788`

---

## Phase 0 — Préparation (local)
- [x] 0.1 Vérifier Node.js ≥ 20 installé (`node -v`), npm fonctionnel
- [x] 0.2 Créer dossier `web/` dans `/home/abdo/Desktop/HorseHaven`
- [x] 0.3 Scaffold : `create-next-app web` (Next.js 16, App Router, TypeScript, Tailwind, ESLint)
- [x] 0.4 `npm run dev` OK → page d'accueil par défaut visible sur `localhost:3000`
- [x] 0.5 `npm run build` + `npm run lint` → 0 erreur

## Phase 1 — Fondations & design system
- [x] 1.1 Installer `next-intl`, configurer `i18n.ts` + `request.ts` (locales: `fr` défaut, `ar`, `en`)
- [ ] 1.2 Installer `sanity` + `next-sanity` + `@sanity/image-url`
- [x] 1.3 Tailwind config : tokens couleur Horse Haven
- [x] 1.4 Charger Source Sans Pro via `next/font` (variable `--font-source-sans`)
- [x] 1.5 Layout racine : `<html lang dir>` dynamique, RTL activé pour `/ar` (logical properties)
- [x] 1.6 Composant `Header` : logo, nav (Accueil, Boutique, À propos, Contact), switcher FR/AR/EN, panier avec badge compteur
- [x] 1.7 `Header` mobile : menu burger + panier accessible
- [x] 1.8 Composant `Footer` : 4 trust badges (Qualité / Paiement sécurisé / Livraison rapide / Service client), contact, liens légaux
- [ ] 1.9 Composants UI de base : `Button`, `Badge`, `PriceTag` (MAD + EUR), `SectionHeading`, `Container`
- [x] 1.10 Règle ESLint/TS : `npm run lint` + `tsc --noEmit` propres après chaque phase

## Phase 2 — Sanity : schémas + seed
- [ ] 2.1 Initialiser Sanity Studio dans le projet (route `/studio`)
- [ ] 2.2 Schéma `siteSettings` : contacts, frais de livraison (palier gratuit), texte hero ×3 langues, badges de confiance ×3 langues
- [ ] 2.3 Schéma `category` : nom ×3 langues, slug, icône, ordre — 3 catégories flyer
- [ ] 2.4 Schéma `product` : nom ×3 langues, slug, catégorie, prix MAD + EUR, images, description ×3 langues, badge (nouveau/promo), `originEU`, `featured`, stock
- [ ] 2.5 Schéma `order` : numéro, client, items, totaux, méthode paiement, statut (nouveau/en cours/expédié/livré/annulé), date
- [ ] 2.6 Schéma `orderStatus`/validations : transitions de statut documentées
- [x] 2.7 Script de seed `scripts/seed.ts` : 14 produits / 3 catégories, prix de l'étude
- [x] 2.8 Placeholder visuel : 14 images SVG aux couleurs de la marque
- [ ] 2.9 Lancer le seed → vérifier 14 produits + 3 catégories dans Studio
- [ ] 2.10 Studio utilisable : éditer, sauvegarder, relire via l'API

## Phase 3 — Pages publiques (catalogue)
- [x] 3.1 Page `/` : hero brand, 3 cartes catégories, produits vedettes, « Pourquoi Horse Haven », bandeau contact
- [x] 3.2 Page `/boutique` : grille, filtres catégorie, recherche, tri (prix ↑↓, nouveautés)
- [ ] 3.3 Page `/boutique/[categorySlug]` : titre localisé + grille filtrée
- [x] 3.4 Page `/produit/[slug]` : galerie, description localisée, prix MAD + EUR, badges, qty + « Ajouter au panier », « Commander via WhatsApp »
- [x] 3.5 États vides/rupture : « En rupture de stock », pas de résultats
- [x] 3.6 `generateStaticParams` + `revalidate` (ISR)
- [x] 3.7 Validation mobile (390px) + desktop + RTL arabe

## Phase 4 — Panier & commande (COD-first)
- [x] 4.1 Contexte `CartProvider` (React context) + `localStorage`
- [x] 4.2 Actions panier : ajouter, quantité, supprimer, badge header
- [x] 4.3 Page `/panier` : items, sous-total, estimation livraison, CTA
- [x] 4.4 Page `/commande` : formulaire client (nom, tél, email, ville, adresse) + validation
- [x] 4.5 Page `/commande` : choix livraison + choix paiement (COD / virement avec RIB / WhatsApp)
- [x] 4.6 Page `/commande` : récapitulatif + total final
- [ ] 4.7 Route API `POST /api/orders` : validation serveur (zod), création `order` Sanity, numéro séquentiel
- [x] 4.8 Page `/confirmation/[orderId]` : récap, numéro, lien WhatsApp, vidage panier
- [ ] 4.9 Notification email Resend (optionnel) à `hhorsehaven@gmail.com`
- [~] 4.10 Test bout-en-bout : ajout → commande COD → confirmation → ordre dans **localStorage** (Studio en attente de Sanity)

## Phase 5 — Pages institutionnelles + SEO
- [x] 5.1 Page `/a-propos` : mission, valeurs (Qualité, Conseil, Passion)
- [x] 5.2 Page `/contact` : formulaire via `POST /api/contact`, tél/email/réseaux
- [x] 5.3 Page `/livraison-paiement` : délais, frais, modes de paiement
- [x] 5.4 Page `/confidentialite` : politique de confidentialité
- [x] 5.5 Metadata localisée : `generateMetadata` ×3 langues
- [x] 5.6 `sitemap.ts` (3 locales) + `robots.ts`
- [x] 5.7 OG images statiques (1200×630, palette marque)
- [ ] 5.8 Lighthouse desktop + mobile ≥ 90

## Phase 6 — Qualité & déploiement
- [x] 6.1 `npm run lint` + `tsc --noEmit` : 0 erreur
- [x] 6.2 `npm run build` : 0 warning
- [x] 6.3 Test multi-locales : `/`, `/ar` (RTL), `/en`
- [x] 6.4 Test panier/commande sur build de production (`npm run start`)
- [x] 6.5 Pousser sur GitHub (repo `HorseHaven`)
- [~] 6.6 Déployer sur Vercel (déployé — variables d'env Sanity en attente)
- [ ] 6.7 Ajouter le domaine `horsehaven.store` (DNS → Vercel)
- [~] 6.8 Vérifier prod : site live + HTTPS ✓ — Studio en attente de Sanity
- [x] 6.9 Checklist finale : 3 langues, panier, COD, SEO, mobile

## Plus tard (hors périmètre)
- [ ] P.1 Intégration carte CMI (compte marchand + certification)
- [ ] P.2 Suivi de colis / intégration transporteur
- [ ] P.3 Contenu réel : photos produits + prix définitifs
- [ ] P.4 Analytics (Vercel Analytics ou Plausible)

---

**Blocages externes:** photos/prix réels des produits (P.3) • accès DNS du domaine (6.7) • compte marchand CMI (P.1)

**Contacts brand:** tél +33 6 85 10 1 01 / 07 06 16 71 • hhorsehaven@gmail.com • www.horsehaven.store • @horse_haven.store