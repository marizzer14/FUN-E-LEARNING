// Navigation functionality for Viducation page - FIXED VERSION
document.addEventListener('DOMContentLoaded', function() {
    console.log('Viducation navigation initializing...');
    
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section-content');

    // Set first section as active by default
    sections[0].classList.add('active');
    navItems[0].classList.add('active');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = this.getAttribute('data-section');
            console.log('Clicked on:', targetSection);
            
            // Remove active class from all items and sections
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked item and target section
            this.classList.add('active');
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.add('active');
                console.log('Activated section:', targetSection);
            } else {
                console.error('Target section not found:', targetSection);
            }
            
            // Smooth scroll to top of content
            window.scrollTo({
                top: 100,
                behavior: 'smooth'
            });
        });
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('.viducation-menu a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

// Fix for Viducation page button clickability - SIMPLIFIED VERSION
document.addEventListener('DOMContentLoaded', function() {
    // Remove all existing event listeners and use simple link
    const viducationButtons = document.querySelectorAll('.viducation-page-btn');
    
    viducationButtons.forEach(button => {
        // Remove any existing event listeners by cloning
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        // Let the native link behavior work normally
        newButton.addEventListener('click', function(e) {
            console.log('Viducation button clicked - allowing default behavior');
            // Don't prevent default - let the link work naturally
        });
    });
});

    // Debug Viducation button
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('viducation-page-btn') || 
        e.target.closest('.viducation-page-btn')) {
        console.log('Viducation button clicked');
        console.log('Button href:', e.target.href);
        console.log('Default prevented?', e.defaultPrevented);
    }
});

    
    console.log('Viducation navigation initialized successfully');
});

// Video Gallery Functionality with Actual Video Playback
document.addEventListener('DOMContentLoaded', function() {
    // Video modal functionality
    const videoCards = document.querySelectorAll('.video-card');
    const videoModal = document.getElementById('videoModal');
    const closeModal = document.querySelector('.close-modal');
    const modalVideoTitle = document.getElementById('modalVideoTitle');
    const modalVideoDescription = document.getElementById('modalVideoDescription');
    const modalVideoContainer = document.querySelector('.modal-video-container');

    // Open modal when video card is clicked
    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video-id');
            const videoSrc = this.getAttribute('data-video-src');
            const videoTitle = this.querySelector('.video-title').textContent;
            const videoDescription = this.querySelector('.video-description').textContent;
            
            // Update modal content
            modalVideoTitle.textContent = videoTitle;
            modalVideoDescription.textContent = videoDescription;
            
            // Create video player
            const videoPlayer = document.createElement('video');
            videoPlayer.controls = true;
            videoPlayer.autoplay = true;
            videoPlayer.style.width = '100%';
            videoPlayer.style.height = '100%';
            videoPlayer.style.objectFit = 'contain';
            
            const source = document.createElement('source');
            source.src = videoSrc;
            source.type = 'video/mp4';
            
            videoPlayer.appendChild(source);
            
            // Clear previous video and add new one
            modalVideoContainer.innerHTML = '';
            modalVideoContainer.appendChild(videoPlayer);
            
            // Show modal
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close modal
    closeModal.addEventListener('click', function() {
        // Stop any playing video
        const videoPlayer = modalVideoContainer.querySelector('video');
        if (videoPlayer) {
            videoPlayer.pause();
            videoPlayer.currentTime = 0;
        }
        
        videoModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });

    // Close modal when clicking outside
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            // Stop any playing video
            const videoPlayer = modalVideoContainer.querySelector('video');
            if (videoPlayer) {
                videoPlayer.pause();
                videoPlayer.currentTime = 0;
            }
            
            videoModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            // Stop any playing video
            const videoPlayer = modalVideoContainer.querySelector('video');
            if (videoPlayer) {
                videoPlayer.pause();
                videoPlayer.currentTime = 0;
            }
            
            videoModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    console.log('Video gallery initialized with', videoCards.length, 'videos');
});

// Scroll to top on page load
window.addEventListener('load', function() {
    setTimeout(function() {
        window.scrollTo(0, 0);
    }, 100);
});

// Enhanced Video Gallery with Thumbnail Support
document.addEventListener('DOMContentLoaded', function() {
    // Handle thumbnail loading and fallbacks
    const videoThumbnails = document.querySelectorAll('.video-thumbnail.has-thumbnail');
    
    videoThumbnails.forEach(thumbnail => {
        const img = new Image();
        const bgImage = thumbnail.style.backgroundImage.replace('url("', '').replace('")', '');
        
        img.onload = function() {
            // Thumbnail loaded successfully
            thumbnail.classList.remove('loading');
        };
        
        img.onerror = function() {
            // Thumbnail failed to load - use fallback
            thumbnail.classList.remove('has-thumbnail');
            thumbnail.classList.remove('loading');
            thumbnail.classList.add('fallback-thumbnail');
            
            // Get video title for fallback content
            const videoCard = thumbnail.closest('.video-card');
            const videoTitle = videoCard.querySelector('.video-title').textContent;
            
            // Create fallback content based on video category
            let fallbackIcon = '📚';
            let fallbackText = videoTitle.split(' - ')[0]; // Use main title part
            
            if (videoTitle.includes('Pronunciation')) {
                fallbackIcon = '🎤';
            } else if (videoTitle.includes('Idioms')) {
                fallbackIcon = '💬';
            } else if (videoTitle.includes('BPO')) {
                fallbackIcon = '🏢';
            } else if (videoTitle.includes('vs')) {
                fallbackIcon = '⚖️';
            }
            
            thumbnail.innerHTML = `
                <div class="fallback-thumbnail-icon">${fallbackIcon}</div>
                <div class="fallback-thumbnail-text">${fallbackText}</div>
                <div class="play-icon"></div>
            `;
        };
        
        // Start loading the thumbnail
        thumbnail.classList.add('loading');
        img.src = bgImage;
    });

    // Video modal functionality
    const videoCards = document.querySelectorAll('.video-card');
    const videoModal = document.getElementById('videoModal');
    const closeModal = document.querySelector('.close-modal');
    const modalVideoTitle = document.getElementById('modalVideoTitle');
    const modalVideoDescription = document.getElementById('modalVideoDescription');
    const modalVideoContainer = document.querySelector('.modal-video-container');

    // Open modal when video card is clicked
    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video-id');
            const videoSrc = this.getAttribute('data-video-src');
            const videoTitle = this.querySelector('.video-title').textContent;
            const videoDescription = this.querySelector('.video-description').textContent;
            
            // Update modal content
            modalVideoTitle.textContent = videoTitle;
            modalVideoDescription.textContent = videoDescription;
            
            // Create video player
            const videoPlayer = document.createElement('video');
            videoPlayer.controls = true;
            videoPlayer.autoplay = true;
            videoPlayer.style.width = '100%';
            videoPlayer.style.height = '100%';
            videoPlayer.style.objectFit = 'contain';
            
            const source = document.createElement('source');
            source.src = videoSrc;
            source.type = 'video/mp4';
            
            videoPlayer.appendChild(source);
            
            // Add error handling for video
            videoPlayer.addEventListener('error', function() {
                modalVideoContainer.innerHTML = `
                    <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;background:#000;color:white;font-size:1.2rem;padding:20px;text-align:center;">
                        <div style="font-size:3rem;margin-bottom:20px;">❌</div>
                        <div>Video not found or cannot be played</div>
                        <div style="font-size:0.9rem;margin-top:10px;opacity:0.7;">Please check the video file path: ${videoSrc}</div>
                    </div>
                `;
            });
            
            // Clear previous video and add new one
            modalVideoContainer.innerHTML = '';
            modalVideoContainer.appendChild(videoPlayer);
            
            // Show modal
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal functionality remains the same
    closeModal.addEventListener('click', closeVideoModal);
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) closeVideoModal();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) closeVideoModal();
    });

    function closeVideoModal() {
        const videoPlayer = modalVideoContainer.querySelector('video');
        if (videoPlayer) {
            videoPlayer.pause();
            videoPlayer.currentTime = 0;
        }
        videoModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    console.log('Video gallery with thumbnails initialized');

});
