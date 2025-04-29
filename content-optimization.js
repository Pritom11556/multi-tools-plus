// Content Optimization and User Engagement Tracking
import { generateMetaTags } from './seo-optimizations.js';

// Content Optimization
const contentOptimizer = {
    // Add schema markup for articles
    addArticleSchema: (article) => {
        const schema = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.querySelector('h1')?.textContent,
            "description": article.querySelector('meta[name="description"]')?.content,
            "image": article.querySelector('img')?.src,
            "datePublished": article.querySelector('time')?.dateTime,
            "dateModified": article.querySelector('time[datetime*="modified"]')?.dateTime,
            "author": {
                "@type": "Person",
                "name": article.querySelector('.author')?.textContent
            }
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schema);
        article.appendChild(script);
    },

    // Add schema markup for products
    addProductSchema: (product) => {
        const schema = {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.querySelector('h2')?.textContent,
            "description": product.querySelector('.description')?.textContent,
            "image": product.querySelector('img')?.src,
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            }
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schema);
        product.appendChild(script);
    },

    // Add schema markup for FAQs
    addFAQSchema: (faq) => {
        const schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": Array.from(faq.querySelectorAll('.faq-item')).map(item => ({
                "@type": "Question",
                "name": item.querySelector('.question')?.textContent,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.querySelector('.answer')?.textContent
                }
            }))
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schema);
        faq.appendChild(script);
    }
};

// User Engagement Tracking
const engagementTracker = {
    // Track scroll depth
    trackScrollDepth: () => {
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY + window.innerHeight) / document.body.scrollHeight * 100);
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                if (maxScroll % 25 === 0) { // Track at 25%, 50%, 75%, 100%
                    console.log('Scroll Depth:', maxScroll + '%');
                    if (window.ga) {
                        ga('send', 'event', 'Engagement', 'Scroll Depth', maxScroll + '%');
                    }
                }
            }
        });
    },

    // Track time on page
    trackTimeOnPage: () => {
        const startTime = Date.now();
        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            console.log('Time on Page:', timeSpent + ' seconds');
            if (window.ga) {
                ga('send', 'event', 'Engagement', 'Time on Page', timeSpent + ' seconds');
            }
        });
    },

    // Track clicks
    trackClicks: () => {
        document.addEventListener('click', (event) => {
            const target = event.target;
            if (target.tagName === 'A' || target.tagName === 'BUTTON') {
                console.log('Click:', target.textContent);
                if (window.ga) {
                    ga('send', 'event', 'Engagement', 'Click', target.textContent);
                }
            }
        });
    }
};

// Initialize Content Optimization
const initializeContentOptimization = () => {
    // Add schema markup
    document.querySelectorAll('article').forEach(article => {
        contentOptimizer.addArticleSchema(article);
    });

    document.querySelectorAll('.product').forEach(product => {
        contentOptimizer.addProductSchema(product);
    });

    document.querySelectorAll('.faq').forEach(faq => {
        contentOptimizer.addFAQSchema(faq);
    });

    // Initialize engagement tracking
    engagementTracker.trackScrollDepth();
    engagementTracker.trackTimeOnPage();
    engagementTracker.trackClicks();

    // Add meta tags for content
    generateMetaTags({
        'author': document.querySelector('.author')?.textContent,
        'keywords': document.querySelector('meta[name="keywords"]')?.content,
        'article:published_time': document.querySelector('time')?.dateTime,
        'article:modified_time': document.querySelector('time[datetime*="modified"]')?.dateTime
    });
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeContentOptimization);

// Export functions for use in other files
export {
    contentOptimizer,
    engagementTracker,
    initializeContentOptimization
}; 