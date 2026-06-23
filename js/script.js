/**
 * script.js — CV Interactif de Touba Diop
 * Fonctionnalités :
 *   1. Mode sombre / clair avec sauvegarde localStorage
 *   2. Navbar : scroll effect + liens actifs au défilement
 *   3. Menu hamburger mobile
 *   4. Animation des barres de compétences (IntersectionObserver)
 *   5. Formulaire de contact avec validation côté client
 *   6. Bouton « Retour en haut »
 *   7. Photo de profil : fallback avatar SVG si l'image est absente
 */

/* ──────────────────────────────────────────────────
   1. MODE SOMBRE / CLAIR
   ────────────────────────────────────────────────── */

const body        = document.body;
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');

/**
 * Applique le thème donné et met à jour l'icône + localStorage.
 * @param {string} theme  'dark' | 'light'
 */
function applyTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
    themeIcon.setAttribute('title', 'Basculer en mode clair');
  } else {
    body.classList.remove('dark');
    themeIcon.classList.replace('fa-sun', 'fa-moon');
    themeIcon.setAttribute('title', 'Basculer en mode sombre');
  }
  localStorage.setItem('cv-theme', theme);
}

/* Applique le thème sauvegardé dès le chargement */
(function initTheme() {
  const saved = localStorage.getItem('cv-theme');
  if (saved) {
    applyTheme(saved);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    /* Respecte la préférence système si aucune préférence enregistrée */
    applyTheme('dark');
  }
})();

themeToggle.addEventListener('click', function () {
  const isDark = body.classList.contains('dark');
  applyTheme(isDark ? 'light' : 'dark');
});


/* ──────────────────────────────────────────────────
   2. NAVBAR — SCROLL EFFECT + LIENS ACTIFS
   ────────────────────────────────────────────────── */

const navbar   = document.getElementById('navbar');
const sections = document.querySelectorAll('main section, header#hero');
const navLinks = document.querySelectorAll('.nav-links a');

/**
 * Met à jour la classe "active" sur le lien de navigation
 * correspondant à la section visible.
 */
function updateActiveLink() {
  let currentId = '';

  sections.forEach(function (section) {
    const rect = section.getBoundingClientRect();
    /* La section est considérée "active" si son haut est dans le tiers supérieur de la fenêtre */
    if (rect.top <= window.innerHeight * 0.35 && rect.bottom > 0) {
      currentId = section.getAttribute('id');
    }
  });

  navLinks.forEach(function (link) {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === '#' + currentId) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', function () {
  /* Ombre sur la navbar au défilement */
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveLink();
}, { passive: true });

updateActiveLink(); /* Initialisation au chargement */


/* ──────────────────────────────────────────────────
   3. MENU HAMBURGER MOBILE
   ────────────────────────────────────────────────── */

const hamburger     = document.getElementById('hamburger');
const navLinksMenu  = document.getElementById('nav-links');

hamburger.addEventListener('click', function () {
  const isOpen = navLinksMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  /* Accessibilité : mettre à jour aria-expanded */
  hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

/* Ferme le menu au clic sur un lien (mobile) */
navLinksMenu.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinksMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* Ferme le menu si on clique en dehors */
document.addEventListener('click', function (e) {
  if (!navbar.contains(e.target)) {
    navLinksMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});


/* ──────────────────────────────────────────────────
   4. FORMULAIRE DE CONTACT — VALIDATION JS
   ────────────────────────────────────────────────── */

const contactForm    = document.getElementById('contact-form');
const inputNom       = document.getElementById('contact-nom');
const inputEmail     = document.getElementById('contact-email');
const inputMessage   = document.getElementById('contact-message');
const errorNom       = document.getElementById('error-nom');
const errorEmail     = document.getElementById('error-email');
const errorMessage   = document.getElementById('error-message');
const formSuccess    = document.getElementById('form-success');

/**
 * Valide le format d'une adresse e-mail.
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  /* Expression régulière simple mais efficace pour la validation e-mail */
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Affiche ou efface un message d'erreur pour un champ.
 * @param {HTMLElement} field    Le champ input/textarea
 * @param {HTMLElement} errorEl L'élément qui affiche l'erreur
 * @param {string}      message  Le message d'erreur (vide = effacer)
 */
function setError(field, errorEl, message) {
  errorEl.textContent = message;
  if (message) {
    field.classList.add('invalid');
  } else {
    field.classList.remove('invalid');
  }
}

/**
 * Valide l'ensemble du formulaire.
 * @returns {boolean}  true si le formulaire est valide
 */
function validateForm() {
  let valid = true;

  /* Validation du nom */
  if (inputNom.value.trim().length < 2) {
    setError(inputNom, errorNom, 'Le nom doit contenir au moins 2 caractères.');
    valid = false;
  } else {
    setError(inputNom, errorNom, '');
  }

  /* Validation de l'e-mail */
  if (!isValidEmail(inputEmail.value)) {
    setError(inputEmail, errorEmail, 'Veuillez saisir une adresse e-mail valide.');
    valid = false;
  } else {
    setError(inputEmail, errorEmail, '');
  }

  /* Validation du message */
  if (inputMessage.value.trim().length < 10) {
    setError(inputMessage, errorMessage, 'Le message doit contenir au moins 10 caractères.');
    valid = false;
  } else {
    setError(inputMessage, errorMessage, '');
  }

  return valid;
}

/* Validation en temps réel (blur) pour une meilleure UX */
inputNom.addEventListener('blur', function () {
  if (inputNom.value.trim().length > 0) {
    if (inputNom.value.trim().length < 2) {
      setError(inputNom, errorNom, 'Le nom doit contenir au moins 2 caractères.');
    } else {
      setError(inputNom, errorNom, '');
    }
  }
});

inputEmail.addEventListener('blur', function () {
  if (inputEmail.value.trim().length > 0) {
    if (!isValidEmail(inputEmail.value)) {
      setError(inputEmail, errorEmail, 'Veuillez saisir une adresse e-mail valide.');
    } else {
      setError(inputEmail, errorEmail, '');
    }
  }
});

inputMessage.addEventListener('blur', function () {
  if (inputMessage.value.trim().length > 0) {
    if (inputMessage.value.trim().length < 10) {
      setError(inputMessage, errorMessage, 'Le message doit contenir au moins 10 caractères.');
    } else {
      setError(inputMessage, errorMessage, '');
    }
  }
});

/* Soumission du formulaire */
contactForm.addEventListener('submit', function (e) {
  e.preventDefault(); /* Empêche le rechargement de la page */
  formSuccess.textContent = '';

  if (!validateForm()) {
    return; /* Arrêt si le formulaire est invalide */
  }

  /* Simulation d'un envoi (remplace par une vraie API si besoin) */
  const submitBtn = contactForm.querySelector('.btn-submit');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Envoi…';

  setTimeout(function () {
    /* Réinitialisation du formulaire */
    contactForm.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Envoyer';

    /* Message de succès */
    formSuccess.textContent = '✓ Message envoyé avec succès ! Je vous répondrai bientôt.';

    /* Effacement du message de succès après 5 secondes */
    setTimeout(function () {
      formSuccess.textContent = '';
    }, 5000);
  }, 1200);
});


/* ──────────────────────────────────────────────────
   5. BOUTON « RETOUR EN HAUT »
   ────────────────────────────────────────────────── */

const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', function () {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
}, { passive: true });

backToTopBtn.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ──────────────────────────────────────────────────
   6. PHOTO DE PROFIL — FALLBACK SVG
      Si l'image n'est pas trouvée, affiche un avatar
      SVG généré avec les initiales "TD".
   ────────────────────────────────────────────────── */

(function initPhotoFallback() {
  const photo = document.getElementById('hero-photo');
  if (!photo) return;

  photo.addEventListener('error', function () {
    /* Création d'un SVG avatar avec les initiales */
    const svg = [
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">',
      '  <defs>',
      '    <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">',
      '      <stop offset="0%" style="stop-color:#A85A21"/>',
      '      <stop offset="100%" style="stop-color:#0E9C8E"/>',
      '    </linearGradient>',
      '  </defs>',
      '  <circle cx="100" cy="100" r="100" fill="url(#avatarGrad)"/>',
      '  <text x="100" y="120" font-family="Space Grotesk, sans-serif"',
      '        font-size="72" font-weight="700" fill="white"',
      '        text-anchor="middle" letter-spacing="-2">TD</text>',
      '</svg>'
    ].join('');

    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url  = URL.createObjectURL(blob);
    photo.src  = url;
    photo.alt  = 'Avatar — Touba Diop';
  });
})();
