// Advanced SEO Optimizations
import { generateMetaTags } from './seo-optimizations.js';

// Structured Data Generator
const structuredDataGenerator = {
    // Generate FAQ Schema
    generateFAQSchema: (faqs) => {
        const schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        };
        return schema;
    },

    // Generate Product Schema
    generateProductSchema: (product) => {
        const schema = {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "description": product.description,
            "image": product.image,
            "offers": {
                "@type": "Offer",
                "price": product.price,
                "priceCurrency": "USD",
                "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": product.rating,
                "reviewCount": product.reviewCount
            }
        };
        return schema;
    },

    // Generate Article Schema
    generateArticleSchema: (article) => {
        const schema = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "description": article.description,
            "image": article.image,
            "author": {
                "@type": "Person",
                "name": article.author
            },
            "publisher": {
                "@type": "Organization",
                "name": "Multi-Tools Hub",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://multitoolshub.com/images/logo.png"
                }
            },
            "datePublished": article.publishDate,
            "dateModified": article.modifiedDate
        };
        return schema;
    }
};

// Content Optimizer
const contentOptimizer = {
    // Optimize headings
    optimizeHeadings: () => {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const headingTexts = new Set();
        
        headings.forEach(heading => {
            // Check for duplicate headings
            const text = heading.textContent.trim().toLowerCase();
            if (headingTexts.has(text)) {
                console.warn(`Duplicate heading found: ${heading.textContent}`);
            }
            headingTexts.add(text);

            // Ensure proper heading hierarchy
            const level = parseInt(heading.tagName[1]);
            if (level > 1) {
                const prevLevel = level - 1;
                const hasPrevLevel = Array.from(headings).some(h => 
                    parseInt(h.tagName[1]) === prevLevel && 
                    h.compareDocumentPosition(heading) === Node.DOCUMENT_POSITION_FOLLOWING
                );
                if (!hasPrevLevel) {
                    console.warn(`Missing heading level ${prevLevel} before ${heading.textContent}`);
                }
            }
        });
    },

    // Optimize images
    optimizeImages: () => {
        document.querySelectorAll('img').forEach(img => {
            // Add missing alt text
            if (!img.alt) {
                img.alt = img.src.split('/').pop().split('.')[0].replace(/-/g, ' ');
            }

            // Add loading="lazy" for images below the fold
            if (img.getBoundingClientRect().top > window.innerHeight) {
                img.loading = 'lazy';
            }

            // Add width and height attributes
            if (!img.width && !img.height) {
                img.width = img.naturalWidth;
                img.height = img.naturalHeight;
            }
        });
    },

    // Optimize internal links
    optimizeInternalLinks: () => {
        document.querySelectorAll('a[href^="/"]').forEach(link => {
            // Add descriptive anchor text
            if (link.textContent.trim().length < 3) {
                console.warn(`Short anchor text found: ${link.textContent}`);
            }

            // Add title attribute if missing
            if (!link.title) {
                link.title = link.textContent.trim();
            }
        });
    }
};

// Technical SEO Optimizer
const technicalSEOOptimizer = {
    // Check mobile responsiveness
    checkMobileResponsiveness: () => {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) {
            console.warn('Missing viewport meta tag');
        }

        // Check for mobile-friendly elements
        const touchTargets = document.querySelectorAll('button, a, input, select');
        touchTargets.forEach(target => {
            const rect = target.getBoundingClientRect();
            if (rect.width < 44 || rect.height < 44) {
                console.warn(`Small touch target found: ${target.tagName}`);
            }
        });
    },

    // Check page speed
    checkPageSpeed: () => {
        // Check for render-blocking resources
        document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            if (!link.media || link.media === 'all') {
                console.warn('Render-blocking CSS found:', link.href);
            }
        });

        // Check for large images
        document.querySelectorAll('img').forEach(img => {
            if (img.naturalWidth > 1920 || img.naturalHeight > 1080) {
                console.warn('Large image found:', img.src);
            }
        });
    },

    // Check security
    checkSecurity: () => {
        // Check for HTTPS
        if (window.location.protocol !== 'https:') {
            console.warn('Site is not using HTTPS');
        }

        // Check for secure forms
        document.querySelectorAll('form').forEach(form => {
            if (form.action && !form.action.startsWith('https://')) {
                console.warn('Form submission not using HTTPS:', form.action);
            }
        });
    }
};

// Initialize Advanced SEO
const initializeAdvancedSEO = () => {
    // Initialize content optimization
    contentOptimizer.optimizeHeadings();
    contentOptimizer.optimizeImages();
    contentOptimizer.optimizeInternalLinks();

    // Initialize technical SEO checks
    technicalSEOOptimizer.checkMobileResponsiveness();
    technicalSEOOptimizer.checkPageSpeed();
    technicalSEOOptimizer.checkSecurity();

    // Add advanced meta tags
    generateMetaTags({
        'format-detection': 'telephone=no',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'black',
        'theme-color': '#ffffff',
        'msapplication-TileColor': '#ffffff',
        'msapplication-config': '/browserconfig.xml'
    });
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeAdvancedSEO);

// Export functions for use in other files
export {
    structuredDataGenerator,
    contentOptimizer,
    technicalSEOOptimizer,
    initializeAdvancedSEO
}; 