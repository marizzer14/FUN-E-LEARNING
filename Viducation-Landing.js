// File: viducation-landing.js
document.addEventListener('DOMContentLoaded', function() {
    // Add hover sound effects (optional)
    const cards = document.querySelectorAll('.category-card:not(.coming-soon)');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add a subtle scale effect on hover
            this.style.transform = 'translateY(-15px) scale(1.03)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        card.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-15px) scale(1.03)';
            }, 150);
        });
    });

    // Coming soon card animation
    const comingSoonCard = document.querySelector('.coming-soon');
    if (comingSoonCard) {
        setInterval(() => {
            const badge = comingSoonCard.querySelector('.coming-soon-badge');
            badge.style.animation = 'none';
            setTimeout(() => {
                badge.style.animation = 'pulse 2s infinite';
            }, 10);
        }, 4000);
    }
});