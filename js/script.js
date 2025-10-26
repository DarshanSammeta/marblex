document.addEventListener('DOMContentLoaded', function () {
  // ===================== 1. MOBILE MENU TOGGLE =====================
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      // Toggle icon
      this.innerHTML = navLinks.classList.contains('active') ? '&times;' : '&#9776;';
    });
  }

  // ===================== 2. MOBILE DROPDOWN TOGGLE =====================
  const navItems = document.querySelectorAll('.nav-item.dropdown');
  if (navItems.length > 0) {
    navItems.forEach(item => {
      item.addEventListener('click', function (e) {
        // Only on mobile (when hamburger is visible)
        if (window.getComputedStyle(menuToggle).display !== 'none') {
          e.preventDefault(); // Prevent link navigation
          const dropdownMenu = this.querySelector('.dropdown-menu');
          if (dropdownMenu) {
            dropdownMenu.classList.toggle('active');
          }
        }
      });
    });
  }

  // ===================== 3. HERO SLIDER (Style 1 - layered images) =====================
  const dots = document.querySelectorAll('.slider-nav-dots .dot');
  const layers = document.querySelectorAll('.layered-images img'); // Adjust selector if needed

  if (dots.length > 0 && layers.length > 0) {
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000;

    function updateSlider(index) {
      currentSlide = index % layers.length;

      // Update active dot
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });

      // Reset all layers
      layers.forEach(layer => {
        layer.style.opacity = '0';
        layer.style.zIndex = '1';
        layer.style.transform = '';
      });

      // Active layer
      const activeLayer = layers[currentSlide];
      activeLayer.style.opacity = '1';
      activeLayer.style.zIndex = '3';
      activeLayer.style.transform = 'translateX(0)';

      // Add trailing layers (optional visual effect)
      for (let j = 1; j <= 2; j++) {
        const layerIndex = (currentSlide + j) % layers.length;
        const trailingLayer = layers[layerIndex];
        if (trailingLayer) {
          trailingLayer.style.opacity = (3 - j) * 0.3; // 0.6, 0.3
          trailingLayer.style.zIndex = (3 - j);
          trailingLayer.style.transform = `translateX(${j * 100}px)`;
        }
      }
    }

    function startSlider() {
      slideInterval = setInterval(() => {
        updateSlider(currentSlide + 1);
      }, slideDuration);
    }

    function resetSlider() {
      clearInterval(slideInterval);
      startSlider();
    }

    // Initialize
    updateSlider(0);
    startSlider();

    // Dot click handlers
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        updateSlider(index);
        resetSlider();
      });
    });
  }

  // ===================== 4. HERO SLIDER (Alternative - .slider-track) =====================
  const sliderTrack = document.querySelector('.slider-track');
  const sliderItems = document.querySelectorAll('.slider-item');
  const navDots = document.querySelectorAll('.dot:not(.slider-nav-dots .dot)'); // Avoid conflict

  if (sliderTrack && sliderItems.length > 1) {
    let current = 0;
    let interval = setInterval(() => {
      current = (current + 1) % sliderItems.length;
      sliderTrack.style.transform = `translateX(-${current * (100 / sliderItems.length)}%)`;

      // Update dots if they exist
      navDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
      });
    }, 5000);

    // Dot click support (if navDots exist)
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

  document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero-section');
    const layeredImages = document.querySelector('.layered-images');
    const images = document.querySelectorAll('.layered-images img');
    const dots = document.querySelectorAll('.dot');

    // Get the source URLs of all images to use for the background
    const imageSources = Array.from(images).map(img => img.src);
    const numSlides = imageSources.length;
    let currentSlide = 0;

    // The hero section's width will be used for the slide offset
    const slideWidth = images[0].offsetWidth; 

    // Function to update the UI (image, dots, and background)
    const updateSlider = (index) => {
        // 1. Image Slide (using transform: translateX)
        const offset = -index * slideWidth;
        layeredImages.style.transform = `translateX(${offset}px)`;

        // 2. Background Change
        // Sets the hero section's background to the URL of the current image
        heroSection.style.backgroundImage = `url('${imageSources[index]}')`;
        
        // 3. Update Dots
        dots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === index) {
                dot.classList.add('active');
            }
        });

        currentSlide = index;
    };

    // Event listeners for dots
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideIndex = parseInt(e.target.dataset.slide);
            updateSlider(slideIndex);
        });
    });

    // Optional: Auto-slide functionality (Uncomment to enable)
    // setInterval(() => {
    //     currentSlide = (currentSlide + 1) % numSlides;
    //     updateSlider(currentSlide);
    // }, 5000); // Change slide every 5 seconds

    // Initial load: Set the first image and background
    updateSlider(0);
});

  // ===================== 5. AUTO-SCROLL SERVICES GRID (Optional) =====================
  const servicesGrid = document.querySelector('.services-grid');
  if (servicesGrid) {
    let scrollPos = 0;
    let direction = 1;
    const speed = 0.5;

    function autoScroll() {
      const maxScroll = servicesGrid.scrollWidth - servicesGrid.clientWidth;
      if (maxScroll <= 0) return;

      scrollPos += speed * direction;
      if (scrollPos >= maxScroll) {
        direction = -1;
      } else if (scrollPos <= 0) {
        direction = 1;
      }

      servicesGrid.scrollLeft = scrollPos;
      requestAnimationFrame(autoScroll);
    }

    // Only auto-scroll if there's overflow
    if (servicesGrid.scrollWidth > servicesGrid.clientWidth) {
      autoScroll();
    }
  }

  // ===================== 6. BOOTSTRAP CAROUSEL (Flooring Gallery) =====================
  const carouselEl = document.querySelector('#flooringGalleryCarousel');
  if (carouselEl && typeof bootstrap !== 'undefined') {
    new bootstrap.Carousel(carouselEl, {
      interval: 3500,
      wrap: true,
      pause: false
    });
  }

  // ===================== 7. NAVBAR SCROLL EFFECT =====================
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
});