 // Header scroll effect
 window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    const icon = menuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
});

// Close mobile menu when clicking on a link
const links = navLinks.querySelectorAll('a');
links.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        menuBtn.querySelector('i').className = 'fas fa-bars';
    });
});

// Testimonial slider
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    testimonials[index].classList.add('active');
}

nextBtn.addEventListener('click', function() {
    currentTestimonial++;
    if (currentTestimonial >= testimonials.length) {
        currentTestimonial = 0;
    }
    showTestimonial(currentTestimonial);
});

prevBtn.addEventListener('click', function() {
    currentTestimonial--;
    if (currentTestimonial < 0) {
        currentTestimonial = testimonials.length - 1;
    }
    showTestimonial(currentTestimonial);
});

// Auto-advance testimonials
setInterval(() => {
    currentTestimonial++;
    if (currentTestimonial >= testimonials.length) {
        currentTestimonial = 0;
    }
    showTestimonial(currentTestimonial);
}, 8000);

// Portfolio filter
const filterButtons = document.querySelectorAll('.portfolio-filters button');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Here you would typically send the form data to a server
        // For this example, we'll just show a success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Animations on scroll using GSAP and ScrollTrigger
document.addEventListener('DOMContentLoaded', function() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate section titles
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title, 
            { y: 50, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 1,
                scrollTrigger: {
                    trigger: title,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );
    });
    
    // Animate reveal elements
    gsap.utils.toArray('.reveal').forEach(element => {
        gsap.fromTo(element, 
            { y: 100, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 1,
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );
    });
    
    // Animate service cards
    gsap.utils.toArray('.service-card').forEach((card, index) => {
        gsap.fromTo(card, 
            { y: 100, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 0.8,
                delay: index * 0.2,
                scrollTrigger: {
                    trigger: '.services-grid',
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );
    });
    
    // Animate portfolio items
    gsap.utils.toArray('.portfolio-item').forEach((item, index) => {
        gsap.fromTo(item, 
            { y: 100, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 0.8,
                delay: index * 0.15,
                scrollTrigger: {
                    trigger: '.portfolio-grid',
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );
    });
});

// Typed text effect for hero section
const typedText = document.querySelector('.typed-text');
const strings = ['Web Developer', 'UI/UX Designer', 'Frontend Specialist', 'Freelancer'];
let stringIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentString = strings[stringIndex];
    
    if (isDeleting) {
        // Remove character
        typedText.textContent = currentString.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Add character
        typedText.textContent = currentString.substring(0, charIndex + 1);
        charIndex++;
    }
    
    // Speed adjustment
    let typeSpeed = isDeleting ? 80 : 150;
    
    // Switch to next word logic
    if (!isDeleting && charIndex === currentString.length) {
        // Pause at end of word
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        stringIndex++;
        // Reset to first word if at the end of the array
        if (stringIndex >= strings.length) {
            stringIndex = 0;
        }
        // Pause before typing next word
        typeSpeed = 500;
    }
    
    setTimeout(typeEffect, typeSpeed);
}

// Start the typing effect when document is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(typeEffect, 1000);
});

// Code for Dark Theme toggle

 // Dark Mode Toggle
 const themeToggle = document.getElementById('themeToggle');
 const themeIcon = themeToggle.querySelector('i');
 
 // Check for saved theme preference or use device preference
 const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
 
 // Function to set the theme
 function setTheme(isDark) {
     if (isDark) {
         document.body.classList.add('dark-theme');
         themeIcon.className = 'fas fa-sun'; 
         localStorage.setItem('theme', 'dark');
     } else {
         document.body.classList.remove('dark-theme');
         themeIcon.className = 'fas fa-moon';
         localStorage.setItem('theme', 'light');
     }
 }
 
 // Initialize theme based on saved preference or device preference
 function initializeTheme() {
     const savedTheme = localStorage.getItem('theme');
     
     if (savedTheme === 'dark') {
         setTheme(true);
     } else if (savedTheme === 'light') {
         setTheme(false);
     } else {
         // If no saved preference, use device preference
         setTheme(prefersDarkScheme.matches);
     }
 }
 
 // Call this when the page loads
 document.addEventListener('DOMContentLoaded', initializeTheme);
 
 // Toggle theme when button is clicked
 themeToggle.addEventListener('click', () => {
     const isDarkMode = document.body.classList.contains('dark-theme');
     setTheme(!isDarkMode);
 });
 
 // Listen for changes in device color scheme preference
 prefersDarkScheme.addEventListener('change', (e) => {
     // Only auto-switch if the user hasn't set a preference
     if (!localStorage.getItem('theme')) {
         setTheme(e.matches);
     }
 });