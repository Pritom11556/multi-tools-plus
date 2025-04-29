// Advanced Performance Monitoring and Optimization
import { generateMetaTags } from './seo-optimizations.js';

// Performance Monitoring
const performanceMonitor = {
    // Monitor Core Web Vitals
    monitorCoreWebVitals: () => {
        // Largest Contentful Paint (LCP)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
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

    // Monitor Resource Timing
    monitorResourceTiming: () => {
        const resources = performance.getEntriesByType('resource');
        resources.forEach(resource => {
            console.log(`${resource.name}: ${resource.duration}ms`);
            if (window.ga) {
                ga('send', 'event', 'Resource Timing', resource.name, Math.round(resource.duration));
            }
        });
    },

    // Monitor Navigation Timing
    monitorNavigationTiming: () => {
        const navigation = performance.getEntriesByType('navigation')[0];
        console.log('Page Load Time:', navigation.loadEventEnd - navigation.navigationStart);
        if (window.ga) {
            ga('send', 'event', 'Navigation Timing', 'Page Load', 
               Math.round(navigation.loadEventEnd - navigation.navigationStart));
        }
    }
};

// Performance Optimization
const performanceOptimizer = {
    // Optimize images
    optimizeImages: () => {
        document.querySelectorAll('img').forEach(img => {
            // Add loading="lazy" for images below the fold
            if (img.getBoundingClientRect().top > window.innerHeight) {
                img.loading = 'lazy';
            }
            
            // Add width and height attributes
            if (!img.width && !img.height) {
                img.width = img.naturalWidth;
                img.height = img.naturalHeight;
            }
            
            // Add alt text if missing
            if (!img.alt) {
                img.alt = img.src.split('/').pop().split('.')[0];
            }
        });
    },

    // Optimize CSS
    optimizeCSS: () => {
        // Add critical CSS
        const criticalCSS = document.createElement('style');
        criticalCSS.textContent = `
            body { font-family: Arial, sans-serif; }
            .header { background: #f8f9fa; }
            .footer { background: #f8f9fa; }
        `;
        document.head.appendChild(criticalCSS);

        // Defer non-critical CSS
        document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            if (!link.href.includes('critical.css')) {
                link.media = 'print';
                link.onload = () => {
                    link.media = 'all';
                };
            }
        });
    },

    // Optimize JavaScript
    optimizeJavaScript: () => {
        // Defer non-critical JavaScript
        document.querySelectorAll('script[data-defer]').forEach(script => {
            script.defer = true;
        });

        // Add async for analytics
        document.querySelectorAll('script[data-async]').forEach(script => {
            script.async = true;
        });
    }
};

// Initialize Performance Monitoring
const initializePerformanceMonitoring = () => {
    // Initialize performance monitoring
    performanceMonitor.monitorCoreWebVitals();
    performanceMonitor.monitorResourceTiming();
    performanceMonitor.monitorNavigationTiming();

    // Initialize performance optimization
    performanceOptimizer.optimizeImages();
    performanceOptimizer.optimizeCSS();
    performanceOptimizer.optimizeJavaScript();

    // Add performance meta tags
    generateMetaTags({
        'viewport': 'width=device-width, initial-scale=1, maximum-scale=5',
        'theme-color': '#ffffff',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'black'
    });
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePerformanceMonitoring);

// Export functions for use in other files
export {
    performanceMonitor,
    performanceOptimizer,
    initializePerformanceMonitoring
}; 