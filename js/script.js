document.addEventListener("DOMContentLoaded", function () {
  // ===================== 1. MOBILE MENU TOGGLE =====================
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      this.innerHTML = navLinks.classList.contains("active")
        ? "&times;"
        : "&#9776;";
    });
  } // ===================== 2. MOBILE DROPDOWN TOGGLE =====================

  const navItems = document.querySelectorAll(".nav-item.dropdown");
  if (navItems.length > 0) {
    navItems.forEach((item) => {
      const link = item.querySelector(".nav-link");
      const dropdownMenu = item.querySelector(".dropdown-menu");

      if (link && dropdownMenu) {
        link.addEventListener("click", function (e) {
          if (window.getComputedStyle(menuToggle).display !== "none") {
            e.preventDefault();
            e.stopPropagation(); // Close other open dropdowns

            navItems.forEach((i) => {
              if (i !== item) {
                const otherMenu = i.querySelector(".dropdown-menu");
                if (otherMenu) otherMenu.classList.remove("active");
              }
            });

            dropdownMenu.classList.toggle("active");
          }
        });
      }
    });
  } // ===================== 3. CLOSE MENU WHEN LINK CLICKED =====================

  const navLinksAll = document.querySelectorAll(".nav-links a");
  navLinksAll.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.getComputedStyle(menuToggle).display !== "none") {
        navLinks.classList.remove("active");
        menuToggle.innerHTML = "&#9776;";
      }
    });
  }); // ===================== 7. AUTO-SCROLL SERVICES GRID =====================

  const servicesGrid = document.querySelector(".services-grid");
  if (servicesGrid) {
    let scrollPos = 0;
    let direction = 1;
    const speed = 0.5;

    function autoScroll() {
      const maxScroll = servicesGrid.scrollWidth - servicesGrid.clientWidth;
      if (maxScroll <= 0) return;

      scrollPos += speed * direction;
      if (scrollPos >= maxScroll) direction = -1;
      else if (scrollPos <= 0) direction = 1;

      servicesGrid.scrollLeft = scrollPos;
      requestAnimationFrame(autoScroll);
    }

    if (servicesGrid.scrollWidth > servicesGrid.clientWidth) autoScroll();
  } // ===================== 8. BOOTSTRAP CAROUSEL =====================

  const carouselEl = document.querySelector("#flooringGalleryCarousel");
  if (carouselEl && typeof bootstrap !== "undefined") {
    new bootstrap.Carousel(carouselEl, {
      interval: 3500,
      wrap: true,
      pause: false,
    });
  } // ===================== 9. NAVBAR SCROLL EFFECT =====================

  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.style.backgroundColor = "rgba(47, 51, 58, 0.95)";
        navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";
      } else {
        navbar.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
        navbar.style.boxShadow = "none";
      }
    });
  } // ===================== 10. METALLIC MONO CHROME SERIES =====================

  const finishSets = Array.from(document.querySelectorAll(".finish-set"));
  const finishNext = document.querySelector(".finish-next");
  const finishPrev = document.querySelector(".finish-prev");

  if (finishSets.length > 0) {
    let finishIndex = finishSets.findIndex((set) =>
      set.classList.contains("active")
    );
    if (finishIndex === -1) finishIndex = 0;

    function updateFinishSet(i) {
      finishSets.forEach((set, idx) => {
        if (idx === i) {
          set.classList.add("active");
          set.style.display = "flex";
        } else {
          set.classList.remove("active");
          set.style.display = "none";
        }
      });
    }

    updateFinishSet(finishIndex);

    if (finishNext) {
      finishNext.addEventListener("click", function () {
        finishIndex = (finishIndex + 1) % finishSets.length;
        updateFinishSet(finishIndex);
      });
    }

    if (finishPrev) {
      finishPrev.addEventListener("click", function () {
        finishIndex = (finishIndex - 1 + finishSets.length) % finishSets.length;
        updateFinishSet(finishIndex);
      });
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") {
        finishIndex = (finishIndex + 1) % finishSets.length;
        updateFinishSet(finishIndex);
      } else if (e.key === "ArrowLeft") {
        finishIndex = (finishIndex - 1 + finishSets.length) % finishSets.length;
        updateFinishSet(finishIndex);
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const heroSection = document.querySelector(".hero-section");
  const dots = document.querySelectorAll(".slider-nav-dots .dot");
  const layers = document.querySelectorAll(".layered-images img");

  if (!heroSection || dots.length === 0 || layers.length === 0) return;

  let currentSlide = 0;
  const slideDuration = 4000;
  let slideInterval;

  // Reset all slides
  function resetSlides() {
    layers.forEach((layer) => {
      layer.style.transition =
        "opacity 1s ease-in-out, transform 1s ease-in-out";
      layer.style.opacity = "0";
      layer.style.transform = "scale(1.05)";
      layer.style.zIndex = "1";
    });
    dots.forEach((dot) => dot.classList.remove("active"));
  }

  // Show specific slide safely
  function showSlide(index) {
    if (index >= layers.length) index = 0;
    if (index < 0) index = layers.length - 1;

    resetSlides();

    const activeLayer = layers[index];
    if (!activeLayer) return;

    // ✅ Always update background first to avoid blank
    const imgSrc = activeLayer.getAttribute("src");
    if (imgSrc) {
      heroSection.style.backgroundImage = `url('${imgSrc}')`;
      heroSection.style.backgroundRepeat = "no-repeat";
      heroSection.style.backgroundPosition = "center center";
      heroSection.style.backgroundSize = "cover";
      heroSection.style.transition = "background-image 0.6s ease-in-out";
    }

    // ✅ Keep active image visible during transition
    activeLayer.style.opacity = "1";
    activeLayer.style.transform = "scale(1)";
    activeLayer.style.zIndex = "10";

    dots[index].classList.add("active");
    currentSlide = index;
  }

  // Auto slide
  function startAutoSlide() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % layers.length;
      showSlide(currentSlide);
    }, slideDuration);
  }

  // Manual navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      clearInterval(slideInterval);
      showSlide(index);
      startAutoSlide();
    });
  });

  // Initialize
  showSlide(0);
  startAutoSlide();
});

document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero-section");
  const layers = document.querySelectorAll(".layered-images img");
  const dots = document.querySelectorAll(".slider-nav-dots .dot");

  // Backgrounds that match each layered image
  const bgImages = [
    "./imgs/hero-bg2.jpg",
    "./imgs/hero_bg.jpg",
    "./imgs/hero-2.jpg",
  ];

  let currentSlide = 0;

  function showSlide(index) {
    layers.forEach((img, i) => {
      img.classList.toggle("active", i === index);
      img.style.opacity = i === index ? "1" : "0";
      img.style.transition = "opacity 1s ease-in-out";
    });

    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));

    hero.style.transition = "background 1s ease-in-out";
    hero.style.background = `url('${bgImages[index]}') no-repeat center center/cover`;
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      currentSlide = i;
      showSlide(currentSlide);
    });
  });

  // Auto slide every 5 seconds
  setInterval(() => {
    currentSlide = (currentSlide + 1) % layers.length;
    showSlide(currentSlide);
  }, 5000);

  showSlide(currentSlide);
});


document.addEventListener("DOMContentLoaded", () => {
  emailjs.init("YOUR_PUBLIC_KEY"); // 🟡 Replace with your EmailJS public key

  document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.querySelector('input[placeholder="Your Name"]').value;
    const email = document.querySelector('input[placeholder="Your Email"]').value;
    const subject = document.querySelector('input[placeholder="Subject"]').value;
    const phone = document.querySelector('input[placeholder="Phone"]').value;
    const message = document.querySelector('textarea[placeholder="Your Message"]').value;

    // ✅ Send Email via EmailJS
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        from_name: name,
        from_email: email,
        subject: subject,
        phone: phone,
        message: message,
        to_email: "darshanvarma419@gmail.com"
    })
    .then(() => {
        alert("✅ Your message was sent successfully!");
    })
    .catch((err) => {
        console.error(err);
        alert("❌ Failed to send email. Please try again later.");
    });

    // ✅ Send WhatsApp Message (opens automatically)
    const whatsappNumber = "918886450629";
    const whatsappMsg = `New Contact Message:
Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}
Message: ${message}`;
    const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMsg)}`;

    window.open(whatsappURL, "_blank");
  });
});
