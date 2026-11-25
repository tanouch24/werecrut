(function () {
  // Onglets candidat / entreprise
  var tabs = document.querySelectorAll('.tabs button');
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (o) { o.setAttribute('aria-selected', String(o === t)); document.getElementById(o.getAttribute('aria-controls')).hidden = o !== t; });
    });
  });
  // Mémorise le bon onglet et le métier quand on part vers une page de contact
  function store(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  function read(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  document.querySelectorAll('a[href^="contact.html"], a[href="#contact"]').forEach(function (a) {
    a.addEventListener('click', function () {
      store('gr-tab', /recrute|entreprise/i.test(a.textContent) ? 'ent' : 'cand');
      if (a.dataset.metier) store('gr-metier', a.dataset.metier);
      if (a.getAttribute('href') === '#contact') applyStored();
    });
  });
  function applyStored() {
    var card = document.querySelector('.form-card');
    if (!card) return;
    var tab = read('gr-tab') || card.dataset.tab || 'cand';
    var btn = document.getElementById(tab === 'ent' ? 'tab-ent' : 'tab-cand');
    if (btn) btn.click();
    var m = read('gr-metier'), sel = document.getElementById('c-metier');
    if (m && sel) sel.value = m;
    store('gr-tab', ''); store('gr-metier', '');
  }
  applyStored();
  // Carrousel d'offres
  var row = document.getElementById('offers');
  if (row) document.querySelectorAll('[data-scroll]').forEach(function (b) {
    b.addEventListener('click', function () { row.scrollBy({ left: Number(b.dataset.scroll) * row.clientWidth * 0.8, behavior: 'smooth' }); });
  });
  // Formulaires : envoi réel sur Netlify, message de maquette ailleurs
  var live = /netlify\.app$|sosstaff\.fr$/.test(location.hostname);
  document.querySelectorAll('.form-card form').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      var msg = f.querySelector('.form-msg');
      var bad = [].slice.call(f.querySelectorAll('[required]')).filter(function (i) { return i.type === 'checkbox' ? !i.checked : !i.value.trim(); });
      if (bad.length) { e.preventDefault(); msg.textContent = 'Merci de remplir tous les champs obligatoires.'; msg.hidden = false; bad[0].focus(); return; }
      if (!live) { e.preventDefault(); msg.textContent = 'Aperçu : une fois le site en ligne sur Netlify, ce formulaire vous sera transmis directement.'; msg.hidden = false; }
    });
  });
  // Apparition au défilement (le contenu reste visible sans script)
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var els = document.querySelectorAll('.reveal');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.remove('is-hidden'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) {
      if (el.getBoundingClientRect().top > innerHeight) { el.classList.add('is-hidden'); io.observe(el); }
    });
  }
})();

document.querySelectorAll('.menu-btn').forEach(function (b) { b.addEventListener('click', function () { var o = document.getElementById('menu').classList.toggle('open'); b.setAttribute('aria-expanded', String(o)); }); });
