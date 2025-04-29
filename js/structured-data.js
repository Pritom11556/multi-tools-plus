// Function to generate structured data for tools
function generateToolSchema(tool) {
    return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": tool.name,
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": tool.rating || "4.5",
            "ratingCount": tool.ratingCount || "100"
        },
        "featureList": tool.features || [],
        "screenshot": tool.screenshot || "",
        "description": tool.description || "",
        "url": tool.url || ""
    };
}

// Function to generate structured data for articles
function generateArticleSchema(article) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "image": article.image,
        "author": {
            "@type": "Person",
            "name": "Multi-Tools Hub Team"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Multi-Tools Hub",
            "logo": {
                "@type": "ImageObject",
                "url": "https://your-domain.com/images/logo.png"
            }
        },
        "datePublished": article.publishDate,
        "dateModified": article.modifiedDate,
        "description": article.description
    };
}

// Function to generate breadcrumb structured data
function generateBreadcrumbSchema(items) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
        }))
    };
}

// Function to generate FAQ structured data
function generateFAQSchema(faqs) {
    return {
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
}

// Function to inject structured data into the page
function injectStructuredData(schema) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
}

// Example usage:
document.addEventListener('DOMContentLoaded', () => {
    // Generate and inject tool schema
    const toolSchema = generateToolSchema({
        name: "Image Resizer",
        features: ["Resize images", "Maintain aspect ratio", "Multiple format support"],
        description: "Free online tool to resize images while maintaining quality",
        url: "https://your-domain.com/tools/image-resizer"
    });
    injectStructuredData(toolSchema);

    // Generate and inject breadcrumb schema
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "https://your-domain.com/" },
        { name: "Tools", url: "https://your-domain.com/tools" },
        { name: "Image Resizer", url: "https://your-domain.com/tools/image-resizer" }
    ]);
    injectStructuredData(breadcrumbSchema);

    // Generate and inject FAQ schema
    const faqSchema = generateFAQSchema([
        {
            question: "How do I resize an image?",
            answer: "Simply upload your image, select the desired dimensions, and click the resize button."
        },
        {
            question: "What image formats are supported?",
            answer: "We support JPG, PNG, GIF, and WebP formats."
        }
    ]);
    injectStructuredData(faqSchema);
}); 