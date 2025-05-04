document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggleBtn');
    const sideNavbar = document.querySelector('.side-navbar');
    const navLinks = document.querySelectorAll('.nav-items li a');
    const sections = document.querySelectorAll('section[id]');
    
    // Toggle navbar functionality
    if (toggleBtn && sideNavbar) {
        toggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            sideNavbar.classList.toggle('active');
            
            // Change icon based on navbar state
            if (sideNavbar.classList.contains('active')) {
                toggleBtn.innerHTML = '<i class="ri-close-line"></i>';
            } else {
                toggleBtn.innerHTML = '<i class="ri-menu-line"></i>';
            }
        });
        
        // Close navbar when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNavbar = sideNavbar.contains(event.target);
            const isClickOnToggleBtn = toggleBtn.contains(event.target);
            
            if (!isClickInsideNavbar && !isClickOnToggleBtn && sideNavbar.classList.contains('active')) {
                sideNavbar.classList.remove('active');
                toggleBtn.innerHTML = '<i class="ri-menu-line"></i>';
            }
        });
        
        // Close navbar when clicking a link (mobile)
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    sideNavbar.classList.remove('active');
                    toggleBtn.innerHTML = '<i class="ri-menu-line"></i>';
                }
            });
        });
    }
    
    // Carousel functionality
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (slides.length > 0 && indicators.length > 0 && prevBtn && nextBtn) {
        let currentSlide = 0;
        let interval;
        
        // Start the automatic slideshow
        startSlideshow();
        
        // Function to start automatic slideshow
        function startSlideshow() {
            interval = setInterval(() => {
                moveToNextSlide();
            }, 5000); // Change slide every 5 seconds
        }
        
        // Function to stop the slideshow
        function stopSlideshow() {
            clearInterval(interval);
        }
        
        // Function to move to a specific slide
        function moveToSlide(index) {
            // Remove active class from all slides and indicators
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(indicator => indicator.classList.remove('active'));
            
            // Add active class to current slide and indicator
            slides[index].classList.add('active');
            indicators[index].classList.add('active');
            
            currentSlide = index;
        }
        
        // Function to move to the next slide
        function moveToNextSlide() {
            const next = (currentSlide + 1) % slides.length;
            moveToSlide(next);
        }
        
        // Function to move to the previous slide
        function moveToPrevSlide() {
            const prev = (currentSlide - 1 + slides.length) % slides.length;
            moveToSlide(prev);
        }
        
        // Event listeners for manual controls
        prevBtn.addEventListener('click', () => {
            stopSlideshow();
            moveToPrevSlide();
            startSlideshow();
        });
        
        nextBtn.addEventListener('click', () => {
            stopSlideshow();
            moveToNextSlide();
            startSlideshow();
        });
        
        // Event listeners for indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                stopSlideshow();
                moveToSlide(index);
                startSlideshow();
            });
        });
    }
    
    // Verify carousel images loaded correctly
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    carouselImages.forEach((img, index) => {
        img.addEventListener('error', function() {
            console.error(`Error loading image ${index + 1}`);
            // Replace with backup image on error
            img.src = "https://images.pexels.com/photos/260447/pexels-photo-260447.jpeg?auto=compress&cs=tinysrgb&w=1920";
        });
        
        // Force reload if image appears to be missing
        if (!img.complete || img.naturalHeight === 0) {
            img.src = img.src;
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default if it's an anchor link
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                // Get the target section
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Close mobile menu if open
                    if (window.innerWidth <= 768 && sideNavbar.classList.contains('active')) {
                        sideNavbar.classList.remove('active');
                        toggleBtn.innerHTML = '<i class="ri-menu-line"></i>';
                    }
                    
                    // Calculate header offset
                    const offset = 20; // Adjust this value as needed
                    const targetPosition = targetSection.offsetTop - offset;
                    
                    // Scroll to the target section
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Set active class based on scroll position
    function setActiveNavItem() {
        const scrollPosition = window.scrollY;
        
        // Find the current section
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Offset for earlier activation
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (
                scrollPosition >= sectionTop && 
                scrollPosition < sectionTop + sectionHeight
            ) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section link
                const currentLink = document.querySelector(`.nav-items li a[href="#${sectionId}"]`);
                if (currentLink) {
                    currentLink.classList.add('active');
                }
            }
        });
    }
    
    // Initial call to set active nav item
    setActiveNavItem();
    
    // Set active nav item on scroll
    window.addEventListener('scroll', setActiveNavItem);

    // Add Awards tab functionality
    const categoryTabs = document.querySelectorAll('.category-tab');
    const awardCategories = document.querySelectorAll('.awards-category');
    
    if (categoryTabs.length > 0 && awardCategories.length > 0) {
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                categoryTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Get category to show
                const category = this.getAttribute('data-category');
                
                // Hide all award categories
                awardCategories.forEach(cat => cat.classList.remove('active'));
                
                // Show selected category
                document.getElementById(category).classList.add('active');
            });
        });
    }

    // Class button click handlers
    const classButtons = document.querySelectorAll('.class-btn');
    classButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the class name from the card's heading
            const classCard = this.closest('.class-card');
            const className = classCard.querySelector('h3').textContent;
            
            // Show alert for now - in a real site, this would link to a details page
            alert(`You selected the "${className}" class. In a complete website, this would take you to a detailed page about this class.`);
            
            // In production, you would use:
            // window.location.href = `/class-details.html?class=${encodeURIComponent(className)}`;
        });
    });

    // Handle contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const branch = document.getElementById('branch').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to a server
            console.log('Form submitted:', { name, email, phone, branch, message });
            
            // Show success message (for demo purposes)
            alert('Thank you for your message! We will contact you shortly.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Go to top button
    const goToTopBtn = document.getElementById('goToTop');
    
    // Show button when user scrolls down 300px from the top
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            goToTopBtn.classList.add('active');
        } else {
            goToTopBtn.classList.remove('active');
        }
    });
    
    // Scroll to top when button is clicked
    if (goToTopBtn) {
        goToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Update copyright year
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});
