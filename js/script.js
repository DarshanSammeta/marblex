// Navbar
    document.addEventListener('DOMContentLoaded', function () {
        const toggleButton = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        toggleButton.addEventListener('click', function () {
            // Toggle the 'active' class on the nav-links container
            navLinks.classList.toggle('active');

            // Optional: Change the button icon (e.g., from hamburger to X)
            if (navLinks.classList.contains('active')) {
                toggleButton.innerHTML = '&times;'; // Change to 'X' symbol
            } else {
                toggleButton.innerHTML = '&#9776;'; // Change back to hamburger
            }
        });
    });

// Hero section
    document.addEventListener('DOMContentLoaded', function() {
        const sliderTrack = document.querySelector('.slider-track');
        const sliderItems = document.querySelectorAll('.slider-item');
        const navDots = document.querySelectorAll('.dot');
        const totalSlides = sliderItems.length;
        let currentSlide = 0;

        function updateSlider() {
            // Move the slider track
            sliderTrack.style.transform = `translateX(-${currentSlide * 100 / totalSlides}%)`;

            // Update active dot
            navDots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        }

        // Automatic slide change every 5 seconds
        let slideInterval = setInterval(nextSlide, 5000);

        // Manual navigation via dots
        navDots.forEach(dot => {
            dot.addEventListener('click', function() {
                // Clear the automatic interval when a dot is clicked
                clearInterval(slideInterval);
                
                currentSlide = parseInt(this.dataset.slide);
                updateSlider();

                // Restart the automatic interval after a manual interaction
                slideInterval = setInterval(nextSlide, 5000);
            });
        });

        // Initialize slider on load
        updateSlider();
    });


    document.addEventListener('DOMContentLoaded', function() {
        const heroSection = document.querySelector('.hero-section.hero-style-3');
        
        // Use Intersection Observer to trigger the animation once the section is visible
        const observerOptions = {
            root: null, 
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% of the section is visible
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Start CSS animations by simply letting them run
                    // Since CSS handles the 'forwards' animation, we just need to ensure 
                    // the elements are present in the DOM.
                    // For more control, you could use a class toggle here, but the 
                    // current CSS `forwards` is sufficient for a basic page load/view animation.

                    // If you needed to trigger scroll-based changes, you'd add listeners here.
                    
                    // Unobserve after the first visibility
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        
        // Start observing the entire hero section
        observer.observe(heroSection);
        
        // NOTE: For a working slider/carousel (like the dots suggest), 
        // you would need additional JavaScript logic to handle image switching, 
        // similar to the example in a previous response.
    });

document.addEventListener('DOMContentLoaded', function() {
    // --- 1. Mobile Menu Toggle ---
    const toggleButton = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggleButton && navLinks) {
        toggleButton.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            toggleButton.innerHTML = navLinks.classList.contains('active') ? '&times;' : '&#9776;';
        });
    }

    // --- 2. Auto-Sliding Diagonal Images ---
    const dots = document.querySelectorAll('.slider-nav-dots .dot');
    const layers = document.querySelectorAll('.layered-image');
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000;

    function updateSlider(index) {
        currentSlide = index % layers.length;

        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));

        layers.forEach(layer => {
            layer.classList.remove('active-image');
            layer.style.opacity = '0';
            layer.style.zIndex = '1';
        });

        const activeLayer = layers[currentSlide];
        activeLayer.classList.add('active-image');
        activeLayer.style.opacity = '1';
        activeLayer.style.zIndex = '3';
        activeLayer.style.transform = 'translate(-50%, -50%) translateX(250px) translateY(-50px) scale(1)';

        const positions = [
            { opacity: 0.6, zIndex: 2, transform: 'translate(-50%, -50%) translateX(400px) translateY(-20px) scale(0.8)' },
            { opacity: 0.4, zIndex: 1, transform: 'translate(-50%, -50%) translateX(500px) translateY(10px) scale(0.6)' }
        ];

        for (let j = 0; j < 2; j++) {
            const layerIndex = (currentSlide + j + 1) % layers.length;
            const trailingLayer = layers[layerIndex];
            if (trailingLayer) {
                trailingLayer.style.opacity = positions[j].opacity;
                trailingLayer.style.zIndex = positions[j].zIndex;
                trailingLayer.style.transform = positions[j].transform;
            }
        }
    }

    function startSlider() {
        slideInterval = setInterval(() => {
            const nextSlide = (currentSlide + 1) % layers.length;
            updateSlider(nextSlide);
        }, slideDuration);
    }

    function resetSliderInterval() {
        clearInterval(slideInterval);
        startSlider();
    }

    updateSlider(currentSlide);
    startSlider();

    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const targetSlide = parseInt(this.dataset.slide);
            updateSlider(targetSlide);
            resetSliderInterval();
        });
    });

    // --- 3. Auto-Slide Services Grid ---
    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid) {
        let scrollPos = 0;
        const speed = 1; // pixels per frame

        function autoSlideGrid() {
            scrollPos += speed;
            if (scrollPos >= servicesGrid.scrollWidth - servicesGrid.clientWidth) scrollPos = 0;

            servicesGrid.scrollTo({ left: scrollPos, behavior: 'smooth' });
            requestAnimationFrame(autoSlideGrid);
        }

        autoSlideGrid();
    }
});



// Ensure the carousel explicitly has wrap=true & doesn't pause on hover
  const el = document.querySelector('#flooringGalleryCarousel');
  if (el) {
    // Re-initialize to be safe if the data attributes aren't enough
    const carousel = bootstrap.Carousel.getOrCreateInstance(el, {
      interval: 3500,
      ride: 'carousel',
      wrap: true,
      pause: false
    });
  }