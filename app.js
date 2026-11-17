// Renders the page from data.js, handles the EN / ID switch and the small animations.
(() => {
  const D = PORTFOLIO;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;
  root.style.scrollBehavior = "auto"; // smooth scrolling is done below, with its own easing

  let lang = localStorage.getItem("lang") || (navigator.language.toLowerCase().startsWith("id") ? "id" : "en");

  // ---------- helpers ----------
  const isLocalized = (v) => v && typeof v === "object" && !Array.isArray(v) && "en" in v;
  const t = (v) => (isLocalized(v) ? v[lang] ?? v.en : v);
  const ui = (k) => D.ui[lang][k] ?? D.ui.en[k] ?? k;
  const locale = () => (lang === "id" ? "id-ID" : "en-US");
  const parts = (ym) => ym.split("-").map(Number);
  const fmtMonth = (ym) => {
    const [y, m] = parts(ym);
    return new Date(y, m - 1, 1).toLocaleDateString(locale(), { month: "short", year: "numeric" });
  };
  const fmtRange = (s, e) => `${fmtMonth(s)} – ${e ? fmtMonth(e) : ui("present")}`;
  const yearRange = ([a, b]) => (a === b ? `${a}` : `${a} – ${b ?? ui("now")}`);

  // ---------- fade-in on scroll ----------
  // an element animates when it is 15% inside the screen (a little above the bottom edge, so you see it),
  // and plays again every time you scroll back to it from below
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("in");
        else if (e.boundingClientRect.top > 0) e.target.classList.remove("in");
      }),
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );
  const observe = () => $$(".reveal").forEach((n) => io.observe(n));

  // ---------- renderers ----------
  function renderStatic() {
    $$("[data-t]").forEach((n) => (n.textContent = ui(n.dataset.t)));
    $$("[data-bind]").forEach((n) => (n.textContent = D.person[n.dataset.bind]));

    const p = D.person;
    const links = {
      mail: `mailto:${p.email}`,
      wa: `https://wa.me/${p.whatsapp}`,
      linkedin: p.linkedin,
      github: p.github
    };
    $$("[data-link]").forEach((a) => (a.href = links[a.dataset.link]));
    $("#mail-text").textContent = p.email;

    $("#h1").replaceChildren(`${ui("hi")} `, el("em", null, p.nick));
    $("#role").textContent = t(p.role);
    $("#lead").textContent = t(p.lead);
    $("#about-text").textContent = t(p.about);

    document.documentElement.lang = lang;
    $$(".lang button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
  }

  function renderProjects() {
    const box = $("#cards");
    box.replaceChildren();
    const visuals = ["v-green", "v-navy", "v-mint"];
    D.projects.forEach((p, i) => {
      const card = el("article", "card reveal");
      card.style.setProperty("--i", i % 3); // cards in one row appear one after another
      const visual = el("div", `card-visual ${visuals[i % visuals.length]}`);
      visual.append(el("span", "tag", p.category), el("span", "idx", String(i + 1).padStart(2, "0")));
      const meta = el("div", "card-meta");
      meta.append(el("span", "year", yearRange(p.years)));
      const body = el("div", "card-body");
      body.append(meta, el("h3", null, t(p.title)), el("p", null, t(p.desc)), el("p", "tech", p.tech.join(" · ")));
      card.append(visual, body);
      box.append(card);
    });
  }

  // work experience and education: one card per entry, two columns
  function renderEntries(boxId, items, map) {
    const box = $(boxId);
    box.replaceChildren();
    items.forEach((item, i) => {
      const r = map(item);
      // the current job gets a pulsing dot in front of its date
      const li = el("li", `entry reveal${item.end === null ? " now" : ""}`);
      li.style.setProperty("--i", i % 2);
      li.append(
        el("span", "entry-date", fmtRange(item.start, item.end)),
        el("h3", null, r.title),
        el("p", "entry-where", r.where),
        el("p", null, r.desc)
      );
      box.append(li);
    });
  }

  // training and certifications, newest first; a row with a url opens the certificate
  function renderCerts() {
    const box = $("#cert-list");
    box.replaceChildren();
    [...D.certs]
      .sort((a, b) => b.date.localeCompare(a.date))
      .forEach((c, i) => {
        const li = el("li", "cert-row");
        li.style.setProperty("--i", i);
        const inner = el(c.url ? "a" : "div", "cert-inner");
        const info = el("div");
        info.append(el("h3", null, c.name));
        if (c.issuer) info.append(el("p", null, c.issuer));
        inner.append(el("span", "cert-date", fmtMonth(c.date)), info);
        if (c.url) {
          inner.href = c.url;
          inner.target = "_blank";
          inner.rel = "noopener";
          inner.title = ui("certs.open");
          inner.setAttribute("aria-label", `${ui("certs.open")}: ${c.name}`);
          li.append(inner, el("span", "cert-arrow", "↗"));
        } else {
          li.append(inner);
        }
        box.append(li);
      });
  }

  function renderLists() {
    renderEntries("#exp-list", D.experience, (x) => ({ title: x.role, where: x.company, desc: t(x.desc) }));
    renderEntries("#edu-list", D.education, (x) => ({ title: t(x.title), where: x.school, desc: t(x.desc) }));
    renderCerts();

    $("#skills").replaceChildren(
      ...D.skills.map((s, i) => {
        const li = el("li", null, s);
        li.style.setProperty("--i", i); // chips pop in one after another
        return li;
      })
    );

    $("#langs").replaceChildren(
      ...D.languages.map((l, i) => {
        const li = el("li");
        li.style.setProperty("--i", D.skills.length + i); // pops in after the skills
        li.append(el("strong", null, t(l.name)), el("span", null, t(l.level)));
        return li;
      })
    );
  }

  function renderAll() {
    renderStatic();
    renderProjects();
    renderLists();
    observe();
    if (!reduceMotion) scrub();
  }

  // ---------- language switch ----------
  const main = $("main");
  $$(".lang button").forEach((b) =>
    b.addEventListener("click", () => {
      if (b.dataset.lang === lang) return;
      const apply = () => {
        lang = b.dataset.lang;
        localStorage.setItem("lang", lang);
        renderAll();
      };
      if (reduceMotion) return apply();
      main.classList.add("swap-out"); // fade out, swap the text, fade back in
      setTimeout(() => {
        apply();
        main.classList.remove("swap-out");
      }, 220);
    })
  );

  $("#year").textContent = new Date().getFullYear();
  renderAll();

  // ---------- loading screen: curtain slides up, then the hero plays its intro ----------
  const loader = $("#loader");
  const finishLoading = () => {
    if (root.classList.contains("ready")) return;
    root.classList.add("ready");
    if (loader) {
      loader.classList.add("done");
      setTimeout(() => loader.remove(), 1500);
    }
  };
  Promise.all([
    document.readyState === "complete" ? Promise.resolve() : new Promise((r) => addEventListener("load", r, { once: true })),
    document.fonts ? document.fonts.ready : Promise.resolve(),
    new Promise((r) => setTimeout(r, reduceMotion ? 0 : 900))
  ]).then(finishLoading);
  setTimeout(finishLoading, 4500); // never block the page

  // ---------- scroll: parallax, progress bar, active menu link ----------
  const progress = $("#progress");
  const navLinks = new Map($$(".nav-links a").map((a) => [a.getAttribute("href").slice(1), a]));
  const spySections = $$("section[id]");
  // the menu link of the last section whose top is above 45% of the screen
  function updateActiveLink(y) {
    navLinks.forEach((a) => a.classList.remove("active"));
    if (y < 300) return;
    const line = innerHeight * 0.45;
    let current = null;
    for (const s of spySections) if (s.getBoundingClientRect().top <= line) current = s.id;
    if (current) navLinks.get(current)?.classList.add("active");
  }
  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    const max = root.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
    if (!reduceMotion) root.style.setProperty("--py", Math.min(y, 1200));
    updateActiveLink(y);
    if (!reduceMotion) scrub();
    ticking = false;
  };
  // scroll-linked values: cards and the contact card slide (--vp, -1 to 1)
  function scrub() {
    const vh = innerHeight;
    $$(".card, .cta").forEach((c) => {
      const r = c.getBoundingClientRect();
      c.style.setProperty("--vp", Math.min(Math.max((r.top + r.height / 2 - vh / 2) / vh, -1), 1).toFixed(3));
    });
  }
  addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    },
    { passive: true }
  );
  addEventListener("resize", onScroll);
  onScroll();

  // ---------- smooth scrolling with easing for #links ----------
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  function scrollToY(y, duration) {
    if (reduceMotion) return window.scrollTo(0, y);
    const from = window.scrollY;
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      window.scrollTo(0, from + (y - from) * ease(p));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href").slice(1);
    const target = id ? document.getElementById(id) : null;
    if (id && !target) return;
    e.preventDefault();
    const offset = target ? parseFloat(getComputedStyle(target).scrollMarginTop) || 0 : 0;
    const y = target ? target.getBoundingClientRect().top + window.scrollY - offset : 0;
    scrollToY(y, Math.min(1200, Math.max(600, Math.abs(y - window.scrollY) * 0.35)));
    history.pushState(null, "", id ? `#${id}` : location.pathname + location.search);
  });

  // ---------- micro interaction: ripple where a button is pressed ----------
  document.addEventListener("pointerdown", (e) => {
    if (reduceMotion) return;
    const b = e.target.closest(".btn, .socials a, .lang button, .logo");
    if (!b) return;
    const r = b.getBoundingClientRect();
    const size = Math.max(r.width, r.height) * 2;
    const ripple = el("span", "ripple");
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
    b.append(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  });

  // ---------- reload when a new version is deployed ----------
  // (compares ETag / Last-Modified of the site files).
  const WATCHED = [location.pathname, "style.css", "app.js", "data.js"];
  let currentFingerprint = null;
  async function checkForUpdate() {
    try {
      const tags = await Promise.all(
        WATCHED.map(async (url) => {
          const res = await fetch(url, { method: "HEAD", cache: "no-store" });
          return res.headers.get("etag") || res.headers.get("last-modified") || "";
        })
      );
      const fp = tags.join("|");
      if (!fp.replace(/\|/g, "")) return;
      if (currentFingerprint === null) currentFingerprint = fp;
      else if (fp !== currentFingerprint) location.reload();
    } catch (_) {
      // offline: try again later
    }
  }
  checkForUpdate();
  setInterval(() => document.visibilityState === "visible" && checkForUpdate(), 60000);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") checkForUpdate();
  });
})();
