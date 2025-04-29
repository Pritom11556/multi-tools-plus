// Schema markup for reviews and ratings
const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Multi-Tools Hub",
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
        "ratingCount": "1250",
        "bestRating": "5",
        "worstRating": "1"
    },
    "review": [
        {
            "@type": "Review",
            "author": {
                "@type": "Person",
                "name": "John Smith"
            },
            "datePublished": "2024-04-15",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
            },
            "reviewBody": "Amazing collection of tools! The PDF to Word converter works perfectly and saved me so much time."
        },
        {
            "@type": "Review",
            author: {
                "@type": "Person",
                "name": "Sarah Johnson"
            },
            "datePublished": "2024-04-10",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "4",
                "bestRating": "5"
            },
            "reviewBody": "Very useful tools, especially the image compression feature. Would love to see more file format support."
        }
    ]
};

// Function to add review schema to the page
function addReviewSchema() {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(reviewSchema);
    document.head.appendChild(script);
}

// Function to dynamically add a new review
function addNewReview(authorName, rating, reviewText) {
    const newReview = {
        "@type": "Review",
        "author": {
            "@type": "Person",
            "name": authorName
        },
        "datePublished": new Date().toISOString().split('T')[0],
        "reviewRating": {
            "@type": "Rating",
            "ratingValue": rating.toString(),
            "bestRating": "5"
        },
        "reviewBody": reviewText
    };

    reviewSchema.review.push(newReview);
    
    // Update aggregate rating
    const totalReviews = reviewSchema.review.length;
    const totalRating = reviewSchema.review.reduce((sum, review) => 
        sum + parseInt(review.reviewRating.ratingValue), 0);
    reviewSchema.aggregateRating.ratingValue = (totalRating / totalReviews).toFixed(1);
    reviewSchema.aggregateRating.ratingCount = totalReviews.toString();

    // Update schema on page
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
        existingScript.text = JSON.stringify(reviewSchema);
    } else {
        addReviewSchema();
    }
}

// Initialize review schema when the page loads
document.addEventListener('DOMContentLoaded', addReviewSchema);

// Export functions for use in other files
export { addNewReview, addReviewSchema }; 