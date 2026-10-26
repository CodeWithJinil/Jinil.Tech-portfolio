/* ============================================
   JINIL.TECH — Portfolio JavaScript
   Interactions, Animations, and Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ---------- Dynamic Year ----------
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Check Reduced Motion ----------
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ============================================
  // CUSTOM CURSOR
  // ============================================
  const cursor = document.getElementById('cursorGlow');
  if (cursor && window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion) {
    let cursorX = 0, cursorY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
    });

    function animateCursor() {
      currentX += (cursorX - currentX) * 0.15;
      currentY += (cursorY - currentY) * 0.15;
      cursor.style.left = currentX - 12 + 'px';
      cursor.style.top = currentY - 12 + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on interactive elements
    const interactives = document.querySelectorAll('a, button, .project-card, .glass-card, input, textarea');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  } else if (cursor) {
    cursor.style.display = 'none';
  }

  // ============================================
  // PARTICLES CANVAS
  // ============================================
  const canvas = document.getElementById('particles-canvas');
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animFrame;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.4 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Create particles (lightweight count)
    const particleCount = Math.min(60, Math.floor(window.innerWidth / 20));
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${0.04 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      drawConnections();
      animFrame = requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // Pause when tab is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animFrame);
      } else {
        animateParticles();
      }
    });
  }

  // ============================================
  // NAVBAR
  // ============================================
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }, { passive: true });

  // Mobile menu toggle
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      mobileToggle.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Active section indicator
  const sections = document.querySelectorAll('section[id]');
  function updateActiveNav() {
    const scrollY = window.scrollY + 150;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const links = document.querySelectorAll(`.nav-link[data-section="${id}"]`);
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(l => l.classList.remove('active'));
        links.forEach(l => l.classList.add('active'));
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ============================================
  // SCROLL REVEAL ANIMATION
  // ============================================
  const revealElements = document.querySelectorAll('.reveal');

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Show all immediately if reduced motion
    revealElements.forEach(el => el.classList.add('visible'));
  }

  // ============================================
  // SKILLS FILTER
  // ============================================
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillCards = document.querySelectorAll('.skill-category-card');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter;

      skillTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      skillCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ============================================
  // PROJECTS FILTER
  // ============================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach(card => {
        const categories = card.dataset.categories ? card.dataset.categories.split(',') : [];
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ============================================
  // PROJECT MODAL
  // ============================================
  const modal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  const projectData = {
    vocab: {
      category: 'AI-Assisted Education',
      title: 'Vocab Master',
      description: 'An AI-driven vocabulary learning platform built with Flask and Firebase Firestore, featuring a responsive interface designed for desktop and mobile use.',
      features: [
        'AI-powered vocabulary suggestions and learning paths',
        'Firebase Firestore for real-time data storage',
        'Responsive design for desktop and mobile',
        'Interactive vocabulary cards and quizzes',
        'User progress tracking'
      ],
      tech: ['Python', 'Flask', 'Firebase Firestore', 'AI Integration', 'HTML/CSS/JS', 'Responsive UI'],
      contribution: 'Full-stack development including backend API design, AI integration for vocabulary generation, Firebase database architecture, and responsive frontend implementation.'
    },
    cab: {
      category: 'Transportation Technology',
      title: 'Cab Booking System',
      description: 'A digital ride-booking application designed to connect passengers and drivers, with functionality focused on ride booking, driver tracking, and payment management.',
      features: [
        'Ride booking and scheduling interface',
        'Driver and passenger account management',
        'Ride tracking functionality',
        'Payment management system',
        'Booking history and receipts'
      ],
      tech: ['Web Application', 'Booking System', 'Driver Management', 'Payment Integration'],
      contribution: 'Application architecture, booking system logic, user interface development, and driver-passenger connection workflow.'
    },
    healthcare: {
      category: 'AI-Assisted Healthcare',
      title: 'AI-Integrated Healthcare System',
      description: 'A healthcare application combining patient services with AI-oriented functionality, including chatbot assistance, appointment booking, patient management, and feedback collection.',
      features: [
        'AI chatbot for patient assistance',
        'Appointment booking and management',
        'Patient record management',
        'Feedback collection system',
        'Health information resources'
      ],
      tech: ['AI Chatbot', 'Patient Management', 'Appointment Booking', 'Feedback System'],
      contribution: 'AI chatbot integration, appointment booking system, patient management interface, and feedback collection module development.'
    },
    sporto: {
      category: 'E-commerce & Inventory Management',
      title: 'Sporto',
      description: 'A sports e-commerce platform featuring product browsing, shopping cart functionality, inventory management, role-based access, and order tracking.',
      features: [
        'Product catalog with browsing and search',
        'Shopping cart and checkout flow',
        'Inventory management dashboard',
        'Role-based access control (admin, staff, customer)',
        'Order tracking and history'
      ],
      tech: ['E-commerce', 'Inventory Management', 'Role-Based Access', 'Order Tracking'],
      contribution: 'E-commerce platform development including product management, shopping cart implementation, role-based access control, and inventory tracking.'
    },
    student: {
      category: 'Education Technology',
      title: 'Student Management System',
      description: 'A student management website designed to centralize student, faculty, and administrative records for educational institutions.',
      features: [
        'Student record management',
        'Faculty information system',
        'Administrative dashboard',
        'Data centralization and reporting',
        'Search and filter capabilities'
      ],
      tech: ['Web Application', 'Data Management', 'Admin Dashboard', 'Reporting'],
      contribution: 'Full-stack development of the web application including database design, admin dashboard, student/faculty management modules, and reporting features.'
    },
    stc: {
      category: 'Android & AI-Assisted Education',
      title: 'STC Data Management',
      description: 'A mobile application combining educational assistance for students in Standards 7–12 with student data management, image-based problem solving, and voice interaction.',
      features: [
        'Educational assistance for Standards 7–12',
        'Student data management system',
        'Image-based problem solving using AI',
        'Voice interaction capabilities',
        'Mobile-first responsive design'
      ],
      tech: ['Android', 'Java', 'XML', 'AI Integration', 'Voice Interaction', 'Image Recognition'],
      contribution: 'Android application development using Java and XML, AI integration for image-based problem solving and voice interaction, and student data management system.'
    }
  };

  // Open modal
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.modal;
      const data = projectData[key];
      if (!data) return;

      modalCategory.textContent = data.category;
      modalTitle.textContent = data.title;

      let bodyHTML = `
        <div class="modal-section">
          <h4 class="modal-section-title">Overview</h4>
          <p>${data.description}</p>
        </div>
        <div class="modal-section">
          <h4 class="modal-section-title">Key Features</h4>
          <div class="modal-features">
            ${data.features.map(f => `<div class="modal-feature">${f}</div>`).join('')}
          </div>
        </div>
        <div class="modal-section">
          <h4 class="modal-section-title">Technology Stack</h4>
          <div class="modal-tech-tags">
            ${data.tech.map(t => `<span class="project-tag">${t}</span>`).join('')}
          </div>
        </div>
        <div class="modal-section">
          <h4 class="modal-section-title">My Contribution</h4>
          <p>${data.contribution}</p>
        </div>
      `;

      modalBody.innerHTML = bodyHTML;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      modalClose.focus();
    });
  });

  // Close modal
  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // ============================================
  // CONTACT FORM (mailto-based)
  // ============================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      if (!name || !email || !message) return;

      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      const mailtoLink = `mailto:jiniltailor06@gmail.com?subject=${subject}&body=${body}`;

      window.location.href = mailtoLink;
    });
  }

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // navbar height
        const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================
  // PROJECT CARD TILT EFFECT (Desktop only)
  // ============================================
  if (window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion) {
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -3;
        const rotateY = (x - centerX) / centerX * 3;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ============================================
  // EMAILJS CONTACT FORM
  // ============================================
  (function initContactForm() {
    // ⚠️ REPLACE THESE WITH YOUR ACTUAL EMAILJS CREDENTIALS
    const EMAILJS_PUBLIC_KEY = 'UbJ5IuUbrFVBD5nIk';
    const EMAILJS_SERVICE_ID = 'service_dy5k9xe';
    const EMAILJS_TEMPLATE_ID = 'template_kyavngl';

    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    const toastIcon = document.getElementById('toastIcon');
    const toastMessage = document.getElementById('toastMessage');

    // Toast notification helper
    function showToast(type, message) {
      toast.className = 'toast';
      toast.classList.add('toast-' + type, 'show');

      if (type === 'success') {
        toastIcon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
      } else {
        toastIcon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
      }

      toastMessage.textContent = message;

      // Auto-hide after 5 seconds
      setTimeout(() => {
        toast.classList.remove('show');
      }, 5000);
    }

    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnHTML = submitBtn.innerHTML;

        // Set loading state
        submitBtn.classList.add('btn-loading');
        submitBtn.innerHTML = '<span class="btn-spinner"></span> Sending...';

        // Get form data
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const message = document.getElementById('contactMessage').value.trim();

        // Send email via EmailJS
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          from_name: name,
          from_email: email,
          message: message,
          to_name: 'Jinil Tailor',
        })
          .then(function () {
            showToast('success', '✅ Message sent successfully! I\'ll get back to you soon.');
            contactForm.reset();
          })
          .catch(function (error) {
            console.error('EmailJS Error:', error);
            showToast('error', '❌ Failed to send message. Please try emailing directly.');
          })
          .finally(function () {
            submitBtn.classList.remove('btn-loading');
            submitBtn.innerHTML = originalBtnHTML;
          });
      });
    }
  })();

  console.log('%c🚀 JINIL.TECH Portfolio loaded', 'color: #00E5FF; font-size: 14px; font-weight: bold;');
});
