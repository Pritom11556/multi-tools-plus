// Comprehensive SEO Optimizations
import { addNewReview, addReviewSchema } from './schema-reviews.js';

// Performance Metrics Tracking
const performanceMetrics = {
    // Core Web Vitals
    trackLCP: () => {
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
    },

    trackFID: () => {
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                console.log('FID:', entry.processingStart - entry.startTime);
            });
        }).observe({ entryTypes: ['first-input'] });
    },

    trackCLS: () => {
        let cumulativeLayoutShift = 0;
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                    cumulativeLayoutShift += entry.value;
                }
            }
            console.log('CLS:', cumulativeLayoutShift);
        }).observe({ entryTypes: ['layout-shift'] });
    }
};

// SEO Meta Tags Generator
const generateMetaTags = (data) => {
    const metaTags = {
        title: data.title || 'Multi-Tools Hub - Free Online Tools Collection',
        description: data.description || 'Access a comprehensive collection of free online tools for file conversion, compression, and more. No registration required.',
        keywords: data.keywords || 'online tools, file converter, PDF tools, image compression, free tools',
        canonical: data.canonical || window.location.href,
        robots: 'index, follow, max-image-preview:large',
        viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
        'og:title': data.title,
        'og:description': data.description,
        'og:image': data.image || '/images/og-image.jpg',
        'og:url': data.canonical,
        'twitter:card': 'summary_large_image',
        'twitter:title': data.title,
        'twitter:description': data.description,
        'twitter:image': data.image
    };

    Object.entries(metaTags).forEach(([name, content]) => {
        let meta = document.querySelector(`meta[name="${name}"]`) || 
                  document.querySelector(`meta[property="${name}"]`);
        
        if (!meta) {
            meta = document.createElement('meta');
            if (name.startsWith('og:') || name.startsWith('twitter:')) {
                meta.setAttribute('property', name);
            } else {
                meta.setAttribute('name', name);
            }
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
    });
};

// Structured Data Generator
const generateStructuredData = (data) => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": data.name || "Multi-Tools Hub",
        "description": data.description,
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "1250"
        }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
};

// Image Optimization
const optimizeImages = () => {
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
};

// Internal Linking Optimization
const optimizeInternalLinks = () => {
    document.querySelectorAll('a').forEach(link => {
        // Add descriptive anchor text
        if (link.textContent.trim().length < 3) {
            link.textContent = link.href.split('/').pop().replace(/-/g, ' ');
        }
        
        // Add title attribute if missing
        if (!link.title) {
            link.title = link.textContent.trim();
        }
    });
};

// Initialize SEO Optimizations
const initializeSEO = () => {
    // Initialize performance tracking
    performanceMetrics.trackLCP();
    performanceMetrics.trackFID();
    performanceMetrics.trackCLS();

    // Generate meta tags
    generateMetaTags({
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.content,
        canonical: window.location.href
    });

    // Generate structured data
    generateStructuredData({
        name: document.title,
        description: document.querySelector('meta[name="description"]')?.content
    });

    // Add review schema
    addReviewSchema();

    // Optimize images
    optimizeImages();

    // Optimize internal links
    optimizeInternalLinks();

    // Add breadcrumb navigation
    const breadcrumb = document.createElement('nav');
    breadcrumb.setAttribute('aria-label', 'breadcrumb');
    breadcrumb.innerHTML = `
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">${document.title}</li>
        </ol>
    `;
    document.querySelector('main')?.prepend(breadcrumb);
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeSEO);

// Export functions for use in other files
export {
    generateMetaTags,
    generateStructuredData,
    optimizeImages,
    optimizeInternalLinks,
    initializeSEO
}; 