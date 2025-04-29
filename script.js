document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const textArea = document.getElementById('text-input');
    const caseButtons = document.querySelectorAll('.case-btn');
    const copyButton = document.getElementById('copy-btn');
    const clearButton = document.getElementById('clear-btn');

    // Case conversion functions
    const caseConverters = {
        uppercase: (text) => text.toUpperCase(),
        lowercase: (text) => text.toLowerCase(),
        titleCase: (text) => {
            return text.toLowerCase().split(' ').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
        },
        sentenceCase: (text) => {
            return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, 
                letter => letter.toUpperCase()
            );
        },
        capitalizeWords: (text) => {
            return text.split(' ').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            ).join(' ');
        },
        alternatingCase: (text) => {
            return text.split('').map((char, index) => 
                index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
            ).join('');
        },
        inverseCase: (text) => {
            return text.split('').map(char => {
                if (char === char.toUpperCase()) {
                    return char.toLowerCase();
                }
                return char.toUpperCase();
            }).join('');
        }
    };

    // Add click event listeners to case buttons
    caseButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            caseButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const caseType = button.dataset.case;
            const convertedText = caseConverters[caseType](textArea.value);
            textArea.value = convertedText;
        });
    });

    // Copy button functionality
    copyButton.addEventListener('click', () => {
        textArea.select();
        document.execCommand('copy');
        
        // Visual feedback
        const originalText = copyButton.textContent;
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
            copyButton.textContent = originalText;
        }, 2000);
    });

    // Clear button functionality
    clearButton.addEventListener('click', () => {
        textArea.value = '';
        caseButtons.forEach(btn => btn.classList.remove('active'));
    });

    // Add input event listener to textarea
    textArea.addEventListener('input', () => {
        // Remove active class from all buttons when user starts typing
        caseButtons.forEach(btn => btn.classList.remove('active'));
    });
}); 