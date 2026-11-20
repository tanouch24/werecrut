# SOS Staff – site vitrine

Site statique multi-pages (HTML, CSS, JS sans framework), prêt pour Netlify.

| Page | Fichier |
|---|---|
| Accueil | `index.html` |
| Offres d'emploi | `offres.html` |
| Candidats | `candidats.html` |
| Entreprises | `entreprises.html` |
| Qui sommes-nous | `a-propos.html` |
| Contact | `contact.html` |

- Styles communs : `assets/style.css`
- Script commun : `assets/main.js` (menus, carrousel, formulaires, animations)
- Images optimisées (WebP) : `img/`

## Formulaires
Les formulaires « candidat » et « entreprise » utilisent **Netlify Forms** (`data-netlify="true"`).
Une fois le site déployé, les demandes apparaissent dans Netlify > Forms, où l'on peut activer les notifications e-mail.

## Déploiement
Relier ce dépôt à Netlify (Add new site > Import from GitHub). Aucun build nécessaire : le dossier publié est la racine.

## À compléter
- Téléphone / WhatsApp (page Contact)
- Raison sociale, SIRET, adresse (pied de page)
- Nom de domaine (sosstaff.fr) : à brancher dans Netlify > Domain settings

Photos des secteurs : Unsplash (licence libre).
