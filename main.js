/* ==========================================================================
   PORTFOLIO ENGINE & INTERACTIVE CLIENT-SIDE LOGIC
   Fully dynamic hydration from config.js & premium micro-animations
   ========================================================================== */

import emailjs from '@emailjs/browser';
import config from './config.js';

document.addEventListener('DOMContentLoaded', () => {
  initDynamicHydration();
  initHeaderScroll();
  initMobileMenu();
  initWordsPullUpAnimation();
  initFeatureCardsAnimation();
  initBioScrollAnimation();
  initContactForm();
  initTimeClock();
  initEasterEggs();
  initThemeToggle();
});

/* ── 0. THEME TOGGLE LOGIC ────────────────────────────────────────────── */
function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  const body = document.documentElement;
  
  // Check for saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
  } else {
    // Default to dark
    body.setAttribute('data-theme', 'dark');
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      const currentTheme = body.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      body.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);

      // Handle Flash Animation
      toggle.classList.remove('flash-anim');
      void toggle.offsetWidth; // Trigger reflow
      toggle.classList.add('flash-anim');
    });
  }
}

/* ── 1. DYNAMIC CONTENT HYDRATION ───────────────────────────────────────── */
function initDynamicHydration() {
  // Title & Header Brand
  document.title = `${config.name} — Software Engineer & ML Practitioner`;
  const logoTextNode = document.querySelector('#nav-logo .logo-text');
  if (logoTextNode) logoTextNode.textContent = formatShortName(config.name);
  
  const footerBrand = document.getElementById('footer-brand-text');
  if (footerBrand) footerBrand.textContent = config.name;



  // Hero Name & Background Image
  const heroNameTarget = document.getElementById('hero-name-target');
  if (heroNameTarget) {
    heroNameTarget.textContent = config.name;
  }
  
  // Hero Tagline
  const taglineCont = document.getElementById('hero-tagline-container');
  const heroTag = config.heroTagline || config.tagline || [];
  if (taglineCont && heroTag && Array.isArray(heroTag)) {
    taglineCont.innerHTML = heroTag.map(line => 
      `<p class="hero-tagline-line">${line}</p>`
    ).join('');
    
    // Add WordsPullUp trigger to taglines
    taglineCont.querySelectorAll('.hero-tagline-line').forEach((line, index) => {
      line.setAttribute('data-words-pull-up', '');
      // Add staggered delay triggers in HTML attribute
    });
  }

  // Hero Stats Row
  const statsTarget = document.getElementById('hero-stats-target');
  if (statsTarget && config.stats && Array.isArray(config.stats)) {
    statsTarget.innerHTML = config.stats.map(stat => `
      <div class="stat-item">
        <span class="stat-value">${stat.value}</span>
        <span class="stat-label">${stat.label}</span>
      </div>
    `).join('');
  }

  // Scrolling Skills Ticker
  const tickerTarget = document.getElementById('ticker-target');
  if (tickerTarget && config.ticker && Array.isArray(config.ticker)) {
    // Generate track items twice for seamless linear loop
    const tickerItemsHTML = config.ticker.map(item => `
      <div class="ticker-item">
        <span class="ticker-dot"></span>
        <span class="ticker-text">${item}</span>
      </div>
    `).join('');
    
    tickerTarget.innerHTML = `
      <div class="ticker-track">${tickerItemsHTML}</div>
      <div class="ticker-track" aria-hidden="true">${tickerItemsHTML}</div>
    `;
  }

  // About Section Multi-style Heading
  const aboutHeadingTarget = document.getElementById('about-heading-target');
  const aboutTag = config.aboutTagline || config.tagline || [];
  if (aboutHeadingTarget && aboutTag && Array.isArray(aboutTag)) {
    aboutHeadingTarget.innerHTML = `
      <span class="segment-1">${aboutTag[0] || 'Building systems'}</span>
      <span class="segment-2">${aboutTag[1] || 'that think.'}</span>
      <span class="segment-3">${aboutTag[2] || 'Scale. Perform.'}</span>
    `;
  }

  // Education Profile Card
  const eduTarget = document.getElementById('education-target');
  if (eduTarget && config.education) {
    const interestsHTML = (config.education.interests || []).map(interest => 
      `<span class="interest-tag">${interest}</span>`
    ).join('');
    
    eduTarget.innerHTML = `
      <div class="edu-header">
        <div class="edu-title-group">
          <h3 class="edu-school">${config.education.school}</h3>
          <p class="edu-degree">${config.education.degree}</p>
          <p class="edu-minor">${config.education.minor || ''}</p>
        </div>
        <div class="edu-info-group">
          <p class="edu-date">${config.education.graduated}</p>
          <p class="edu-location">${config.education.location}</p>
        </div>
      </div>
      <div class="edu-footer">
        <span class="edu-label">Core Research Interests</span>
        <div class="edu-interests">
          ${interestsHTML}
        </div>
      </div>
    `;
  }

  // Technical Expertise Grid
  const skillsTarget = document.getElementById('skills-grid-target');
  if (skillsTarget && config.skills && Array.isArray(config.skills)) {
    skillsTarget.innerHTML = config.skills.map(skill => {
      const tagsHTML = skill.tags.map(tag => 
        `<span class="card-tag">${tag}</span>`
      ).join('');
      
      return `
        <div class="feature-card">
          <span class="card-category">${skill.category}</span>
          <h3 class="card-title">${skill.title}</h3>
          <div class="card-tags">
            ${tagsHTML}
          </div>
        </div>
      `;
    }).join('');
  }

  // Work Experience Chronological Timeline
  const timelineTarget = document.getElementById('timeline-target');
  if (timelineTarget && config.experience && Array.isArray(config.experience)) {
    timelineTarget.innerHTML = config.experience.map(exp => {
      const bulletsHTML = exp.bullets.map(bullet => 
        `<li class="timeline-bullet">${bullet}</li>`
      ).join('');
      
      return `
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-header">
            <div class="timeline-title-group">
              <h3 class="timeline-company">${exp.company}</h3>
              <p class="timeline-role">${exp.role}</p>
            </div>
            <div class="timeline-info-group">
              <p class="timeline-date">${exp.date}</p>
              <p class="timeline-location">${exp.location}</p>
            </div>
          </div>
          <ul class="timeline-bullets">
            ${bulletsHTML}
          </ul>
        </div>
      `;
    }).join('');
  }

  // Projects Grid Modules
  const projectsTarget = document.getElementById('projects-grid-target');
  if (projectsTarget && config.projects && Array.isArray(config.projects)) {
    projectsTarget.innerHTML = config.projects.map(proj => {
      const stackHTML = proj.stack.map(tech => 
        `<span class="project-tag">${tech}</span>`
      ).join('');
      
      // Arrow SVG link handler
      const linkAttribute = proj.link ? `href="${proj.link}" target="_blank" rel="noopener noreferrer"` : 'style="cursor: default;"';
      
      return `
        <a ${linkAttribute} class="project-card">
          <div class="project-arrow" style="${proj.link ? '' : 'display: none;'}">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6464L9.29289 5H5.5C5.22386 5 5 4.77614 5 4.5C5 4.22386 5.22386 4 5.5 4H10.5C10.7761 4 11 4.22386 11 4.5V9.5C11 9.77614 10.7761 10 10.5 10C10.2239 10 10 9.77614 10 9.5V5.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="var(--color-cream-muted)"/>
            </svg>
          </div>
          <h3 class="project-name">${proj.name}</h3>
          <p class="project-desc">${proj.description}</p>
          <div class="project-stack">
            ${stackHTML}
          </div>
        </a>
      `;
    }).join('');
  }

  // Contact Details list
  const contactDetailsTarget = document.getElementById('contact-details-target');
  if (contactDetailsTarget) {
    contactDetailsTarget.innerHTML = `
      <!-- Email -->
      <div class="contact-item">
        <div class="contact-icon-box">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 5C2.5 4.44772 2.94772 4 3.5 4H16.5C17.0523 4 17.5 4.44772 17.5 5V15C17.5 15.5523 17.0523 16 16.5 16H3.5C2.94772 16 2.5 15.5523 2.5 15V5ZM4 5.86816V14.5H16V5.86816L10.3711 10.09C10.1504 10.2555 9.84961 10.2555 9.62891 10.09L4 5.86816ZM15.0234 5.5H4.97656L10 9.26758L15.0234 5.5Z" fill="var(--color-cream-muted)"/>
          </svg>
        </div>
        <div class="contact-text-box">
          <span class="contact-label">Email</span>
          <div><a href="mailto:${config.email}" class="contact-value">${config.email}</a></div>
        </div>
      </div>
      
      <!-- Phone -->
      <div class="contact-item">
        <div class="contact-icon-box">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.7705 12.5C14.1818 12.5 13.6069 12.3929 13.0673 12.1834C12.8973 12.1154 12.6973 12.1648 12.5658 12.2963L11.4116 13.4505C9.07345 12.2612 7.73877 10.9265 6.54952 8.58838L7.70371 7.43419C7.83526 7.30264 7.88463 7.10264 7.81667 6.93262C7.60711 6.39307 7.5 5.81816 7.5 5.22949C7.5 4.82739 7.17261 4.5 6.77051 4.5H4.22949C3.82739 4.5 3.5 4.82739 3.5 5.22949C3.5 13.0425 10.9575 20.5 18.7705 20.5C19.1726 20.5 19.5 20.1726 19.5 19.7705V17.2295C19.5 16.8274 19.1726 16.5 18.7705 16.5C18.1818 16.5 17.6069 16.3929 17.0673 16.1834C16.8973 16.1154 16.6973 16.1648 16.5658 16.2963L15.4116 17.4505C13.0734 16.2612 11.7388 14.9265 10.5495 12.5884L11.7037 11.4342C11.8353 11.3026 11.8846 11.1026 11.8167 10.9326C11.6071 10.3931 11.5 9.81816 11.5 9.22949C11.5 8.82739 11.1726 8.5 10.7705 8.5H8.22949C7.82739 8.5 7.5 8.82739 7.5 9.22949C7.5 12.1818 14.7705 12.5 14.7705 12.5Z" fill="var(--color-cream-muted)"/>
          </svg>
        </div>
        <div class="contact-text-box">
          <span class="contact-label">Phone</span>
          <div><a href="tel:${config.phone.replace(/[^0-9+]/g, '')}" class="contact-value">${config.phone}</a></div>
        </div>
      </div>
      
      <!-- Location -->
      <div class="contact-item">
        <div class="contact-icon-box">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 2.5C6.41016 2.5 3.5 5.41016 3.5 9C3.5 13.5684 9.17188 17.2031 9.42969 17.3633C9.77539 17.5781 10.2246 17.5781 10.5703 17.3633C10.8281 17.2031 16.5 13.5684 16.5 9C16.5 5.41016 13.5898 2.5 10 2.5ZM10 4C12.7676 4 15 6.23242 15 9C15 12.1465 11.4551 14.9785 10 16.0312C8.54492 14.9785 5 12.1465 5 9C5 6.23242 7.23242 4 10 4ZM10 6.5C8.61914 6.5 7.5 7.61914 7.5 9C7.5 10.3809 8.61914 11.5 10 11.5C11.3809 11.5 12.5 10.3809 12.5 9C12.5 7.61914 11.3809 6.5 10 6.5ZM10 8C10.5527 8 11 8.44727 11 9C11 9.55273 10.5527 10 10 10C9.44727 10 9 9.55273 9 9C9 8.44727 9.44727 8 10 8Z" fill="var(--color-cream-muted)"/>
          </svg>
        </div>
        <div class="contact-text-box">
          <span class="contact-label">Location</span>
          <div class="contact-value" style="cursor: default;">${config.location}</div>
        </div>
      </div>
      
      <!-- LinkedIn -->
      <div class="contact-item">
        <div class="contact-icon-box">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5 2.5H3.5C2.94772 2.5 2.5 2.94772 2.5 3.5V16.5C2.5 17.0523 2.94772 17.5 3.5 17.5H16.5C17.0523 17.5 17.5 17.0523 17.5 16.5V3.5C17.5 2.94772 17.0523 2.5 16.5 2.5ZM6.5 15H4.5V8.5H6.5V15ZM5.5 7.61865C4.8373 7.61865 4.3 7.0813 4.3 6.4187C4.3 5.7561 4.8373 5.21875 5.5 5.21875C6.1627 5.21875 6.7 5.7561 6.7 6.4187C6.7 7.0813 6.1627 7.61865 5.5 7.61865ZM15.5 15H13.5V11.5C13.5 10.3955 12.6045 9.5 11.5 9.5C10.3955 9.5 9.5 10.3955 9.5 11.5V15H7.5V8.5H9.5V9.45825C9.98828 8.82666 10.7593 8.35825 11.75 8.35825C13.821 8.35825 15.5 10.0371 15.5 12.1082V15Z" fill="var(--color-cream-muted)"/>
          </svg>
        </div>
        <div class="contact-text-box">
          <span class="contact-label">LinkedIn</span>
          <div><a href="${config.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-value">LinkedIn Profile</a></div>
        </div>
      </div>
      
      <!-- GitHub -->
      <div class="contact-item">
        <div class="contact-icon-box">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 2.5C5.85791 2.5 2.5 5.85791 2.5 10C2.5 13.3135 4.64868 16.126 7.62061 17.1187C7.99561 17.1873 8.13257 16.9561 8.13257 16.7581C8.13257 16.5823 8.12622 16.1157 8.1228 15.4988C5.03467 16.1211 4.54956 14.5422 4.30518 13.8562C4.16821 13.5076 3.58521 12.4502 3.0769 12.165C2.65698 11.9385 2.05664 11.3813 3.06738 11.3694C4.01587 11.3574 4.69019 12.2461 4.9126 12.5974C5.99561 14.3079 7.625 13.8186 8.27271 13.5283C8.38281 12.7441 8.69604 12.2173 9.04272 11.9141C6.38672 11.6128 3.6106 10.5847 3.6106 5.99829C3.6106 4.69312 4.07666 3.62085 4.84375 2.77881C4.7207 2.47632 4.30884 1.25439 4.96191 0.384521C4.96191 0.384521 5.96582 0.0637207 8.25146 1.61035C9.20752 1.34448 10.2227 1.21143 11.231 1.20508C12.2393 1.21143 13.2544 1.34448 14.2104 1.61035C16.4961 0.0544434 17.5 0.384521 17.5 0.384521C18.1531 1.25439 17.7412 2.47632 17.6182 2.77881C18.3853 3.62085 18.8513 4.68359 18.8513 5.99829C18.8513 10.5967 16.062 11.6128 13.4028 11.9053C13.832 12.2747 14.2139 12.9922 14.2139 14.1006C14.2139 15.6885 14.1995 16.9712 14.1995 17.3533C14.1995 17.5544 14.3364 17.7891 14.7148 17.1155C17.6836 16.1211 19.8271 13.3088 19.8271 9.99683C19.8271 5.85791 16.4692 2.5 12.3271 2.5H10Z" fill="var(--color-cream-muted)"/>
          </svg>
        </div>
        <div class="contact-text-box">
          <span class="contact-label">GitHub</span>
          <div><a href="${config.github}" target="_blank" rel="noopener noreferrer" class="contact-value">GitHub Account</a></div>
        </div>
      </div>
    `;
  }
}

// Utility: Splits full name to "Firstname Lastinitial." e.g. "Sanay Godhani" -> "Sanay G."
function formatShortName(fullName) {
  if (!fullName) return '';
  const parts = fullName.trim().split(/\s+/);
  if (parts.length >= 2) {
    const firstName = parts[0];
    const lastInitial = parts[parts.length - 1][0].toUpperCase();
    return `${firstName} ${lastInitial}.`;
  }
  return fullName;
}

/* ── 2. HEADER SCROLL SHRINK & SMART HIDE ────────────────────────────────── */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastScrollY = window.scrollY;
  const hideThreshold = 100; // Only hide after 100px scroll

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    // Add 'scrolled' class for background color/blur
    if (currentScrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Smart Hide/Show logic
    if (currentScrollY > lastScrollY && currentScrollY > hideThreshold) {
      // Scrolling DOWN - Hide
      header.classList.add('header-hidden');
    } else {
      // Scrolling UP - Show
      header.classList.remove('header-hidden');
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  // Call once on init to handle pre-scrolled page loads
  handleScroll();
}

/* ── 3. MOBILE hamburger OVERLAY ────────────────────────────────────────── */
function initMobileMenu() {
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('mobile-menu');
  const links = document.querySelectorAll('.mobile-link');

  if (!toggle || !menu) return;

  const toggleMenu = () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
  };

  toggle.addEventListener('click', toggleMenu);

  links.forEach(link => {
    link.addEventListener('click', () => {
      // Close menu when link is clicked
      toggle.classList.remove('active');
      menu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* ── 4. WORDS PULL UP TEXT ANIMATION ────────────────────────────────────── */
function initWordsPullUpAnimation() {
  const targets = document.querySelectorAll('[data-words-pull-up]');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        
        // Stagger inner spans
        const innerSpans = element.querySelectorAll('.word-inner');
        innerSpans.forEach((span, index) => {
          setTimeout(() => {
            span.classList.add('revealed');
          }, index * 80); // Stagger delay: 0.08s per word in design.md
        });
        
        obs.unobserve(element); // Trigger once
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

  targets.forEach(target => {
    const rawText = target.innerText.trim();
    if (!rawText) return;
    
    target.innerHTML = '';
    const words = rawText.split(/\s+/);
    
    words.forEach((wordText, index) => {
      const outer = document.createElement('span');
      outer.className = 'word-outer';
      
      const inner = document.createElement('span');
      inner.className = 'word-inner';
      inner.innerText = wordText;
      
      outer.appendChild(inner);
      target.appendChild(outer);
      
      // Append whitespace space
      if (index < words.length - 1) {
        target.appendChild(document.createTextNode(' '));
      }
    });
    
    observer.observe(target);
  });
  
  // Special trigger for hero heading on page load
  const heroTitle = document.getElementById('hero-title');
  if (heroTitle) {
    const nameTarget = document.getElementById('hero-name-target');
    const asterisk = document.getElementById('hero-asterisk');
    const rawName = nameTarget.textContent.trim();
    
    nameTarget.innerHTML = '';
    const words = rawName.split(/\s+/);
    
    words.forEach((wordText, index) => {
      const outer = document.createElement('span');
      outer.className = 'word-outer';
      const inner = document.createElement('span');
      inner.className = 'word-inner';
      inner.innerText = wordText;
      outer.appendChild(inner);
      nameTarget.appendChild(outer);
      if (index < words.length - 1) {
        nameTarget.appendChild(document.createTextNode(' '));
      }
    });
    
    // Animate hero name immediately
    setTimeout(() => {
      const inners = nameTarget.querySelectorAll('.word-inner');
      inners.forEach((span, index) => {
        setTimeout(() => {
          span.classList.add('revealed');
        }, index * 80);
      });
      
      // Fade in Asterisk and details
      setTimeout(() => {
        if (asterisk) {
          asterisk.style.opacity = '1';
          asterisk.style.transform = 'none';
        }
      }, inners.length * 80 + 100);
      
    }, 200);
  }
  
  // Stagger load hero details (description tagline, stats, buttons)
  setTimeout(() => {
    const fadeUps = document.querySelectorAll('.hero-content .fade-up-element');
    fadeUps.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('in-view');
      }, index * 200 + 300); // 0.5s and 0.7s matching design.md
    });
  }, 100);
}

/* ── 5. FEATURE CARDS ENTRANCE STAGGER ──────────────────────────────────── */
function initFeatureCardsAnimation() {
  const grid = document.getElementById('skills-grid-target');
  if (!grid) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.feature-card');
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('in-view');
          }, index * 150); // Stagger: 0.15s per card in design.md
        });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -100px 0px' });

  observer.observe(grid);
}

/* ── 6. SCROLL-LINKED BIOGRAPHY OPACITY REVEAL ──────────────────────────── */
function initBioScrollAnimation() {
  const bioContainer = document.getElementById('about-bio-target');
  if (!bioContainer) return;

  const bioText = config.bio;
  // Clear and inject spans per character
  bioContainer.innerHTML = bioText.split('').map((char, index) => {
    if (char === ' ') return `<span class="char" data-index="${index}"> </span>`;
    return `<span class="char" data-index="${index}">${char}</span>`;
  }).join('');

  const chars = bioContainer.querySelectorAll('.char');
  const totalChars = chars.length;
  let isListening = false;

  const updateCharOpacities = () => {
    const rect = bioContainer.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Bounds calculations matching Offset ['start 0.8', 'end 0.2']
    const startScroll = viewportHeight * 0.8;
    const endScroll = viewportHeight * 0.2;
    
    const rangeHeight = startScroll - endScroll;
    const progressRange = (rect.height || 150) + rangeHeight;
    
    let progress = (startScroll - rect.top) / progressRange;
    progress = Math.max(0, Math.min(1, progress));
    
    // Formula: charProgress = index/totalChars
    // range: [charProgress - 0.1, charProgress + 0.05]
    chars.forEach((char, index) => {
      const charProgress = index / totalChars;
      const minRange = charProgress - 0.1;
      const maxRange = charProgress + 0.05;
      
      let opacity = 0.2;
      if (progress > maxRange) {
        opacity = 1;
      } else if (progress < minRange) {
        opacity = 0.2;
      } else {
        const ratio = (progress - minRange) / (maxRange - minRange);
        opacity = 0.2 + (ratio * 0.8);
      }
      char.style.opacity = opacity.toFixed(3);
    });
  };

  // Perform highly optimized scrolling hooks via IntersectionObserver
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!isListening) {
          window.addEventListener('scroll', scrollTicker, { passive: true });
          isListening = true;
          // Initial trigger
          updateCharOpacities();
        }
      } else {
        if (isListening) {
          window.removeEventListener('scroll', scrollTicker);
          isListening = false;
        }
      }
    });
  }, { threshold: 0, rootMargin: '100px 0px 100px 0px' });

  // Throttle scrolling calls via requestAnimationFrame
  let rAFActive = false;
  function scrollTicker() {
    if (!rAFActive) {
      rAFActive = true;
      requestAnimationFrame(() => {
        updateCharOpacities();
        rAFActive = false;
      });
    }
  }

  scrollObserver.observe(bioContainer);
}

/* ── 7. ACCESSIBLE CONTACT FORM SUBMISSION ──────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  // Initialize emailjs with public key
  emailjs.init(config.emailjs.publicKey);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('.form-submit-btn');
    const label = submitBtn.querySelector('.submit-label');
    const spinner = submitBtn.querySelector('.submit-spinner');
    
    // Toggle loading UI state
    submitBtn.disabled = true;
    label.textContent = "Processing System...";
    spinner.style.display = 'inline-block';
    status.style.opacity = '0';
    status.className = "form-status";
    
    // Fetch input details for success message personalization
    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;

    // Send actual email via EmailJS
    emailjs.sendForm(
      config.emailjs.serviceId,
      config.emailjs.templateId,
      form
    ).then(() => {
      submitBtn.disabled = false;
      label.textContent = "Send Message";
      spinner.style.display = 'none';
      
      status.style.opacity = '1';
      status.className = "form-status success";
      status.textContent = `Transmission Successful! Thank you, ${name.split(' ')[0]}. I will reply to ${email} shortly.`;
      
      // Clear values
      form.reset();
      
      // Auto-clear success notification after 7 seconds
      setTimeout(() => {
        status.style.opacity = '0';
      }, 7000);
    }).catch((error) => {
      console.error('EmailJS Error:', error);
      submitBtn.disabled = false;
      label.textContent = "Send Message";
      spinner.style.display = 'none';
      
      status.style.opacity = '1';
      status.className = "form-status error";
      status.textContent = "Transmission failed. Please try again or email me directly.";
      
      setTimeout(() => {
        status.style.opacity = '0';
      }, 7000);
    });
  });
}

/* ── 8. SECONDS COUNTER / CURRENT TIME DISPLAY ──────────────────────────── */
function initTimeClock() {
  const timeTarget = document.getElementById('local-time-target');
  if (!timeTarget) return;

  const updateClock = () => {
    // Show current local time dynamically (e.g. Toronto/Toronto depending on client)
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    
    const formatted = new Date().toLocaleTimeString('en-US', options);
    timeTarget.textContent = `Local Time: ${formatted} EST`;
  };

  setInterval(updateClock, 1000);
  updateClock(); // Initial trigger
}

/* ── 9. CUSTOM HIGH-FIDELITY EASTER EGGS ────────────────────────────────── */
function initEasterEggs() {
  const asterisk = document.getElementById('hero-asterisk');
  const footerPrecision = document.getElementById('footer-easter-egg');

  if (asterisk) {
    asterisk.addEventListener('click', () => {
      // Fun click visual: random terminal bio insight
      const insights = [
        "Carleton CS Graduate (Major in BCS, Minor in Stats) ⚡",
        "40% Better Survival Rates in Multi-Agent RL 🚀",
        "1,000+ simulation episodes designed in NumPy & PPO!",
        "Flask & Redis template engines deployed at leading Mumbai brokings 💰",
        "Real-time 3D music visualizations developed using OpenGL! 🎵",
        "Deep Learning TableNet researcher for unstructured financial databases 📊"
      ];
      
      const randomInsight = insights[Math.floor(Math.random() * insights.length)];
      
      // Create a floating custom tool banner
      const banner = document.createElement('div');
      banner.style.position = 'fixed';
      banner.style.bottom = '30px';
      banner.style.left = '50%';
      banner.style.transform = 'translateX(-50%) translateY(50px)';
      banner.style.background = 'rgba(225, 224, 204, 0.95)';
      banner.style.color = '#000000';
      banner.style.padding = '12px 24px';
      banner.style.borderRadius = '9999px';
      banner.style.fontSize = '12px';
      banner.style.fontWeight = '600';
      banner.style.letterSpacing = '0.02em';
      banner.style.boxShadow = '0 10px 40px rgba(0,0,0,0.5)';
      banner.style.zIndex = '10000';
      banner.style.opacity = '0';
      banner.style.transition = 'all 0.5s var(--ease-expo)';
      banner.textContent = randomInsight;
      
      document.body.appendChild(banner);
      
      // Force layout calculation
      banner.offsetWidth;
      
      banner.style.transform = 'translateX(-50%) translateY(0)';
      banner.style.opacity = '1';
      
      // Spin the asterisk
      asterisk.style.transform = 'rotate(360deg) scale(1.4)';
      asterisk.style.color = 'var(--color-accent-green)';
      
      setTimeout(() => {
        banner.style.transform = 'translateX(-50%) translateY(-20px)';
        banner.style.opacity = '0';
        asterisk.style.transform = '';
        asterisk.style.color = '';
        setTimeout(() => {
          banner.remove();
        }, 500);
      }, 3500);
    });
  }

  // Footer Theme Toggle Egg!
  if (footerPrecision) {
    let altThemeActive = false;
    
    footerPrecision.addEventListener('click', () => {
      altThemeActive = !altThemeActive;
      const root = document.documentElement;
      
      if (altThemeActive) {
        // Toggle dynamic retro amber matrix design!
        root.style.setProperty('--color-cream', '#F59E0B');
        root.style.setProperty('--color-cream-muted', 'rgba(245, 158, 11, 0.8)');
        root.style.setProperty('--color-body-text', '#FBBF24');
        root.style.setProperty('--color-muted-text', '#78350F');
        root.style.setProperty('--color-card-bg', '#0B0600');
        root.style.setProperty('--color-card-surface', '#1C0E00');
        footerPrecision.textContent = "AMBER RUNTIME ACTIVATED";
        footerPrecision.style.color = '#F59E0B';
      } else {
        // Restore premium default specs
        root.style.removeProperty('--color-cream');
        root.style.removeProperty('--color-cream-muted');
        root.style.removeProperty('--color-body-text');
        root.style.removeProperty('--color-muted-text');
        root.style.removeProperty('--color-card-bg');
        root.style.removeProperty('--color-card-surface');
        footerPrecision.textContent = "Made with precision";
        footerPrecision.style.color = '';
      }
    });
  }
}
