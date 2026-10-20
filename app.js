// ============================================================
// WEDDING DETAILS — single source of truth. Edit here to update
// names, dates, venue, events, or RSVP contacts.
// Anything inside [square brackets] is a placeholder: it shows on the
// page with a dashed underline so it's easy to spot and replace.
// ============================================================
const WEDDING_DETAILS = {
  groom: { firstName: "Kartikayan", fullName: "Kartikayan Sharma", parents: "Mrs. Anita Vashist & Mr. Sushil Kumar Sharma" },
  bride: { firstName: "Surbhi", fullName: "Surbhi Jain", parents: "Mrs. Indu Jain & Mr. Mukesh Jain" },
  blessings: ["Late Smt. Rama Devi & Late Shri Ramesh Chandra Sharma"],
  hosts: ["Mrs. Anita Vashist & Mr. Sushil Kumar Sharma"],
  hostFamily: "The Sharma family",
  weddingDate: "2027-02-20T18:30:00+05:30", // countdown target (pheras)
  calendar: { title: "Kartikayan & Surbhi's Wedding", start: "2027-02-19T17:00:00+05:30", end: "2027-02-20T23:30:00+05:30" },
  venue: {
    name: "La Perle River Resort",
    address: "Village Ladhuachaur, P.O. Dhikuli, Ramnagar, Nainital, Uttarakhand 244715",
    mapLink: "https://www.google.com/maps/search/?api=1&query=La+Perle+River+Resort+Jim+Corbett+Ramnagar"
  },
  hashtag: "#KartikGotSurPrized",
  coupleNote: "Childhood friends and now, forever partners. We are so happy that you will be celebrating with us in Jim Corbett. Your love and blessings mean the world to us, and we can't wait to see you at the celebrations.",
  // Photos shown inside the blue frame (swap in your own pre-wedding photos)
  couplePhotos: ["./assets/art/event-6.avif", "./assets/art/event-3.avif", "./assets/art/event-4.avif"],
  weather: "Jim Corbett in mid-February is pleasantly cool — sunny days around 22-23°C and crisp evenings near 8-9°C. Light woollens are recommended after sundown.",
  parking: "[Parking arrangements at the venue.]",
  instagram: "", // e.g. "https://instagram.com/yourhandle" — if empty, opens the hashtag page
  rsvpLink: "",  // e.g. a Google Form. If empty, RSVP opens WhatsApp to the first contact.
  rsvp: [
    { name: "Kartikayan Sharma", phone: "+919968431431", display: "Kartikayan Sharma | +91 99684 31431" },
    { name: "Surbhi Jain", phone: "+919599230648", display: "Surbhi Jain | +91 95992 30648" }
  ],
  events: [
    {
      title: "Engagement & Sangeet",
      image: "./assets/art/event-4.avif",
      date: "Friday, Feb 19th 2027",
      time: "5:00 PM Onwards",
      venue: "La Perle River Resort, Jim Corbett",
      description: "Sangeet from 5 PM, and engagement at 7 PM.",
    },
    {
      title: "Haldi",
      image: "./assets/art/event-2.avif",
      date: "Saturday, Feb 20th 2027",
      time: "9:00 AM Onwards",
      venue: "La Perle River Resort, Jim Corbett",
      description: "Blessing the couple with turmeric paste, followed by bridal & groom prep.",
    },
    {
      title: "Baraat & Pheras",
      image: "./assets/art/event-5.avif",
      date: "Saturday, Feb 20th 2027",
      time: "2:00 PM Onwards",
      venue: "La Perle River Resort, Jim Corbett",
      description: "Baraat at 2 PM, varmala at 4 PM, sacred pheras at 6:30 PM, followed by wedding dinner.",
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

  const msg = `Hi! Confirming my attendance for ${d.groom.firstName} & ${d.bride.firstName}'s wedding.`;
  $("#rsvpLink").href = d.rsvpLink || `https://wa.me/${d.rsvp[0].phone.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;

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
      <a class="route-link" href="${esc(event.mapLink || d.venue.mapLink)}" target="_blank" rel="noopener noreferrer">See the route</a>
    </article>
  `).join("");
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
// Init
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  // The shareable single-file build ships with this content already filled in
  // (so it shows even where scripts can't run); only render it here otherwise.
  if (!document.documentElement.hasAttribute("data-prerendered")) {
    renderText();
    renderEventCards();
    renderOtherItems();
  }
  initSlides();
  initCountdown();
  initRevealObserver();
  initParallax();
  initScrollCue();
  initMusicPlayer();
});
