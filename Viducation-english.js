// English Lessons Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('English Lessons page initializing...');
    
    // Video modal functionality
    const videoCards = document.querySelectorAll('.video-card');
    const videoModal = document.getElementById('videoModal');
    const closeModal = document.querySelector('.close-modal');
    const modalVideoTitle = document.getElementById('modalVideoTitle');
    const modalVideoDescription = document.getElementById('modalVideoDescription');
    const modalVideoContainer = document.querySelector('.modal-video-container');
    
    if (!videoModal) {
        console.error('Video modal not found!');
        return;
    }

    // Open modal when video card is clicked
    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video-id');
            const videoTitle = this.querySelector('.video-title').textContent;
            const videoDescription = this.querySelector('.video-description').textContent;
            
            console.log('Playing video:', videoId, videoTitle);
            
            // Update modal content
            modalVideoTitle.textContent = videoTitle;
            modalVideoDescription.textContent = videoDescription;
            
            // Create YouTube iframe player
            const youtubeIframe = document.createElement('iframe');
            youtubeIframe.width = '100%';
            youtubeIframe.height = '100%';
            youtubeIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
            youtubeIframe.frameBorder = '0';
            youtubeIframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            youtubeIframe.allowFullscreen = true;
            youtubeIframe.style.borderRadius = '12px';
            
            // Clear previous video and add new one
            modalVideoContainer.innerHTML = '';
            modalVideoContainer.appendChild(youtubeIframe);
            
            // Show modal
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal function
    function closeVideoModal() {
        console.log('Closing video modal');
        
        // Stop YouTube video
        const iframe = modalVideoContainer.querySelector('iframe');
        if (iframe) {
            iframe.src = ''; // Stop video playback
        }
        
        videoModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Close modal events
    closeModal.addEventListener('click', closeVideoModal);
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) closeVideoModal();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) closeVideoModal();
    });

    // Add hover effects to video cards
    videoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.03)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Initialize video thumbnails
    const videoThumbnails = document.querySelectorAll('.video-thumbnail.has-thumbnail');
    videoThumbnails.forEach(thumbnail => {
        const img = new Image();
        const bgImage = thumbnail.style.backgroundImage.replace('url("', '').replace('")', '');
        
        img.onerror = function() {
            // Thumbnail failed to load - use fallback
            thumbnail.classList.remove('has-thumbnail');
            thumbnail.classList.add('fallback-thumbnail');
            
            // Get video title for fallback content
            const videoCard = thumbnail.closest('.video-card');
            const videoTitle = videoCard.querySelector('.video-title').textContent;
            
            // Create fallback content
            let fallbackIcon = '📚';
            let fallbackText = videoTitle.split(' - ')[0];
            
            if (videoTitle.includes('Pronunciation')) {
                fallbackIcon = '🎤';
            } else if (videoTitle.includes('Vocabulary')) {
                fallbackIcon = '📖';
            } else if (videoTitle.includes('Conversation')) {
                fallbackIcon = '💬';
            }
            
            thumbnail.innerHTML = `
                <div class="fallback-thumbnail-icon">${fallbackIcon}</div>
                <div class="fallback-thumbnail-text">${fallbackText}</div>
                <div class="play-icon">
                    <i class="fas fa-play"></i>
                </div>
            `;
        };
        
        img.src = bgImage;
    });

    console.log('English Lessons page initialized with', videoCards.length, 'videos');
});

// Scroll to top on page load
window.addEventListener('load', function() {
    setTimeout(function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, 100);
});