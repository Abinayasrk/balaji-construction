(() => {
  const header = document.getElementById("siteHeader");
  const nav = document.getElementById("mainNav");
  const menu = document.getElementById("menuToggle");
  const slides = [...document.querySelectorAll(".slide")];
  const dotsWrap = document.getElementById("dots");
  const count = document.getElementById("currentSlide");
  const prev = document.getElementById("prevSlide");
  const next = document.getElementById("nextSlide");
  let current = 0, timer;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Show hero slide ${i + 1}`);
    dot.addEventListener("click", () => show(i, true));
    dotsWrap.appendChild(dot);
  });
  const dots = [...dotsWrap.children];

  function show(index, manual = false) {
    current = (index + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle("active", i === current));
    dots.forEach((d, i) => d.classList.toggle("active", i === current));
    count.textContent = String(current + 1).padStart(2, "0");
    if (manual) restart();
  }

  function restart() {
    clearInterval(timer);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timer = setInterval(() => show(current + 1), 6500);
    }
  }

  prev.addEventListener("click", () => show(current - 1, true));
  next.addEventListener("click", () => show(current + 1, true));

  menu.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
  }));

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
  }, { passive: true });

  show(0);
  restart();
})();