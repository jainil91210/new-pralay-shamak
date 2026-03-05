// Professional Image Slider with Smooth Fade Effect
class ImageSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.currentSlide = 0;
        this.slideInterval = null;
        this.intervalTime = 3500;
        this.isTransitioning = false;
        
        this.init();
    }
    
    init() {
        this.startAutoSlide();
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                this.nextSlide();
            } else if (e.key === 'ArrowLeft') {
                this.prevSlide();
            }
        });
    }
    
    goToSlide(slideIndex) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        
        // Remove active class from current slide
        this.slides[this.currentSlide].classList.remove('active');
        
        // Update current slide index
        this.currentSlide = slideIndex;
        
        // Add active class to new slide with slight delay for smooth transition
        setTimeout(() => {
            this.slides[this.currentSlide].classList.add('active');
        }, 50);
        
        // Allow transitions again after animation completes
        setTimeout(() => {
            this.isTransitioning = false;
        }, 1500);
    }
    
    nextSlide() {
        let nextIndex = this.currentSlide + 1;
        if (nextIndex >= this.slides.length) {
            nextIndex = 0;
        }
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        let prevIndex = this.currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = this.slides.length - 1;
        }
        this.goToSlide(prevIndex);
    }

    startAutoSlide() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, this.intervalTime);
    }
    
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize image slider
    const slider = new ImageSlider();
    
    // Handle Explore Now button with fire transition
    const exploreBtn = document.querySelector('a.hero-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            triggerFireTransition(exploreBtn.href);
        });
    }
    
    // Handle ripple effect for Contact Us button
    const contactBtn = document.querySelector('.collaborate-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                width: 20px;
                height: 20px;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
            `;
            contactBtn.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    }
    
    // Add CSS for animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleEffect {
            to {
                transform: translate(-50%, -50%) scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Fire Strike Transition Function
function triggerFireTransition(targetUrl) {
    const fireOverlay = document.getElementById('fireStrike');
    
    if (!fireOverlay) {
        // If on project details page, just navigate
        window.location.href = targetUrl;
        return;
    }
    
    // Trigger fire animation
    fireOverlay.style.animation = 'fireStrikeAnimation 1.8s ease-out forwards';
    
    // Navigate after fire animation completes
    setTimeout(() => {
        window.location.href = targetUrl;
    }, 1800);
}

// Preload images for smoother transitions
const images = [
    'https://i.ibb.co/q3835vZs/image.png',
    'https://i.ibb.co/d0rsbGFS/image.png',
    'https://i.ibb.co/zYXfdCs/image.png',
    'https://i.ibb.co/jZ6yLykZ/image.png',
    'https://i.ibb.co/nqJLbmYz/image.png'
];

images.forEach(src => {
    const img = new Image();
    img.src = src;
});
