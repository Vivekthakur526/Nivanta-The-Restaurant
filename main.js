/**
 * NIVANTA THE RESTAURANT - Main JavaScript Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. Loader Animation
  // ==========================================
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (loader) {
        loader.classList.add('fade-out');
      }
    }, 800); // Allow smooth transition for the animation
  });

  // Fallback loader removal in case window.load takes too long
  setTimeout(() => {
    if (loader && !loader.classList.contains('fade-out')) {
      loader.classList.add('fade-out');
    }
  }, 3000);

  // ==========================================
  // 2. Sticky Navbar & Scroll-To-Top Button
  // ==========================================
  const navbar = document.querySelector('.navbar');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  
  window.addEventListener('scroll', () => {
    // Navbar Scroll state
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Scroll-to-top button visibility
    if (window.scrollY > window.innerHeight) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  // Scroll to top execution
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ==========================================
  // 3. Mobile Hamburger Menu
  // ==========================================
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-links a');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('overflow-hidden'); // Disable scrolling when menu is open
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
    });
  });

  // ==========================================
  // 4. Cinematic Hero Background Slider
  // ==========================================
  const slides = document.querySelectorAll('.hero-slide');
  let currentSlide = 0;
  const slideInterval = 6000; // 6 seconds per slide

  function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }

  if (slides.length > 1) {
    setInterval(nextSlide, slideInterval);
  }

  // ==========================================
  // 5. Scroll Entrance Animations (Intersection Observer)
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing once revealed
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================
  // 6. Statistics Counter Animation
  // ==========================================
  const statsSection = document.getElementById('stats');
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  function startCounters() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const countTo = target;
      let current = 0;
      // Duration of animation in ms
      const duration = 2000;
      const stepTime = Math.abs(Math.floor(duration / countTo));
      
      const timer = setInterval(() => {
        current += Math.ceil(countTo / 100);
        if (current >= countTo) {
          clearInterval(timer);
          stat.textContent = countTo;
        } else {
          stat.textContent = current;
        }
      }, Math.max(stepTime, 20));
    });
  }

  if (statsSection && statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated) {
        startCounters();
        animated = true;
      }
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
  }

  // ==========================================
  // 7. Interactive Menu Category Filtering
  // ==========================================
  const tabButtons = document.querySelectorAll('.menu-tab-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      tabButtons.forEach(b => b.classList.remove('active'));
      // Add active to clicked button
      btn.classList.add('active');
      
      const category = btn.getAttribute('data-category');
      
      menuCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        // Hide card first with smooth scaling/opacity
        card.style.opacity = '0';
        card.style.transform = 'scale(0.85)';
        
        setTimeout(() => {
          if (category === 'all' || cardCategory === category) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        }, 300);
      });
    });
  });

  // ==========================================
  // 8. Gallery Lightbox Modal
  // ==========================================
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox?.querySelector('.lightbox-img');
  const lightboxCaption = lightbox?.querySelector('.lightbox-caption');
  const lightboxClose = lightbox?.querySelector('.lightbox-close');

  if (galleryItems.length > 0 && lightbox) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const captionText = item.querySelector('.gallery-overlay span')?.textContent || 'Nivanta Premium Setup';
        
        if (lightboxImg && img) {
          lightboxImg.src = img.src;
          if (lightboxCaption) {
            lightboxCaption.textContent = captionText;
          }
          lightbox.classList.add('active');
          document.body.classList.add('overflow-hidden');
        }
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
    };

    lightboxClose?.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // ==========================================
  // 9. FAQ Accordion Elements
  // ==========================================
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const faqItem = q.parentElement;
      const answer = faqItem.querySelector('.faq-answer');
      const isActive = faqItem.classList.contains('active');
      
      // Close all other accordion items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isActive) {
        faqItem.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // ==========================================
  // 10. Google Reviews Slider / Carousel
  // ==========================================
  const slider = document.querySelector('.reviews-slider');
  const slidesReview = document.querySelectorAll('.review-slide');
  const prevBtn = document.getElementById('prevReviewBtn');
  const nextBtn = document.getElementById('nextReviewBtn');
  
  let indexReview = 0;
  let slidesPerView = 3;

  function updateSlidesPerView() {
    if (window.innerWidth <= 768) {
      slidesPerView = 1;
    } else if (window.innerWidth <= 1024) {
      slidesPerView = 2;
    } else {
      slidesPerView = 3;
    }
  }

  function moveSlider() {
    if (!slider) return;
    const maxIndex = Math.max(0, slidesReview.length - slidesPerView);
    if (indexReview > maxIndex) indexReview = maxIndex;
    if (indexReview < 0) indexReview = 0;
    
    const percentage = -(indexReview * (100 / slidesPerView));
    slider.style.transform = `translateX(${percentage}%)`;
    
    // Update button states
    if (prevBtn) prevBtn.disabled = indexReview === 0;
    if (nextBtn) nextBtn.disabled = indexReview >= maxIndex;
  }

  if (slider && prevBtn && nextBtn) {
    updateSlidesPerView();
    moveSlider();
    
    window.addEventListener('resize', () => {
      updateSlidesPerView();
      moveSlider();
    });

    nextBtn.addEventListener('click', () => {
      indexReview++;
      moveSlider();
    });

    prevBtn.addEventListener('click', () => {
      indexReview--;
      moveSlider();
    });

    // Touch Support for reviews slider
    let startX = 0;
    let endX = 0;
    
    slider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const difference = startX - endX;
      if (Math.abs(difference) > 50) {
        if (difference > 0 && indexReview < slidesReview.length - slidesPerView) {
          indexReview++; // Swipe Left
        } else if (difference < 0 && indexReview > 0) {
          indexReview--; // Swipe Right
        }
        moveSlider();
      }
    }, { passive: true });
  }

  // ==========================================
  // 11. Table Reservation Logic (WhatsApp + Web3Forms)
  // ==========================================
  const bookingForm = document.getElementById('reservation-form');
  const confirmModal = document.getElementById('confirm-modal');
  const confirmCloseBtn = document.getElementById('confirmCloseBtn');
  const ownerPhoneNumber = '+917400080176';

  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get Values
      const name = document.getElementById('booking-name').value.trim();
      const phone = document.getElementById('booking-phone').value.trim();
      const email = document.getElementById('booking-email').value.trim();
      const date = document.getElementById('booking-date').value;
      const time = document.getElementById('booking-time').value;
      const guests = document.getElementById('booking-guests').value;
      const requests = document.getElementById('booking-requests').value.trim() || 'None';

      // Validation
      if (!name || !phone || !date || !time || !guests) {
        alert('Please fill out all required fields.');
        return;
      }
      
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(phone.replace(/[\s-+]/g, '').slice(-10))) {
        alert('Please enter a valid 10-digit mobile number.');
        return;
      }

      // 1. Prepare WhatsApp Message
      const waMessage = 
`Hello NIVANTA Team,

New Table Reservation Request

Name: ${name}
Phone: ${phone}
Email: ${email || 'Not Provided'}
Date: ${date}
Time: ${time}
Guests: ${guests}
Special Request: ${requests}

Please confirm my reservation.`;

      const encodedMsg = encodeURIComponent(waMessage);
      const whatsappURL = `https://api.whatsapp.com/send?phone=${ownerPhoneNumber.replace('+', '')}&text=${encodedMsg}`;

      // 2. Submit via Web3Forms (if key is set up) or mock email sending
      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

      // Format simple data object for Web3Forms/Formspree or fallback
      const formData = new FormData(bookingForm);
      const accessKeyInput = bookingForm.querySelector('input[name="access_key"]');
      
      if (accessKeyInput && accessKeyInput.value !== 'YOUR_ACCESS_KEY_HERE' && accessKeyInput.value.trim() !== '') {
        // Send request to Web3Forms API
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            handleBookingSuccess(whatsappURL);
          } else {
            console.error('Web3Forms Error:', data.message);
            // Submit fallback to WhatsApp even if email API fails
            handleBookingSuccess(whatsappURL);
          }
        })
        .catch(error => {
          console.error('Submission error:', error);
          // Fallback to WhatsApp redirect directly
          handleBookingSuccess(whatsappURL);
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        });
      } else {
        // Fallback: If no custom access key, simulate successful email trigger and redirect
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
          handleBookingSuccess(whatsappURL);
        }, 1000);
      }
    });

    function handleBookingSuccess(whatsappUrl) {
      // Clear the form
      bookingForm.reset();
      
      // Open Confirmation Modal
      if (confirmModal) {
        confirmModal.classList.add('active');
        document.body.classList.add('overflow-hidden');
      }

      // Redirect to WhatsApp in a new tab after a brief delay
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 1500);
    }
  }

  // Close Confirmation Modal
  if (confirmModal && confirmCloseBtn) {
    const closeModal = () => {
      confirmModal.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
    };

    confirmCloseBtn.addEventListener('click', closeModal);
    confirmModal.addEventListener('click', (e) => {
      if (e.target === confirmModal) {
        closeModal();
      }
    });
  }

  // ==========================================
  // 12. Floating Action Triggers
  // ==========================================
  const floatWhatsapp = document.getElementById('floatWhatsapp');
  if (floatWhatsapp) {
    floatWhatsapp.addEventListener('click', () => {
      const waText = encodeURIComponent('Hello NIVANTA Team, I would like to inquire about reservation and dining options.');
      window.open(`https://api.whatsapp.com/send?phone=${ownerPhoneNumber.replace('+', '')}&text=${waText}`, '_blank');
    });
  }

  const floatCall = document.getElementById('floatCall');
  if (floatCall) {
    floatCall.addEventListener('click', () => {
      window.open(`tel:${ownerPhoneNumber}`, '_self');
    });
  }

});
