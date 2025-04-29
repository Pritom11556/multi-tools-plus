// Performance optimization utilities

// Lazy loading images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Defer non-critical CSS
function loadDeferredStyles() {
    const deferredStyles = document.querySelectorAll('link[data-defer]');
    deferredStyles.forEach(style => {
        style.setAttribute('rel', 'stylesheet');
        style.removeAttribute('data-defer');
    });
}

// Preload critical resources
function preloadCriticalResources() {
    const resources = [
        '/css/critical.css',
        '/js/main.js',
        '/images/logo.png'
    ];

    resources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 
                 resource.endsWith('.js') ? 'script' : 'image';
        document.head.appendChild(link);
    });
}

// Optimize third-party script loading
function loadThirdPartyScripts() {
    const scripts = [
        {
            src: 'https://www.google-analytics.com/analytics.js',
            async: true
        },
        {
            src: 'https://www.googletagmanager.com/gtag/js',
            async: true
        }
    ];

    scripts.forEach(script => {
        const scriptElement = document.createElement('script');
        Object.assign(scriptElement, script);
        document.body.appendChild(scriptElement);
    });
}

// Implement resource hints
function addResourceHints() {
    const hints = [
        { rel: 'preconnect', href: 'https://www.google-analytics.com' },
        { rel: 'preconnect', href: 'https://www.googletagmanager.com' },
        { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' }
    ];

    hints.forEach(hint => {
        const link = document.createElement('link');
        Object.assign(link, hint);
        document.head.appendChild(link);
    });
}

// Monitor Core Web Vitals
function monitorWebVitals() {
    // LCP (Largest Contentful Paint)
    new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
            console.log('LCP:', entry.startTime);
        }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // FID (First Input Delay)
    new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
            console.log('FID:', entry.processingStart - entry.startTime);
        }
    }).observe({ entryTypes: ['first-input'] });

    // CLS (Cumulative Layout Shift)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
            if (!entry.hadRecentInput) {
                clsValue += entry.value;
            }
        }
        console.log('CLS:', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', () => {
    lazyLoadImages();
    loadDeferredStyles();
    preloadCriticalResources();
    addResourceHints();
    monitorWebVitals();
});

// Load third-party scripts after page load
window.addEventListener('load', () => {
    loadThirdPartyScripts();
}); 