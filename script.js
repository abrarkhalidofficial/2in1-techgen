// ==================== DOM Content Loaded ====================
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  initLoader();
  initNavbar();
  initThemeToggle();
  initCustomCursor();
  initScrollProgress();
  initAnimations();
  initTestimonials();
  initCounters();
  initContactForm();
  initSmoothScroll();
});

// ==================== Loader ====================
function initLoader() {
  const loader = document.querySelector(".loader-wrap");

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("loaded");
      document.body.style.overflow = "visible";
    }, 1500);
  });
}

// ==================== Navbar ====================
function initNavbar() {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  if (navbarToggler) {
    navbarToggler.addEventListener("click", () => {
      navbarCollapse.classList.toggle("show");
    });
  }

  // Close mobile menu when clicking on links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navbarCollapse.classList.remove("show");
    });
  });
}

// ==================== Theme Toggle ====================
function initThemeToggle() {
  const themeToggle = document.querySelector(".theme-icon");
  const body = document.body;

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    body.classList.toggle("dark-theme", savedTheme === "dark");
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-theme");

    // Save theme preference
    const isDark = body.classList.contains("dark-theme");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

// ==================== Custom Cursor ====================
function initCustomCursor() {
  const cursorInner = document.querySelector(".cursor-inner");
  const cursorOuter = document.querySelector(".cursor-outer");

  if (!cursorInner || !cursorOuter) return;

  let mouseX = 0;
  let mouseY = 0;
  let outerX = 0;
  let outerY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorInner.style.left = mouseX + "px";
    cursorInner.style.top = mouseY + "px";
    cursorInner.style.visibility = "visible";
    cursorOuter.style.visibility = "visible";
  });

  function animateOuterCursor() {
    outerX += (mouseX - outerX) * 0.1;
    outerY += (mouseY - outerY) * 0.1;

    cursorOuter.style.left = outerX + "px";
    cursorOuter.style.top = outerY + "px";

    requestAnimationFrame(animateOuterCursor);
  }

  animateOuterCursor();

  // Cursor hover effects
  const hoverElements = document.querySelectorAll("a, button, .cursor-pointer");
  hoverElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursorInner.style.width = "16px";
      cursorInner.style.height = "16px";
      cursorOuter.style.width = "60px";
      cursorOuter.style.height = "60px";
    });

    element.addEventListener("mouseleave", () => {
      cursorInner.style.width = "8px";
      cursorInner.style.height = "8px";
      cursorOuter.style.width = "40px";
      cursorOuter.style.height = "40px";
    });
  });
}

// ==================== Scroll Progress ====================
function initScrollProgress() {
  const progressWrap = document.querySelector(".progress-wrap");
  const progressPath = document.querySelector(".progress-wrap path");

  if (!progressWrap || !progressPath) return;

  const pathLength = progressPath.getTotalLength();
  progressPath.style.transition = "none";
  progressPath.style.strokeDasharray = pathLength + " " + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = "stroke-dashoffset 10ms linear";

  const updateProgress = () => {
    const scroll = window.pageYOffset;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = pathLength - (scroll * pathLength) / height;
    progressPath.style.strokeDashoffset = progress;
  };

  updateProgress();

  window.addEventListener("scroll", () => {
    updateProgress();

    if (window.pageYOffset > 150) {
      progressWrap.classList.add("active-progress");
    } else {
      progressWrap.classList.remove("active-progress");
    }
  });

  progressWrap.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ==================== Animations ====================
function initAnimations() {
  const animatedElements = document.querySelectorAll(
    [
      ".animate-card",
      ".animate-slide-right",
      ".animate-slide-left",
      ".animate-fade-up",
      ".animate-scale",
      ".animate-counter",
    ].join(", ")
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}

// ==================== Testimonials ====================
function initTestimonials() {
  const testimonialItems = document.querySelectorAll(".testimonial-item");
  const navButtons = document.querySelectorAll(".nav-btn");
  let currentSlide = 0;

  if (testimonialItems.length === 0) return;

  function showSlide(index) {
    testimonialItems.forEach((item, i) => {
      item.classList.toggle("active", i === index);
    });

    navButtons.forEach((btn, i) => {
      btn.classList.toggle("active", i === index);
    });
  }

  navButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  // Auto-play testimonials
  setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonialItems.length;
    showSlide(currentSlide);
  }, 5000);
}

// ==================== Counters ====================
function initCounters() {
  const counters = document.querySelectorAll(".counter");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = Number.parseInt(counter.getAttribute("data-target"));
          const duration = 2000;
          const increment = target / (duration / 16);
          let current = 0;

          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.textContent = Math.floor(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          };

          updateCounter();
          observer.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}

// ==================== Contact Form ====================
function initContactForm() {
  const form = document.querySelector(".contact-form .form");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = "<span>Sending...</span>";
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
      // Show success message
      showNotification(
        "Message sent successfully! We'll get back to you soon.",
        "success"
      );

      // Reset form
      form.reset();

      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}

// ==================== Smooth Scroll ====================
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// ==================== Utility Functions ====================
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${
              type === "success" ? "check-circle" : "info-circle"
            }"></i>
            <span>${message}</span>
        </div>
    `;

  // Add notification styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#10b981" : "#3b82f6"};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

// ==================== Parallax Effect ====================
window.addEventListener("scroll", () => {
  const parallaxElements = document.querySelectorAll(".parallaxie");
  const scrolled = window.pageYOffset;

  parallaxElements.forEach((element) => {
    const rate = scrolled * -0.5;
    element.style.transform = `translateY(${rate}px)`;
  });
});

// ==================== Resize Handler ====================
window.addEventListener("resize", () => {
  // Recalculate any size-dependent elements
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

// Set initial viewport height
const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);
