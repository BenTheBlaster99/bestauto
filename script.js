// Avis clients : ajoutez ici les VRAIS avis Google (copiés tels quels).
// Tant que la liste est vide, la section « Avis » reste masquée.
// Exemple : { name: "Prénom N.", stars: 5, text: "Texte de l'avis…" }
const REVIEWS = [];

(function () {
  // Menu mobile
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  nav.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  // Avis
  if (REVIEWS.length) {
    const wrap = document.getElementById('reviews');
    REVIEWS.forEach(r => {
      const el = document.createElement('article');
      el.className = 'review reveal';
      const stars = document.createElement('div');
      stars.className = 'review__stars';
      stars.setAttribute('aria-label', r.stars + ' sur 5');
      stars.textContent = '★'.repeat(r.stars) + '☆'.repeat(5 - r.stars);
      const p = document.createElement('p');
      p.textContent = r.text;
      const f = document.createElement('footer');
      f.textContent = r.name;
      el.append(stars, p, f);
      wrap.appendChild(el);
    });
    document.getElementById('avis').hidden = false;
    document.getElementById('nav-avis').hidden = false;
  }

  // Mentions légales
  const dlg = document.getElementById('mentions');
  document.getElementById('open-mentions').addEventListener('click', e => {
    e.preventDefault();
    dlg.showModal();
  });
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });

  document.getElementById('year').textContent = new Date().getFullYear();

  // Apparition au scroll
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(i => io.observe(i));
  } else {
    items.forEach(i => i.classList.add('in'));
  }
})();
