// ════════════════════════════════════════════════════════════════
// Performance Optimizations - Evita Reflow Forçado
// ════════════════════════════════════════════════════════════════

// 1. DEBOUNCE - Evita reflow em múltiplos eventos (scroll, resize)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 2. THROTTLE - Limita frequência de execução
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 3. BATCH DOM READS - Lê propriedades geométricas uma vez
function getElementsGeometry(elements) {
    const geometries = new Map();
    elements.forEach(el => {
        geometries.set(el, {
            width: el.offsetWidth,
            height: el.offsetHeight,
            top: el.offsetTop,
            left: el.offsetLeft
        });
    });
    return geometries;
}

// 4. INTERSECTION OBSERVER - Para lazy-load performático
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });

    // Observa todas as imagens com data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// 5. RAF (RequestAnimationFrame) - Sincroniza com o refresh rate do navegador
function smoothScroll(target, duration = 300) {
    const start = window.scrollY;
    const targetPosition = target.offsetTop;
    const distance = targetPosition - start;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        window.scrollTo(0, start + distance * progress);
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// 6. PASSIVE EVENT LISTENERS - Melhora performance do scroll
window.addEventListener('scroll', throttle(() => {
    // Evita reflow em scroll events
}, 100), { passive: true });

// 7. PRELOAD CRÍTICO - Para imagens abaixo da dobra
function preloadCriticalImages() {
    const criticalImages = document.querySelectorAll('img[data-preload]');
    criticalImages.forEach(img => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = img.dataset.preload;
        document.head.appendChild(link);
    });
}

// Executa quando o DOM está pronto
document.addEventListener('DOMContentLoaded', () => {
    preloadCriticalImages();
});

// ════════════════════════════════════════════════════════════════
// Export para uso em outros scripts
// ════════════════════════════════════════════════════════════════
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { debounce, throttle, smoothScroll, getElementsGeometry };
}
