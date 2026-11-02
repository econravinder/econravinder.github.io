// Full-screen profile card, opened by clicking the sidebar photo.
(function () {
  var photo = document.querySelector('.profile-photo');
  if (!photo) return;

  var icons = {
    email: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm1 2.2V17h16V7.2l-8 5.3-8-5.3zM5.4 7l6.6 4.4L18.6 7H5.4z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3V9.5zm7 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.33-1.96 2.7V21h-4V9.5z"/></svg>',
    x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78L17.75 3zm-1.08 16.2h1.7L7.4 4.73H5.58L16.67 19.2z"/></svg>'
  };

  var overlay = document.createElement('div');
  overlay.className = 'profile-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Ravinder profile');
  overlay.hidden = true;
  overlay.innerHTML =
    '<button type="button" class="po-close" aria-label="Close">&times;</button>' +
    '<div class="po-card">' +
      '<img class="po-photo" src="profile.png" alt="Photo of Ravinder">' +
      '<h2 class="po-name">Ravinder</h2>' +
      '<hr class="po-rule po-rule-wide">' +
      '<p class="po-role">Ph.D. Candidate, Quantitative Economics<br>Indian Statistical Institute, Delhi</p>' +
      '<p class="po-badge">Job Market Candidate</p>' +
      '<hr class="po-rule po-rule-short">' +
      '<nav class="po-nav" aria-label="Site sections">' +
        '<a href="index.html">About</a>' +
        '<a href="research.html">Research</a>' +
        '<a href="jmp.html">Job Market Paper</a>' +
        '<a href="teaching.html">Teaching</a>' +
        '<a href="cv.html">CV</a>' +
      '</nav>' +
      '<div class="po-icons">' +
        '<a href="mailto:ravinder20r@isid.ac.in" aria-label="Email" title="Email">' + icons.email + '</a>' +
        '<a href="https://www.linkedin.com/in/ravinder2303/" target="_blank" rel="noopener" aria-label="LinkedIn" title="LinkedIn">' + icons.linkedin + '</a>' +
        '<a href="https://x.com/Ravinder2303" target="_blank" rel="noopener" aria-label="X (Twitter)" title="X (Twitter)">' + icons.x + '</a>' +
      '</div>' +
      '<p class="po-email">ravinder20r@isid.ac.in</p>' +
    '</div>';
  document.body.appendChild(overlay);

  function open() {
    overlay.hidden = false;
    document.body.classList.add('po-open');
    overlay.querySelector('.po-close').focus();
  }

  function close() {
    overlay.hidden = true;
    document.body.classList.remove('po-open');
    photo.focus();
  }

  photo.setAttribute('role', 'button');
  photo.setAttribute('tabindex', '0');
  photo.setAttribute('aria-label', 'Open profile card');
  photo.addEventListener('click', open);
  photo.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
  });

  overlay.querySelector('.po-close').addEventListener('click', close);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !overlay.hidden) close();
  });

  // A link in the card that points to the page already open just closes the card.
  function pageName(path) {
    var name = path.split('/').pop();
    return name === '' ? 'index.html' : name;
  }
  var here = pageName(window.location.pathname);
  overlay.querySelectorAll('.po-nav a').forEach(function (link) {
    if (pageName(new URL(link.href).pathname) === here) {
      link.addEventListener('click', function (e) { e.preventDefault(); close(); });
    }
  });

  // On the home page, show the card first when the visitor arrives from outside the site.
  var cameFromSite = false;
  try {
    cameFromSite = document.referrer !== '' &&
      new URL(document.referrer).origin === window.location.origin;
  } catch (err) {
    cameFromSite = false;
  }
  if (document.body.hasAttribute('data-landing') && !cameFromSite) {
    open();
  }
})();
