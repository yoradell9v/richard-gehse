/* ============================================
   MAIN.JS — Shared across all pages
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  // ─── 1. NAV: Scroll solidify ────────────────────────────────────────
  const nav = document.querySelector(".site-nav");

  function updateNav() {
    if (!nav) return;
    if (window.scrollY > 40) {
      nav.classList.add("scrolled");
      nav.classList.remove("nav-transparent");
    } else {
      nav.classList.remove("scrolled");
      // Only go transparent if the page starts with a hero
      if (nav.classList.contains("nav-transparent-init")) {
        nav.classList.add("nav-transparent");
      }
    }
  }

  window.addEventListener("scroll", updateNav, { passive: true });
  updateNav();

  // ─── 2. NAV: Mobile toggle ──────────────────────────────────────────
  const toggle = document.querySelector(".nav-toggle");
  const mobileMenu = document.querySelector(".nav-mobile");

  if (toggle && mobileMenu) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("open");
      mobileMenu.classList.toggle("open");
      document.body.style.overflow = mobileMenu.classList.contains("open")
        ? "hidden"
        : "";
    });

    // Close on link click
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggle.classList.remove("open");
        mobileMenu.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  // ─── 3. NAV: Mark active page ───────────────────────────────────────
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .nav-mobile a").forEach((link) => {
    const linkPath = link.getAttribute("href").split("/").pop();
    if (linkPath === currentPath) {
      link.classList.add("active");
    }
  });

  // ─── 4. SCROLL REVEAL ───────────────────────────────────────────────
  const revealEls = document.querySelectorAll(".reveal");

  if (revealEls.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  // ─── 5. FOOTER: Current year ────────────────────────────────────────
  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
