// ============================================================
// WEDDING DETAILS — single source of truth. Edit here to update
// names, dates, venue, events, or RSVP contacts.
// Anything inside [square brackets] is a placeholder: it shows on the
// page with a dashed underline so it's easy to spot and replace.
// ============================================================
const WEDDING_DETAILS = {
  groom: { firstName: "Kartikayan", fullName: "Kartikayan Sharma", parents: "Mrs. Anita Sharma & Mr. Sushil Kumar Sharma" },
  bride: { firstName: "Surbhi", fullName: "Surbhi Jain", parents: "Mrs. Indu Jain & Mr. Mukesh Jain" },
  blessings: ["Late Smt. Rama Devi & Late Shri Ramesh Chandra Sharma"],
  hosts: ["Mrs. Anita Sharma & Mr. Sushil Kumar Sharma"],
  hostFamily: "The Sharma family",
  weddingDate: "2027-02-20T18:30:00+05:30", // countdown target (pheras)
  calendar: { title: "Kartikayan & Surbhi's Wedding", start: "2027-02-19T13:00:00+05:30", end: "2027-02-20T23:30:00+05:30" },
  venue: {
    name: "La Perle River Resort",
    address: "Village Ladhuachaur, P.O. Dhikuli, Ramnagar, Nainital, Uttarakhand 244715",
    mapLink: "https://www.google.com/maps/search/?api=1&query=La+Perle+River+Resort+Jim+Corbett+Ramnagar"
  },
  hashtag: "#Kartik_Got_Surprised",
  coupleNote: "Two childhood companions who found their forever in each other. Kartik is the calm, steady anchor who grounds their world, while Surbhi is the vibrant spark that keeps it bright. Built on deep trust, easy laughter, and quiet strength, their journey now leads to a celebration of love and togetherness. They are endlessly grateful to have you by their side as they honor cherished traditions, grace the dance floor, and begin this next chapter.",
  // Photos shown inside the blue frame (swap in your own pre-wedding photos)
  couplePhotos: [1, 2, 3, 4, 5].map((n) => `./assets/photos/couple-art-${n}.jpg?v=2`), // ?v= makes browsers fetch re-edited images
  weather: "Jim Corbett in mid-February is pleasantly cool — sunny days around 22-23°C and crisp evenings near 8-9°C. Light woollens are recommended after sundown.",
  parking: "[Parking arrangements at the venue.]",
  instagram: "", // e.g. "https://instagram.com/yourhandle" — if empty, opens the hashtag page
  rsvpLink: "",  // e.g. a Google Form. If empty, RSVP opens WhatsApp to the first contact.
  rsvp: [
    { name: "Kartikayan Sharma", phone: "+919968431431", display: "Kartikayan Sharma | +91 99684 31431" }
  ],
  // Day-by-day timeline (icon names are drawn by TIMELINE_ICONS below)
  timeline: [
    {
      day: "Day 1", date: "Fri, 19 Feb", heading: "Friday, 19 February", start: "2027-02-19",
      items: [
        { time: "11:00 AM – 12:00 PM", title: "Guest Arrival & Check-in", icon: "suitcase" },
        { time: "1:00 PM", title: "Welcome Lunch & Haldi Ceremony", icon: "plate" },
        { time: "4:30 PM", title: "Evening Hi-Tea", icon: "cup" },
        { time: "6:00 PM", title: "Sagai – Tikaa", icon: "diya" },
        { time: "6:30 PM", title: "Gaud Bharai", icon: "thali" },
        { time: "7:00 PM", title: "Engagement", icon: "ring" },
        { time: "7:30 PM onwards", title: "Mehendi & Sangeet", image: "./assets/art/icon-disco.png" },
      ],
    },
    {
      day: "Day 2", date: "Sat, 20 Feb", heading: "Saturday, 20 February", start: "2027-02-20",
      items: [
        { time: "7:00 AM – 10:00 AM", title: "Breakfast", icon: "cup" },
        { time: "12:00 PM", title: "Lunch", icon: "plate" },
        { time: "1:00 PM", title: "Ghudchari & Baraat", image: "./assets/art/icon-ghodi.png" },
        { time: "4:00 PM", title: "Varmala", icon: "garland" },
        { time: "4:30 PM", title: "Sunset Snacks & Hi-Tea", icon: "stand" },
        { time: "5:00 PM", title: "Phere", icon: "fire" },
        { time: "6:00 PM onwards", title: "Dinner", icon: "cloche" },
      ],
    },
  ],
  events: [
    {
      title: "Haldi",
      image: "./assets/art/event-2.avif",
      date: "Friday, Feb 19th 2027",
      time: "1:00 PM Onwards",
      venue: "La Perle River Resort, Jim Corbett",
      description: "An afternoon of warm sunshine, blooming marigolds, and sacred blessings.",
    },
    {
      title: "Engagement & Sangeet",
      image: "./assets/art/event-4.avif",
      date: "Friday, Feb 19th 2027",
      time: "6:00 PM Onwards",
      venue: "La Perle River Resort, Jim Corbett",
      description: "Love is in the air, rings on the fingers, and beats on the floor.",
    },
    {
      title: "Baraat & Pheras",
      image: "./assets/art/event-5.avif",
      date: "Saturday, Feb 20th 2027",
      time: "1:00 PM Onwards",
      venue: "La Perle River Resort, Jim Corbett",
      description: "Garlands, Sacred Fires & Eternal Promises!\n7 Steps to Forever!!", // \n starts a new line
    }
  ],
};

// ============================================================
// Helpers
// ============================================================
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
// Escape, then highlight [placeholders]
function fmt(s) {
  return esc(s).replace(/\[([^\]]+)\]/g, '<span class="ph">$1</span>');
}
function getPath(path) {
  return path.split(".").reduce((o, k) => (o == null ? o : o[k]), WEDDING_DETAILS);
}

// ============================================================
// RENDER: text fields and links
// ============================================================
function renderText() {
  const d = WEDDING_DETAILS;
  $$("[data-bind]").forEach((el) => {
    const v = getPath(el.dataset.bind);
    if (v != null) el.innerHTML = fmt(v);
  });
  // keep each person's name on one line, so a narrow screen breaks after the "&"
  const couple = (s) => `<p>${s.split(" & ").map((n) => `<span class="nw">${fmt(n)}</span>`).join(" &amp; ")}</p>`;
  $("#blessingList").innerHTML = d.blessings.map(couple).join("");
  $("#hostList").innerHTML = d.hosts.map(couple).join("");

  $("#routeLink").href = d.venue.mapLink;

  // RSVP: one button to accept, one to decline — each opens WhatsApp with a ready message
  const pair = `${d.groom.firstName} & ${d.bride.firstName}`;
  const wa = (text) => `https://wa.me/${d.rsvp[0].phone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
  $("#rsvpYes").href = d.rsvpLink || wa(`Hi! I'm happy to confirm that I will be attending ${pair}'s wedding.`);
  $("#rsvpNo").href = d.rsvpLink || wa(`Hi! Sadly I won't be able to attend ${pair}'s wedding. Sending my love and blessings.`);

  $("#instaLink").href = d.instagram || `https://www.instagram.com/explore/tags/${d.hashtag.replace("#", "")}/`;

  const utc = (iso) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  $("#calBtn").href =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent(d.calendar.title)}` +
    `&dates=${utc(d.calendar.start)}/${utc(d.calendar.end)}` +
    `&location=${encodeURIComponent(d.venue.name + ", " + d.venue.address)}`;
}

// ============================================================
// RENDER: Event cards — oval artwork in a gold frame, with the
// balloon, castle and moon floating around it
// ============================================================
function renderEventCards() {
  const d = WEDDING_DETAILS;
  $("#eventCards").innerHTML = d.events.map((event) => `
    <article class="event reveal">
      <div class="event-art">
        <div class="event-frame"></div>
        <img class="ly" src="${esc(event.image)}" style="--x:160;--y:61;--w:244;--h:369;object-fit:fill" alt="${esc(event.title)}">
        <img class="ly contain" src="./assets/art/balloon-small.avif" style="--x:142;--y:0;--w:141;--h:187" alt="">
        <img class="ly" src="./assets/art/castle.webp" style="--x:74;--y:274;--w:196;--h:178;object-fit:fill" alt="">
        <img class="ly" src="./assets/art/moon.avif" style="--x:330;--y:149;--w:162;--h:222" alt="">
      </div>
      <h3>${fmt(event.title)}</h3>
      <p class="info">${fmt(event.date)}<br>${fmt(event.venue)}<br>${fmt(event.time)}</p>
      ${event.description ? `<p class="desc">${fmt(event.description)}</p>` : ""}
    </article>
  `).join("");
}

// ============================================================
// RENDER: Day-by-day timeline — a tab per day, gold line icons
// ============================================================
const TIMELINE_ICONS = {
  suitcase: '<rect x="4" y="8" width="16" height="12" rx="2"/><path d="M9 8V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V8M8 8v12M16 8v12"/>',
  plate: '<circle cx="12" cy="12" r="5.5"/><circle cx="12" cy="12" r="3"/><path d="M3.5 4v4.5a1.5 1.5 0 0 0 3 0V4M5 9v11M20.5 20V4c-1.8 1.2-2.2 5-1 7h1"/>',
  cup: '<path d="M5 10h11v3.5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5zM16 11h1.5a2.5 2.5 0 0 1 0 5H16M3 21h17M9 3.5c-.8.8.8 1.7 0 2.5M12.5 3.5c-.8.8.8 1.7 0 2.5"/>',
  diya: '<path d="M3 14h18c-1 4-5 6-9 6s-8-2-9-6zM12 4c-2 2.5-2 5 0 7 2-2 2-4.5 0-7z"/>',
  thali: '<ellipse cx="12" cy="15" rx="9" ry="4"/><ellipse cx="12" cy="15" rx="5.5" ry="2"/><circle cx="7.5" cy="10" r="1.4"/><circle cx="16.5" cy="10" r="1.4"/><path d="M12 6.5c-1.2 1.5-1.2 3 0 4 1.2-1 1.2-2.5 0-4z"/>',
  ring: '<circle cx="12" cy="15" r="5.5"/><path d="M9 6.5L10.5 4h3L15 6.5 12 9.5z"/>',
  garland: '<path d="M6 3c0 9 3 14 6 14s6-5 6-14M12 17v4"/><circle cx="6.8" cy="8.5" r="1.3"/><circle cx="8.6" cy="12.8" r="1.3"/><circle cx="15.4" cy="12.8" r="1.3"/><circle cx="17.2" cy="8.5" r="1.3"/>',
  stand: '<path d="M4 17.5h16M6 17.5a6 3 0 0 1 12 0M7.5 10.5h9M9 10.5a3 2 0 0 1 6 0M12 4v4.5M12 17.5V21M9 21h6"/>',
  fire: '<path d="M12 3c3 3.5 5 6 5 9a5 5 0 0 1-10 0c0-2 1-3.2 2-4 0 1.8 1 3 2 3 0-3-1-5.5 1-8zM4 21h16M6.5 18h11"/>',
  cloche: '<path d="M3 17.5h18M4.5 17.5a7.5 7.5 0 0 1 15 0M12 10V8M10 8h4M2.5 20.5h19"/>',
};

function renderTimeline() {
  const days = WEDDING_DETAILS.timeline;
  // on the wedding days, open today's tab; before then, Day 1
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
  let open = Math.max(0, days.findLastIndex((d) => today >= d.start));

  $("#tlTabs").innerHTML = days.map((d, i) => `
    <button class="tl-tab" type="button" role="tab" id="tlTab${i}" aria-controls="tlDay${i}">
      <span class="tl-tab-day">${fmt(d.day)}</span><span class="tl-tab-date">${fmt(d.date)}</span>
    </button>`).join("");
  $("#tlDays").innerHTML = days.map((d, i) => `
    <div class="tl-day" role="tabpanel" id="tlDay${i}" aria-labelledby="tlTab${i}">
      <h3 class="tl-day-head">${fmt(d.day)} · ${fmt(d.heading)}</h3>
      <ol class="tl-list">
        ${d.items.map((it) => `
          <li class="tl-item">
            <span class="tl-icon" aria-hidden="true">${it.image
              ? `<img src="${esc(it.image)}" alt="">`
              : `<svg viewBox="0 0 24 24">${TIMELINE_ICONS[it.icon] || ""}</svg>`}</span>
            <div class="tl-text"><p class="tl-time">${fmt(it.time)}</p><p class="tl-title">${fmt(it.title)}</p></div>
          </li>`).join("")}
      </ol>
    </div>`).join("");

  const tabs = $$(".tl-tab"), panels = $$(".tl-day");
  const show = (i, focus) => {
    open = i;
    tabs.forEach((t, j) => { t.setAttribute("aria-selected", i === j); t.tabIndex = i === j ? 0 : -1; });
    panels.forEach((p, j) => { p.hidden = i !== j; });
    if (focus) tabs[i].focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => show(i));
    t.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") show((open + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length, true);
    });
  });
  show(open);
}

// ============================================================
// RENDER: Things to know
// ============================================================
function renderOtherItems() {
  const d = WEDDING_DETAILS;
  const contacts = d.rsvp.map((r) => `<a href="tel:${esc(r.phone)}">${esc(r.display)}</a>`).join("");
  const items = [
    { icon: "icon-hashtag.avif", title: "Hashtag", body: `<p>While posting photos on social media, please use the hashtag<br>${fmt(d.hashtag)}</p>` },
    { icon: "icon-weather.avif", title: "Weather", body: `<p>${fmt(d.weather)}</p>` },
    { icon: "icon-parking.avif", title: "Parking", body: `<p>${fmt(d.parking)}</p>` },
    { icon: "rsvp-title.png", wide: true, title: "RSVP", body: `<div class="contacts">${contacts}</div>` },
  ];
  $("#otherItems").innerHTML = items.map((it) => `
    <div class="know-item reveal">
      ${it.icon ? `<img class="icon${it.wide ? " wide" : ""}" src="./assets/art/${it.icon}" alt="">` : ""}
      <h3>${it.title}</h3>
      ${it.body}
    </div>
  `).join("");
}

// ============================================================
// Photo carousel inside the blue frame
// ============================================================
function initSlides() {
  const box = $("#slides");
  if (!box.children.length) {
    box.innerHTML = WEDDING_DETAILS.couplePhotos.map((src, i) => `<img src="${esc(src)}" alt="" class="${i ? "" : "on"}">`).join("");
  }
  if (box.children.length < 2 || reduceMotion) return;
  const imgs = $$("img", box);
  let i = 0;
  setInterval(() => {
    imgs[i].classList.remove("on");
    i = (i + 1) % imgs.length;
    imgs[i].classList.add("on");
  }, 3500);
}

// ============================================================
// Countdown: flip clock (days / hours / mins / secs) until the big day
// ============================================================
function initCountdown() {
  const target = new Date(WEDDING_DETAILS.weddingDate).getTime();
  const pad = (n) => String(n).padStart(2, "0");

  // each card: static top + bottom halves, and two flaps that fold over them
  const cards = {};
  $$("#clock .flip").forEach((card) => {
    card.innerHTML = ["upper", "lower", "flap-top", "flap-bottom"].map((c) => `<span class="leaf ${c}"><b></b></span>`).join("");
    const [upper, lower, flapTop, flapBottom] = $$("b", card);
    cards[card.dataset.unit] = { card, upper, lower, flapTop, flapBottom, value: null };
    // once the bottom flap lands, the new number becomes the resting state
    flapBottom.parentElement.addEventListener("animationend", () => {
      const c = cards[card.dataset.unit];
      c.lower.textContent = c.flapTop.textContent = c.value;
      card.classList.remove("flipping");
    });
  });

  function show(unit, value) {
    const c = cards[unit];
    if (c.value === value) return;
    c.card.style.setProperty("--n", value.length);
    if (c.value === null || reduceMotion) {
      c.upper.textContent = c.lower.textContent = c.flapTop.textContent = c.flapBottom.textContent = value;
    } else {
      c.upper.textContent = c.flapBottom.textContent = value; // new number, revealed
      c.flapTop.textContent = c.lower.textContent = c.value;  // old number, folding away
      c.card.classList.remove("flipping");
      void c.card.offsetWidth; // restart the animation
      c.card.classList.add("flipping");
    }
    c.value = value;
  }

  function tick() {
    let t = Math.max(0, Math.floor((target - Date.now()) / 1000));
    const dd = Math.floor(t / 86400); t %= 86400;
    const hh = Math.floor(t / 3600); t %= 3600;
    show("days", pad(dd));
    show("hours", pad(hh));
    show("mins", pad(Math.floor(t / 60)));
    show("secs", pad(t % 60));
  }
  tick();
  setInterval(tick, 1000);
}

// ============================================================
// Scroll-reveal via IntersectionObserver
// ============================================================
function initRevealObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("in-view"), i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal").forEach((el) => observer.observe(el));
}

// ============================================================
// Parallax: floating balloon / castle / moon, fading hero names
// ============================================================
function initParallax() {
  const names = $("#heroNames");
  const floaters = $$(".px");
  const wide = matchMedia("(min-width: 1000px)");
  setTimeout(() => $("#musicWrap").classList.add("in-view"), 900);
  if (reduceMotion) return;

  function onScroll() {
    const y = window.scrollY, vh = window.innerHeight;
    names.style.transform = `translateY(${(y * 0.35).toFixed(1)}px)`;
    // fade out before the drifting names reach the artwork below the curve
    names.style.opacity = Math.max(0, 1 - y / (vh * 0.35)).toFixed(3);
    floaters.forEach((el) => {
      // laptops show the scene as composed, without drift
      if (wide.matches) { el.style.transform = ""; return; }
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      // only drift once the section's top has scrolled past the top of the screen
      let shift = Math.max(0, -r.top) * parseFloat(el.dataset.speed);
      // optional resting point, in design units (the column is 562 units wide)
      if (el.dataset.max) {
        const limit = parseFloat(el.dataset.max) * r.width / 562;
        shift = Math.max(-limit, Math.min(limit, shift));
      }
      el.style.transform = `translateY(${shift.toFixed(1)}px)`;
    });
  }
  window.addEventListener("scroll", () => requestAnimationFrame(onScroll), { passive: true });
  onScroll();
}

// ============================================================
// Scroll prompt — appears shortly after load, fades once scrolling starts
// ============================================================
function initScrollCue() {
  const cue = $("#scrollCue");
  const update = () => cue.classList.toggle("show", window.scrollY < 60);
  setTimeout(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
  }, 1200);
}

// ============================================================
// Music player
// ============================================================
function initMusicPlayer() {
  const audio = $("#bgAudio");
  const btn = $("#musicBtn");
  const pulse = $("#musicPulse");
  const iconMuted = $("#iconMuted");
  const iconPlaying = $("#iconPlaying");
  let isPlaying = false;

  function setPlayingUI(playing) {
    isPlaying = playing;
    pulse.classList.toggle("hidden", !playing);
    iconMuted.classList.toggle("hidden", playing);
    iconPlaying.classList.toggle("hidden", !playing);
    btn.setAttribute("aria-label", playing ? "Mute Music" : "Play Music");
  }

  function startPlayback() {
    if (isPlaying) return;
    audio.play().then(() => setPlayingUI(true)).catch(() => {});
  }

  function tryAutoplay() {
    audio.volume = 0.3;
    const p = audio.play();
    if (p !== undefined) {
      p.then(() => setPlayingUI(true)).catch(() => {
        const onInteract = () => {
          startPlayback();
          ["click", "touchend", "keydown"].forEach((evt) => document.removeEventListener(evt, onInteract));
        };
        // iPhones only count a finished tap (touchend), not touchstart, as permission to play
        ["click", "touchend", "keydown"].forEach((evt) => document.addEventListener(evt, onInteract, { once: true, passive: true }));
      });
    }
  }

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (isPlaying) {
      audio.pause();
      setPlayingUI(false);
    } else {
      startPlayback();
    }
  });

  // Opening screen: the tap that opens the invitation is what lets the browser play sound
  const gate = $("#gate");
  $("#gateBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    audio.volume = 0.3;
    startPlayback();
    gate.classList.add("open");
    document.documentElement.classList.remove("gated");
    window.scrollTo(0, 0);
  });

  tryAutoplay();
}

// ============================================================
// Floating index: open/close the list, jump to a section, and
// mark the section currently on screen
// ============================================================
function initToc() {
  const toc = $("#toc"), btn = $("#tocBtn"), list = $("#tocList");
  const links = $$("a", list);
  setTimeout(() => toc.classList.add("in-view"), 900);

  const setOpen = (open) => {
    toc.classList.toggle("open", open);
    list.hidden = !open;
    btn.setAttribute("aria-expanded", open);
    btn.setAttribute("aria-label", open ? "Close the section list" : "Jump to a section");
  };
  btn.addEventListener("click", (e) => { e.stopPropagation(); setOpen(list.hidden); });
  document.addEventListener("click", (e) => { if (!toc.contains(e.target)) setOpen(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });

  links.forEach((a) => a.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.getElementById(a.hash.slice(1));
    setOpen(false);
    if (!target) return;
    const y = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: Math.max(0, y), behavior: reduceMotion ? "auto" : "smooth" });
  }));

  // highlight the last section whose top has passed the middle of the screen
  const sections = links.map((a) => document.getElementById(a.hash.slice(1)));
  const mark = () => {
    const mid = window.innerHeight * 0.45;
    let current = 0;
    sections.forEach((s, i) => { if (s && s.getBoundingClientRect().top <= mid) current = i; });
    links.forEach((a, i) => a.classList.toggle("current", i === current));
  };
  window.addEventListener("scroll", () => requestAnimationFrame(mark), { passive: true });
  mark();
}

// ============================================================
// PDF version: size the printed page to the whole card, so it
// becomes one long page that scrolls like the website
// ============================================================
function initPdf() {
  initSlides(); // first photo only (slideshow does not advance in print)
  const size = () => {
    const el = document.documentElement;
    let s = $("#pdfPage");
    if (!s) { s = document.createElement("style"); s.id = "pdfPage"; document.head.appendChild(s); }
    s.textContent = `@page { size: ${el.clientWidth}px ${Math.ceil(el.scrollHeight) + 2}px; margin: 0; }`;
  };
  size();
  window.addEventListener("load", () => document.fonts.ready.then(size));
}

// ============================================================
// Init
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  // The shareable single-file build ships with this content already filled in
  // (so it shows even where scripts can't run); only render it here otherwise.
  if (!document.documentElement.hasAttribute("data-prerendered")) {
    renderText();
    renderEventCards();
    renderTimeline();
    renderOtherItems();
  }
  if (document.documentElement.classList.contains("pdf")) return initPdf();
  initSlides();
  initCountdown();
  initRevealObserver();
  initParallax();
  initScrollCue();
  initMusicPlayer();
  initToc();
});
