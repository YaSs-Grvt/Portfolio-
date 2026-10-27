/* ==========================================================================
   Portfolio Yacine Ben Omrane
   1. Affichage du contenu (depuis data.js)
   2. Navigation, contact
   3. Animations GSAP + ScrollTrigger (+ Lenis pour le défilement fluide)
   ========================================================================== */
(function () {
  "use strict";

  var D = window.PORTFOLIO || {};
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var list = function (items) { return items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join(""); };

  /* ------------------------------------------------------------------ */
  /* 1. CONTENU                                                          */
  /* ------------------------------------------------------------------ */

  function renderKeySkills() {
    var el = $("#keyskills");
    if (!el || !D.competencesCles) return;
    el.innerHTML = D.competencesCles.map(function (g) {
      return '<div class="domain"><h3>' + esc(g.domaine) + '</h3><div class="domain__items">' +
        g.items.map(function (s) {
          return '<div class="skill"><h4>' + esc(s.nom) + "</h4><p>" + esc(s.sens) + "</p></div>";
        }).join("") + "</div></div>";
    }).join("");
  }

  function renderAllSkills() {
    var el = $("#allskills");
    if (!el || !D.competences) return;
    el.innerHTML = D.competences.map(function (c) {
      return "<div><h4>" + esc(c.categorie) + "</h4><ul>" + list(c.items) + "</ul></div>";
    }).join("");
  }

  function renderTimeline(sel, items) {
    var el = $(sel);
    if (!el || !items) return;
    el.innerHTML = items.map(function (x) {
      var missions = x.missions && x.missions.length ? "<ul>" + list(x.missions) + "</ul>" : "";
      var todo = x.placeholder ? '<span class="todo-tag">À compléter</span>' : "";
      var v = x.visuel;
      var visual = v && v.src
        ? '<div class="job__visual job__visual--' + (v.mode === "photo" ? "photo" : "logo") + '"' +
          (v.fond ? ' style="--visual-bg:' + esc(v.fond) + '"' : "") + ">" +
          '<img src="' + esc(v.src) + '" alt="' + esc(v.alt || "") + '" loading="lazy" decoding="async"></div>'
        : "";
      var cls = "job" + (x.placeholder ? " job--todo" : "") + (missions ? "" : " job--short") + (visual ? " job--visual" : "");
      return '<li class="' + cls + '"><div class="job__card"><div class="job__body">' +
        '<div><div class="job__meta"><span class="job__period">' + esc(x.periode) + "</span>" +
        (x.type ? '<span class="job__type">' + esc(x.type) + "</span>" : "") + todo + "</div>" +
        "<h3>" + esc(x.poste) + '</h3><p class="job__org">' + esc(x.entreprise) + "</p>" +
        (x.lieu ? '<p class="job__place">' + esc(x.lieu) + "</p>" : "") + "</div>" +
        missions + "</div>" + visual + "</div></li>";
    }).join("");
  }

  function renderCerts() {
    var C = D.certifications || {};
    var off = $("#certsOfficial");
    if (off && C.officielles) {
      off.innerHTML = C.officielles.map(function (c) {
        var tag = c.lien ? "a" : "div";
        var href = c.lien ? ' href="' + esc(c.lien) + '" target="_blank" rel="noopener"' : "";
        var long = c.code.length > 8 ? " cert__code--long" : "";
        return "<" + tag + ' class="cert"' + href + ">" +
          '<span class="cert__issuer">' + esc(c.emetteur) + "</span>" +
          '<span class="cert__code' + long + '">' + esc(c.code) + "</span>" +
          '<span class="cert__name">' + esc(c.nom) + "</span>" +
          '<span class="cert__check"><svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 5 5 9-10" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          (c.lien ? "Vérifier" : "Obtenue") + "</span></" + tag + ">";
      }).join("");
    }
    var cisco = $("#certsCisco");
    if (cisco && C.cisco) {
      cisco.innerHTML = C.cisco.map(function (c) {
        return "<li><b>" + esc(c.code) + "</b><span>" + esc(c.nom) + "</span></li>";
      }).join("");
    }
    var learn = $("#certsLearn");
    if (learn && C.learn) {
      var total = 0;
      learn.innerHTML = C.learn.map(function (g, i) {
        total += g.modules.length;
        return "<details" + (i === 0 ? " open" : "") + "><summary>" + esc(g.theme) +
          '<span class="count">' + g.modules.length + "</span></summary><ul>" + list(g.modules) + "</ul></details>";
      }).join("");
      var n = $("#learnCount");
      if (n) { n.textContent = total; n.dataset.total = total; }
    }
  }

  function renderProjects() {
    var el = $("#projectsList");
    if (!el || !D.projets) return;
    el.innerHTML = D.projets.map(function (p) {
      return '<article class="project"><div><h3>' + esc(p.titre) + '</h3><p class="project__resume">' + esc(p.resume) + "</p>" +
        '<ul class="tags">' + p.outils.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></div>" +
        "<ul>" + list(p.details) + "</ul></article>";
    }).join("");
  }

  function renderContact() {
    var c = D.contact || {};
    var mail = $("#emailLink");
    if (mail && c.email) { mail.textContent = c.email; mail.href = "mailto:" + c.email; }
    var li = $("#linkedinLink");
    if (li && c.linkedin) li.href = c.linkedin;
    var dispo = $("#dispo");
    if (dispo) dispo.textContent = c.disponibilite || "";
    var y = $("#year");
    if (y) y.textContent = new Date().getFullYear();
  }

  renderKeySkills();
  renderAllSkills();
  renderTimeline("#experienceList", D.experiences);
  renderTimeline("#formationList", D.formations);
  renderCerts();
  renderProjects();
  renderContact();

  /* ------------------------------------------------------------------ */
  /* 2. NAVIGATION ET CONTACT                                            */
  /* ------------------------------------------------------------------ */

  var topbar = $(".topbar");
  var menu = $("#menu");
  var toggle = $("#menuToggle");

  function closeMenu() {
    if (!menu) return;
    menu.classList.remove("is-open");
    if (toggle) { toggle.setAttribute("aria-expanded", "false"); toggle.textContent = "Menu"; }
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Fermer" : "Menu";
    });
  }
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

  window.addEventListener("scroll", function () {
    if (topbar) topbar.classList.toggle("is-scrolled", window.scrollY > 8);
  }, { passive: true });

  // Liens internes : l'adresse reste https://benomrane-yacine.com/ (pas de #section)
  var LIVE = /(^|\.)benomrane-yacine\.com$|github\.io$/.test(location.hostname);
  var HOME = LIVE ? "/" : null;
  $$('a[href^="#"]').forEach(function (a) {
    var id = a.getAttribute("href").slice(1);
    if (!id) return;
    a.dataset.target = id;
    if (HOME) a.setAttribute("href", HOME);
  });
  var cleanUrl = function () {
    if (LIVE && (location.hash || /index\.html$/.test(location.pathname)) && history.replaceState) {
      history.replaceState(null, "", "/");
    }
  };

  // Section courante dans le menu
  if ("IntersectionObserver" in window) {
    var links = $$(".menu a");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle("is-current", a.dataset.target === en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(function (a) { var t = a.dataset.target && document.getElementById(a.dataset.target); if (t) io.observe(t); });
  }

  // Copier l'e-mail
  var copyBtn = $("#copyEmail");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var email = (D.contact && D.contact.email) || "";
      var done = function () { copyBtn.textContent = "Copié"; setTimeout(function () { copyBtn.textContent = "Copier"; }, 2000); };
      var fallback = function () {
        var r = document.createRange(); r.selectNodeContents($("#emailLink"));
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
        copyBtn.textContent = "Sélectionné";
      };
      try {
        navigator.clipboard.writeText(email).then(done, fallback);
      } catch (err) { fallback(); }
    });
  }

  /* ------------------------------------------------------------------ */
  /* 3. ANIMATIONS                                                       */
  /* ------------------------------------------------------------------ */

  var story = $("#story");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGsap = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";

  if (reduce || !hasGsap) {
    if (story) story.classList.add("story--static");
    bindAnchors(null);
    goToInitialSection(null);
    return;
  }

  var gsap = window.gsap;
  var ST = window.ScrollTrigger;
  gsap.registerPlugin(ST);

  // Défilement fluide (facultatif : la page marche sans Lenis)
  var lenis = null;
  if (typeof window.Lenis !== "undefined") {
    lenis = new window.Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on("scroll", ST.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }
  bindAnchors(lenis);

  var headerH = function () { return topbar ? topbar.offsetHeight : 64; };
  var css = getComputedStyle(document.documentElement);
  var token = function (n) { return css.getPropertyValue(n).trim(); };

  /* --- Accueil : une seule entrée orchestrée --- */
  // Découpe du titre en mots pour les faire monter un par un
  var title = $(".hero__title");
  if (title) {
    title.innerHTML = title.innerHTML.split(/ (?![^<]*>)/).map(function (w) {
      return '<span class="w"><span>' + w + "</span></span>";
    }).join(" ");
  }
  var intro = gsap.timeline({ defaults: { ease: "power3.out" } });
  intro
    .from(".hero__title .w > span", { yPercent: 110, duration: 0.85, stagger: 0.05 })
    .from(".portrait__frame", { clipPath: "inset(14% 14% 14% 14% round 28px)", duration: 1.1, ease: "power2.inOut" }, 0.05)
    .from(".portrait__frame img", { scale: 1.15, duration: 1.4, ease: "power2.out" }, 0.05)
    .from(".badge-id", { y: 16, autoAlpha: 0, duration: 0.6 }, 0.8);

  // Parallaxe légère de la photo
  gsap.to(".portrait__frame img", {
    yPercent: -9, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });
  gsap.to(".badge-id", {
    y: -40, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });

  /* --- Scénario : le fichier qui veut sortir --- */
  if (story) {
    var steps = $$("#steps .step");
    var doc = $("#doc");
    var plains = $$(".field__v .plain");
    var encs = $$(".field__v .enc");
    var tlItems = $$("#xdr .tl li");
    var current = -1;

    var setStep = function (i) {
      if (i === current) return;
      current = i;
      steps.forEach(function (s, k) { s.classList.toggle("is-active", k === i); });
    };

    // État de départ
    gsap.set(doc, { scale: 1, xPercent: 22, borderColor: token("--line") });
    gsap.set("#label", { autoAlpha: 0, scale: 1.8, rotation: -10 });
    gsap.set(plains, { autoAlpha: 1, backgroundColor: "rgba(0,0,0,0)" });
    gsap.set(encs, { autoAlpha: 0 });
    gsap.set("#scanline", { autoAlpha: 0, top: "-10%" });
    gsap.set("#found", { autoAlpha: 0, y: 10 });
    gsap.set("#lock", { autoAlpha: 0, scale: 0.6 });
    gsap.set("#mail", { autoAlpha: 0, y: 40 });
    gsap.set("#block", { autoAlpha: 0, scale: 0.96 });
    gsap.set("#xdr", { autoAlpha: 0, y: 40 });
    gsap.set(tlItems, { autoAlpha: 0, x: -12 });
    gsap.set("#statusOpen", { display: "inline-block" });
    gsap.set("#statusDone", { display: "none" });
    gsap.set("#progressBar", { scaleX: 0 });

    var tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // 1. Détecter
    tl.to("#scanline", { autoAlpha: 1, duration: 0.05 }, 0.02)
      .to("#scanline", { top: "100%", duration: 0.6, ease: "none" }, 0.05)
      .to("#scanline", { autoAlpha: 0, duration: 0.08 }, 0.62)
      .to(plains, { backgroundColor: "rgba(31, 79, 214, 0.2)", duration: 0.15, stagger: 0.12 }, 0.3)
      .to("#found", { autoAlpha: 1, y: 0, duration: 0.2 }, 0.6)

    // 2. Classer
      .to("#found", { autoAlpha: 0, duration: 0.15 }, 1.0)
      .to("#label", { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.35, ease: "back.out(2.2)" }, 1.08)
      .to(doc, { borderColor: token("--warn"), duration: 0.2 }, 1.2)

    // 3. Chiffrer
      .to(plains, { autoAlpha: 0, duration: 0.25, stagger: 0.12 }, 2.05)
      .to(encs, { autoAlpha: 1, duration: 0.25, stagger: 0.12 }, 2.12)
      .to("#lock", { autoAlpha: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, 2.45)

    // 4. Bloquer
      .to(doc, { scale: 0.82, xPercent: 0, duration: 0.45, ease: "power2.inOut" }, 3.0)
      .to("#mail", { autoAlpha: 1, y: 0, duration: 0.4 }, 3.15)
      .to("#block", { autoAlpha: 1, scale: 1, duration: 0.3, ease: "back.out(1.8)" }, 3.55)

    // 5. Enquêter
      .to("#mail", { autoAlpha: 0, y: -20, duration: 0.3 }, 4.0)
      .to("#xdr", { autoAlpha: 1, y: 0, duration: 0.4 }, 4.12)
      .to(tlItems, { autoAlpha: 1, x: 0, duration: 0.2, stagger: 0.12 }, 4.3)
      .set("#statusOpen", { display: "none" }, 4.85)
      .set("#statusDone", { display: "inline-block" }, 4.85)
      .to({}, { duration: 0.15 }, 4.85);   // fin du scénario à 5

    tl.to("#progressBar", { scaleX: 1, duration: 5, ease: "none" }, 0);

    ST.create({
      trigger: story,
      start: function () { return "top " + headerH() + "px"; },
      end: function () { return "+=" + Math.round(window.innerHeight * 4.2); },
      pin: true,
      scrub: 0.6,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      animation: tl,
      onUpdate: function (self) { setStep(Math.min(4, Math.floor(self.progress * 5 + 0.001))); }
    });
    setStep(0);
  }

  /* --- Parcours : la ligne se remplit au fil du scroll --- */
  $$(".timeline").forEach(function (t) {
    gsap.fromTo($(".timeline__fill", t), { scaleY: 0 }, {
      scaleY: 1, ease: "none",
      scrollTrigger: { trigger: t, start: "top 75%", end: "bottom 60%", scrub: true }
    });
  });

  /* --- Compteur Microsoft Learn --- */
  var countEl = $("#learnCount");
  if (countEl) {
    var total = Number(countEl.dataset.total || countEl.textContent) || 0;
    var obj = { v: 0 };
    ST.create({
      trigger: countEl, start: "top 85%", once: true,
      onEnter: function () {
        gsap.to(obj, { v: total, duration: 1.2, ease: "power2.out", onUpdate: function () { countEl.textContent = Math.round(obj.v); } });
      }
    });
  }

  window.addEventListener("load", function () { ST.refresh(); goToInitialSection(lenis); });

  /* ------------------------------------------------------------------ */
  function scrollToId(id, lenisInstance, immediate) {
    var target = document.getElementById(id);
    if (!target) return;
    var off = -((topbar ? topbar.offsetHeight : 64) + 12);
    if (lenisInstance && !immediate) {
      lenisInstance.scrollTo(target, { offset: off });
    } else {
      var y = target.getBoundingClientRect().top + window.scrollY + off;
      window.scrollTo({ top: y, behavior: reduce || immediate ? "auto" : "smooth" });
    }
  }

  function bindAnchors(lenisInstance) {
    $$("a[data-target]").forEach(function (a) {
      a.addEventListener("click", function (e) {
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) return;
        e.preventDefault();
        closeMenu();
        scrollToId(a.dataset.target, lenisInstance, false);
      });
    });
  }

  // Ancre ajoutée à la main dans l'adresse sur une page déjà ouverte
  window.addEventListener("hashchange", function () { goToInitialSection(null); });

  // Arrivée depuis une ancienne adresse (ex. /#parcours) : on va à la section puis on nettoie l'adresse
  function goToInitialSection(lenisInstance) {
    var id = decodeURIComponent(location.hash.slice(1));
    if (id) scrollToId(id, lenisInstance, true);
    cleanUrl();
  }
})();
