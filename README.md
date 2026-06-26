# CV Interactif — Touba Diop

> Curriculum vitae en ligne réalisé en HTML5, CSS3 et JavaScript natif.  
> Projet académique — Licence 2 Génie Logiciel · Université Iba Der Thiam de Thiès

##  Démo en ligne

> [https://touba1234.github.io/TOUBA/](https://touba1234.github.io/TOUBA/)
   lien du site interactif 

---

##  Structure du projet

```
mon-cv/
├── index.html          ← Structure sémantique HTML5
├── css/
│   └── style.css       ← Mise en forme, responsive, thème sombre/clair
├── js/
│   └── script.js       ← Interactivité JavaScript (Vanilla JS uniquement)
├── images/
│ 
└── README.md
```

---

## Fonctionnalités

| Fonctionnalité | Technologie |
|---|---|
| Mode sombre / clair (sauvegardé) | `localStorage` |
| Menu hamburger mobile | JavaScript + CSS transitions |
| Animation des barres de compétences | `IntersectionObserver` |
| Formulaire de contact validé | Vanilla JS |
| Bouton « Retour en haut » | Scroll event + CSS |
| Liens de navigation actifs au scroll | `getBoundingClientRect` |
| Design responsive (mobile-first) | CSS Flexbox + Grid + `@media` |
| Avatar SVG si photo absente | Blob URL + SVG dynamique |

---

##  Technologies utilisées

- **HTML5** — Balises sémantiques (`header`, `nav`, `main`, `section`, `article`, `footer`)
- **CSS3** — Variables CSS, Flexbox, Grid, transitions, `@media`, mode sombre via classe `.dark`
- **JavaScript ES6+** — Vanilla JS uniquement, aucune bibliothèque externe
- **Google Fonts** — Space Grotesk + DM Mono
- **Font Awesome 6** — Icônes
- **EMAILJS** - Partie message fonctionnelle 

---

##  Déploiement sur GitHub Pages

1. **Créer un dépôt** public sur GitHub (ex : `mon-cv`)
2. **Pousser les fichiers** :
   ```bash
   git init
   git add .
   git commit -m "Initial commit — CV interactif"
   git remote add origin https://github.com/TON_USERNAME/mon-cv.git
   git push -u origin main
   ```
3. Dans les **Settings** du dépôt → **Pages** → Source : `main` / `/ (root)`
4. Votre CV sera disponible sur `https://touba1234.github.io/TOUBA/`

---

##  Sections du CV

- **En-tête** — Nom, photo, titre, coordonnées
- **À propos** — Présentation personnelle + statistiques clés
- **Formation** — Parcours académique en timeline
- **Compétences** — Barres de progression animées (4 catégories)
- **Expériences** — Projets et activités en timeline
- **Projets réalisés** — Cartes de projets avec technologies
- **Langues** — Niveaux avec badges colorés
- **Centres d'intérêt** — Tags visuels
- **Contact** — Formulaire validé côté client + coordonnées

---

##  Compatibilité

Testé sur Chrome, Firefox, Edge et Safari. Responsive mobile dès 320px.

---
## probleme rencontres 
- Probleme de deploiement du code sur git hub .
- Un envoie et une reception de Mail fonctionnelle .
- Probleme avec le code java script .
---
##  solution trouver 
- Recherche sur youtube .
- guider par les inteligences artificielles (claude, chat gpt).
- utilisation de l'outils email js pour  un envoie et  une boite email fonctionnelle .
---

*Projet réalisé dans le cadre du cours de Développement Web  — Dr. Diallo · UIDT Thiès 2025*
