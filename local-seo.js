// Local SEO and Advanced Content Optimization
import { generateMetaTags } from './seo-optimizations.js';

// Local Business Schema
const addLocalBusinessSchema = () => {
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Multi-Tools Hub",
        "image": `${window.location.origin}/images/logo.png`,
        "description": "Professional online tools for file conversion, compression, and more",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Tech Street",
            "addressLocality": "San Francisco",
            "addressRegion": "CA",
            "postalCode": "94105",
            "addressCountry": "US"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "37.7749",
            "longitude": "-122.4194"
        },
        "url": window.location.origin,
        "telephone": "+1-555-0123-4567",
        "priceRange": "Free",
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ],
            "opens": "09:00",
            "closes": "17:00"
        },
        "sameAs": [
            "https://twitter.com/multitoolshub",
            "https://facebook.com/multitoolshub",
            "https://linkedin.com/company/multitoolshub"
        ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(localBusinessSchema);
    document.head.appendChild(script);
};

// Content Enhancement
const enhanceContent = () => {
    // Add estimated reading time
    document.querySelectorAll('article').forEach(article => {
        const text = article.textContent;
        const wordCount = text.trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute

        const readingTimeElement = document.createElement('div');
        readingTimeElement.className = 'reading-time';
        readingTimeElement.innerHTML = `
            <span class="icon">⏱</span>
            <span>${readingTime} min read</span>
        `;
        article.querySelector('header')?.appendChild(readingTimeElement);
    });

    // Add related content section
    const relatedContent = document.createElement('section');
    relatedContent.className = 'related-content';
    relatedContent.innerHTML = `
        <h2>Related Tools</h2>
        <div class="related-tools">
            ${Array.from(document.querySelectorAll('.tool-section'))
                .slice(0, 3)
                .map(tool => `
                    <article class="related-tool">
                        <h3>${tool.querySelector('h2')?.textContent}</h3>
                        <p>${tool.querySelector('p')?.textContent}</p>
                        <a href="${tool.querySelector('a')?.href}" class="button">Try Now</a>
                    </article>
                `).join('')}
        </div>
    `;
    document.querySelector('main')?.appendChild(relatedContent);
};

// Social Proof Enhancement
const enhanceSocialProof = () => {
    // Add social proof section
    const socialProof = document.createElement('section');
    socialProof.className = 'social-proof';
    socialProof.innerHTML = `
        <h2>Trusted by Thousands</h2>
        <div class="stats">
            <div class="stat">
                <span class="number">1M+</span>
                <span class="label">Users</span>
            </div>
            <div class="stat">
                <span class="number">50K+</span>
                <span class="label">Files Processed</span>
            </div>
            <div class="stat">
                <span class="number">4.8</span>
                <span class="label">User Rating</span>
            </div>
        </div>
        <div class="testimonials">
            <blockquote>
                <p>"Multi-Tools Hub has revolutionized how we handle file conversions. Fast, reliable, and user-friendly!"</p>
                <cite>- John Doe, Tech Director</cite>
            </blockquote>
        </div>
    `;
    document.querySelector('main')?.appendChild(socialProof);
};

// Mobile Optimization
const optimizeMobile = () => {
    // Add mobile-specific meta tags
    generateMetaTags({
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'black',
        'apple-mobile-web-app-title': 'Multi-Tools Hub',
        'format-detection': 'telephone=no',
        'mobile-web-app-capable': 'yes',
        'theme-color': '#ffffff'
    });

    // Add mobile-specific CSS
    const mobileStyles = document.createElement('style');
    mobileStyles.textContent = `
        @media (max-width: 768px) {
            .tool-section {
                padding: 1rem;
            }
            .related-tools {
                grid-template-columns: 1fr;
            }
            .stats {
                flex-direction: column;
                align-items: center;
            }
        }
    `;
    document.head.appendChild(mobileStyles);
};

// Initialize Local SEO
const initializeLocalSEO = () => {
    addLocalBusinessSchema();
    enhanceContent();
    enhanceSocialProof();
    optimizeMobile();

    // Add local business meta tags
    generateMetaTags({
        'geo.region': 'US-CA',
        'geo.placename': 'San Francisco',
        'geo.position': '37.7749;-122.4194',
        'ICBM': '37.7749, -122.4194'
    });
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeLocalSEO);

// Export functions for use in other files
export {
    addLocalBusinessSchema,
    enhanceContent,
    enhanceSocialProof,
    optimizeMobile,
    initializeLocalSEO
}; 