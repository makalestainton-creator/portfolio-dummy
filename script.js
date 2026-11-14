const navLinks = document.querySelectorAll("nav a");
const homeLink = document.querySelector(".home-link");
const sections = document.querySelectorAll("section");
const cards = document.querySelectorAll(".project-card");
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav.mobile-nav");

function closeNav() {
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
}

toggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", isOpen);
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeNav);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav.classList.contains("open")) {
    closeNav();
    toggle.focus();
  }
});

// close when clicking outside (the overlay is to the right of the menu)
document.addEventListener("click", (e) => {
  if (!nav.classList.contains("open")) return;
  if (toggle.contains(e.target)) return; // the toggle handles itself

  const { right } = nav.getBoundingClientRect();
  if (e.clientX > right) closeNav();
});

activateLink(homeLink);

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    activateLink(link);
  });
});

document.querySelectorAll(".about-me ul").forEach((ul) => {
  ul.innerHTML += ul.innerHTML;
});

function activateLink(link) {
  navLinks.forEach((lnk) => {
    lnk.classList.remove("active");
  });

  link.classList.add("active");
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;

        const activeLink = document.querySelector(`nav a[href="#${id}"]`);
        if (activeLink) activateLink(activeLink);
      }
    });
  },
  {
    rootMargin: "-50% 0px -50% 0px", // triggers when section crosses viewport center
  },
);

sections.forEach((section) => observer.observe(section));

// Reveal project cards on scroll
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
  );

  cards.forEach((card) => revealObserver.observe(card));
} else {
  cards.forEach((card) => card.classList.add("visible"));
}
