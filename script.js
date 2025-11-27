// Scroll to top on refresh
window.onbeforeunload = function() { 
    window.scrollTo(0, 0); 
}

// Simple Active Navigation Highlighter
document.addEventListener('DOMContentLoaded', function() {
    const sections = {
        'aboutus': document.getElementById('aboutus'),
        'products': document.getElementById('products'),
        'management': document.getElementById('management'),
        'fun-e-exam': document.getElementById('fun-e-exam'),
        'contactus': document.getElementById('contactus')
    };
    
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightActiveNav() {
        const scrollPos = window.scrollY + 100;
        
        // Reset all links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Check which section is in view
        for (const [sectionId, section] of Object.entries(sections)) {
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                    break;
                }
            }
        }
    }
    
    // Throttle the scroll event for better performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                scrollTimeout = null;
                highlightActiveNav();
            }, 100);
        }
    });
    
    // Initial highlight
    highlightActiveNav();
    
    console.log('Navigation highlighter initialized');
});

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Nav bar scroll effect
    const nav = document.querySelector('.nav-bar');
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 0) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Sticky header
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Logo reload functionality
    const mainLogo = document.querySelector('.mainlogo');
    if (mainLogo) {
        mainLogo.addEventListener('click', function(e) {
            e.preventDefault();
            location.reload();
        });
    }
    
    console.log('Navigation initialized');
});

// Additional scroll to top on load
window.addEventListener('load', function() {
    setTimeout(function() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }, 100);
});

// Products & Services Interactive Cards
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing product cards...');
    
    const productCards = document.querySelectorAll('.product-card');
    const productsGrid = document.querySelector('.products-grid');
    
    if (!productCards.length || !productsGrid) {
        console.log('No product cards found');
        return;
    }
    
    productCards.forEach(card => {
        // Add tabindex for accessibility
        card.setAttribute('tabindex', '0');
        
        // Add click event
        card.addEventListener('click', function(e) {
            console.log('Product card clicked');
            handleProductCardClick(card);
        });
        
        // Add keyboard support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleProductCardClick(card);
            }
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            if (!card.classList.contains('expanded')) {
                card.style.transform = 'translateY(-5px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!card.classList.contains('expanded')) {
                card.style.transform = 'translateY(0)';
            }
        });
    });
    
    function handleProductCardClick(clickedCard) {
        const isExpanded = clickedCard.classList.contains('expanded');
        
        if (isExpanded) {
            // Collapse the clicked card
            collapseProductCard(clickedCard);
        } else {
            // Expand the clicked card and collapse others
            expandProductCard(clickedCard);
        }
    }
    
    function expandProductCard(card) {
        // Collapse all cards first
        collapseAllProductCards();
        
        // Expand the clicked card
        card.classList.add('expanded');
        productsGrid.classList.add('has-expanded');
        
        // Update ARIA attributes
        card.setAttribute('aria-expanded', 'true');
        
        // Smooth scroll for mobile
        if (window.innerWidth < 768) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        console.log('Expanded product card:', card.dataset.card);
    }
    
    function collapseProductCard(card) {
        card.classList.remove('expanded');
        card.setAttribute('aria-expanded', 'false');
        checkProductExpandedState();
    }
    
    function collapseAllProductCards() {
        productCards.forEach(card => {
            card.classList.remove('expanded');
            card.setAttribute('aria-expanded', 'false');
        });
    }
    
    function checkProductExpandedState() {
        const hasExpanded = Array.from(productCards).some(card => 
            card.classList.contains('expanded')
        );
        
        if (hasExpanded) {
            productsGrid.classList.add('has-expanded');
        } else {
            productsGrid.classList.remove('has-expanded');
        }
    }
    
    console.log('Product cards initialized:', productCards.length);
});

// Management Team Accordions
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing management accordions...');
    
    const managementAccordions = document.querySelectorAll('.manager-card.accordion-item');
    
    if (!managementAccordions.length) {
        console.log('No management accordions found');
        return;
    }
    
    managementAccordions.forEach(accordion => {
        const header = accordion.querySelector('.accordion-header');
        const arrow = accordion.querySelector('.accordion-arrow');
        const content = accordion.querySelector('.accordion-content');
        
        if (!header || !arrow || !content) {
            console.warn('Missing elements in management accordion:', accordion);
            return;
        }
        
        // Set initial state
        content.style.maxHeight = '0px';
        content.style.opacity = '0';
        content.style.overflow = 'hidden';
        arrow.textContent = '→';
        
        header.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Management accordion clicked');
            
            const isActive = accordion.classList.contains('active');
            
            // Close all other management accordions
            managementAccordions.forEach(otherAccordion => {
                if (otherAccordion !== accordion && otherAccordion.classList.contains('active')) {
                    closeManagementAccordion(otherAccordion);
                }
            });
            
            // Toggle current accordion
            if (!isActive) {
                openManagementAccordion(accordion);
            } else {
                closeManagementAccordion(accordion);
            }
        });
    });
    
    function openManagementAccordion(accordion) {
        const content = accordion.querySelector('.accordion-content');
        const arrow = accordion.querySelector('.accordion-arrow');
        
        accordion.classList.add('active');
        arrow.textContent = '←';
        
        // Calculate content height
        content.style.maxHeight = 'none';
        const fullHeight = content.scrollHeight + 'px';
        content.style.maxHeight = '0px';
        
        // Trigger animation
        setTimeout(() => {
            content.style.maxHeight = fullHeight;
            content.style.opacity = '1';
        }, 10);
        
        console.log('Opened management accordion');
    }
    
    function closeManagementAccordion(accordion) {
        const content = accordion.querySelector('.accordion-content');
        const arrow = accordion.querySelector('.accordion-arrow');
        
        accordion.classList.remove('active');
        arrow.textContent = '→';
        
        content.style.maxHeight = '0px';
        content.style.opacity = '0';
        
        console.log('Closed management accordion');
    }
    
    console.log('Management accordions initialized:', managementAccordions.length);
});

// Nested Accordion Functionality for Viducation
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing nested accordions...');
    
    const nestedAccordions = document.querySelectorAll('.nested-accordion-item');
    
    if (!nestedAccordions.length) {
        console.log('No nested accordions found');
        return;
    }
    
    nestedAccordions.forEach((accordion, index) => {
        const header = accordion.querySelector('.nested-accordion-header');
        const arrow = accordion.querySelector('.nested-accordion-arrow');
        const content = accordion.querySelector('.nested-accordion-content');
        
        if (!header || !arrow || !content) {
            console.warn('Missing elements in nested accordion:', accordion);
            return;
        }
        
        // Set initial state - ALL CLOSED
        content.style.maxHeight = '0px';
        content.style.overflow = 'hidden';
        arrow.textContent = '→';
        accordion.classList.remove('active');
        
        // Add single click event listener
        header.addEventListener('click', function(e) {
            console.log('Nested accordion clicked:', index);
            
            // Get fresh references to elements
            const currentAccordion = this.parentElement;
            const currentContent = currentAccordion.querySelector('.nested-accordion-content');
            const currentArrow = currentAccordion.querySelector('.nested-accordion-arrow');
            const isCurrentlyActive = currentAccordion.classList.contains('active');
            
            console.log('Current state:', isCurrentlyActive);
            
            // Close all other nested accordions
            nestedAccordions.forEach(otherAccordion => {
                if (otherAccordion !== currentAccordion) {
                    const otherContent = otherAccordion.querySelector('.nested-accordion-content');
                    const otherArrow = otherAccordion.querySelector('.nested-accordion-arrow');
                    
                    otherAccordion.classList.remove('active');
                    otherContent.style.maxHeight = '0px';
                    otherArrow.textContent = '→';
                }
            });
            
            // Toggle current accordion
            if (isCurrentlyActive) {
                // Close it
                currentAccordion.classList.remove('active');
                currentContent.style.maxHeight = '0px';
                currentArrow.textContent = '→';
                console.log('Closed nested accordion');
            } else {
                // Open it
                currentAccordion.classList.add('active');
                
                // Calculate height and animate
                currentContent.style.maxHeight = 'none';
                const fullHeight = currentContent.scrollHeight + 'px';
                currentContent.style.maxHeight = '0px';
                
                setTimeout(() => {
                    currentContent.style.maxHeight = fullHeight;
                }, 10);
                
                currentArrow.textContent = '↓';
                console.log('Opened nested accordion');
            }
            
            // Prevent any other handlers
            e.stopPropagation();
            return false;
        });
    });
    
    console.log('Nested accordions initialized:', nestedAccordions.length);
});






// Feedback Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('feedbackForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');

    if (feedbackForm) {
        console.log('Feedback form initialized');
        
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateForm()) {
                return;
            }
            
            // Show loading state
            setLoadingState(true);
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value.trim(),
                timestamp: new Date().toLocaleString()
            };
            
            // Send feedback
            sendFeedback(formData);
        });
        
        // Real-time validation
        const inputs = feedbackForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    }
    
    function validateForm() {
        let isValid = true;
        const fields = [
            { id: 'name', type: 'text' },
            { id: 'email', type: 'email' },
            { id: 'subject', type: 'select' },
            { id: 'message', type: 'textarea' }
        ];
        
        fields.forEach(field => {
            const element = document.getElementById(field.id);
            if (!validateField(element)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Remove any existing error styling
        field.classList.remove('error');
        
        switch(field.id) {
            case 'name':
                if (!value) {
                    errorMessage = 'Full name is required';
                    isValid = false;
                } else if (value.length < 2) {
                    errorMessage = 'Name must be at least 2 characters';
                    isValid = false;
                }
                break;
                
            case 'email':
                if (!value) {
                    errorMessage = 'Email address is required';
                    isValid = false;
                } else if (!isValidEmail(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;
                
            case 'subject':
                if (!value) {
                    errorMessage = 'Please select a subject';
                    isValid = false;
                }
                break;
                
            case 'message':
                if (!value) {
                    errorMessage = 'Message is required';
                    isValid = false;
                } else if (value.length < 10) {
                    errorMessage = 'Message must be at least 10 characters';
                    isValid = false;
                } else if (value.length > 1000) {
                    errorMessage = 'Message must be less than 1000 characters';
                    isValid = false;
                }
                break;
        }
        
        if (!isValid) {
            field.classList.add('error');
            // Show tooltip or update message
            if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('field-error')) {
                const errorElement = document.createElement('div');
                errorElement.className = 'field-error';
                errorElement.style.cssText = 'color: #c62828; font-size: 0.85rem; margin-top: 5px;';
                errorElement.textContent = errorMessage;
                field.parentNode.insertBefore(errorElement, field.nextSibling);
            } else {
                field.nextElementSibling.textContent = errorMessage;
            }
        } else {
            // Remove error message if it exists
            if (field.nextElementSibling && field.nextElementSibling.classList.contains('field-error')) {
                field.nextElementSibling.remove();
            }
        }
        
        return isValid;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function setLoadingState(loading) {
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        if (loading) {
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-block';
            submitBtn.disabled = true;
        } else {
            btnText.style.display = 'inline-block';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }
    }
    
    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
    
    function sendFeedback(formData) {
        console.log('Sending feedback:', formData);
        
        // Using EmailJS for direct email delivery
        if (typeof emailjs !== 'undefined') {
            sendWithEmailJS(formData);
        } else {
            // Fallback to mailto link
            sendWithMailTo(formData);
        }
    }
    
    function sendWithEmailJS(formData) {
        // Replace these with your actual EmailJS credentials
        const serviceID = 'YOUR_SERVICE_ID';
        const templateID = 'YOUR_TEMPLATE_ID';
        const userID = 'YOUR_USER_ID';
        
        emailjs.send(serviceID, templateID, {
            to_email: 'inquiries.feedback@fun.e.learning.com',
            from_name: formData.name,
            from_email: formData.email,
            subject: `Fun-E-Learning Inquiry: ${formData.subject}`,
            message: formData.message,
            timestamp: formData.timestamp
        }, userID)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showMessage('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.', 'success');
            feedbackForm.reset();
            setLoadingState(false);
            
            // Track successful submission
            trackSubmission('success');
        }, function(error) {
            console.log('FAILED...', error);
            // Fallback to mailto if EmailJS fails
            sendWithMailTo(formData);
        });
    }
    
    function sendWithMailTo(formData) {
        const subject = encodeURIComponent(`Fun-E-Learning Inquiry: ${formData.subject}`);
        const body = encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}\n\nSent: ${formData.timestamp}`
        );
        
        showMessage('Your email client is opening. Please send the pre-filled email to contact us.', 'info');
        
        // Open email client
        setTimeout(() => {
            window.location.href = `mailto:inquiries.feedback@fun.e.learning.com?subject=${subject}&body=${body}`;
            feedbackForm.reset();
            setLoadingState(false);
            trackSubmission('mailto');
        }, 1000);
    }
    
    function trackSubmission(type) {
        // You can integrate with Google Analytics here
        if (typeof gtag !== 'undefined') {
            gtag('event', 'feedback_submission', {
                'event_category': 'contact',
                'event_label': type,
                'value': 1
            });
        }
    }
    
    // Add error styling to CSS
    const style = document.createElement('style');
    style.textContent = `
        .form-group input.error,
        .form-group select.error,
        .form-group textarea.error {
            border-color: #c62828 !important;
            background: #ffebee !important;
        }
    `;
    document.head.appendChild(style);
});

// Initialize EmailJS if the library is loaded
if (typeof emailjs !== 'undefined') {
    emailjs.init('YOUR_USER_ID'); // Replace with your actual User ID
}










// Fix for Viducation page button clickability
document.addEventListener('DOMContentLoaded', function() {
    // Add click event listener specifically for Viducation page button
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('viducation-page-btn') || 
            e.target.closest('.viducation-page-btn')) {
            e.stopPropagation();
            e.preventDefault();
            window.location.href = 'Viducation.html';
        }
    });
    
    // Also allow keyboard navigation for accessibility
    document.addEventListener('keydown', function(e) {
        if ((e.key === 'Enter' || e.key === ' ') && 
            (e.target.classList.contains('viducation-page-btn') || 
             e.target.closest('.viducation-page-btn'))) {
            e.stopPropagation();
            e.preventDefault();
            window.location.href = 'Viducation.html';
        }
    });
});

