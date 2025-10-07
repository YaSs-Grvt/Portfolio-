
let isAnimationReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let isMobile = window.innerWidth <= 768;
let particles = [];
let matrixChars = [];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);


function toggleMobileNav() {
    const mobileNav = $('#mobile-nav');
    const menuBtn = $('.mobile-menu-btn');
    const body = document.body;
    
    if (mobileNav && menuBtn) {
        const isActive = mobileNav.classList.contains('active');
        
        if (isActive) {
        
            mobileNav.classList.remove('active');
            menuBtn.classList.remove('active');
            body.style.overflow = '';
            
      
            const links = mobileNav.querySelectorAll('.mobile-nav-links .nav-link');
            links.forEach((link, index) => {
                setTimeout(() => {
                    link.style.transform = 'translateX(-100%)';
                    link.style.opacity = '0';
                }, index * 50);
            });
            
        } else {
            mobileNav.classList.add('active');
            menuBtn.classList.add('active');
            body.style.overflow = 'hidden';
            

            setTimeout(() => {
                const links = mobileNav.querySelectorAll('.mobile-nav-links .nav-link');
                links.forEach((link, index) => {
                    setTimeout(() => {
                        link.style.transform = 'translateX(0)';
                        link.style.opacity = '1';
                        link.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                    }, index * 100);
                });
            }, 200);
        }
    }
}


function setupMobileNavClose() {
    document.addEventListener('click', (e) => {
        const mobileNav = $('#mobile-nav');
        const menuBtn = $('.mobile-menu-btn');
        
        if (mobileNav && mobileNav.classList.contains('active')) {
            if (!mobileNav.contains(e.target) && !menuBtn.contains(e.target)) {
                toggleMobileNav();
            }
        }
    });
}


function toggleFlags() {
    const dropdown = $('#flag-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('hidden');
    }
}

function changeLanguage(url) {

    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}


function setupLanguageClose() {
    document.addEventListener('click', (e) => {
        const selector = $('.language-selector');
        const dropdown = $('#flag-dropdown');
        
        if (dropdown && !dropdown.classList.contains('hidden')) {
            if (!selector || !selector.contains(e.target)) {
                dropdown.classList.add('hidden');
            }
        }
    });
}


class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.isRunning = false;
    }
    
    init() {
        if (isAnimationReduced || isMobile) return;
        
        this.createCanvas();
        this.createParticles();
        this.animate();
    }
    
    createCanvas() {
        const container = $('.floating-particles');
        if (!container) return;
        
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        
        container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.resize();
    }
    
    createParticles() {
        const numParticles = isMobile ? 20 : 50;
        
        for (let i = 0; i < numParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.3,
                color: Math.random() > 0.5 ? '#00ff41' : '#e65616'
            });
        }
    }
    
    animate() {
        if (!this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
    
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
    
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.speedX *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.speedY *= -1;
            }
  
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            
 
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = particle.color;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    resize() {
        if (!this.canvas) return;
        
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        

        this.particles = [];
        this.createParticles();
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        this.particles = [];
    }
}


class MatrixRain {
    constructor() {
        this.characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        this.drops = [];
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
    }
    
    init() {
        if (isAnimationReduced) return;
        
        this.createCanvas();
        this.createDrops();
        this.animate();
    }
    
    createCanvas() {
        const container = $('.matrix-rain');
        if (!container) return;
        
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.opacity = '0.1';
        
        container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.resize();
    }
    
    createDrops() {
        const columns = Math.floor(this.canvas.width / 20);
        
        for (let i = 0; i < columns; i++) {
            this.drops.push({
                x: i * 20,
                y: Math.random() * this.canvas.height,
                speed: Math.random() * 3 + 2,
                char: this.getRandomChar()
            });
        }
    }
    
    getRandomChar() {
        return this.characters[Math.floor(Math.random() * this.characters.length)];
    }
    
    animate() {
        if (!this.ctx) return;
        
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#00ff41';
        this.ctx.font = '16px "Fira Code", monospace';
        this.ctx.textAlign = 'left';
        this.ctx.shadowBlur = 5;
        this.ctx.shadowColor = '#00ff41';
        
        this.drops.forEach(drop => {
            this.ctx.fillText(drop.char, drop.x, drop.y);
            
            drop.y += drop.speed;
            
            if (drop.y > this.canvas.height) {
                drop.y = 0;
                drop.char = this.getRandomChar();
            }
            
            if (Math.random() > 0.98) {
                drop.char = this.getRandomChar();
            }
        });
        
        this.ctx.shadowBlur = 0;
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    resize() {
        if (!this.canvas) return;
        
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        

        this.drops = [];
        this.createDrops();
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        this.drops = [];
    }
}


class ScrollAnimations {
    constructor() {
        this.observer = null;
        this.elements = [];
    }
    
    init() {
        if (isAnimationReduced) return;
        
        this.setupObserver();
        this.observeElements();
    }
    
    setupObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '50px 0px',
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);
    }
    
    observeElements() {
        this.elements = document.querySelectorAll('[data-animate]');
        this.elements.forEach(el => {
            if (this.observer) {
                this.observer.observe(el);
            }
        });
    }
    
    animateElement(element) {
        const animationType = element.getAttribute('data-animate');
        const delay = element.getAttribute('data-delay') || '0';
        
        setTimeout(() => {
            element.classList.add('animate-in');
            
            switch (animationType) {
                case 'fadeInUp':
                    this.fadeInUp(element);
                    break;
                case 'fadeInLeft':
                    this.fadeInLeft(element);
                    break;
                case 'fadeInRight':
                    this.fadeInRight(element);
                    break;
                case 'scale':
                    this.scaleIn(element);
                    break;
                default:
                    element.style.opacity = '1';
            }
        }, parseInt(delay));
    }
    
    fadeInUp(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }
    
    fadeInLeft(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        });
    }
    
    fadeInRight(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        });
    }
    
    scaleIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        });
    }
    
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}


class ParallaxEffect {
    constructor() {
        this.elements = [];
        this.isActive = false;
    }
    
    init() {
        if (isMobile || isAnimationReduced) return;
        
        this.elements = document.querySelectorAll('[data-parallax]');
        if (this.elements.length > 0) {
            this.setupScrollListener();
            this.isActive = true;
        }
    }
    
    setupScrollListener() {
        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            
            this.elements.forEach(element => {
                const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick, { passive: true });
    }
}


class PerformanceManager {
    constructor() {
        this.isLowPerformance = false;
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.fps = 60;
    }
    
    init() {
        this.detectPerformance();
        this.optimizeForDevice();
    }
    
    detectPerformance() {

        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        
        this.isLowPerformance = (
            navigator.hardwareConcurrency < 4 ||
            (connection && connection.effectiveType === '2g') ||
            /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        );
    }
    
    optimizeForDevice() {
        if (this.isLowPerformance) {

            document.documentElement.style.setProperty('--animation-duration', '0.2s');
            

            const heavyEffects = document.querySelectorAll('.glitch, [data-parallax]');
            heavyEffects.forEach(el => {
                el.style.animation = 'none';
                el.style.transform = 'none';
            });
        }
    }
    
    monitorFPS() {
        const now = performance.now();
        this.frameCount++;
        
        if (now - this.lastTime >= 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (now - this.lastTime));
            this.frameCount = 0;
            this.lastTime = now;
            
            if (this.fps < 30) {
                this.optimizeForDevice();
            }
        }
        
        requestAnimationFrame(() => this.monitorFPS());
    }
}


class NavigationManager {
    constructor() {
        this.currentPath = window.location.pathname;
    }
    
    init() {
        this.updateActiveStates();
        this.setupSmoothScrolling();
    }
    
    updateActiveStates() {

        const desktopNavItems = document.querySelectorAll('.desktop-nav .nav-item');
        desktopNavItems.forEach(link => {
            const href = link.getAttribute('href');
            if (this.currentPath.includes(href.replace('.html', '')) || 
                (href === 'index.html' && this.currentPath === '/')) {
                link.classList.add('active');
            }
        });
        

        const mobileNavItems = document.querySelectorAll('.mobile-nav-links .nav-link');
        mobileNavItems.forEach(link => {
            const href = link.getAttribute('href');
            if (this.currentPath.includes(href.replace('.html', '')) || 
                (href === 'index.html' && this.currentPath === '/')) {
                link.classList.add('active');
            }
        });
        

        const bottomNavItems = document.querySelectorAll('.mobile-bottom-nav .bottom-nav-item');
        bottomNavItems.forEach(link => {
            const href = link.getAttribute('href');
            if (this.currentPath.includes(href.replace('.html', '')) || 
                (href === 'index.html' && this.currentPath === '/')) {
                link.classList.add('active');
            }
        });
    }
    
    setupSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

class App {
    constructor() {
        this.particleSystem = new ParticleSystem();
        this.matrixRain = new MatrixRain();
        this.scrollAnimations = new ScrollAnimations();
        this.parallax = new ParallaxEffect();
        this.performance = new PerformanceManager();
        this.navigation = new NavigationManager();
        this.isInitialized = false;
    }
    
    init() {
        if (this.isInitialized) return;
        
        try {
            console.log('🚀 Initialisation du site cybersécurité...');
            
           
            this.detectDevice();
         
            this.performance.init();
            this.navigation.init();
            
           
            this.setupEventListeners();
            
           
            if (!isAnimationReduced) {
                this.matrixRain.init();
                this.particleSystem.init();
                this.scrollAnimations.init();
                this.parallax.init();
            }
            
          
            this.finalizeInit();
            
            console.log('✅ Site initialisé avec succès!');
            this.isInitialized = true;
            
        } catch (error) {
            console.error('❌ Erreur lors de l\'initialisation:', error);
            this.fallbackInit();
        }
    }
    
    detectDevice() {
        isMobile = window.innerWidth <= 768;
        isAnimationReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
 
        document.body.classList.toggle('is-mobile', isMobile);
        document.body.classList.toggle('is-desktop', !isMobile);
        document.body.classList.toggle('reduced-motion', isAnimationReduced);
    }
    
    setupEventListeners() {

        setupMobileNavClose();
        setupLanguageClose();
        
 
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        }, { passive: true });
        

        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleResize();
            }, 500);
        });
        
      
        if (!isMobile) {
            this.performance.monitorFPS();
        }
    }
    
    handleResize() {
        const oldIsMobile = isMobile;
        isMobile = window.innerWidth <= 768;
        
        if (oldIsMobile !== isMobile) {
            this.detectDevice();
            
         
            if (!isAnimationReduced) {
                this.matrixRain.resize();
                this.particleSystem.resize();
            }
        }
    }
    
    finalizeInit() {
      
        const loader = $('.loading');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
        
     
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });
        
        
        window.dispatchEvent(new CustomEvent('appInitialized'));
    }
    
    fallbackInit() {
       
        console.log('🔧 Mode de fallback activé');
        
        document.body.classList.add('fallback-mode');
        
        
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
        
      
        setupMobileNavClose();
        setupLanguageClose();
        this.navigation.init();
    }
    
    destroy() {
       
        this.particleSystem.destroy();
        this.matrixRain.destroy();
        this.scrollAnimations.destroy();
        
        this.isInitialized = false;
    }
}


const app = new App();


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      
        setTimeout(() => app.init(), 100);
    });
} else {
    setTimeout(() => app.init(), 100);
}


window.addEventListener('load', () => {
    if (!app.isInitialized) {
        app.init();
    }
});


window.addEventListener('beforeunload', () => {
    app.destroy();
});


window.App = app;
window.toggleMobileNav = toggleMobileNav;
window.toggleFlags = toggleFlags;
window.changeLanguage = changeLanguage;






function toggleProject(element) {
    const isExpanded = element.classList.contains('expanded');
    const allCards = document.querySelectorAll('.project-card');
    
 
    allCards.forEach(card => {
        if (card !== element && card.classList.contains('expanded')) {
            card.classList.remove('expanded');
            const content = card.querySelector('.expanded-content');
            const arrow = card.querySelector('.expand-arrow');
            
            if (content) content.classList.remove('show');
            if (arrow) {
                arrow.style.transform = 'rotate(0deg)';
                arrow.style.color = 'var(--neon-green)';
            }
        }
    });
    
    const content = element.querySelector('.expanded-content');
    const arrow = element.querySelector('.expand-arrow');
    
    if (!isExpanded) {
       
        element.classList.add('expanded');
        
        if (arrow) {
            arrow.style.transform = 'rotate(180deg)';
            arrow.style.color = 'var(--primary-color)';
        }
        
       
        setTimeout(() => {
            if (content) content.classList.add('show');
        }, 150);
        
      
        setTimeout(() => {
            const isMobileView = window.innerWidth <= 768;
            const scrollOffset = isMobileView ? 20 : 80;
            
            const elementRect = element.getBoundingClientRect();
            const scrollTop = window.pageYOffset + elementRect.top - scrollOffset;
            
            window.scrollTo({
                top: scrollTop,
                behavior: 'smooth'
            });
        }, 400);
        
    } else {
        
        element.classList.remove('expanded');
        
        if (arrow) {
            arrow.style.transform = 'rotate(0deg)';
            arrow.style.color = 'var(--neon-green)';
        }
        
        if (content) content.classList.remove('show');
    }
}


class TouchManager {
    constructor() {
        this.startY = 0;
        this.startX = 0;
        this.threshold = 50; 
    }
    
    init() {
        if (!('ontouchstart' in window)) return;
        
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
            card.addEventListener('touchend', this.handleTouchEnd.bind(this, card), { passive: true });
        });
    }
    
    handleTouchStart(e) {
        this.startY = e.touches[0].clientY;
        this.startX = e.touches[0].clientX;
    }
    
    handleTouchEnd(card, e) {
        if (!this.startY || !this.startX) return;
        
        const endY = e.changedTouches[0].clientY;
        const endX = e.changedTouches[0].clientX;
        
        const diffY = Math.abs(this.startY - endY);
        const diffX = Math.abs(this.startX - endX);
        

        if (diffY < this.threshold && diffX < this.threshold) {
            toggleProject(card);
        }
        
        this.startY = 0;
        this.startX = 0;
    }
}


function animateProjectsOnLoad() {
    const projectCards = document.querySelectorAll('.project-card');
    const isMobileView = window.innerWidth <= 768;
    
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = isMobileView ? 'translateY(30px)' : 'translateY(50px)';
        
        const delay = isMobileView ? index * 150 + 300 : index * 200 + 500;
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, delay);
    });
}


function initProjectsTyping() {
    const typingElement = document.querySelector('.projects-subtitle .typing-text');
    if (!typingElement) return;
    
    const text = typingElement.textContent;
    const isMobileView = window.innerWidth <= 768;
    const speed = isMobileView ? 30 : 50; 
    
    typingElement.textContent = '';
    typingElement.style.borderRight = '2px solid var(--neon-green)';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
           
            const blinkSpeed = isMobileView ? 1500 : 1000;
            setInterval(() => {
                typingElement.style.borderColor = 
                    typingElement.style.borderColor === 'transparent' ? 
                    'var(--neon-green)' : 'transparent';
            }, blinkSpeed);
        }
    }
    
    setTimeout(typeWriter, 800);
}


let resizeTimer;
function handleProjectsResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const isMobileView = window.innerWidth <= 768;
        

        const openProjects = document.querySelectorAll('.project-card.expanded');
        openProjects.forEach(card => {
            card.classList.remove('expanded');
            const content = card.querySelector('.expanded-content');
            const arrow = card.querySelector('.expand-arrow');
            
            if (content) content.classList.remove('show');
            if (arrow) {
                arrow.style.transform = 'rotate(0deg)';
                arrow.style.color = 'var(--neon-green)';
            }
        });
        

        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.style.transition = '';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
        
    }, 250);
}


class ProjectsManager {
    constructor() {
        this.touchManager = new TouchManager();
        this.expandedProject = null;
        this.isInitialized = false;
    }
    
    init() {
        if (this.isInitialized) return;
        
        this.setupProjectEvents();
        this.setupKeyboardEvents();
        this.touchManager.init();
        this.setupAccessibility();
        
        this.isInitialized = true;
    }
    
    setupProjectEvents() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
        
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-expanded', 'false');
            card.setAttribute('aria-label', `Projet ${index + 1}: cliquer pour voir les détails`);
            
            
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleProject(card);
                }
            });

            
            card.addEventListener('mouseenter', () => {
                if (!card.classList.contains('expanded')) {
                    card.style.transform = 'translateY(-5px)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (!card.classList.contains('expanded')) {
                    card.style.transform = 'translateY(0)';
                }
            });
        });
    }
    
    setupKeyboardEvents() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.closeAllProjects();
            }
        });
    }
    
    setupAccessibility() {
   
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            const title = card.querySelector('.project-title-section h3');
            const summary = card.querySelector('.project-summary');
            const arrow = card.querySelector('.expand-arrow');
            
            if (title && summary) {
                const titleId = `project-title-${index + 1}`;
                const summaryId = `project-summary-${index + 1}`;
                
                title.setAttribute('id', titleId);
                summary.setAttribute('id', summaryId);
                card.setAttribute('aria-labelledby', titleId);
                card.setAttribute('aria-describedby', summaryId);
            }
            
            if (arrow) {
                arrow.setAttribute('aria-hidden', 'true');
            }
            
      
            const srOnly = document.createElement('span');
            srOnly.className = 'sr-only';
            srOnly.textContent = 'Appuyez sur Entrée ou Espace pour développer';
            card.appendChild(srOnly);
        });
    }
    
    closeAllProjects() {
        const openProjects = document.querySelectorAll('.project-card.expanded');
        openProjects.forEach(card => {
            card.classList.remove('expanded');
            card.setAttribute('aria-expanded', 'false');
            
            const content = card.querySelector('.expanded-content');
            const arrow = card.querySelector('.expand-arrow');
            
            if (content) content.classList.remove('show');
            if (arrow) {
                arrow.style.transform = 'rotate(0deg)';
                arrow.style.color = 'var(--neon-green)';
            }
        });
        
        this.expandedProject = null;
    }
    
    destroy() {
        this.closeAllProjects();
        this.isInitialized = false;
    }
}


document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.projects-section')) {

        setTimeout(() => {
            animateProjectsOnLoad();
            initProjectsTyping();
            
            const projectsManager = new ProjectsManager();
            projectsManager.init();
            
          
            window.addEventListener('resize', handleProjectsResize, { passive: true });
            
        
            if (window.App) {
                window.App.projectsManager = projectsManager;
            }
            
           
            window.projectsManager = projectsManager;
        }, 200);
    }
});


if ('ontouchstart' in window) {
    
    document.addEventListener('touchend', function(e) {
        if (e.target.closest('.project-card')) {
            e.preventDefault();
        }
    }, { passive: false });
    
  
    let ticking = false;
    function updateScrollEffects() {

        ticking = false;
    }
    
    document.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }, { passive: true });
}

window.toggleProject = toggleProject;
window.ProjectsManager = ProjectsManager;

