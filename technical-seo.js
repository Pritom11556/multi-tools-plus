// Technical SEO and Performance Monitoring
import { generateMetaTags } from './seo-optimizations.js';

// Performance Monitoring
const performanceMonitor = {
    // Core Web Vitals Monitoring
    monitorCoreWebVitals: () => {
        // Largest Contentful Paint (LCP)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
            // Send to analytics
            if (window.ga) {
                ga('send', 'event', 'Web Vitals', 'LCP', Math.round(lastEntry.startTime));
            }
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                console.log('FID:', entry.processingStart - entry.startTime);
                if (window.ga) {
                    ga('send', 'event', 'Web Vitals', 'FID', Math.round(entry.processingStart - entry.startTime));
                }
            });
        }).observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        let cumulativeLayoutShift = 0;
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                    cumulativeLayoutShift += entry.value;
                }
            }
            console.log('CLS:', cumulativeLayoutShift);
            if (window.ga) {
                ga('send', 'event', 'Web Vitals', 'CLS', Math.round(cumulativeLayoutShift * 1000));
            }
        }).observe({ entryTypes: ['layout-shift'] });
    },

    // Resource Timing
    monitorResourceTiming: () => {
        const resources = performance.getEntriesByType('resource');
        resources.forEach(resource => {
            console.log(`${resource.name}: ${resource.duration}ms`);
            if (window.ga) {
                ga('send', 'event', 'Resource Timing', resource.name, Math.round(resource.duration));
            }
        });
    },

    // Navigation Timing
    monitorNavigationTiming: () => {
        const navigation = performance.getEntriesByType('navigation')[0];
        console.log('Page Load Time:', navigation.loadEventEnd - navigation.navigationStart);
        if (window.ga) {
            ga('send', 'event', 'Navigation Timing', 'Page Load', 
               Math.round(navigation.loadEventEnd - navigation.navigationStart));
        }
    }
};

// Technical SEO Enhancements
const technicalSEO = {
    // Add canonical tags
    addCanonicalTags: () => {
        const canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            const link = document.createElement('link');
            link.rel = 'canonical';
            link.href = window.location.href;
            document.head.appendChild(link);
        }
    },

    // Add hreflang tags
    addHreflangTags: () => {
        const languages = ['en', 'es', 'fr', 'de'];
        languages.forEach(lang => {
            const link = document.createElement('link');
            link.rel = 'alternate';
            link.hreflang = lang;
            link.href = `${window.location.origin}/${lang}${window.location.pathname}`;
            document.head.appendChild(link);
        });
    },

    // Add meta robots tags
    addMetaRobots: () => {
        generateMetaTags({
            'robots': 'index, follow, max-image-preview:large',
            'googlebot': 'index, follow, max-image-preview:large',
            'bingbot': 'index, follow, max-image-preview:large'
        });
    },

    // Add security headers
    addSecurityHeaders: () => {
        const headers = {
            'Content-Security-Policy': "default-src 'self'",
            'X-Frame-Options': 'SAMEORIGIN',
            'X-Content-Type-Options': 'nosniff',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
            'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
        };

        // Note: These headers should be set on the server side
        console.log('Security Headers to be set:', headers);
    }
};

// Error Monitoring
const errorMonitor = {
    // Monitor JavaScript errors
    monitorJSErrors: () => {
        window.addEventListener('error', (event) => {
            console.error('JavaScript Error:', event.message);
            if (window.ga) {
                ga('send', 'event', 'Error', 'JavaScript', event.message);
            }
        });
    },

    // Monitor resource loading errors
    monitorResourceErrors: () => {
        window.addEventListener('error', (event) => {
            if (event.target.tagName === 'IMG' || event.target.tagName === 'SCRIPT') {
                console.error('Resource Loading Error:', event.target.src);
                if (window.ga) {
                    ga('send', 'event', 'Error', 'Resource', event.target.src);
                }
            }
        }, true);
    }
};

// Initialize Technical SEO
const initializeTechnicalSEO = () => {
    // Initialize performance monitoring
    performanceMonitor.monitorCoreWebVitals();
    performanceMonitor.monitorResourceTiming();
    performanceMonitor.monitorNavigationTiming();

    // Initialize technical SEO enhancements
    technicalSEO.addCanonicalTags();
    technicalSEO.addHreflangTags();
    technicalSEO.addMetaRobots();
    technicalSEO.addSecurityHeaders();

    // Initialize error monitoring
    errorMonitor.monitorJSErrors();
    errorMonitor.monitorResourceErrors();

    // Add performance meta tags
    generateMetaTags({
        'viewport': 'width=device-width, initial-scale=1, maximum-scale=5',
        'theme-color': '#ffffff',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'black'
    });
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeTechnicalSEO);

// Export functions for use in other files
export {
    performanceMonitor,
    technicalSEO,
    errorMonitor,
    initializeTechnicalSEO
}; 