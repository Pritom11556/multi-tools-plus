/**
 * Multi-Tools Hub - Main JavaScript
 * Handles dynamic functionality for the Multi-Tools Hub
 */

// Tool data structure
const toolsData = {
    imageTools: [
        {
            id: 'image-to-png',
            name: 'Image to PNG Converter',
            description: 'Convert your images to PNG format with high quality',
            icon: 'fa-image',
            url: 'tools/image-to-png.html'
        },
        {
            id: 'image-to-jpg',
            name: 'Image to JPG Converter',
            description: 'Convert your images to JPG format',
            icon: 'fa-file-image',
            url: 'tools/image-to-jpg.html'
        },
        // Add more image tools...
    ],
    textTools: [
        {
            id: 'word-counter',
            name: 'Word Counter',
            description: 'Count words, characters, and paragraphs in your text',
            icon: 'fa-calculator',
            url: 'tools/word-counter.html'
        },
        {
            id: 'case-converter',
            name: 'Case Converter',
            description: 'Convert text case (uppercase, lowercase, title case)',
            icon: 'fa-font',
            url: 'tools/case-converter.html'
        },
        // Add more text tools...
    ],
    calculatorTools: [
        {
            id: 'percentage-calculator',
            name: 'Percentage Calculator',
            description: 'Calculate percentages easily',
            icon: 'fa-percent',
            url: 'tools/percentage-calculator.html'
        },
        {
            id: 'bmi-calculator',
            name: 'BMI Calculator',
            description: 'Calculate your Body Mass Index',
            icon: 'fa-weight',
            url: 'tools/bmi-calculator.html'
        },
        // Add more calculator tools...
    ]
};

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load header and footer
    loadHeader();
    loadFooter();
    
    // Initialize search functionality
    initSearch();
    
    // Initialize tool cards
    initToolCards();
    
    // Load ads
    loadAds();
    
    // Check if all tools exist
    checkAllTools();
});

/**
 * Load the header dynamically
 */
function loadHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        const header = `
            <header class="site-header">
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container">
                        <a class="navbar-brand" href="index.html">
                            <i class="fas fa-tools me-2"></i>Multi-Tools Hub
                        </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav ms-auto">
                                <li class="nav-item">
                                    <a class="nav-link" href="index.html">Home</a>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="imageToolsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Image Tools
                                    </a>
                                    <ul class="dropdown-menu" aria-labelledby="imageToolsDropdown">
                                        <li><a class="dropdown-item" href="tools/image-to-jpg.html">Image to JPG</a></li>
                                        <li><a class="dropdown-item" href="tools/image-resizer.html">Image Resizer</a></li>
                                        <li><a class="dropdown-item" href="tools/image-compressor.html">Image Compressor</a></li>
                                        <li><a class="dropdown-item" href="tools/gif-maker.html">GIF Maker</a></li>
                                        <li><a class="dropdown-item" href="tools/qr-code-generator.html">QR Code Generator</a></li>
                                        <li><a class="dropdown-item" href="tools/screenshot-to-pdf.html">Screenshot to PDF</a></li>
                                    </ul>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="calculatorToolsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Calculators
                                    </a>
                                    <ul class="dropdown-menu" aria-labelledby="calculatorToolsDropdown">
                                        <li><a class="dropdown-item" href="tools/percentage-calculator.html">Percentage Calculator</a></li>
                                        <li><a class="dropdown-item" href="tools/age-calculator.html">Age Calculator</a></li>
                                        <li><a class="dropdown-item" href="tools/bmi-calculator.html">BMI Calculator</a></li>
                                        <li><a class="dropdown-item" href="tools/loan-emi-calculator.html">Loan EMI Calculator</a></li>
                                        <li><a class="dropdown-item" href="tools/scientific-calculator.html">Scientific Calculator</a></li>
                                        <li><a class="dropdown-item" href="tools/discount-calculator.html">Discount Calculator</a></li>
                                        <li><a class="dropdown-item" href="tools/currency-converter.html">Currency Converter</a></li>
                                        <li><a class="dropdown-item" href="tools/time-zone-converter.html">Time Zone Converter</a></li>
                                        <li><a class="dropdown-item" href="tools/binary-decimal-converter.html">Binary to Decimal</a></li>
                                        <li><a class="dropdown-item" href="tools/tip-calculator.html">Tip Calculator</a></li>
                                    </ul>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#about">About</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        `;
        headerPlaceholder.innerHTML = header;
    }
}

/**
 * Load the footer dynamically
 */
function loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        const footer = `
            <footer class="site-footer bg-light py-5">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-4 mb-4 mb-lg-0">
                            <h5 class="mb-3">Multi-Tools Hub</h5>
                            <p>Your all-in-one online tools collection for image processing, calculations, conversions, and more.</p>
                            <div class="social-links mt-3">
                                <a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a>
                                <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
                                <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
                                <a href="#" class="social-link"><i class="fab fa-linkedin-in"></i></a>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-4 mb-4 mb-md-0">
                            <h5 class="mb-3">Quick Links</h5>
                            <ul class="list-unstyled">
                                <li><a href="index.html">Home</a></li>
                                <li><a href="#about">About</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Terms of Service</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>
                        <div class="col-lg-3 col-md-4 mb-4 mb-md-0">
                            <h5 class="mb-3">Image Tools</h5>
                            <ul class="list-unstyled">
                                <li><a href="tools/image-to-jpg.html">Image to JPG</a></li>
                                <li><a href="tools/image-resizer.html">Image Resizer</a></li>
                                <li><a href="tools/image-compressor.html">Image Compressor</a></li>
                                <li><a href="tools/gif-maker.html">GIF Maker</a></li>
                                <li><a href="tools/qr-code-generator.html">QR Code Generator</a></li>
                            </ul>
                        </div>
                        <div class="col-lg-3 col-md-4">
                            <h5 class="mb-3">Calculators</h5>
                            <ul class="list-unstyled">
                                <li><a href="tools/percentage-calculator.html">Percentage Calculator</a></li>
                                <li><a href="tools/age-calculator.html">Age Calculator</a></li>
                                <li><a href="tools/bmi-calculator.html">BMI Calculator</a></li>
                                <li><a href="tools/loan-emi-calculator.html">Loan EMI Calculator</a></li>
                                <li><a href="tools/scientific-calculator.html">Scientific Calculator</a></li>
                            </ul>
                        </div>
                    </div>
                    <hr class="my-4">
                    <div class="row">
                        <div class="col-md-6 text-center text-md-start">
                            <p class="mb-0">&copy; ${new Date().getFullYear()} Multi-Tools Hub. All rights reserved.</p>
                        </div>
                        <div class="col-md-6 text-center text-md-end">
                            <p class="mb-0">Designed with <i class="fas fa-heart text-danger"></i> for you</p>
                        </div>
                    </div>
                </div>
            </footer>
        `;
        footerPlaceholder.innerHTML = footer;
    }
}

/**
 * Initialize search functionality
 */
function initSearch() {
    const searchInput = document.getElementById('toolSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const toolCards = document.querySelectorAll('.tool-card');
            
            toolCards.forEach(card => {
                const title = card.querySelector('.card-title').textContent.toLowerCase();
                const description = card.querySelector('.card-text').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.closest('.col-md-4').style.display = 'block';
                } else {
                    card.closest('.col-md-4').style.display = 'none';
                }
            });
            
            // Show/hide category sections based on search results
            const categorySections = document.querySelectorAll('.category-section');
            categorySections.forEach(section => {
                const visibleTools = section.querySelectorAll('.col-md-4[style="display: block"]').length;
                if (visibleTools > 0) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    }
}

/**
 * Initialize tool cards with hover effects and animations
 */
function initToolCards() {
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.classList.add('shadow-lg');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('shadow-lg');
        });
        
        // Add click animation
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('btn')) {
                const link = this.querySelector('a.btn');
                if (link) {
                    link.click();
                }
            }
        });
    });
}

/**
 * Function to load ads (to be implemented with actual ad service)
 */
function loadAds() {
    const adSpaces = document.querySelectorAll('.ad-space');
    adSpaces.forEach(space => {
        // Implement ad loading logic here
        // For example:
        // space.innerHTML = '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" data-ad-slot="XXXXXXXXXX" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script>';
    });
}

/**
 * Check if a tool exists and create a placeholder if it doesn't
 */
function checkToolExists(toolPath) {
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open('HEAD', toolPath, true);
        xhr.onload = function() {
            resolve(xhr.status !== 404);
        };
        xhr.onerror = function() {
            resolve(false);
        };
        xhr.send();
    });
}

/**
 * Create a placeholder for a missing tool
 */
function createToolPlaceholder(toolName, toolPath) {
    const placeholder = document.createElement('div');
    placeholder.className = 'tool-placeholder';
    placeholder.innerHTML = `
        <div class="alert alert-warning">
            <h5><i class="fas fa-exclamation-triangle me-2"></i>Tool Coming Soon</h5>
            <p>The ${toolName} tool is currently under development and will be available soon.</p>
            <p>Check back later or explore our other tools in the meantime.</p>
        </div>
    `;
    
    // Replace the tool card with the placeholder
    const toolCard = document.querySelector(`a[href="${toolPath}"]`).closest('.tool-card');
    if (toolCard) {
        toolCard.parentNode.replaceChild(placeholder, toolCard);
    }
    
    return placeholder;
}

/**
 * Check all tools on page load
 */
async function checkAllTools() {
    const toolLinks = document.querySelectorAll('a[href^="tools/"]');
    
    for (const link of toolLinks) {
        const toolPath = link.getAttribute('href');
        const toolName = link.closest('.tool-card').querySelector('.card-title').textContent;
        
        const exists = await checkToolExists(toolPath);
        if (!exists) {
            console.log(`Tool not found: ${toolPath}. Creating placeholder.`);
            createToolPlaceholder(toolName, toolPath);
        }
    }
}

// Load components
document.addEventListener('DOMContentLoaded', function() {
    loadComponents();
    initializeTools();
    renderTools();
    initializeSearch();
});

// Load header and footer
async function loadComponents() {
    try {
        const headerResponse = await fetch('../components/header.html');
        const footerResponse = await fetch('../components/footer.html');
        
        const headerHtml = await headerResponse.text();
        const footerHtml = await footerResponse.text();
        
        const headerPlaceholder = document.getElementById('header-placeholder');
        const footerPlaceholder = document.getElementById('footer-placeholder');
        
        if (headerPlaceholder) {
            headerPlaceholder.innerHTML = headerHtml;
        }
        
        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = footerHtml;
        }
    } catch (error) {
        console.error('Error loading components:', error);
    }
}

// Initialize tools based on the current page
function initializeTools() {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('image-to-jpg.html')) {
        initializeImageToJpg();
    } else if (currentPage.includes('image-resizer.html')) {
        initializeImageResizer();
    } else if (currentPage.includes('image-compressor.html')) {
        initializeImageCompressor();
    } else if (currentPage.includes('gif-maker.html')) {
        initializeGifMaker();
    } else if (currentPage.includes('qr-code-generator.html')) {
        initializeQrCodeGenerator();
    } else if (currentPage.includes('screenshot-to-pdf.html')) {
        initializeScreenshotToPdf();
    } else if (currentPage.includes('percentage-calculator.html')) {
        initializePercentageCalculator();
    } else if (currentPage.includes('age-calculator.html')) {
        initializeAgeCalculator();
    } else if (currentPage.includes('bmi-calculator.html')) {
        initializeBmiCalculator();
    } else if (currentPage.includes('loan-emi-calculator.html')) {
        initializeLoanEmiCalculator();
    } else if (currentPage.includes('scientific-calculator.html')) {
        initializeScientificCalculator();
    } else if (currentPage.includes('discount-calculator.html')) {
        initializeDiscountCalculator();
    } else if (currentPage.includes('binary-decimal-converter.html')) {
        initializeBinaryDecimalConverter();
    } else if (currentPage.includes('time-zone-converter.html')) {
        initializeTimeZoneConverter();
    } else if (currentPage.includes('tip-calculator.html')) {
        initializeTipCalculator();
    }
}

// Render tools in their respective sections
function renderTools() {
    renderToolSection('image-tools', toolsData.imageTools);
    renderToolSection('text-tools', toolsData.textTools);
    renderToolSection('calculator-tools', toolsData.calculatorTools);
}

function renderToolSection(sectionId, tools) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const toolsHtml = tools.map(tool => `
        <div class="col-md-4 col-sm-6 mb-4">
            <div class="tool-card">
                <div class="card-body text-center">
                    <i class="fas ${tool.icon} icon"></i>
                    <h5 class="card-title">${tool.name}</h5>
                    <p class="card-text">${tool.description}</p>
                    <a href="${tool.url}" class="btn btn-primary">Use Tool</a>
                </div>
            </div>
        </div>
    `).join('');

    section.innerHTML = toolsHtml;
}

// Ad loading function (to be implemented with actual ad service)
function loadAds() {
    const adSpaces = document.querySelectorAll('.ad-container');
    adSpaces.forEach(space => {
        // Implement ad loading logic here
        space.innerHTML = '<div class="ad-placeholder">Advertisement Space</div>';
    });
}

// Utility Functions
const utils = {
    // Format numbers with commas and specified decimal places
    formatNumber: (number, decimals = 2) => {
        return Number(number).toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    },

    // Format file size in bytes to human-readable format
    formatFileSize: (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    // Copy text to clipboard
    copyToClipboard: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('Failed to copy text: ', err);
            return false;
        }
    },

    // Show notification
    showNotification: (message, type = 'info') => {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} fade-in`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    },

    // Validate input is a number
    isNumeric: (value) => {
        return !isNaN(parseFloat(value)) && isFinite(value);
    },

    // Debounce function
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// File Upload Handler
class FileUploadHandler {
    constructor(options) {
        this.dropZone = options.dropZone;
        this.fileInput = options.fileInput;
        this.onFileSelect = options.onFileSelect;
        this.acceptedTypes = options.acceptedTypes || '*';
        this.maxSize = options.maxSize || 10 * 1024 * 1024; // 10MB default
        
        this.init();
    }

    init() {
        if (this.dropZone) {
            this.setupDropZone();
        }
        
        if (this.fileInput) {
            this.setupFileInput();
        }
    }

    setupDropZone() {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            this.dropZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            this.dropZone.addEventListener(eventName, () => {
                this.dropZone.classList.add('dragover');
            });
        });

        ['dragleave', 'drop'].forEach(eventName => {
            this.dropZone.addEventListener(eventName, () => {
                this.dropZone.classList.remove('dragover');
            });
        });

        this.dropZone.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            this.handleFiles(files);
        });
    }

    setupFileInput() {
        this.fileInput.addEventListener('change', (e) => {
            const files = e.target.files;
            this.handleFiles(files);
        });
    }

    handleFiles(files) {
        if (files.length === 0) return;

        const file = files[0];
        
        // Check file type
        if (this.acceptedTypes !== '*' && !file.type.match(this.acceptedTypes)) {
            utils.showNotification('Invalid file type. Please select a valid file.', 'danger');
            return;
        }
        
        // Check file size
        if (file.size > this.maxSize) {
            utils.showNotification(`File size exceeds ${utils.formatFileSize(this.maxSize)}`, 'danger');
            return;
        }
        
        if (this.onFileSelect) {
            this.onFileSelect(file);
        }
    }
}

// Image Processing Handler
class ImageProcessor {
    constructor(options) {
        this.maxWidth = options.maxWidth || 1920;
        this.maxHeight = options.maxHeight || 1080;
        this.quality = options.quality || 0.8;
        this.outputType = options.outputType || 'image/jpeg';
    }

    async processImage(file) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // Calculate new dimensions while maintaining aspect ratio
                if (width > this.maxWidth) {
                    height = (height * this.maxWidth) / width;
                    width = this.maxWidth;
                }
                if (height > this.maxHeight) {
                    width = (width * this.maxHeight) / height;
                    height = this.maxHeight;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob(
                    (blob) => {
                        resolve({
                            blob,
                            width,
                            height,
                            size: blob.size
                        });
                    },
                    this.outputType,
                    this.quality
                );
            };
            img.onerror = reject;
            img.src = URL.createObjectURL(file);
        });
    }
}

// Calculator Base Class
class Calculator {
    constructor(options) {
        this.inputs = options.inputs || {};
        this.results = options.results || {};
        this.onCalculate = options.onCalculate;
        this.onReset = options.onReset;
        
        this.init();
    }

    init() {
        // Setup input listeners
        Object.keys(this.inputs).forEach(key => {
            const input = this.inputs[key];
            input.addEventListener('input', utils.debounce(() => {
                this.calculate();
            }, 300));
        });
    }

    calculate() {
        if (this.onCalculate) {
            this.onCalculate();
        }
    }

    reset() {
        // Reset all inputs
        Object.values(this.inputs).forEach(input => {
            input.value = '';
        });
        
        // Reset all results
        Object.values(this.results).forEach(result => {
            result.textContent = '';
        });
        
        if (this.onReset) {
            this.onReset();
        }
    }

    updateResult(key, value) {
        if (this.results[key]) {
            this.results[key].textContent = value;
        }
    }
}

// Converter Base Class
class Converter {
    constructor(options) {
        this.inputs = options.inputs || {};
        this.results = options.results || {};
        this.onConvert = options.onConvert;
        this.onReset = options.onReset;
        
        this.init();
    }

    init() {
        // Setup input listeners
        Object.keys(this.inputs).forEach(key => {
            const input = this.inputs[key];
            input.addEventListener('input', utils.debounce(() => {
                this.convert();
            }, 300));
        });
    }

    convert() {
        if (this.onConvert) {
            this.onConvert();
        }
    }

    reset() {
        // Reset all inputs
        Object.values(this.inputs).forEach(input => {
            input.value = '';
        });
        
        // Reset all results
        Object.values(this.results).forEach(result => {
            result.textContent = '';
        });
        
        if (this.onReset) {
            this.onReset();
        }
    }

    updateResult(key, value) {
        if (this.results[key]) {
            this.results[key].textContent = value;
        }
    }
}

// Chart Handler
class ChartHandler {
    constructor(options) {
        this.canvas = options.canvas;
        this.type = options.type || 'line';
        this.data = options.data || {};
        this.options = options.options || {};
        
        this.chart = null;
        this.init();
    }

    init() {
        if (this.canvas) {
            this.chart = new Chart(this.canvas, {
                type: this.type,
                data: this.data,
                options: this.options
            });
        }
    }

    updateData(newData) {
        if (this.chart) {
            this.chart.data = newData;
            this.chart.update();
        }
    }

    destroy() {
        if (this.chart) {
            this.chart.destroy();
        }
    }
}

// Export modules
window.MultiToolsHub = {
    utils,
    FileUploadHandler,
    ImageProcessor,
    Calculator,
    Converter,
    ChartHandler
}; 