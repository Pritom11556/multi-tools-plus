// Advanced Mobile Optimizations
import { generateMetaTags } from './seo-optimizations.js';

// Mobile Performance Optimizer
const mobilePerformanceOptimizer = {
    // Optimize images for mobile
    optimizeImagesForMobile: () => {
        document.querySelectorAll('img').forEach(img => {
            // Add srcset for responsive images
            if (!img.srcset && img.naturalWidth > 0) {
                const src = img.src;
                const baseName = src.substring(0, src.lastIndexOf('.'));
                const extension = src.substring(src.lastIndexOf('.'));
                
                img.srcset = `
                    ${baseName}-small${extension} 320w,
                    ${baseName}-medium${extension} 640w,
                    ${baseName}-large${extension} 1024w
                `;
                img.sizes = '(max-width: 320px) 320px, (max-width: 640px) 640px, 1024px';
            }

            // Add loading="lazy" for images below the fold
            if (img.getBoundingClientRect().top > window.innerHeight) {
                img.loading = 'lazy';
            }
        });
    },

    // Optimize CSS for mobile
    optimizeCSSForMobile: () => {
        // Add mobile-specific styles
        const mobileStyles = document.createElement('style');
        mobileStyles.textContent = `
            @media (max-width: 768px) {
                /* Increase touch targets */
                button, a, input, select {
                    min-height: 44px;
                    min-width: 44px;
                    padding: 12px;
                }

                /* Optimize font sizes */
                body {
                    font-size: 16px;
                    line-height: 1.5;
                }

                h1 { font-size: 24px; }
                h2 { font-size: 20px; }
                h3 { font-size: 18px; }

                /* Improve spacing */
                .container {
                    padding: 16px;
                }

                /* Stack elements vertically */
                .row {
                    flex-direction: column;
                }

                /* Hide non-essential elements */
                .desktop-only {
                    display: none;
                }
            }
        `;
        document.head.appendChild(mobileStyles);
    },

    // Optimize JavaScript for mobile
    optimizeJavaScriptForMobile: () => {
        // Defer non-critical JavaScript
        document.querySelectorAll('script[data-defer]').forEach(script => {
            script.defer = true;
        });

        // Add touch event handlers
        document.querySelectorAll('button, a').forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.opacity = '0.7';
            });
            element.addEventListener('touchend', () => {
                element.style.opacity = '1';
            });
        });
    }
};

// Mobile UX Optimizer
const mobileUXOptimizer = {
    // Add pull-to-refresh
    addPullToRefresh: () => {
        let startY = 0;
        let currentY = 0;
        const threshold = 100;

        document.addEventListener('touchstart', (e) => {
            startY = e.touches[0].pageY;
        });

        document.addEventListener('touchmove', (e) => {
            currentY = e.touches[0].pageY;
            const diff = currentY - startY;

            if (diff > threshold && window.scrollY === 0) {
                // Show refresh indicator
                document.body.style.transform = `translateY(${diff}px)`;
            }
        });

        document.addEventListener('touchend', () => {
            if (currentY - startY > threshold && window.scrollY === 0) {
                // Trigger refresh
                window.location.reload();
            }
            document.body.style.transform = '';
        });
    },

    // Add swipe navigation
    addSwipeNavigation: () => {
        let startX = 0;
        let currentX = 0;
        const threshold = 50;

        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX;
        });

        document.addEventListener('touchmove', (e) => {
            currentX = e.touches[0].pageX;
        });

        document.addEventListener('touchend', () => {
            const diff = currentX - startX;

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    // Swipe right - go back
                    window.history.back();
                } else {
                    // Swipe left - go forward
                    window.history.forward();
                }
            }
        });
    },

    // Add mobile gestures
    addMobileGestures: () => {
        // Double tap to zoom
        let lastTap = 0;
        document.addEventListener('touchend', (e) => {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            if (tapLength < 500 && tapLength > 0) {
                // Double tap detected
                const target = e.target;
                if (target.tagName === 'IMG') {
                    target.style.transform = target.style.transform === 'scale(1.5)' ? 'scale(1)' : 'scale(1.5)';
                }
            }
            lastTap = currentTime;
        });
    }
};

// Mobile SEO Optimizer
const mobileSEOOptimizer = {
    // Add mobile-specific meta tags
    addMobileMetaTags: () => {
        generateMetaTags({
            'viewport': 'width=device-width, initial-scale=1, maximum-scale=5',
            'theme-color': '#ffffff',
            'apple-mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-status-bar-style': 'black',
            'format-detection': 'telephone=no',
            'mobile-web-app-capable': 'yes'
        });
    },

    // Add mobile-specific structured data
    addMobileStructuredData: () => {
        const mobileAppSchema = {
            "@context": "https://schema.org",
            "@type": "MobileApplication",
            "name": "Multi-Tools Hub",
            "operatingSystem": "Any",
            "applicationCategory": "UtilityApplication",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            }
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(mobileAppSchema);
        document.head.appendChild(script);
    }
};

// Initialize Mobile Optimizations
const initializeMobileOptimizations = () => {
    // Initialize performance optimizations
    mobilePerformanceOptimizer.optimizeImagesForMobile();
    mobilePerformanceOptimizer.optimizeCSSForMobile();
    mobilePerformanceOptimizer.optimizeJavaScriptForMobile();

    // Initialize UX optimizations
    mobileUXOptimizer.addPullToRefresh();
    mobileUXOptimizer.addSwipeNavigation();
    mobileUXOptimizer.addMobileGestures();

    // Initialize SEO optimizations
    mobileSEOOptimizer.addMobileMetaTags();
    mobileSEOOptimizer.addMobileStructuredData();
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeMobileOptimizations);

// Export functions for use in other files
export {
    mobilePerformanceOptimizer,
    mobileUXOptimizer,
    mobileSEOOptimizer,
    initializeMobileOptimizations
}; 