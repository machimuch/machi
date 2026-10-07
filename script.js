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