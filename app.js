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
  const monthsSince = (ym) => {
    const [y, m] = parts(ym);
    const n = new Date();
    return (n.getFullYear() - y) * 12 + (n.getMonth() + 1 - m);
  };
  const yearRange = ([a, b]) => (a === b ? `${a}` : `${a} – ${b ?? ui("now")}`);

  // ---------- fade-in on scroll ----------
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.1 }
  );
  const observe = () => $$(".reveal:not(.in)").forEach((n) => io.observe(n));

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
    $("#about1").textContent = t(p.about1);
    $("#about2").textContent = t(p.about2);

    // numbers under the hero are computed, so they stay true as data.js changes
    $("#stat-years").textContent = `${Math.floor(monthsSince(p.qaSince) / 12)}+`;
    $("#stat-companies").textContent = new Set(D.experience.map((x) => x.company)).size;
    $("#stat-tools").textContent = D.tools.length;

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

  function renderSteps(boxId, items, map) {
    const box = $(boxId);
    box.replaceChildren();
    items.forEach((item) => {
      const r = map(item);
      // the current job gets a pulsing dot
      const li = el("li", `step reveal${item.end === null ? " now" : ""}`);
      li.append(
        el("span", "step-date", fmtRange(item.start, item.end)),
        el("h3", null, r.title),
        el("p", "step-where", r.where),
        el("p", null, r.desc)
      );
      box.append(li);
    });
  }

  // training and certifications, newest first
  function renderCerts() {
    const box = $("#cert-list");
    box.replaceChildren();
    [...D.certs]
      .sort((a, b) => b.date.localeCompare(a.date))
      .forEach((c, i) => {
        const li = el("li", "cert-row");
        li.style.setProperty("--i", i);
        const info = el("div");
        info.append(el("h3", null, c.name));
        if (c.issuer) info.append(el("p", null, c.issuer));
        li.append(el("span", "cert-date", fmtMonth(c.date)), info);
        box.append(li);
      });
  }

  function renderLists() {
    renderSteps("#exp-list", D.experience, (x) => ({ title: x.role, where: x.company, desc: t(x.desc) }));
    renderSteps("#edu-list", D.education, (x) => ({ title: t(x.title), where: x.school, desc: t(x.desc) }));
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
  }

  // ---------- count-up for the numbers under the hero ----------
  function setupCountUp() {
    const box = $(".stats");
    if (reduceMotion || !box) return;
    const so = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        so.disconnect();
        $$(".stat strong").forEach((n) => {
          const m = n.textContent.match(/^(\d+)(.*)$/);
          if (!m) return;
          const target = Number(m[1]);
          const suffix = m[2];
          const start = performance.now();
          const frame = (now) => {
            const p = Math.min((now - start) / 1300, 1);
            n.textContent = `${Math.round(target * (1 - Math.pow(1 - p, 3)))}${suffix}`;
            if (p < 1) requestAnimationFrame(frame);
          };
          requestAnimationFrame(frame);
        });
      },
      { threshold: 0.5 }
    );
    so.observe(box);
  }

  // ---------- language switch ----------
  $$(".lang button").forEach((b) =>
    b.addEventListener("click", () => {
      lang = b.dataset.lang;
      localStorage.setItem("lang", lang);
      renderAll();
    })
  );

  $("#year").textContent = new Date().getFullYear();
  renderAll();
  setupCountUp();

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
