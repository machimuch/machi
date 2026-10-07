// =========================
// Gallery reveal on load
// =========================
const galleryItems = document.querySelectorAll(".gallery-card");

window.addEventListener("load", () => {
  galleryItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = "1";

      // Keep the original wave transforms but show smoothly
      if (item.classList.contains("card-left")) {
        item.style.transform = "translateY(40px) rotate(-8deg) scale(1)";
      } else if (item.classList.contains("card-right")) {
        item.style.transform = "translateY(40px) rotate(8deg) scale(1)";
      } else if (index === 1) {
        item.style.transform = "translateY(95px) scale(1)";
      } else if (index === 2) {
        item.style.transform = "translateY(120px) scale(1)";
      } else if (index === 3) {
        item.style.transform = "translateY(105px) scale(1)";
      } else if (index === 4) {
        item.style.transform = "translateY(82px) scale(1)";
      } else {
        item.style.transform = "translateY(0) scale(1)";
      }
    }, index * 120);
  });
});

// =========================
// Counter animation
// =========================
const counters = document.querySelectorAll(".counter");
let counterStarted = false;

function runCounters() {
  if (counterStarted) return;
  counterStarted = true;

  counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");
    const increment = Math.max(1, Math.ceil(target / 60));
    let current = 0;

    function updateCounter() {
      current += increment;

      if (current >= target) {
        current = target;
      }

      if (target === 98) {
        counter.textContent = current + "%";
      } else {
        counter.textContent = current + "+";
      }

      if (current < target) {
        requestAnimationFrame(updateCounter);
      }
    }

    updateCounter();
  });
}

const statsSection = document.querySelector(".statistics");

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      runCounters();
    }
  });
}, { threshold: 0.3 });

if (statsSection) {
  statsObserver.observe(statsSection);
}

// =========================
// Scroll reveal
// =========================
const revealTargets = document.querySelectorAll(
  ".section-title, .about-card, .project, .statistics div, .cta, footer"
);

revealTargets.forEach(el => el.classList.add("reveal"));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));

// =========================
// Clickable image lightbox
// =========================
const lightbox = document.querySelector("#image-lightbox");
const lightboxImage = lightbox?.querySelector(".lightbox-image");
const lightboxCaption = lightbox?.querySelector(".lightbox-caption");
const lightboxClose = lightbox?.querySelector(".lightbox-close");
let lastFocusedElement = null;

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.classList.remove("lightbox-open");
  lastFocusedElement?.focus();
}

document.querySelectorAll(".gallery-card img, .project img, .activity-card img").forEach(image => {
  image.tabIndex = 0;
  image.setAttribute("role", "button");
  image.setAttribute("aria-label", `Perbesar gambar: ${image.alt || "gambar galeri"}`);

  function openLightbox() {
    if (!lightbox || !lightboxImage) return;
    lastFocusedElement = image;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt || "Gambar galeri ukuran penuh";
    if (lightboxCaption) lightboxCaption.textContent = image.alt || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    lightboxClose?.focus();
  }

  image.addEventListener("click", openLightbox);
  image.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox();
    }
  });
});

lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", event => {
  if (event.target === lightbox || event.target === lightboxImage) closeLightbox();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && lightbox?.classList.contains("is-open")) closeLightbox();
});

// =========================
// Responsive navigation menu
// =========================
const navToggle = document.querySelector(".nav-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");

function setNavigationOpen(isOpen) {
  if (!navToggle || !primaryNavigation) return;
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Tutup menu navigasi" : "Buka menu navigasi");
  primaryNavigation.classList.toggle("is-open", isOpen);
}

navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  setNavigationOpen(!isOpen);
});

primaryNavigation?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => setNavigationOpen(false));
});

document.addEventListener("click", event => {
  if (!primaryNavigation?.classList.contains("is-open")) return;
  if (!primaryNavigation.contains(event.target) && !navToggle?.contains(event.target)) {
    setNavigationOpen(false);
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") setNavigationOpen(false);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 860) setNavigationOpen(false);
});
