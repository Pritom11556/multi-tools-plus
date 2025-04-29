// Advanced Schema Markup and Rich Snippets
import { generateMetaTags } from './seo-optimizations.js';

// Advanced Schema Markup
const advancedSchema = {
    // Add HowTo schema
    addHowToSchema: (howTo) => {
        const schema = {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": howTo.querySelector('h2')?.textContent,
            "description": howTo.querySelector('.description')?.textContent,
            "step": Array.from(howTo.querySelectorAll('.step')).map(step => ({
                "@type": "HowToStep",
                "name": step.querySelector('h3')?.textContent,
                "text": step.querySelector('p')?.textContent,
                "image": step.querySelector('img')?.src
            }))
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schema);
        howTo.appendChild(script);
    },

    // Add Video schema
    addVideoSchema: (video) => {
        const schema = {
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": video.querySelector('h2')?.textContent,
            "description": video.querySelector('.description')?.textContent,
            "thumbnailUrl": video.querySelector('img')?.src,
            "uploadDate": video.querySelector('time')?.dateTime,
            "duration": video.querySelector('meta[itemprop="duration"]')?.content
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schema);
        video.appendChild(script);
    },

    // Add Event schema
    addEventSchema: (event) => {
        const schema = {
            "@context": "https://schema.org",
            "@type": "Event",
            "name": event.querySelector('h2')?.textContent,
            "description": event.querySelector('.description')?.textContent,
            "startDate": event.querySelector('time')?.dateTime,
            "endDate": event.querySelector('time[datetime*="end"]')?.dateTime,
            "location": {
                "@type": "Place",
                "name": event.querySelector('.location')?.textContent
            }
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schema);
        event.appendChild(script);
    }
};

// Rich Snippets Enhancement
const richSnippets = {
    // Add breadcrumb markup
    addBreadcrumbMarkup: () => {
        const breadcrumb = document.querySelector('.breadcrumb');
        if (breadcrumb) {
            const schema = {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": Array.from(breadcrumb.querySelectorAll('li')).map((item, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "name": item.textContent,
                    "item": item.querySelector('a')?.href
                }))
            };

            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.text = JSON.stringify(schema);
            breadcrumb.appendChild(script);
        }
    },

    // Add site navigation markup
    addSiteNavigationMarkup: () => {
        const navigation = document.querySelector('nav');
        if (navigation) {
            const schema = {
                "@context": "https://schema.org",
                "@type": "SiteNavigationElement",
                "name": Array.from(navigation.querySelectorAll('a')).map(link => link.textContent)
            };

            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.text = JSON.stringify(schema);
            navigation.appendChild(script);
        }
    }
};

// Initialize Advanced Schema
const initializeAdvancedSchema = () => {
    // Add advanced schema markup
    document.querySelectorAll('.how-to').forEach(howTo => {
        advancedSchema.addHowToSchema(howTo);
    });

    document.querySelectorAll('.video').forEach(video => {
        advancedSchema.addVideoSchema(video);
    });

    document.querySelectorAll('.event').forEach(event => {
        advancedSchema.addEventSchema(event);
    });

    // Add rich snippets markup
    richSnippets.addBreadcrumbMarkup();
    richSnippets.addSiteNavigationMarkup();

    // Add meta tags for rich snippets
    generateMetaTags({
        'og:type': 'website',
        'og:site_name': 'Multi-Tools Hub',
        'twitter:card': 'summary_large_image',
        'twitter:site': '@multitoolshub'
    });
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeAdvancedSchema);

// Export functions for use in other files
export {
    advancedSchema,
    richSnippets,
    initializeAdvancedSchema
}; 