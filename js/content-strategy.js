// Content Strategy Implementation

class ContentStrategy {
    constructor(options = {}) {
        this.options = {
            keywordContainer: options.keywordContainer || '.keyword-suggestions',
            maxKeywords: options.maxKeywords || 5,
            ...options
        };
        
        this.keywords = new Map();
        this.contentTypes = new Map();
    }
    
    // Register a keyword with its importance and related terms
    registerKeyword(keyword, importance = 1, relatedTerms = []) {
        this.keywords.set(keyword.toLowerCase(), {
            importance,
            relatedTerms: relatedTerms.map(term => term.toLowerCase()),
            usageCount: 0
        });
    }
    
    // Register a content type with its structure
    registerContentType(type, structure) {
        this.contentTypes.set(type, structure);
    }
    
    // Generate keyword suggestions for a given content
    generateKeywordSuggestions(content) {
        if (!content) return [];
        
        // Convert content to lowercase for matching
        const contentLower = content.toLowerCase();
        
        // Find all keywords in the content
        const foundKeywords = Array.from(this.keywords.keys())
            .filter(keyword => contentLower.includes(keyword))
            .map(keyword => ({
                keyword,
                ...this.keywords.get(keyword)
            }));
        
        // Sort by importance
        foundKeywords.sort((a, b) => b.importance - a.importance);
        
        // Get missing important keywords
        const missingKeywords = Array.from(this.keywords.entries())
            .filter(([keyword, data]) => 
                !contentLower.includes(keyword) && 
                data.importance >= 2
            )
            .map(([keyword, data]) => ({
                keyword,
                ...data
            }))
            .sort((a, b) => b.importance - a.importance);
        
        return {
            usedKeywords: foundKeywords.slice(0, this.options.maxKeywords),
            missingKeywords: missingKeywords.slice(0, this.options.maxKeywords)
        };
    }
    
    // Generate content structure suggestions
    generateContentStructure(type) {
        const structure = this.contentTypes.get(type);
        if (!structure) return null;
        
        return {
            type,
            structure,
            recommendations: this._generateRecommendations(structure)
        };
    }
    
    // Generate SEO recommendations based on content structure
    _generateRecommendations(structure) {
        const recommendations = [];
        
        // Check for title
        if (structure.title && !document.querySelector('h1')) {
            recommendations.push('Add an H1 title to your content');
        }
        
        // Check for meta description
        if (structure.metaDescription && !document.querySelector('meta[name="description"]')) {
            recommendations.push('Add a meta description to your content');
        }
        
        // Check for headings
        if (structure.headings) {
            const headings = document.querySelectorAll('h2, h3, h4');
            if (headings.length < structure.headings.min) {
                recommendations.push(`Add at least ${structure.headings.min} subheadings to your content`);
            }
        }
        
        // Check for images
        if (structure.images) {
            const images = document.querySelectorAll('img');
            if (images.length < structure.images.min) {
                recommendations.push(`Add at least ${structure.images.min} images to your content`);
            }
            
            // Check for alt text
            const imagesWithoutAlt = Array.from(images).filter(img => !img.alt);
            if (imagesWithoutAlt.length > 0) {
                recommendations.push(`Add alt text to ${imagesWithoutAlt.length} images`);
            }
        }
        
        // Check for internal links
        if (structure.internalLinks) {
            const internalLinks = document.querySelectorAll('a[href^="/"]');
            if (internalLinks.length < structure.internalLinks.min) {
                recommendations.push(`Add at least ${structure.internalLinks.min} internal links to your content`);
            }
        }
        
        // Check for external links
        if (structure.externalLinks) {
            const externalLinks = document.querySelectorAll('a[href^="http"]');
            if (externalLinks.length < structure.externalLinks.min) {
                recommendations.push(`Add at least ${structure.externalLinks.min} external links to your content`);
            }
        }
        
        // Check for word count
        if (structure.wordCount) {
            const text = document.body.textContent;
            const wordCount = text.trim().split(/\s+/).length;
            if (wordCount < structure.wordCount.min) {
                recommendations.push(`Increase content length to at least ${structure.wordCount.min} words`);
            }
        }
        
        return recommendations;
    }
    
    // Generate keyword suggestions HTML
    generateKeywordSuggestionsHTML(content) {
        const container = document.querySelector(this.options.keywordContainer);
        if (!container) return;
        
        const suggestions = this.generateKeywordSuggestions(content);
        
        // Clear existing content
        container.innerHTML = '';
        
        // Create heading
        const heading = document.createElement('h2');
        heading.textContent = 'SEO Keyword Suggestions';
        heading.className = 'keyword-suggestions-heading';
        container.appendChild(heading);
        
        // Create used keywords section
        if (suggestions.usedKeywords.length > 0) {
            const usedSection = document.createElement('div');
            usedSection.className = 'keyword-section';
            
            const usedHeading = document.createElement('h3');
            usedHeading.textContent = 'Keywords Used';
            usedSection.appendChild(usedHeading);
            
            const usedList = document.createElement('ul');
            usedList.className = 'keyword-list';
            
            suggestions.usedKeywords.forEach(item => {
                const listItem = document.createElement('li');
                listItem.className = 'keyword-item used';
                
                const keyword = document.createElement('span');
                keyword.className = 'keyword';
                keyword.textContent = item.keyword;
                
                const importance = document.createElement('span');
                importance.className = 'importance';
                importance.textContent = 'Importance: ' + item.importance;
                
                listItem.appendChild(keyword);
                listItem.appendChild(importance);
                usedList.appendChild(listItem);
            });
            
            usedSection.appendChild(usedList);
            container.appendChild(usedSection);
        }
        
        // Create missing keywords section
        if (suggestions.missingKeywords.length > 0) {
            const missingSection = document.createElement('div');
            missingSection.className = 'keyword-section';
            
            const missingHeading = document.createElement('h3');
            missingHeading.textContent = 'Suggested Keywords';
            missingSection.appendChild(missingHeading);
            
            const missingList = document.createElement('ul');
            missingList.className = 'keyword-list';
            
            suggestions.missingKeywords.forEach(item => {
                const listItem = document.createElement('li');
                listItem.className = 'keyword-item missing';
                
                const keyword = document.createElement('span');
                keyword.className = 'keyword';
                keyword.textContent = item.keyword;
                
                const importance = document.createElement('span');
                importance.className = 'importance';
                importance.textContent = 'Importance: ' + item.importance;
                
                listItem.appendChild(keyword);
                listItem.appendChild(importance);
                missingList.appendChild(listItem);
            });
            
            missingSection.appendChild(missingList);
            container.appendChild(missingSection);
        }
    }
    
    // Add CSS for keyword suggestions
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .keyword-suggestions {
                margin: 2rem 0;
                padding: 1.5rem;
                background-color: #f8f9fa;
                border-radius: 8px;
            }
            
            .keyword-suggestions-heading {
                font-size: 1.5rem;
                margin-bottom: 1rem;
                color: #333;
            }
            
            .keyword-section {
                margin-bottom: 1.5rem;
            }
            
            .keyword-section h3 {
                font-size: 1.2rem;
                margin-bottom: 0.5rem;
                color: #444;
            }
            
            .keyword-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            
            .keyword-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.5rem;
                margin-bottom: 0.5rem;
                border-radius: 4px;
            }
            
            .keyword-item.used {
                background-color: #e8f5e9;
                border-left: 4px solid #4caf50;
            }
            
            .keyword-item.missing {
                background-color: #fff3e0;
                border-left: 4px solid #ff9800;
            }
            
            .keyword {
                font-weight: 500;
            }
            
            .importance {
                font-size: 0.8rem;
                color: #666;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize content strategy
document.addEventListener('DOMContentLoaded', function() {
    // Create instance
    const contentStrategy = new ContentStrategy();
    
    // Add styles
    contentStrategy.addStyles();
    
    // Register keywords
    contentStrategy.registerKeyword('online tools', 3, ['free tools', 'web tools', 'utility tools']);
    contentStrategy.registerKeyword('image resizer', 2, ['resize images', 'photo resizer', 'image editor']);
    contentStrategy.registerKeyword('text converter', 2, ['case converter', 'text formatter', 'text case']);
    contentStrategy.registerKeyword('color picker', 2, ['color selector', 'hex color', 'rgb color']);
    contentStrategy.registerKeyword('calculator', 2, ['math calculator', 'compute', 'calculate']);
    contentStrategy.registerKeyword('free', 1, ['no cost', 'gratis', 'complimentary']);
    contentStrategy.registerKeyword('easy to use', 1, ['simple', 'user-friendly', 'intuitive']);
    contentStrategy.registerKeyword('no registration', 1, ['no signup', 'no account', 'instant access']);
    
    // Register content types
    contentStrategy.registerContentType('tool', {
        title: true,
        metaDescription: true,
        headings: { min: 2 },
        images: { min: 1 },
        internalLinks: { min: 2 },
        externalLinks: { min: 1 },
        wordCount: { min: 300 }
    });
    
    contentStrategy.registerContentType('blog', {
        title: true,
        metaDescription: true,
        headings: { min: 3 },
        images: { min: 2 },
        internalLinks: { min: 3 },
        externalLinks: { min: 2 },
        wordCount: { min: 800 }
    });
    
    // Example: Generate keyword suggestions for the current page
    const pageContent = document.body.textContent;
    contentStrategy.generateKeywordSuggestionsHTML(pageContent);
    
    // Example: Generate content structure suggestions
    const pageType = window.location.pathname.includes('/blog/') ? 'blog' : 'tool';
    const structureSuggestions = contentStrategy.generateContentStructure(pageType);
    
    if (structureSuggestions && structureSuggestions.recommendations.length > 0) {
        console.log('Content Structure Recommendations:', structureSuggestions.recommendations);
    }
}); 