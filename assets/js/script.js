// Slider functionality
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.nav-dot');
let currentSlide = 0;
let isAnimating = false;

function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    if (isAnimating) return;
    isAnimating = true;
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
    setTimeout(() => {
        isAnimating = false;
    }, 500);
}

function previousSlide() {
    if (isAnimating) return;
    isAnimating = true;
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
    setTimeout(() => {
        isAnimating = false;
    }, 500);
}

// Event listeners for dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (isAnimating || currentSlide === index) return;
        isAnimating = true;
        currentSlide = index;
        updateSlider();
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    });
});

// Touch events for mobile swipe
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const difference = touchStartX - touchEndX;
    
    if (Math.abs(difference) < swipeThreshold) return;
    
    if (difference > 0) {
        nextSlide();
    } else {
        previousSlide();
    }
}

// Automatic slider
let sliderInterval = setInterval(nextSlide, 5000);

// Pause automatic sliding when user interacts
slider.addEventListener('mouseenter', () => {
    clearInterval(sliderInterval);
});

slider.addEventListener('mouseleave', () => {
    sliderInterval = setInterval(nextSlide, 5000);
});

// Add smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Modal functionality for admin login (if needed)
const adminBtn = document.querySelector('.btn-admin');
if (adminBtn) {
    adminBtn.addEventListener('click', () => {
        // Add your admin login modal functionality here
        console.log('Admin login clicked');
    });
}

// Guest button functionality (if needed)
const guestBtn = document.querySelector('.btn-guest');
if (guestBtn) {
    guestBtn.addEventListener('click', () => {
        // Add your guest button functionality here
        console.log('Guest button clicked');
    });
}