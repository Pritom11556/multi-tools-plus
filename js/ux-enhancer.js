// Advanced UX and Visual Enhancements
import { generateMetaTags } from './seo-optimizations.js';

// Visual Enhancement Optimizer
const visualEnhancer = {
    // Add smooth animations
    addSmoothAnimations: () => {
        const animations = document.createElement('style');
        animations.textContent = `
            /* Fade in animations */
            .fade-in {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            }
            .fade-in.visible {
                opacity: 1;
                transform: translateY(0);
            }

            /* Hover effects */
            .hover-effect {
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            .hover-effect:hover {
                transform: translateY(-5px);
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            }

            /* Loading animations */
            .loading-skeleton {
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: loading 1.5s infinite;
            }
            @keyframes loading {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
            }

            /* Card hover effects */
            .card {
                transition: all 0.3s ease;
                border-radius: 8px;
                overflow: hidden;
            }
            .card:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 20px rgba(0,0,0,0.1);
            }

            /* Button animations */
            .btn {
                position: relative;
                overflow: hidden;
            }
            .btn::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: rgba(255,255,255,0.2);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                transition: width 0.3s ease, height 0.3s ease;
            }
            .btn:active::after {
                width: 200px;
                height: 200px;
            }
        `;
        document.head.appendChild(animations);
    },

    // Add visual feedback
    addVisualFeedback: () => {
        // Add ripple effect to buttons
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                button.appendChild(ripple);

                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${e.clientX - rect.left - size/2}px`;
                ripple.style.top = `${e.clientY - rect.top - size/2}px`;

                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Add hover effects to cards
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    },

    // Add loading states
    addLoadingStates: () => {
        // Add loading skeleton to images
        document.querySelectorAll('img').forEach(img => {
            if (!img.complete) {
                img.classList.add('loading-skeleton');
                img.addEventListener('load', () => {
                    img.classList.remove('loading-skeleton');
                    img.classList.add('fade-in');
                });
            }
        });

        // Add loading indicator to forms
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', () => {
                const submitBtn = form.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner"></span> Processing...';
                }
            });
        });
    }
};

// Interactive UX Optimizer
const interactiveUXOptimizer = {
    // Add scroll animations
    addScrollAnimations: () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.fade-in').forEach(element => {
            observer.observe(element);
        });
    },

    // Add tooltips
    addTooltips: () => {
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            const tooltip = document.createElement('div');
            tooltip.classList.add('tooltip');
            tooltip.textContent = element.dataset.tooltip;
            document.body.appendChild(tooltip);

            element.addEventListener('mouseenter', (e) => {
                const rect = element.getBoundingClientRect();
                tooltip.style.left = `${rect.left + rect.width/2}px`;
                tooltip.style.top = `${rect.top - tooltip.offsetHeight - 5}px`;
                tooltip.classList.add('visible');
            });

            element.addEventListener('mouseleave', () => {
                tooltip.classList.remove('visible');
            });
        });
    },

    // Add keyboard navigation
    addKeyboardNavigation: () => {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }
};

// Accessibility Enhancer
const accessibilityEnhancer = {
    // Add ARIA labels
    addAriaLabels: () => {
        // Add ARIA labels to buttons without text
        document.querySelectorAll('button:not([aria-label])').forEach(button => {
            if (!button.textContent.trim()) {
                const icon = button.querySelector('i, img');
                if (icon) {
                    button.setAttribute('aria-label', icon.alt || icon.className);
                }
            }
        });

        // Add ARIA labels to images without alt text
        document.querySelectorAll('img:not([alt])').forEach(img => {
            img.setAttribute('alt', img.src.split('/').pop().split('.')[0].replace(/-/g, ' '));
        });
    },

    // Add skip links
    addSkipLinks: () => {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.classList.add('skip-link');
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
    },

    // Add focus styles
    addFocusStyles: () => {
        const focusStyles = document.createElement('style');
        focusStyles.textContent = `
            :focus {
                outline: 2px solid #007bff;
                outline-offset: 2px;
            }
            .keyboard-navigation :focus {
                outline: 3px solid #007bff;
                outline-offset: 3px;
            }
        `;
        document.head.appendChild(focusStyles);
    }
};

// Initialize UX Enhancements
const initializeUXEnhancements = () => {
    // Initialize visual enhancements
    visualEnhancer.addSmoothAnimations();
    visualEnhancer.addVisualFeedback();
    visualEnhancer.addLoadingStates();

    // Initialize interactive UX
    interactiveUXOptimizer.addScrollAnimations();
    interactiveUXOptimizer.addTooltips();
    interactiveUXOptimizer.addKeyboardNavigation();

    // Initialize accessibility
    accessibilityEnhancer.addAriaLabels();
    accessibilityEnhancer.addSkipLinks();
    accessibilityEnhancer.addFocusStyles();

    // Add UX meta tags
    generateMetaTags({
        'theme-color': '#007bff',
        'color-scheme': 'light dark',
        'preferred-color-scheme': 'light'
    });
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeUXEnhancements);

// Export functions for use in other files
export {
    visualEnhancer,
    interactiveUXOptimizer,
    accessibilityEnhancer,
    initializeUXEnhancements
}; 