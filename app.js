(() => {
  "use strict";

  /* ---------- Header shadow on scroll ---------- */
  const header = document.querySelector(".site-header");
  const onScroll = () => {
    if (!header) return;
    header.style.boxShadow = window.scrollY > 12 ? "0 8px 24px rgba(0,0,0,0.18)" : "none";
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Active nav link (top + bottom) based on current page ---------- */
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach((link) => {
    const target = link.getAttribute("data-nav");
    const active = target === path || (target === "index.html" && path === "");
    link.classList.toggle("is-active", active);
  });

  /* ---------- Hero slider ---------- */
  const slides = document.querySelectorAll(".hero-manifest .slide");
  const dotsWrap = document.querySelector(".hero-dots");
  if (slides.length) {
    let current = 0;
    slides.forEach((s, i) => {
      if (dotsWrap) {
        const b = document.createElement("button");
        b.type = "button";
        b.setAttribute("aria-label", `Show slide ${i + 1}`);
        if (i === 0) b.classList.add("is-active");
        b.addEventListener("click", () => show(i));
        dotsWrap.appendChild(b);
      }
    });
    const dots = dotsWrap ? dotsWrap.querySelectorAll("button") : [];
    function show(i) {
      slides[current].classList.remove("is-active");
      dots[current] && dots[current].classList.remove("is-active");
      current = i;
      slides[current].classList.add("is-active");
      dots[current] && dots[current].classList.add("is-active");
    }
    let timer = setInterval(() => show((current + 1) % slides.length), 4800);
    const heroEl = document.querySelector(".hero-manifest");
    if (heroEl) {
      heroEl.addEventListener("pointerenter", () => clearInterval(timer));
      heroEl.addEventListener("pointerleave", () => {
        timer = setInterval(() => show((current + 1) % slides.length), 4800);
      });
    }
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Contact form -> mailto (static site, no backend) ---------- */
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get("name") || "").toString().trim();
      const email = (data.get("email") || "").toString().trim();
      const phone = (data.get("phone") || "").toString().trim();
      const service = (data.get("service") || "").toString().trim();
      const message = (data.get("message") || "").toString().trim();

      const subject = `Website enquiry — ${service || "General"}`;
      const body =
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n` +
        `Service: ${service}\n\n` +
        `${message}`;

      const mailto = `mailto:info@aljibalsabaa.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      window.location.href = mailto;

      const success = document.getElementById("formSuccess");
      if (success) success.classList.add("is-visible");
      form.reset();
    });
  }

  /* ---------- PWA: install prompt ---------- */
  let deferredPrompt = null;
  const installBtns = document.querySelectorAll("[data-install]");
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtns.forEach((b) => b.removeAttribute("hidden"));
  });
  installBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
      installBtns.forEach((b) => b.setAttribute("hidden", ""));
    });
  });
  window.addEventListener("appinstalled", () => {
    installBtns.forEach((b) => b.setAttribute("hidden", ""));
  });

  /* ---------- Toast helper ---------- */
  function showToast(message, opts = {}) {
    let toast = document.querySelector(".toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      toast.innerHTML = `<span class="dot"></span><span class="toast-msg"></span>`;
      document.body.appendChild(toast);
    }
    toast.querySelector(".toast-msg").textContent = message;
    const existingBtn = toast.querySelector("button");
    if (existingBtn) existingBtn.remove();
    if (opts.actionLabel && opts.onAction) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = opts.actionLabel;
      btn.addEventListener("click", () => {
        opts.onAction();
        toast.classList.remove("is-visible");
      });
      toast.appendChild(btn);
    }
    requestAnimationFrame(() => toast.classList.add("is-visible"));
    if (!opts.sticky) {
      setTimeout(() => toast.classList.remove("is-visible"), 4500);
    }
  }

  /* ---------- Online / offline status ---------- */
  window.addEventListener("offline", () =>
    showToast("You're offline — showing saved pages.")
  );
  window.addEventListener("online", () => showToast("Back online."));

  /* ---------- Service worker registration + update flow ---------- */
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          reg.addEventListener("updatefound", () => {
            const newWorker = reg.installing;
            if (!newWorker) return;
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                showToast("New version available.", {
                  actionLabel: "Refresh",
                  sticky: true,
                  onAction: () => {
                    newWorker.postMessage({ type: "SKIP_WAITING" });
                  },
                });
              }
            });
          });
        })
        .catch(() => {
          /* offline-first: registration failure is non-fatal */
        });

      let refreshing = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (refreshing) return;
        refreshing = true;
        window.location.reload();
      });
    });
  }
})();