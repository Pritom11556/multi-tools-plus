js// Breadcrumb Navigation Implementation

class Breadcrumbs {
    constructor(options = {}) {
        this.options = {
            container: options.container || '.breadcrumbs',
            homeText: options.homeText || 'Home',
            homeUrl: options.homeUrl || '/',
            separator: options.separator || '›',
            showHome: options.showHome !== false,
            schema: options.schema !== false,
            ...options
        };
        
        this.items = [];
        this.container = document.querySelector(this.options.container);
        
        if (!this.container) {
            console.error('Breadcrumb container not found');
            return;
        }
    }
    
    // Add a breadcrumb item
    addItem(text, url) {
        this.items.push({ text, url });
        return this;
    }
    
    // Generate breadcrumb HTML
    generate() {
        if (!this.container) return;
        
        // Clear existing content
        this.container.innerHTML = '';
        
        // Create breadcrumb list
        const list = document.createElement('ul');
        list.className = 'breadcrumb-list';
        
        // Add home item if enabled
        if (this.options.showHome) {
            const homeItem = document.createElement('li');
            homeItem.className = 'breadcrumb-item home';
            
            const homeLink = document.createElement('a');
            homeLink.href = this.options.homeUrl;
            homeLink.textContent = this.options.homeText;
            homeLink.setAttribute('aria-label', 'Go to homepage');
            
            homeItem.appendChild(homeLink);
            list.appendChild(homeItem);
            
            // Add separator after home
            if (this.items.length > 0) {
                const separator = document.createElement('li');
                separator.className = 'breadcrumb-separator';
                separator.textContent = this.options.separator;
                separator.setAttribute('aria-hidden', 'true');
                list.appendChild(separator);
            }
        }
        
        // Add other items
        this.items.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'breadcrumb-item';
            
            // Check if this is the last item
            const isLast = index === this.items.length - 1;
            
            if (isLast) {
                // Last item is not a link
                listItem.textContent = item.text;
                listItem.setAttribute('aria-current', 'page');
            } else {
                // Create link for non-last items
                const link = document.createElement('a');
                link.href = item.url;
                link.textContent = item.text;
                listItem.appendChild(link);
                
                // Add separator after non-last items
                const separator = document.createElement('li');
                separator.className = 'breadcrumb-separator';
                separator.textContent = this.options.separator;
                separator.setAttribute('aria-hidden', 'true');
                list.appendChild(separator);
            }
            
            list.appendChild(listItem);
        });
        
        // Add the list to the container
        this.container.appendChild(list);
        
        // Add schema markup if enabled
        if (this.options.schema) {
            this.addSchemaMarkup();
        }
        
        return this;
    }
    
    // Add schema.org markup for breadcrumbs
    addSchemaMarkup() {
        const schema = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': []
        };
        
        // Add home item if enabled
        if (this.options.showHome) {
            schema.itemListElement.push({
                '@type': 'ListItem',
                'position': 1,
                'name': this.options.homeText,
                'item': this.options.homeUrl
            });
        }
        
        // Add other items
        this.items.forEach((item, index) => {
            schema.itemListElement.push({
                '@type': 'ListItem',
                'position': this.options.showHome ? index + 2 : index + 1,
                'name': item.text,
                'item': item.url
            });
        });
        
        // Create and append schema script
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);
    }
    
    // Auto-generate breadcrumbs based on URL path
    static autoGenerate(options = {}) {
        const breadcrumbs = new Breadcrumbs(options);
        
        // Get current path
        const path = window.location.pathname;
        const pathParts = path.split('/').filter(part => part);
        
        // Build breadcrumb items
        let currentPath = '';
        
        pathParts.forEach((part, index) => {
            currentPath += '/' + part;
            
            // Format the text (capitalize, replace hyphens with spaces)
            const text = part
                .replace(/-/g, ' ')
                .replace(/\b\w/g, l => l.toUpperCase());
            
            breadcrumbs.addItem(text, currentPath);
        });
        
        return breadcrumbs.generate();
    }
}

// Add CSS for breadcrumbs
function addBreadcrumbStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .breadcrumbs {
            margin: 1rem 0;
            font-size: 0.9rem;
        }
        
        .breadcrumb-list {
            display: flex;
            flex-wrap: wrap;
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .breadcrumb-item {
            display: flex;
            align-items: center;
        }
        
        .breadcrumb-item a {
            color: #4a6bff;
            text-decoration: none;
            transition: color 0.2s;
        }
        
        .breadcrumb-item a:hover {
            color: #3955cc;
            text-decoration: underline;
        }
        
        .breadcrumb-separator {
            margin: 0 0.5rem;
            color: #666;
        }
        
        .breadcrumb-item:last-child {
            color: #333;
            font-weight: 500;
        }
        
        @media (max-width: 768px) {
            .breadcrumbs {
                font-size: 0.8rem;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize breadcrumbs
document.addEventListener('DOMContentLoaded', function() {
    // Add styles
    addBreadcrumbStyles();
    
    // Auto-generate breadcrumbs if container exists
    if (document.querySelector('.breadcrumbs')) {
        Breadcrumbs.autoGenerate();
    }
}); 