{
    "liveServer.settings.port": 5501
}

);
document.addEventListener('DOMContentLoaded', function() {
    // Your JavaScript code here
});
const sections = document.querySelectorAll('section[id], .main-container[id]');
const navLinks = document.querySelectorAll('.nav-link');

function activateNavOnScroll() {
    let scrollY = window.pageYOffset;
    let offset = 120; // adjust for nav height

    sections.forEach(section => {
        const sectionTop = section.offsetTop - offset;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        if (
            scrollY >= sectionTop &&
            scrollY < sectionTop + sectionHeight &&
            sectionId
        ) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Initial highlight and on scroll
window.addEventListener('scroll', activateNavOnScroll);
window.addEventListener('DOMContentLoaded', activateNavOnScroll);

   // Management Team Accordions - COMPLETELY FIXED VERSION
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Initializing management accordions...');
            
            const managementAccordions = document.querySelectorAll('.manager-card.accordion-item');
            
            managementAccordions.forEach(accordion => {
                const header = accordion.querySelector('.accordion-header');
                const arrow = accordion.querySelector('.accordion-arrow');
                const content = accordion.querySelector('.accordion-content');
                
                if (!header || !arrow || !content) {
                    console.warn('Missing elements in management accordion:', accordion);
                    return;
                }
                
                // Set initial state - COMPLETELY HIDDEN
                content.style.maxHeight = '0px';
                content.style.opacity = '0';
                content.style.overflow = 'hidden';
                arrow.textContent = '→';
                
                header.addEventListener('click', function(e) {
                    e.stopPropagation();
                    console.log('Management accordion clicked:', accordion.querySelector('.manager-name').textContent);
                    
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
