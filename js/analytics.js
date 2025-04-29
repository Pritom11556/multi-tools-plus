// Google Analytics Implementation
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

// Initialize Google Analytics with your tracking ID
ga('create', 'UA-XXXXXXXXX-X', 'auto');

// Enhanced Ecommerce tracking
ga('require', 'ec');

// Track page views with enhanced parameters
function trackPageView(pageTitle, pagePath) {
    ga('send', 'pageview', {
        'page': pagePath || window.location.pathname,
        'title': pageTitle || document.title
    });
}

// Track tool usage
function trackToolUsage(toolName, action) {
    ga('send', 'event', 'Tool', action, toolName);
}

// Track user engagement
function trackEngagement(elementName, action) {
    ga('send', 'event', 'Engagement', action, elementName);
}

// Track form submissions
function trackFormSubmission(formName) {
    ga('send', 'event', 'Form', 'Submit', formName);
}

// Track outbound links
function trackOutboundLink(url) {
    ga('send', 'event', 'Outbound', 'Click', url);
}

// Track search queries
function trackSearch(query) {
    ga('send', 'event', 'Search', 'Query', query);
}

// Track errors
function trackError(errorType, errorMessage) {
    ga('send', 'event', 'Error', errorType, errorMessage);
}

// Track user timing
function trackUserTiming(category, variable, value) {
    ga('send', 'timing', category, variable, value);
}

// Track social interactions
function trackSocialInteraction(network, action, target) {
    ga('send', 'social', network, action, target);
}

// Track custom dimensions
function trackCustomDimension(dimensionIndex, value) {
    ga('set', 'dimension' + dimensionIndex, value);
}

// Track custom metrics
function trackCustomMetric(metricIndex, value) {
    ga('send', 'event', 'Custom Metric', 'Value', null, {['metric' + metricIndex]: value});
}

// Track user demographics (requires user consent)
function trackUserDemographics(age, gender) {
    ga('set', 'dimension1', age);
    ga('set', 'dimension2', gender);
}

// Track user interests (requires user consent)
function trackUserInterests(interests) {
    ga('set', 'dimension3', interests.join(','));
}

// Track user location (requires user consent)
function trackUserLocation(country, region, city) {
    ga('set', 'dimension4', country);
    ga('set', 'dimension5', region);
    ga('set', 'dimension6', city);
}

// Track user device
function trackUserDevice() {
    const device = {
        'userAgent': navigator.userAgent,
        'screenResolution': window.screen.width + 'x' + window.screen.height,
        'colorDepth': window.screen.colorDepth,
        'language': navigator.language,
        'platform': navigator.platform
    };
    
    ga('set', 'dimension7', JSON.stringify(device));
}

// Track user session duration
let sessionStartTime = new Date().getTime();
window.addEventListener('beforeunload', function() {
    const sessionDuration = Math.round((new Date().getTime() - sessionStartTime) / 1000);
    ga('send', 'event', 'Session', 'Duration', null, {'metric1': sessionDuration});
});

// Track scroll depth
let maxScroll = 0;
window.addEventListener('scroll', function() {
    const scrollPercent = Math.round((window.scrollY + window.innerHeight) / document.body.scrollHeight * 100);
    if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if (maxScroll % 25 === 0) { // Track at 25%, 50%, 75%, 100%
            ga('send', 'event', 'Scroll', 'Depth', maxScroll + '%');
        }
    }
});

// Track time on page
let pageStartTime = new Date().getTime();
window.addEventListener('beforeunload', function() {
    const timeOnPage = Math.round((new Date().getTime() - pageStartTime) / 1000);
    ga('send', 'event', 'Time', 'On Page', null, {'metric2': timeOnPage});
});

// Initialize tracking
document.addEventListener('DOMContentLoaded', function() {
    // Track initial page view
    trackPageView();
    
    // Track user device
    trackUserDevice();
    
    // Track tool usage for all tools
    document.querySelectorAll('.tool-button').forEach(function(button) {
        button.addEventListener('click', function() {
            trackToolUsage(this.dataset.toolName, 'Click');
        });
    });
    
    // Track form submissions
    document.querySelectorAll('form').forEach(function(form) {
        form.addEventListener('submit', function() {
            trackFormSubmission(this.id || this.name || 'Unknown Form');
        });
    });
    
    // Track outbound links
    document.querySelectorAll('a[href^="http"]').forEach(function(link) {
        if (!link.href.includes(window.location.hostname)) {
            link.addEventListener('click', function(e) {
                trackOutboundLink(this.href);
            });
        }
    });
    
    // Track search queries
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            const searchInput = this.querySelector('input[type="search"], input[type="text"]');
            if (searchInput && searchInput.value) {
                trackSearch(searchInput.value);
            }
        });
    }
    
    // Track errors
    window.addEventListener('error', function(e) {
        trackError('JavaScript', e.message + ' at ' + e.filename + ':' + e.lineno);
    });
    
    // Track user timing for page load
    if (window.performance && window.performance.timing) {
        const pageLoadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        trackUserTiming('Page Load', 'Total', pageLoadTime);
    }
}); 