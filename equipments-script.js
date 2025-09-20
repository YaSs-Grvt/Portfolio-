// Variables globales optimisées
let isAnimationReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let isMobile = window.innerWidth <= 768;
let isTablet = window.innerWidth <= 1199;
let currentModal = null;
let animationFrameId = null;

// Utilitaires performants
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Cache pour les éléments DOM fréquemment utilisés
const DOMCache = {
  body: document.body,
  mobileNav: null,
  menuBtn: null,
  modals: new Map(),
  equipmentCards: null,
  statCards: null,
  
  init() {
    this.mobileNav = $('#mobile-nav');
    this.menuBtn = $('.mobile-menu-btn');
    this.equipmentCards = $$('.equipment-card');
    this.statCards = $$('.stat-card');
    
    // Cache toutes les modals
    $$('.modal').forEach(modal => {
      this.modals.set(modal.id, modal);
    });
  }
};

// Système de navigation mobile ultra-fluide
class MobileNavigation {
  constructor() {
    this.isOpen = false;
    this.touchStartY = 0;
    this.touchEndY = 0;
  }
  
  init() {
    this.setupEventListeners();
    this.setupTouchGestures();
  }
  
  setupEventListeners() {
    // Clic sur le bouton menu
    if (DOMCache.menuBtn) {
      DOMCache.menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
      });
    }
    
    // Clic à l'extérieur pour fermer
    document.addEventListener('click', (e) => {
      if (this.isOpen && !DOMCache.mobileNav?.contains(e.target) && !DOMCache.menuBtn?.contains(e.target)) {
        this.close();
      }
    });
    
    // Touche Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }
  
  setupTouchGestures() {
    if (!DOMCache.mobileNav) return;
    
    DOMCache.mobileNav.addEventListener('touchstart', (e) => {
      this.touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    DOMCache.mobileNav.addEventListener('touchend', (e) => {
      this.touchEndY = e.changedTouches[0].clientY;
      this.handleSwipe();
    }, { passive: true });
  }
  
  handleSwipe() {
    const swipeDistance = this.touchStartY - this.touchEndY;
    const minSwipeDistance = 50;
    
    // Swipe vers le haut pour fermer
    if (swipeDistance > minSwipeDistance) {
      this.close();
    }
  }
  
  toggle() {
    this.isOpen ? this.close() : this.open();
  }
  
  open() {
    if (!DOMCache.mobileNav || !DOMCache.menuBtn) return;
    
    this.isOpen = true;
    DOMCache.mobileNav.classList.add('active');
    DOMCache.menuBtn.classList.add('active');
    DOMCache.body.style.overflow = 'hidden';
    
    // Animation des liens avec délai
    this.animateNavLinks(true);
  }
  
  close() {
    if (!DOMCache.mobileNav || !DOMCache.menuBtn) return;
    
    this.isOpen = false;
    this.animateNavLinks(false);
    
    setTimeout(() => {
      DOMCache.mobileNav.classList.remove('active');
      DOMCache.menuBtn.classList.remove('active');
      DOMCache.body.style.overflow = '';
    }, 200);
  }
  
  animateNavLinks(show) {
    const links = $$('.mobile-nav-links .nav-link');
    
    links.forEach((link, index) => {
      setTimeout(() => {
        if (show) {
          link.style.transform = 'translateX(0)';
          link.style.opacity = '1';
        } else {
          link.style.transform = 'translateX(-100%)';
          link.style.opacity = '0';
        }
      }, index * (show ? 100 : 50));
    });
  }
}

// Système de modals ultra-performant
class ModalSystem {
  constructor() {
    this.activeModal = null;
    this.scrollPosition = 0;
  }
  
  init() {
    this.setupEventListeners();
    this.setupKeyboardNavigation();
  }
  
  setupEventListeners() {
    // Clic à l'extérieur pour fermer
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        this.close();
      }
    });
    
    // Boutons de fermeture
    $$('.modal-close').forEach(btn => {
      btn.addEventListener('click', () => {
        this.close();
      });
    });
  }
  
  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (!this.activeModal) return;
      
      switch (e.key) {
        case 'Escape':
          this.close();
          break;
        case 'Tab':
          this.handleTabNavigation(e);
          break;
      }
    });
  }
  
  handleTabNavigation(e) {
    const focusableElements = this.activeModal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  }
  
  open(modalId) {
    const modal = DOMCache.modals.get(`modal-${modalId}`);
    if (!modal) {
      console.error(`Modal ${modalId} not found`);
      return;
    }
    
    // Fermer la modal active si elle existe
    if (this.activeModal) {
      this.close();
    }
    
    this.activeModal = modal;
    this.scrollPosition = window.pageYOffset;
    
    // Bloquer le scroll du body
    DOMCache.body.style.overflow = 'hidden';
    DOMCache.body.style.position = 'fixed';
    DOMCache.body.style.top = `-${this.scrollPosition}px`;
    DOMCache.body.style.width = '100%';
    
    // Afficher la modal
    modal.style.display = 'block';
    
    // Focus sur le premier élément focusable
    setTimeout(() => {
      const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }, 100);
    
    // Analytics (optionnel)
    this.trackModalView(modalId);
  }
  
  close() {
    if (!this.activeModal) return;
    
    const modal = this.activeModal;
    this.activeModal = null;
    
    // Animation de fermeture
    modal.style.animation = 'fadeOut 0.3s ease forwards';
    
    setTimeout(() => {
      modal.style.display = 'none';
      modal.style.animation = '';
      
      // Restaurer le scroll du body
      DOMCache.body.style.overflow = '';
      DOMCache.body.style.position = '';
      DOMCache.body.style.top = '';
      DOMCache.body.style.width = '';
      window.scrollTo(0, this.scrollPosition);
    }, 300);
  }
  
  trackModalView(modalId) {
    // Tracking pour analytics (remplacer par votre système)
    console.log(`Modal viewed: ${modalId}`);
    
    // Exemple avec Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'modal_view', {
        'modal_id': modalId,
        'event_category': 'engagement'
      });
    }
  }
}

// Système d'effets visuels optimisé
class VisualEffectsSystem {
  constructor() {
    this.matrixRain = null;
    this.particleSystem = null;
    this.isRunning = false;
  }
  
  init() {
    if (isAnimationReduced) return;
    
    this.createMatrixRain();
    this.createParticleSystem();
    this.startAnimationLoop();
  }
  
  createMatrixRain() {
    const container = $('.matrix-rain');
    if (!container) return;
    
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    `;
    
    container.appendChild(canvas);
    this.matrixRain = new MatrixRainEffect(canvas);
  }
  
  createParticleSystem() {
    const container = $('.floating-particles');
    if (!container) return;
    
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    `;
    
    container.appendChild(canvas);
    this.particleSystem = new ParticleSystem(canvas);
  }
  
  startAnimationLoop() {
    if (this.isRunning) return;
    this.isRunning = true;
    
    const animate = () => {
      if (!this.isRunning) return;
      
      if (this.matrixRain) this.matrixRain.update();
      if (this.particleSystem) this.particleSystem.update();
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
  }
  
  destroy() {
    this.isRunning = false;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    
    if (this.matrixRain) this.matrixRain.destroy();
    if (this.particleSystem) this.particleSystem.destroy();
  }
}

// Classe pour l'effet Matrix Rain
class MatrixRainEffect {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    this.drops = [];
    this.fontSize = 14;
    
    this.resize();
    this.init();
    
    window.addEventListener('resize', () => this.resize());
  }
  
  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
    
    // Recalculer les gouttes
    this.drops = [];
    this.init();
  }
  
  init() {
    const columns = Math.floor(this.canvas.width / this.fontSize);
    
    for (let i = 0; i < columns; i++) {
      this.drops.push({
        x: i * this.fontSize,
        y: Math.random() * this.canvas.height,
        speed: Math.random() * 2 + 1,
        char: this.getRandomChar()
      });
    }
  }
  
  getRandomChar() {
    return this.characters[Math.floor(Math.random() * this.characters.length)];
  }
  
  update() {
    // Fond semi-transparent pour effet de traînée
    this.ctx.shadowBlur = 0;
  }
  
  destroy() {
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

// Classe pour le système de particules
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.particleCount = isMobile ? 15 : 30;
    
    this.resize();
    this.init();
    
    window.addEventListener('resize', () => this.resize());
  }
  
  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }
  
  init() {
    this.particles = [];
    
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        color: Math.random() > 0.5 ? '#00ff41' : '#e65616',
        pulse: Math.random() * Math.PI * 2
      });
    }
  }
  
  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      // Mise à jour position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      particle.pulse += 0.02;
      
      // Rebond sur les bords
      if (particle.x < 0 || particle.x > this.canvas.width) {
        particle.speedX *= -1;
      }
      if (particle.y < 0 || particle.y > this.canvas.height) {
        particle.speedY *= -1;
      }
      
      // Contraindre dans les limites
      particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
      particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
      
      // Effet de pulsation
      const pulseSize = particle.size + Math.sin(particle.pulse) * 0.5;
      const pulseOpacity = particle.opacity + Math.sin(particle.pulse) * 0.2;
      
      // Dessiner la particule
      this.ctx.globalAlpha = pulseOpacity;
      this.ctx.fillStyle = particle.color;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = particle.color;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    });
  }
  
  destroy() {
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

// Système d'animations au scroll
class ScrollAnimationSystem {
  constructor() {
    this.observer = null;
    this.animatedElements = new Set();
  }
  
  init() {
    if (isAnimationReduced) return;
    
    this.setupIntersectionObserver();
    this.observeElements();
  }
  
  setupIntersectionObserver() {
    const options = {
      threshold: [0.1, 0.5],
      rootMargin: '50px 0px',
    };
    
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
          this.animateElement(entry.target);
          this.animatedElements.add(entry.target);
        }
      });
    }, options);
  }
  
  observeElements() {
    const elements = $('[data-animate]');
    elements.forEach(el => {
      if (this.observer) {
        this.observer.observe(el);
      }
    });
  }
  
  animateElement(element) {
    const delay = parseInt(element.getAttribute('data-delay')) || 0;
    
    setTimeout(() => {
      element.classList.add('animate-in');
    }, delay);
  }
  
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Système de gestion des langues
class LanguageSystem {
  constructor() {
    this.currentLang = 'fr';
    this.dropdown = null;
  }
  
  init() {
    this.dropdown = $('#flag-dropdown');
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    // Clic sur le bouton langue
    const langBtn = $('.lang-btn');
    if (langBtn) {
      langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleDropdown();
      });
    }
    
    // Fermer dropdown en cliquant ailleurs
    document.addEventListener('click', () => {
      this.closeDropdown();
    });
  }
  
  toggleDropdown() {
    if (!this.dropdown) return;
    
    this.dropdown.classList.toggle('hidden');
  }
  
  closeDropdown() {
    if (this.dropdown && !this.dropdown.classList.contains('hidden')) {
      this.dropdown.classList.add('hidden');
    }
  }
  
  changeLanguage(url) {
    // Animation de transition
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
      window.location.href = url;
    }, 300);
  }
}

// Gestionnaire de performance optimisé
class PerformanceManager {
  constructor() {
    this.isLowPerformance = false;
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.fps = 60;
    this.fpsHistory = [];
  }
  
  init() {
    this.detectPerformance();
    this.optimizeForDevice();
    
    if (!isMobile) {
      this.startFPSMonitoring();
    }
  }
  
  detectPerformance() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    this.isLowPerformance = (
      navigator.hardwareConcurrency < 4 ||
      (connection && ['slow-2g', '2g', '3g'].includes(connection.effectiveType)) ||
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    );
  }
  
  optimizeForDevice() {
    if (this.isLowPerformance) {
      // Réduire les animations
      document.documentElement.style.setProperty('--animation-duration', '0.2s');
      
      // Désactiver certains effets
      const heavyEffects = $('.glitch, [data-parallax]');
      heavyEffects.forEach(el => {
        el.style.animation = 'none';
        el.style.transform = 'none';
      });
      
      console.log('Performance optimization applied');
    }
  }
  
  startFPSMonitoring() {
    const monitor = () => {
      const now = performance.now();
      this.frameCount++;
      
      if (now - this.lastTime >= 1000) {
        this.fps = Math.round((this.frameCount * 1000) / (now - this.lastTime));
        this.fpsHistory.push(this.fps);
        
        // Garder seulement les 10 dernières mesures
        if (this.fpsHistory.length > 10) {
          this.fpsHistory.shift();
        }
        
        // Optimiser si FPS bas de manière consistante
        const avgFPS = this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length;
        if (avgFPS < 30 && this.fpsHistory.length >= 5) {
          this.applyPerformanceOptimizations();
        }
        
        this.frameCount = 0;
        this.lastTime = now;
      }
      
      requestAnimationFrame(monitor);
    };
    
    monitor();
  }
  
  applyPerformanceOptimizations() {
    console.log('Applying emergency performance optimizations');
    
    // Réduire la qualité des effets
    const matrixContainer = $('.matrix-rain canvas');
    if (matrixContainer) {
      matrixContainer.style.opacity = '0.03';
    }
    
    // Réduire le nombre de particules
    const particleContainer = $('.floating-particles canvas');
    if (particleContainer) {
      particleContainer.style.display = 'none';
    }
  }
}

// Gestionnaire d'accessibilité
class AccessibilityManager {
  constructor() {
    this.announcer = null;
  }
  
  init() {
    this.createScreenReaderAnnouncer();
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
  }
  
  createScreenReaderAnnouncer() {
    this.announcer = document.createElement('div');
    this.announcer.setAttribute('aria-live', 'polite');
    this.announcer.setAttribute('aria-atomic', 'true');
    this.announcer.style.cssText = `
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    `;
    document.body.appendChild(this.announcer);
  }
  
  announce(message) {
    if (this.announcer) {
      this.announcer.textContent = message;
    }
  }
  
  setupKeyboardNavigation() {
    // Navigation par Tab améliorée
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });
    
    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }
  
  setupFocusManagement() {
    // Améliorer la visibilité du focus
    const style = document.createElement('style');
    style.textContent = `
      .keyboard-navigation *:focus {
        outline: 2px solid var(--neon-green) !important;
        outline-offset: 2px !important;
      }
    `;
    document.head.appendChild(style);
  }
}

// Application principale
class EquipmentApp {
  constructor() {
    this.mobileNav = new MobileNavigation();
    this.modalSystem = new ModalSystem();
    this.visualEffects = new VisualEffectsSystem();
    this.scrollAnimations = new ScrollAnimationSystem();
    this.languageSystem = new LanguageSystem();
    this.performance = new PerformanceManager();
    this.accessibility = new AccessibilityManager();
    this.isInitialized = false;
  }
  
  async init() {
    if (this.isInitialized) return;
    
    try {
      console.log('🚀 Initialisation de la page équipements...');
      
      // Initialiser le cache DOM
      DOMCache.init();
      
      // Détecter les capacités de l'appareil
      this.detectDevice();
      
      // Initialiser les gestionnaires
      this.performance.init();
      this.accessibility.init();
      this.languageSystem.init();
      this.mobileNav.init();
      this.modalSystem.init();
      
      // Initialiser les animations (si supportées)
      if (!isAnimationReduced) {
        this.visualEffects.init();
        this.scrollAnimations.init();
        this.setupParallax();
      }
      
      // Configurer les événements
      this.setupEventListeners();
      
      // Animer l'entrée des éléments
      this.animateInitialElements();
      
      // Finaliser
      this.finalizeInit();
      
      console.log('✅ Page équipements initialisée avec succès!');
      this.isInitialized = true;
      
    } catch (error) {
      console.error('❌ Erreur lors de l\'initialisation:', error);
      this.fallbackInit();
    }
  }
  
  detectDevice() {
    const oldIsMobile = isMobile;
    const oldIsTablet = isTablet;
    
    isMobile = window.innerWidth <= 768;
    isTablet = window.innerWidth <= 1199;
    isAnimationReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Ajouter des classes CSS basées sur le device
    document.body.classList.toggle('is-mobile', isMobile);
    document.body.classList.toggle('is-tablet', isTablet && !isMobile);
    document.body.classList.toggle('is-desktop', !isTablet);
    document.body.classList.toggle('reduced-motion', isAnimationReduced);
    
    // Log changement de device
    if (oldIsMobile !== isMobile || oldIsTablet !== isTablet) {
      console.log(`Device changed: Mobile(${isMobile}) Tablet(${isTablet})`);
    }
  }
  
  setupEventListeners() {
    // Redimensionnement avec debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.handleResize();
      }, 250);
    }, { passive: true });
    
    // Changement d'orientation
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.handleResize();
      }, 500);
    });
    
    // Gestion de la visibilité de la page
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseAnimations();
      } else {
        this.resumeAnimations();
      }
    });
  }
  
  setupParallax() {
    if (isMobile || isTablet) return;
    
    let ticking = false;
    
    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = $('[data-parallax]');
      
      parallaxElements.forEach(element => {
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
  
  animateInitialElements() {
    // Animer les stat cards avec délai
    DOMCache.statCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 500 + index * 200);
    });
    
    // Animer les equipment cards
    DOMCache.equipmentCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
      }, 800 + index * 150);
    });
  }
  
  handleResize() {
    this.detectDevice();
    
    // Recalculer les effets visuels
    if (this.visualEffects && this.visualEffects.matrixRain) {
      this.visualEffects.matrixRain.resize();
    }
    if (this.visualEffects && this.visualEffects.particleSystem) {
      this.visualEffects.particleSystem.resize();
    }
  }
  
  pauseAnimations() {
    if (this.visualEffects) {
      this.visualEffects.isRunning = false;
    }
  }
  
  resumeAnimations() {
    if (this.visualEffects && !isAnimationReduced) {
      this.visualEffects.startAnimationLoop();
    }
  }
  
  finalizeInit() {
    // Animation d'entrée du body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
    
    // Event personnalisé
    window.dispatchEvent(new CustomEvent('equipmentAppReady', {
      detail: { timestamp: Date.now() }
    }));
  }
  
  fallbackInit() {
    console.log('🔧 Mode de fallback activé');
    
    // Navigation basique
    this.mobileNav.init();
    this.modalSystem.init();
    this.languageSystem.init();
    this.accessibility.init();
    
    // Désactiver toutes les animations
    const style = document.createElement('style');
    style.textContent = `
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    `;
    document.head.appendChild(style);
  }
  
  destroy() {
    // Nettoyage pour éviter les fuites mémoire
    if (this.visualEffects) this.visualEffects.destroy();
    if (this.scrollAnimations) this.scrollAnimations.destroy();
    
    this.isInitialized = false;
  }
}

// Fonctions globales pour l'interface
function toggleMobileNav() {
  if (window.equipmentApp && window.equipmentApp.mobileNav) {
    window.equipmentApp.mobileNav.toggle();
  }
}

function toggleFlags() {
  if (window.equipmentApp && window.equipmentApp.languageSystem) {
    window.equipmentApp.languageSystem.toggleDropdown();
  }
}

function changeLanguage(url) {
  if (window.equipmentApp && window.equipmentApp.languageSystem) {
    window.equipmentApp.languageSystem.changeLanguage(url);
  }
}

function openModal(modalId) {
  if (window.equipmentApp && window.equipmentApp.modalSystem) {
    window.equipmentApp.modalSystem.open(modalId);
  }
}

function closeModal() {
  if (window.equipmentApp && window.equipmentApp.modalSystem) {
    window.equipmentApp.modalSystem.close();
  }
}

// Initialisation de l'application
const equipmentApp = new EquipmentApp();

// Démarrage optimisé
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => equipmentApp.init(), 50);
  });
} else {
  setTimeout(() => equipmentApp.init(), 50);
}

// Backup en cas de problème
window.addEventListener('load', () => {
  if (!equipmentApp.isInitialized) {
    equipmentApp.init();
  }
});

// Nettoyage avant fermeture
window.addEventListener('beforeunload', () => {
  equipmentApp.destroy();
});

// Export global
window.equipmentApp = equipmentApp;
window.openModal = openModal;
window.closeModal = closeModal;
window.toggleMobileNav = toggleMobileNav;
window.toggleFlags = toggleFlags;
window.changeLanguage = changeLanguage;

// CSS additionnel pour les animations de fermeture
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  
  .keyboard-navigation {
    /* Styles activés uniquement lors de la navigation clavier */
  }
`;
document.head.appendChild(additionalStyles);fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Style du texte
    this.ctx.fillStyle = '#00ff41';
    this.ctx.font = `${this.fontSize}px "Fira Code", monospace`;
    this.ctx.textAlign = 'left';
    this.ctx.shadowBlur = 3;
    this.ctx.shadowColor = '#00ff41';
    
    // Mise à jour des gouttes
    this.drops.forEach(drop => {
      this.ctx.fillText(drop.char, drop.x, drop.y);
      
      drop.y += drop.speed;
      
      // Reset si hors écran
      if (drop.y > this.canvas.height) {
        drop.y = 0;
        drop.char = this.getRandomChar();
      }
      
      // Changement aléatoire de caractère
      if (Math.random() > 0.98) {
        drop.char = this.getRandomChar();
      }
    });
    
    this.ctx.