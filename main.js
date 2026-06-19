/* ==========================================================================
   PORTFOLIO ENGINE & INTERACTIVE CLIENT-SIDE LOGIC
   Pudgy Penguins Cozy Fusion — Cloud and Iceberg snapping spread layout
   ========================================================================== */

import emailjs from '@emailjs/browser';
import config from './config.js';

document.addEventListener('DOMContentLoaded', () => {
  initDynamicHydration();
  initPaginationWayfinding();
  initContactForm();
  initEasterEggs();
});

/* ── 1. DYNAMIC CONTENT HYDRATION ───────────────────────────────────────── */
function initDynamicHydration() {
  document.title = `${config.name} — Software Engineer & ML Practitioner`;
  
  const heroNameTarget = document.getElementById('hero-name-target');
  if (heroNameTarget) {
    heroNameTarget.textContent = `${config.name}`;
  }
  
  // Bio/About Tagline & Bio text
  const aboutHeadingTarget = document.getElementById('about-heading-target');
  if (aboutHeadingTarget && config.aboutTagline && Array.isArray(config.aboutTagline)) {
    aboutHeadingTarget.textContent = config.aboutTagline.join(' ');
  } else if (aboutHeadingTarget && config.heroTagline) {
    aboutHeadingTarget.textContent = config.heroTagline.join(' ');
  }

  const bioTarget = document.getElementById('about-bio-target');
  if (bioTarget && config.bio) {
    bioTarget.textContent = config.bio;
  }

  // Hero Stats List
  const statsTarget = document.getElementById('hero-stats-target');
  if (statsTarget && config.stats && Array.isArray(config.stats)) {
    statsTarget.innerHTML = config.stats.slice(0, 4).map(stat => `
      <div class="stat-item">
        <span class="stat-value">${stat.value}</span>
        <span class="stat-label">${stat.label}</span>
      </div>
    `).join('');
  }

  // Technical Expertise List
  const skillsTarget = document.getElementById('skills-grid-target');
  if (skillsTarget && config.skills && Array.isArray(config.skills)) {
    skillsTarget.innerHTML = config.skills.map(skill => `
      <div class="skill-editorial-item">
        <span class="skill-cat">${skill.category}</span>
        <h3 class="skill-title">${skill.title}</h3>
        <div class="skill-tags-inline">${skill.tags.join('  ·  ')}</div>
      </div>
    `).join('');
  }

  // Work Experience Terminal Selection Menu & Output Loader
  const menuTarget = document.getElementById('exp-menu-target');
  const timelineTarget = document.getElementById('timeline-target');
  if (menuTarget && timelineTarget && config.experience && Array.isArray(config.experience)) {
    // Generate Menu Buttons
    menuTarget.innerHTML = config.experience.map((exp, idx) => `
      <button class="terminal-menu-btn${idx === 0 ? ' active' : ''}" data-index="${idx}">
        &gt; cat ${exp.company.toLowerCase().replace(/\s+/g, '_')}.log
      </button>
    `).join('');

    // Load Experience details with reveal animations
    const renderExperience = (idx) => {
      const exp = config.experience[idx];
      const bulletsHTML = exp.bullets.map(bullet => 
        `<li class="timeline-bullet">${bullet}</li>`
      ).join('');

      timelineTarget.innerHTML = `
        <div class="timeline-item terminal-output">
          <div class="terminal-prompt">&gt; executing log dump for index_${idx}... [OK]</div>
          <h3 class="timeline-company">${exp.company}</h3>
          <div class="timeline-role-date">${exp.role} &nbsp;·&nbsp; ${exp.date}</div>
          <ul class="timeline-bullets">
            ${bulletsHTML}
          </ul>
        </div>
      `;

      // Apply staggering line reveal animation
      const bullets = timelineTarget.querySelectorAll('.timeline-bullet');
      bullets.forEach((bullet, bIdx) => {
        bullet.style.opacity = '0';
        bullet.style.transform = 'translateY(5px)';
        bullet.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        setTimeout(() => {
          bullet.style.opacity = '1';
          bullet.style.transform = 'translateY(0)';
        }, (bIdx + 1) * 80);
      });
    };

    // Initialize first experience item
    renderExperience(0);

    // Click handler for menu items
    menuTarget.addEventListener('click', (e) => {
      const btn = e.target.closest('.terminal-menu-btn');
      if (!btn) return;

      menuTarget.querySelectorAll('.terminal-menu-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const index = parseInt(btn.getAttribute('data-index'), 10);
      renderExperience(index);
    });
  }

  // Education Section
  const eduTarget = document.getElementById('education-target');
  if (eduTarget && config.education) {
    eduTarget.innerHTML = `
      <h3 class="edu-school">${config.education.school}</h3>
      <div class="edu-degree">${config.education.degree} (${config.education.graduated})</div>
    `;
  }

  // Projects List
  const projectsTarget = document.getElementById('projects-grid-target');
  if (projectsTarget && config.projects && Array.isArray(config.projects)) {
    projectsTarget.innerHTML = config.projects.map((proj, idx) => {
      const linkAttribute = proj.link ? `href="${proj.link}" target="_blank" rel="noopener noreferrer"` : 'style="cursor: default;"';
      const orderNum = String(idx + 1).padStart(2, '0');
      
      return `
        <a ${linkAttribute} class="project-item-link">
          <div class="project-header-row">
            <span class="project-num">../</span>
            <h3 class="project-name">${proj.name}</h3>
          </div>
          <p class="project-desc">${proj.description}</p>
          <div class="project-stack-row">${proj.stack.join('  /  ')}</div>
        </a>
      `;
    }).join('');
  }

  // Contact links
  const contactDetailsTarget = document.getElementById('contact-details-target');
  if (contactDetailsTarget) {
    contactDetailsTarget.innerHTML = `
      <a href="mailto:${config.email}" class="contact-direct-link">Email / ${config.email}</a>
      <a href="tel:${config.phone.replace(/[^0-9+]/g, '')}" class="contact-direct-link">Phone / ${config.phone}</a>
      <a href="${config.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-direct-link">LinkedIn / Profile</a>
      <a href="${config.github}" target="_blank" rel="noopener noreferrer" class="contact-direct-link">GitHub / Workspace</a>
    `;
  }
}

/* ── 2. SCROLL WAYFINDING & PAGINATION STRIP ────────────────────────────── */
function initPaginationWayfinding() {
  const container = document.getElementById('spread-container');
  const sections = document.querySelectorAll('.section-spread');
  const counter = document.getElementById('pagination-counter');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const navLinks = document.querySelectorAll('.liquid-glass-nav .nav-link');

  if (!container || sections.length === 0 || !counter) return;

  const totalSections = sections.length;
  let activeIndex = 0;

  const updatePaginationState = () => {
    const scrollPosition = container.scrollTop;
    const containerHeight = container.clientHeight;
    
    // Determine active section index
    let currentIdx = 0;
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      if (scrollPosition >= sectionTop - containerHeight / 2) {
        currentIdx = index;
      }
    });

    activeIndex = currentIdx;

    // Update Counter Text
    counter.textContent = `${activeIndex + 1} / ${totalSections}`;

    // Toggle active classes on sections for transitions
    sections.forEach((sec, idx) => {
      sec.classList.toggle('active', idx === activeIndex);
    });

    // Update Active Nav Link
    navLinks.forEach((link, idx) => {
      link.classList.toggle('active', idx === activeIndex);
    });
  };

  container.addEventListener('scroll', updatePaginationState, { passive: true });
  updatePaginationState();

  // Scroll to next/prev section on click
  nextBtn.addEventListener('click', () => {
    if (activeIndex < totalSections - 1) {
      sections[activeIndex + 1].scrollIntoView({ behavior: 'smooth' });
    }
  });

  prevBtn.addEventListener('click', () => {
    if (activeIndex > 0) {
      sections[activeIndex - 1].scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Nav links smooth scroll handlers
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSec = document.querySelector(targetId);
      if (targetSec) {
        targetSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ── 3. ACCESSIBLE CONTACT FORM SUBMISSION ──────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  emailjs.init(config.emailjs.publicKey);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('.editorial-submit-btn');
    const label = submitBtn.querySelector('span');
    
    submitBtn.disabled = true;
    label.textContent = "Transmitting...";
    status.style.opacity = '0';
    status.className = "form-status";
    
    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;

    emailjs.sendForm(
      config.emailjs.serviceId,
      config.emailjs.templateId,
      form
    ).then(() => {
      submitBtn.disabled = false;
      label.textContent = "Send Transmission";
      
      status.style.opacity = '1';
      status.style.color = "var(--color-outline)";
      status.textContent = `Transmission Successful! Thank you. I will reply to ${email} shortly.`;
      
      form.reset();
      
      setTimeout(() => {
        status.style.opacity = '0';
      }, 7000);
    }).catch((error) => {
      console.error('EmailJS Error:', error);
      submitBtn.disabled = false;
      label.textContent = "Send Transmission";
      
      status.style.opacity = '1';
      status.style.color = "red";
      status.textContent = "Transmission failed. Please try again or email me directly.";
      
      setTimeout(() => {
        status.style.opacity = '0';
      }, 7000);
    });
  });
}

/* ── 4. CUSTOM HIGH-FIDELITY EASTER EGGS ────────────────────────────────── */
function initEasterEggs() {
  const nameLabel = document.getElementById('hero-name-target');
  const statusIndicator = document.getElementById('footer-easter-egg');

  if (nameLabel) {
    nameLabel.style.cursor = 'pointer';
    nameLabel.addEventListener('click', () => {
      const insights = [
        "Carleton CS Graduate (Major in BCS, Minor in Stats)",
        "40% Better Survival Rates in Multi-Agent RL",
        "1,000+ simulation episodes designed in NumPy & PPO!",
        "Flask & Redis template engines deployed at leading Mumbai brokings",
        "Real-time 3D music visualizations developed using OpenGL!",
        "Deep Learning TableNet researcher for unstructured financial databases"
      ];
      
      const randomInsight = insights[Math.floor(Math.random() * insights.length)];
      
      const banner = document.createElement('div');
      banner.style.position = 'fixed';
      banner.style.bottom = '110px';
      banner.style.left = '50%';
      banner.style.transform = 'translateX(-50%) translateY(50px)';
      banner.style.background = 'var(--color-outline)';
      banner.style.color = 'var(--color-paper)';
      banner.style.padding = '16px 32px';
      banner.style.border = '3px solid var(--color-outline)';
      banner.style.borderRadius = '20px';
      banner.style.fontFamily = 'var(--font-display)';
      banner.style.fontSize = '15px';
      banner.style.fontWeight = '600';
      banner.style.letterSpacing = '0.01em';
      banner.style.zIndex = '10000';
      banner.style.opacity = '0';
      banner.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      banner.textContent = randomInsight;
      
      document.body.appendChild(banner);
      
      banner.offsetWidth; // force reflow
      
      banner.style.transform = 'translateX(-50%) translateY(0)';
      banner.style.opacity = '1';
      
      setTimeout(() => {
        banner.style.transform = 'translateX(-50%) translateY(-20px)';
        banner.style.opacity = '0';
        setTimeout(() => {
          banner.remove();
        }, 500);
      }, 3500);
    });
  }

  if (statusIndicator) {
    let altThemeActive = false;
    statusIndicator.addEventListener('click', () => {
      altThemeActive = !altThemeActive;
      const root = document.documentElement;
      
      if (altThemeActive) {
        // Switch variables to "SYS_STATUS: OVERLOAD" (High-contrast safety orange invasion)
        root.style.setProperty('--color-sky-light', '#ff5f1f');
        root.style.setProperty('--color-sky-blue', '#ff5f1f');
        root.style.setProperty('--color-pudgy-yellow', '#000000');
        root.style.setProperty('--color-pudgy-orange', '#ffffff');
        root.style.setProperty('--color-paper', '#ff5f1f');
        root.style.setProperty('--color-outline', '#000000');
        root.style.setProperty('--glass-bg', '#ff5f1f');
        root.style.setProperty('--glass-border', '#000000');
        root.style.setProperty('--color-obsidian', '#000000');
        root.style.setProperty('--color-obsidian-muted', '#111111');
        statusIndicator.textContent = "SYS_STATUS: OVERLOAD";
      } else {
        // Reset properties
        root.style.removeProperty('--color-sky-light');
        root.style.removeProperty('--color-sky-blue');
        root.style.removeProperty('--color-pudgy-yellow');
        root.style.removeProperty('--color-pudgy-orange');
        root.style.removeProperty('--color-paper');
        root.style.removeProperty('--color-outline');
        root.style.removeProperty('--glass-bg');
        root.style.removeProperty('--glass-border');
        root.style.removeProperty('--color-obsidian');
        root.style.removeProperty('--color-obsidian-muted');
        statusIndicator.textContent = "SYS_STATUS: READY";
      }
    });
  }
}
