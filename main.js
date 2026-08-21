/* ==========================================================================
   PORTFOLIO ENGINE & INTERACTIVE CLIENT-SIDE LOGIC
   Apple Design Inspired (Emil Kowalski principles)
   ========================================================================== */

import emailjs from '@emailjs/browser';
import config from './config.js';

document.addEventListener('DOMContentLoaded', () => {
  initDynamicHydration();
  initPaginationWayfinding();
  initContactForm();
});

/* ── 1. DYNAMIC CONTENT HYDRATION ───────────────────────────────────────── */
function initDynamicHydration() {
  document.title = `${config.name} — Software Engineer & ML Practitioner`;
  
  const heroNameTarget = document.getElementById('hero-name-target');
  if (heroNameTarget) {
    heroNameTarget.innerHTML = `<span class="name-line">${config.name}</span>`;
  }
  
  const heroTaglineTarget = document.getElementById('hero-tagline-target');
  if (heroTaglineTarget && config.heroTagline) {
    heroTaglineTarget.textContent = config.heroTagline.join(' ') + '.';
  }

  const aboutHeadingTarget = document.getElementById('about-heading-target');
  if (aboutHeadingTarget && config.aboutTagline) {
    aboutHeadingTarget.textContent = config.aboutTagline.join(' ');
  }

  const bioTarget = document.getElementById('about-bio-target');
  if (bioTarget && config.bio) {
    bioTarget.textContent = config.bio;
  }

  // Hero Stats List
  const statsTarget = document.getElementById('hero-stats-target');
  if (statsTarget && config.stats && Array.isArray(config.stats)) {
    statsTarget.innerHTML = config.stats.slice(0, 4).map(stat => `
      <div class="stat-card">
        <div class="stat-value">${stat.value}</div>
        <div class="stat-label">${stat.label}</div>
      </div>
    `).join('');
  }

  // Technical Expertise List
  const skillsTarget = document.getElementById('skills-grid-target');
  if (skillsTarget && config.skills && Array.isArray(config.skills)) {
    skillsTarget.innerHTML = config.skills.map(skill => `
      <div class="skill-card">
        <div class="skill-cat">${skill.category.replace(/[\[\]]/g, '')}</div>
        <h3 class="skill-title">${skill.title}</h3>
        <div class="skill-tags">
          ${skill.tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  // Work Experience Selector & Ticket Hydration
  const menuTarget = document.getElementById('exp-menu-target');
  const ticketCompany = document.getElementById('ticket-company-target');
  const ticketDate = document.getElementById('ticket-date-target');
  const ticketRole = document.getElementById('ticket-role-target');
  const timelineTarget = document.getElementById('timeline-target');

  if (menuTarget && config.experience && Array.isArray(config.experience)) {
    // Generate Menu Buttons
    menuTarget.innerHTML = config.experience.map((exp, idx) => `
      <button class="stamp-btn${idx === 0 ? ' active' : ''}" data-index="${idx}">
        ${exp.company}
      </button>
    `).join('');

    const renderExperience = (idx) => {
      const exp = config.experience[idx];
      if (!exp) return;

      if (ticketCompany) ticketCompany.textContent = exp.company;
      if (ticketDate) ticketDate.textContent = exp.date;
      if (ticketRole) ticketRole.textContent = exp.role;

      if (timelineTarget) {
        timelineTarget.innerHTML = exp.bullets.map(bullet => 
          `<li class="ticket-bullet">${bullet}</li>`
        ).join('');

        // Apply staggered animation using custom ease-out
        const bullets = timelineTarget.querySelectorAll('.ticket-bullet');
        bullets.forEach((bullet, bIdx) => {
          bullet.style.opacity = '0';
          bullet.style.transform = 'translateY(10px) scale(0.97)';
          bullet.style.transition = 'opacity 250ms cubic-bezier(0.23, 1, 0.32, 1), transform 250ms cubic-bezier(0.23, 1, 0.32, 1)';
          setTimeout(() => {
            bullet.style.opacity = '1';
            bullet.style.transform = 'translateY(0) scale(1)';
          }, (bIdx + 1) * 60);
        });
      }
    };

    renderExperience(0);

    menuTarget.addEventListener('click', (e) => {
      const btn = e.target.closest('.stamp-btn');
      if (!btn) return;

      menuTarget.querySelectorAll('.stamp-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const index = parseInt(btn.getAttribute('data-index'), 10);
      renderExperience(index);
    });
  }

  // Projects List
  const projectsTarget = document.getElementById('projects-grid-target');
  if (projectsTarget && config.projects && Array.isArray(config.projects)) {
    projectsTarget.innerHTML = config.projects.map((proj) => {
      const linkAttribute = proj.link ? `href="${proj.link}" target="_blank" rel="noopener noreferrer"` : 'style="cursor: default;"';
      return `
        <a ${linkAttribute} class="project-blob-card">
          <div>
            <h3 class="project-name">${proj.name}</h3>
            <p class="project-desc">${proj.description}</p>
          </div>
          <div class="project-stack">${proj.stack.join('  /  ')}</div>
        </a>
      `;
    }).join('');
  }

  // Hobbies List (Refactored to Bento Cards)
  const hobbiesTarget = document.getElementById('hobbies-grid-target');
  if (hobbiesTarget && config.hobbies && Array.isArray(config.hobbies)) {
    hobbiesTarget.innerHTML = config.hobbies.map(hobby => {
      const isFeatured = hobby.name === "Indrith Studio";
      return `
        <div class="stamp-card${isFeatured ? ' featured' : ''}">
          <div class="stamp-header">
            <span class="stamp-price">${isFeatured ? 'Featured' : hobby.role}</span>
            <span class="stamp-date">${hobby.date}</span>
          </div>
          <div class="stamp-body">
            <h3 class="stamp-title">${hobby.name}</h3>
            <p class="stamp-details">${hobby.details}</p>
          </div>
        </div>
      `;
    }).join('');
  }

  // Contact links
  const contactDetailsTarget = document.getElementById('contact-details-target');
  if (contactDetailsTarget) {
    contactDetailsTarget.innerHTML = `
      <a href="mailto:${config.email}" class="contact-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        ${config.email}
      </a>
      <a href="tel:${config.phone.replace(/[^0-9+]/g, '')}" class="contact-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        ${config.phone}
      </a>
      <a href="${config.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
        LinkedIn Profile
      </a>
      <a href="${config.github}" target="_blank" rel="noopener noreferrer" class="contact-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
        GitHub Workspace
      </a>
    `;
  }
}

/* ── 2. SCROLL WAYFINDING ────────────────────────────── */
function initPaginationWayfinding() {
  const container = document.getElementById('spread-container');
  const sections = document.querySelectorAll('.section-spread');
  const navLinks = document.querySelectorAll('.liquid-glass-nav .nav-link');

  if (!container || sections.length === 0) return;

  const updatePaginationState = () => {
    const scrollPosition = container.scrollTop;
    const containerHeight = container.clientHeight;
    
    let currentIdx = 0;
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      if (scrollPosition >= sectionTop - containerHeight / 2) {
        currentIdx = index;
      }
    });

    sections.forEach((sec, idx) => {
      sec.classList.toggle('active', idx === currentIdx);
    });

    navLinks.forEach((link, idx) => {
      link.classList.toggle('active', idx === currentIdx);
    });
  };

  container.addEventListener('scroll', updatePaginationState, { passive: true });
  updatePaginationState();

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

/* ── 3. CONTACT FORM SUBMISSION ──────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  emailjs.init(config.emailjs.publicKey);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    status.style.opacity = '0';
    
    const email = document.getElementById('form-email').value;

    emailjs.sendForm(
      config.emailjs.serviceId,
      config.emailjs.templateId,
      form
    ).then(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
      
      status.style.opacity = '1';
      status.style.color = "var(--color-accent)";
      status.textContent = `Message Sent! I will reply to ${email} shortly.`;
      
      form.reset();
      
      setTimeout(() => {
        status.style.opacity = '0';
      }, 7000);
    }).catch((error) => {
      console.error('EmailJS Error:', error);
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
      
      status.style.opacity = '1';
      status.style.color = "red";
      status.textContent = "Message failed. Please try again or email me directly.";
      
      setTimeout(() => {
        status.style.opacity = '0';
      }, 7000);
    });
  });
}
