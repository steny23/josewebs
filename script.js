// Smooth Navigation and Section Management
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links and sections
    const navLinks = document.querySelectorAll('.nav-link, .nav-item');
    const sections = document.querySelectorAll('.section');
    const bottomNavItems = document.querySelectorAll('.bottom-nav .nav-item');
    const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');

    // Function to show a specific section
    function showSection(sectionId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.querySelector(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Add fade-in animation
            targetSection.style.animation = 'fadeIn 0.5s ease-in-out';
        }

        // Update active nav items
        updateActiveNav(sectionId);
        
        // Return sectionId for video pause logic
        return sectionId;
    }

    // Function to update active navigation items
    function updateActiveNav(sectionId) {
        // Update bottom nav
        bottomNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === sectionId) {
                item.classList.add('active');
            }
        });

        // Update desktop nav
        desktopNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === sectionId) {
                link.classList.add('active');
            }
        });
    }

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only prevent default for hash links (same-page navigation)
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const sectionId = showSection(targetId);
                
                // Pause all videos when navigating away from work section
                if (sectionId !== '#work') {
                    const allVideos = document.querySelectorAll('.work-video');
                    allVideos.forEach(video => {
                        video.pause();
                        video.currentTime = 0;
                        const card = video.closest('.video-card');
                        if (card) {
                            card.classList.remove('playing');
                        }
                    });
                }
                
                // Smooth scroll to top on mobile
                if (window.innerWidth < 768) {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                } else {
                    // Smooth scroll to section on desktop
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            }
        });
    });

    // Handle contact button click
    const contactBtn = document.querySelector('.contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = showSection('#contact');
            
            // Pause all videos when navigating to contact
            const allVideos = document.querySelectorAll('.work-video');
            allVideos.forEach(video => {
                video.pause();
                video.currentTime = 0;
                const card = video.closest('.video-card');
                if (card) {
                    card.classList.remove('playing');
                }
            });
            
            if (window.innerWidth < 768) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.work-card, .video-card, .skill-item, .about-text');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Logo click animation
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            const sectionId = showSection('#home');
            
            // Pause all videos when navigating to home
            const allVideos = document.querySelectorAll('.work-video');
            allVideos.forEach(video => {
                video.pause();
                video.currentTime = 0;
                const card = video.closest('.video-card');
                if (card) {
                    card.classList.remove('playing');
                }
            });
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Add bounce animation
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'bounce 0.5s ease';
            }, 10);
        });
    }

    // Add bounce animation keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounce {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(10deg); }
        }
    `;
    document.head.appendChild(style);

    // Work card click interactions
    const workCards = document.querySelectorAll('.work-card');
    workCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(0, 217, 255, 0.3);
                width: 100px;
                height: 100px;
                margin-top: -50px;
                margin-left: -50px;
                left: 50%;
                top: 50%;
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        // Stagger animation on load
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Handle window resize - show/hide navigation appropriately
    function handleResize() {
        if (window.innerWidth >= 768) {
            // Desktop: show all sections, hide bottom nav
            sections.forEach(section => {
                if (section.id === 'home') {
                    section.classList.add('active');
                }
            });
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    // Add smooth page load animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Touch feedback for mobile (video cards handled separately below)
    if ('ontouchstart' in window) {
        const touchElements = document.querySelectorAll('.nav-item, .work-card, .btn-primary, .skill-item');
        touchElements.forEach(el => {
            el.addEventListener('touchstart', function() {
                this.style.opacity = '0.7';
            });
            el.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 150);
            });
        });
    }

    // Parallax effect for hero section (subtle)
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const hero = document.querySelector('.hero');
        
        if (hero && window.innerWidth >= 768) {
            const parallaxValue = scrollTop * 0.5;
            hero.style.transform = `translateY(${parallaxValue}px)`;
        }
        
        lastScrollTop = scrollTop;
    }, { passive: true });

    // Video Hover Play/Pause Functionality
    const videoCards = document.querySelectorAll('.video-card');
    const videos = document.querySelectorAll('.work-video');
    let currentlyPlaying = null;

    // Initialize videos
    videos.forEach(video => {
        // Prevent default click behavior
        video.addEventListener('click', function(e) {
            e.preventDefault();
        });

        // Handle video loading errors gracefully
        video.addEventListener('error', function() {
            console.warn('Video failed to load:', this.src);
            const card = this.closest('.video-card');
            if (card) {
                card.style.opacity = '0.5';
                const overlay = card.querySelector('.video-overlay');
                if (overlay) {
                    overlay.innerHTML = '<div style="color: #ff6b6b; font-size: 14px;">Video unavailable</div>';
                }
            }
        });

        // Handle video loaded
        video.addEventListener('loadedmetadata', function() {
            // Video is ready
            this.currentTime = 0;
        });

        // When video ends (if not looping properly)
        video.addEventListener('ended', function() {
            if (this.loop) {
                this.currentTime = 0;
                this.play();
            }
        });
    });

    // Hover functionality for desktop
    videoCards.forEach(card => {
        const video = card.querySelector('.work-video');
        if (!video) return;

        // Mouse enter - play video
        card.addEventListener('mouseenter', function() {
            // Pause currently playing video if different
            if (currentlyPlaying && currentlyPlaying !== video) {
                currentlyPlaying.pause();
                currentlyPlaying.currentTime = 0;
                const prevCard = currentlyPlaying.closest('.video-card');
                if (prevCard) {
                    prevCard.classList.remove('playing');
                }
            }

            // Play current video
            video.currentTime = 0;
            video.play().then(() => {
                card.classList.add('playing');
                currentlyPlaying = video;
            }).catch(error => {
                console.warn('Video play failed:', error);
                // Video might be loading, try again after a short delay
                setTimeout(() => {
                    video.play().catch(() => {
                        console.warn('Video play retry failed');
                    });
                }, 100);
            });
        });

        // Mouse leave - pause video
        card.addEventListener('mouseleave', function() {
            if (video === currentlyPlaying) {
                video.pause();
                video.currentTime = 0;
                card.classList.remove('playing');
                currentlyPlaying = null;
            }
        });

        // Touch devices - tap to play/pause
        let isPlaying = false;
        card.addEventListener('touchstart', function(e) {
            e.preventDefault();
            if (!isPlaying) {
                // Pause other videos
                videos.forEach(v => {
                    if (v !== video && !v.paused) {
                        v.pause();
                        v.currentTime = 0;
                        v.closest('.video-card')?.classList.remove('playing');
                    }
                });
                
                // Play this video
                video.currentTime = 0;
                video.play().then(() => {
                    card.classList.add('playing');
                    isPlaying = true;
                    currentlyPlaying = video;
                }).catch(error => {
                    console.warn('Video play failed on touch:', error);
                });
            } else {
                // Pause this video
                video.pause();
                video.currentTime = 0;
                card.classList.remove('playing');
                isPlaying = false;
                if (currentlyPlaying === video) {
                    currentlyPlaying = null;
                }
            }
        }, { passive: false });

        // Click to play/pause (fallback)
        card.addEventListener('click', function(e) {
            // Only handle if not already handled by touch
            if (video.paused) {
                // Pause other videos
                videos.forEach(v => {
                    if (v !== video && !v.paused) {
                        v.pause();
                        v.currentTime = 0;
                        v.closest('.video-card')?.classList.remove('playing');
                    }
                });
                
                video.currentTime = 0;
                video.play().then(() => {
                    card.classList.add('playing');
                    currentlyPlaying = video;
                }).catch(error => {
                    console.warn('Video play failed on click:', error);
                });
            } else {
                video.pause();
                video.currentTime = 0;
                card.classList.remove('playing');
                if (currentlyPlaying === video) {
                    currentlyPlaying = null;
                }
            }
        });
    });


    // Pause videos when scrolling away (performance optimization)
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Check if work section is visible
            const workSection = document.querySelector('#work');
            if (workSection && workSection.classList.contains('active')) {
                const rect = workSection.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (!isVisible) {
                    // Pause all videos if section is not visible
                    videos.forEach(video => {
                        if (!video.paused) {
                            video.pause();
                            video.currentTime = 0;
                            const card = video.closest('.video-card');
                            if (card) {
                                card.classList.remove('playing');
                            }
                        }
                    });
                    currentlyPlaying = null;
                }
            }
        }, 150);
    }, { passive: true });

    // Update touch feedback to include video cards
    if ('ontouchstart' in window) {
        const touchElements = document.querySelectorAll('.nav-item, .work-card, .video-card, .btn-primary, .skill-item');
        touchElements.forEach(el => {
            el.addEventListener('touchstart', function() {
                if (!this.classList.contains('video-card') || !this.querySelector('.work-video').paused) {
                    this.style.opacity = '0.7';
                }
            });
            el.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 150);
            });
        });
    }
});
