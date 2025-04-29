// Advanced Analytics and User Behavior Tracking
import { generateMetaTags } from './seo-optimizations.js';

// User Behavior Tracking
const userBehaviorTracker = {
    // Track scroll depth
    trackScrollDepth: () => {
        let maxScroll = 0;
        let scrollThresholds = [25, 50, 75, 90];
        let reportedThresholds = new Set();

        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100);
            maxScroll = Math.max(maxScroll, scrollPercent);

            scrollThresholds.forEach(threshold => {
                if (maxScroll >= threshold && !reportedThresholds.has(threshold)) {
                    reportedThresholds.add(threshold);
                    if (window.ga) {
                        ga('send', 'event', 'Scroll Depth', `${threshold}%`, window.location.pathname);
                    }
                }
            });
        });
    },

    // Track time on page
    trackTimeOnPage: () => {
        const startTime = Date.now();
        const timeThresholds = [30, 60, 120, 300]; // seconds
        let reportedThresholds = new Set();

        setInterval(() => {
            const timeSpent = Math.floor((Date.now() - startTime) / 1000);
            
            timeThresholds.forEach(threshold => {
                if (timeSpent >= threshold && !reportedThresholds.has(threshold)) {
                    reportedThresholds.add(threshold);
                    if (window.ga) {
                        ga('send', 'event', 'Time on Page', `${threshold}s`, window.location.pathname);
                    }
                }
            });
        }, 1000);
    },

    // Track user interactions
    trackUserInteractions: () => {
        // Track clicks
        document.addEventListener('click', (e) => {
            const target = e.target.closest('a, button, [role="button"]');
            if (target) {
                if (window.ga) {
                    ga('send', 'event', 'User Interaction', 'Click', target.textContent.trim());
                }
            }
        });

        // Track form interactions
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', () => {
                if (window.ga) {
                    ga('send', 'event', 'User Interaction', 'Form Submit', form.id || 'unnamed-form');
                }
            });
        });
    }
};

// Advanced Analytics
const advancedAnalytics = {
    // Track page performance
    trackPagePerformance: () => {
        // Track page load time
        window.addEventListener('load', () => {
            const timing = performance.timing;
            const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
            
            if (window.ga) {
                ga('send', 'event', 'Performance', 'Page Load Time', Math.round(pageLoadTime));
            }
        });

        // Track resource loading
        const resources = performance.getEntriesByType('resource');
        resources.forEach(resource => {
            if (window.ga) {
                ga('send', 'event', 'Performance', 'Resource Load', 
                   `${resource.name}: ${Math.round(resource.duration)}ms`);
            }
        });
    },

    // Track user engagement
    trackUserEngagement: () => {
        // Track mouse movements
        let mouseMovements = 0;
        document.addEventListener('mousemove', () => {
            mouseMovements++;
            if (mouseMovements % 100 === 0) {
                if (window.ga) {
                    ga('send', 'event', 'User Engagement', 'Mouse Movement', mouseMovements);
                }
            }
        });

        // Track keyboard activity
        let keyStrokes = 0;
        document.addEventListener('keydown', () => {
            keyStrokes++;
            if (keyStrokes % 10 === 0) {
                if (window.ga) {
                    ga('send', 'event', 'User Engagement', 'Keyboard Activity', keyStrokes);
                }
            }
        });
    },

    // Track error events
    trackErrors: () => {
        window.addEventListener('error', (e) => {
            if (window.ga) {
                ga('send', 'event', 'Error', e.message, e.filename);
            }
        });

        window.addEventListener('unhandledrejection', (e) => {
            if (window.ga) {
                ga('send', 'event', 'Error', 'Unhandled Promise Rejection', e.reason);
            }
        });
    }
};

// Initialize Analytics Tracking
const initializeAnalyticsTracking = () => {
    // Initialize user behavior tracking
    userBehaviorTracker.trackScrollDepth();
    userBehaviorTracker.trackTimeOnPage();
    userBehaviorTracker.trackUserInteractions();

    // Initialize advanced analytics
    advancedAnalytics.trackPagePerformance();
    advancedAnalytics.trackUserEngagement();
    advancedAnalytics.trackErrors();

    // Add analytics meta tags
    generateMetaTags({
        'google-site-verification': 'your-verification-code',
        'msvalidate.01': 'your-bing-verification-code'
    });
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeAnalyticsTracking);

// Export functions for use in other files
export {
    userBehaviorTracker,
    advancedAnalytics,
    initializeAnalyticsTracking
}; 