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
    
    // Button interaction with smooth effect
    const heroBtn = document.querySelector('.hero-btn');
    heroBtn.addEventListener('click', () => {
        // Add ripple effect
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
        heroBtn.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
        
        // Add your navigation logic here
        console.log('Explore button clicked!');
        // Example: window.location.href = 'explore.html';
    });
    
    // Add CSS for ripple animation dynamically
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
    
    // Smooth scroll reveal for content (optional enhancement)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
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
});
