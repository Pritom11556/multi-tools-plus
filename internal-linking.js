// Internal Linking Strategy Implementation

class InternalLinking {
    constructor(options = {}) {
        this.options = {
            relatedContentContainer: options.relatedContentContainer || '.related-content',
            maxRelatedItems: options.maxRelatedItems || 3,
            excludeClasses: options.excludeClasses || ['no-related', 'navigation'],
            ...options
        };
        
        this.contentMap = new Map();
        this.keywordMap = new Map();
    }
    
    // Register content for internal linking
    registerContent(id, content, keywords = [], url = '') {
        this.contentMap.set(id, {
            content,
            keywords,
            url,
            links: 0
        });
        
        // Add keywords to keyword map
        keywords.forEach(keyword => {
            if (!this.keywordMap.has(keyword)) {
                this.keywordMap.set(keyword, []);
            }
            this.keywordMap.get(keyword).push(id);
        });
    }
    
    // Find related content based on keywords
    findRelatedContent(contentId, maxResults = this.options.maxRelatedItems) {
        const content = this.contentMap.get(contentId);
        if (!content) return [];
        
        // Get all content IDs that share keywords with this content
        const relatedIds = new Set();
        content.keywords.forEach(keyword => {
            const relatedContentIds = this.keywordMap.get(keyword) || [];
            relatedContentIds.forEach(id => {
                if (id !== contentId) {
                    relatedIds.add(id);
                }
            });
        });
        
        // Convert to array and sort by number of shared keywords
        const relatedContent = Array.from(relatedIds).map(id => {
            const relatedItem = this.contentMap.get(id);
            const sharedKeywords = content.keywords.filter(keyword => 
                relatedItem.keywords.includes(keyword)
            ).length;
            
            return {
                id,
                ...relatedItem,
                relevance: sharedKeywords
            };
        });
        
        // Sort by relevance and limit results
        return relatedContent
            .sort((a, b) => b.relevance - a.relevance)
            .slice(0, maxResults);
    }
    
    // Generate related content HTML
    generateRelatedContent(contentId) {
        const container = document.querySelector(this.options.relatedContentContainer);
        if (!container) return;
        
        const relatedContent = this.findRelatedContent(contentId);
        if (relatedContent.length === 0) return;
        
        // Clear existing content
        container.innerHTML = '';
        
        // Create heading
        const heading = document.createElement('h2');
        heading.textContent = 'Related Content';
        heading.className = 'related-content-heading';
        container.appendChild(heading);
        
        // Create list
        const list = document.createElement('ul');
        list.className = 'related-content-list';
        
        // Add related items
        relatedContent.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = 'related-content-item';
            
            const link = document.createElement('a');
            link.href = item.url || `#${item.id}`;
            link.textContent = item.content;
            link.className = 'related-content-link';
            
            listItem.appendChild(link);
            list.appendChild(listItem);
        });
        
        container.appendChild(list);
    }
    
    // Auto-link keywords in content
    autoLinkKeywords(contentElement, excludeElements = []) {
        if (!contentElement) return;
        
        // Get all text nodes in the content
        const walker = document.createTreeWalker(
            contentElement,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            // Skip if parent is in exclude list
            if (excludeElements.some(selector => 
                node.parentElement.closest(selector)
            )) continue;
            
            textNodes.push(node);
        }
        
        // Sort keywords by length (longest first) to avoid partial matches
        const keywords = Array.from(this.keywordMap.keys())
            .sort((a, b) => b.length - a.length);
        
        // Process each text node
        textNodes.forEach(textNode => {
            let text = textNode.textContent;
            let modified = false;
            
            keywords.forEach(keyword => {
                // Skip if keyword is already linked
                if (textNode.parentElement.closest('a')) return;
                
                // Create regex to match whole words only
                const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
                
                if (regex.test(text)) {
                    // Get content IDs for this keyword
                    const contentIds = this.keywordMap.get(keyword) || [];
                    if (contentIds.length === 0) return;
                    
                    // Get the most relevant content (least linked)
                    const contentId = contentIds.reduce((best, current) => {
                        const bestContent = this.contentMap.get(best);
                        const currentContent = this.contentMap.get(current);
                        return bestContent.links <= currentContent.links ? best : current;
                    });
                    
                    // Increment link count
                    this.contentMap.get(contentId).links++;
                    
                    // Replace text with link
                    text = text.replace(regex, match => {
                        const content = this.contentMap.get(contentId);
                        const url = content.url || `#${contentId}`;
                        return `<a href="${url}" class="auto-link">${match}</a>`;
                    });
                    
                    modified = true;
                }
            });
            
            // Update text node if modified
            if (modified) {
                const wrapper = document.createElement('span');
                wrapper.innerHTML = text;
                textNode.parentNode.replaceChild(wrapper, textNode);
            }
        });
    }
    
    // Add CSS for related content
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .related-content {
                margin: 2rem 0;
                padding: 1.5rem;
                background-color: #f8f9fa;
                border-radius: 8px;
            }
            
            .related-content-heading {
                font-size: 1.5rem;
                margin-bottom: 1rem;
                color: #333;
            }
            
            .related-content-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            
            .related-content-item {
                margin-bottom: 0.5rem;
            }
            
            .related-content-link {
                color: #4a6bff;
                text-decoration: none;
                transition: color 0.2s;
            }
            
            .related-content-link:hover {
                color: #3955cc;
                text-decoration: underline;
            }
            
            .auto-link {
                color: #4a6bff;
                text-decoration: none;
                transition: color 0.2s;
            }
            
            .auto-link:hover {
                color: #3955cc;
                text-decoration: underline;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize internal linking
document.addEventListener('DOMContentLoaded', function() {
    // Create instance
    const internalLinking = new InternalLinking();
    
    // Add styles
    internalLinking.addStyles();
    
    // Example: Register some content
    internalLinking.registerContent('image-resizer', 'Image Resizer Tool', 
        ['image', 'resize', 'photo', 'edit'], '/tools/image-resizer');
    
    internalLinking.registerContent('text-converter', 'Text Case Converter', 
        ['text', 'case', 'convert', 'format'], '/tools/text-converter');
    
    internalLinking.registerContent('color-picker', 'Color Picker Tool', 
        ['color', 'picker', 'hex', 'rgb'], '/tools/color-picker');
    
    internalLinking.registerContent('calculator', 'Basic Calculator', 
        ['calculator', 'math', 'compute'], '/tools/calculator');
    
    // Example: Generate related content for a specific content ID
    const contentId = window.location.pathname.split('/').pop() || 'image-resizer';
    internalLinking.generateRelatedContent(contentId);
    
    // Example: Auto-link keywords in main content
    const mainContent = document.querySelector('main');
    if (mainContent) {
        internalLinking.autoLinkKeywords(mainContent, ['.breadcrumbs', 'nav', 'footer']);
    }
}); 