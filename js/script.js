document.addEventListener('DOMContentLoaded', function () {
  // ===================== 1. MOBILE MENU TOGGLE =====================
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      this.innerHTML = navLinks.classList.contains('active') ? '&times;' : '&#9776;';
    });
  }

  // ===================== 2. MOBILE DROPDOWN TOGGLE =====================
  const navItems = document.querySelectorAll('.nav-item.dropdown');
  if (navItems.length > 0) {
    navItems.forEach(item => {
      const link = item.querySelector('.nav-link');
      const dropdownMenu = item.querySelector('.dropdown-menu');

      if (link && dropdownMenu) {
        link.addEventListener('click', function (e) {
          if (window.getComputedStyle(menuToggle).display !== 'none') {
            e.preventDefault();
            e.stopPropagation();

            // Close other open dropdowns
            navItems.forEach(i => {
              if (i !== item) {
                const otherMenu = i.querySelector('.dropdown-menu');
                if (otherMenu) otherMenu.classList.remove('active');
              }
            });

            dropdownMenu.classList.toggle('active');
          }
        });
      }
    });
  }

  // ===================== 3. CLOSE MENU WHEN LINK CLICKED =====================
  const navLinksAll = document.querySelectorAll('.nav-links a');
  navLinksAll.forEach(link => {
    link.addEventListener('click', function () {
      if (window.getComputedStyle(menuToggle).display !== 'none') {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '&#9776;';
      }
    });
  });

  // ===================== 4. HERO SLIDER (Style 1 - layered images) =====================
  const dots = document.querySelectorAll('.slider-nav-dots .dot');
  const layers = document.querySelectorAll('.layered-images img');

  if (dots.length > 0 && layers.length > 0) {
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000;

    function updateSlider(index) {
      currentSlide = index % layers.length;

      dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
      layers.forEach(layer => {
        layer.style.opacity = '0';
        layer.style.zIndex = '1';
        layer.style.transform = '';
      });

      const activeLayer = layers[currentSlide];
      activeLayer.style.opacity = '1';
      activeLayer.style.zIndex = '3';
      activeLayer.style.transform = 'translateX(0)';

      for (let j = 1; j <= 2; j++) {
        const layerIndex = (currentSlide + j) % layers.length;
        const trailingLayer = layers[layerIndex];
        if (trailingLayer) {
          trailingLayer.style.opacity = (3 - j) * 0.3;
          trailingLayer.style.zIndex = (3 - j);
          trailingLayer.style.transform = `translateX(${j * 100}px)`;
        }
      }
    }

    function startSlider() {
      slideInterval = setInterval(() => updateSlider(currentSlide + 1), slideDuration);
    }

    function resetSlider() {
      clearInterval(slideInterval);
      startSlider();
    }

    updateSlider(0);
    startSlider();

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        updateSlider(index);
        resetSlider();
      });
    });
  }

  // ===================== 5. HERO SLIDER (Alternative - .slider-track) =====================
  const sliderTrack = document.querySelector('.slider-track');
  const sliderItems = document.querySelectorAll('.slider-item');
  const navDots = document.querySelectorAll('.dot:not(.slider-nav-dots .dot)');

  if (sliderTrack && sliderItems.length > 1) {
    let current = 0;
    let interval = setInterval(() => {
      current = (current + 1) % sliderItems.length;
      sliderTrack.style.transform = `translateX(-${current * (100 / sliderItems.length)}%)`;
      navDots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    }, 5000);

    navDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(interval);
        current = i;
        sliderTrack.style.transform = `translateX(-${current * (100 / sliderItems.length)}%)`;
        navDots.forEach((d, idx) => d.classList.toggle('active', idx === current));
        interval = setInterval(() => {
          current = (current + 1) % sliderItems.length;
          sliderTrack.style.transform = `translateX(-${current * (100 / sliderItems.length)}%)`;
        }, 5000);
      });
    });
  }

  // ===================== 6. HERO BACKGROUND IMAGE CHANGE =====================
  const heroSection = document.querySelector('.hero-section');
  const layeredImages = document.querySelector('.layered-images');
  const images = document.querySelectorAll('.layered-images img');
  const dots2 = document.querySelectorAll('.dot');

  if (heroSection && layeredImages && images.length > 0) {
    const imageSources = Array.from(images).map(img => img.src);
    let currentSlide = 0;
    const slideWidth = images[0].offsetWidth;

    const updateSlider = (index) => {
      const offset = -index * slideWidth;
      layeredImages.style.transform = `translateX(${offset}px)`;
      heroSection.style.backgroundImage = `url('${imageSources[index]}')`;

      dots2.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });

      currentSlide = index;
    };

    dots2.forEach(dot => {
      dot.addEventListener('click', e => {
        const slideIndex = parseInt(e.target.dataset.slide);
        updateSlider(slideIndex);
      });
    });

    updateSlider(0);
  }

  // ===================== 7. AUTO-SCROLL SERVICES GRID =====================
  const servicesGrid = document.querySelector('.services-grid');
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
  }

  // ===================== 8. BOOTSTRAP CAROUSEL =====================
  const carouselEl = document.querySelector('#flooringGalleryCarousel');
  if (carouselEl && typeof bootstrap !== 'undefined') {
    new bootstrap.Carousel(carouselEl, {
      interval: 3500,
      wrap: true,
      pause: false
    });
  }

  // ===================== 9. NAVBAR SCROLL EFFECT =====================
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(47, 51, 58, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
      } else {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
        navbar.style.boxShadow = 'none';
      }
    });
  }

  // ===================== 10. METALLIC MONO CHROME SERIES =====================
  const finishSets = Array.from(document.querySelectorAll('.finish-set'));
  const finishNext = document.querySelector('.finish-next');
  const finishPrev = document.querySelector('.finish-prev');

  if (finishSets.length > 0) {
    let finishIndex = finishSets.findIndex(set => set.classList.contains('active'));
    if (finishIndex === -1) finishIndex = 0;

    function updateFinishSet(i) {
      finishSets.forEach((set, idx) => {
        if (idx === i) {
          set.classList.add('active');
          set.style.display = "flex";
        } else {
          set.classList.remove('active');
          set.style.display = "none";
        }
      });
    }

    updateFinishSet(finishIndex);

    if (finishNext) {
      finishNext.addEventListener('click', function () {
        finishIndex = (finishIndex + 1) % finishSets.length;
        updateFinishSet(finishIndex);
      });
    }

    if (finishPrev) {
      finishPrev.addEventListener('click', function () {
        finishIndex = (finishIndex - 1 + finishSets.length) % finishSets.length;
        updateFinishSet(finishIndex);
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') {
        finishIndex = (finishIndex + 1) % finishSets.length;
        updateFinishSet(finishIndex);
      } else if (e.key === 'ArrowLeft') {
        finishIndex = (finishIndex - 1 + finishSets.length) % finishSets.length;
        updateFinishSet(finishIndex);
      }
    });
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero-section");
  const layers = document.querySelectorAll(".layered-images img");
  const dots = document.querySelectorAll(".slider-nav-dots .dot");

  // Backgrounds that match each layered image
  const bgImages = [
    "./imgs/hero-bg2.jpg",
    "./imgs/hero_bg.jpg",
    "./imgs/hero-2.jpg"
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
