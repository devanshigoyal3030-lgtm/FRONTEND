/**
 * Devanshi Goyal - Personal Portfolio JavaScript
 * Handles project modals, image lightboxes, mobile drawer, scroll spy, and contact form.
 */

// --- Projects Data Store ---
const PROJECTS_DATA = {
  'business-website': {
    title: 'Responsive Business Website',
    image: 'assets/project-business-website.svg',
    video: 'certificates/NSUTDELHI/ResponsiveBusinessWebsite/WhatsApp Video 2026-09-06 at 1.39.46 AM.mp4',
    description: 'A responsive business website designed to present business information, services and contact details with a clean and user-friendly interface.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Web Design'],
    features: [
      'Clean & responsive user interface',
      'Structured business service sections',
      'Cross-device mobile-first layout',
      'Interactive navigation and contact section'
    ],
    github: 'https://github.com',
    demo: null
  },

  'architecture-analysis': {
    title: 'Website Architecture Analysis',
    image: 'assets/project-architecture.svg',
    video: 'certificates/WebsiteArchitectureAnalysis/WhatsApp Video 2026-09-06 at 1.46.32 AM.mp4',
    description: 'A project focused on understanding and analysing website structure, components, navigation and how different parts of a website work together.',
    technologies: ['HTML', 'CSS', 'Web Architecture'],
    features: [
      'Analysis of frontend component hierarchy',
      'DOM layout breakdown and navigation flows',
      'Accessibility and user experience structure study',
      'Modular layout organization principles'
    ],
    github: 'https://github.com',
    demo: null
  },

  'event-manager': {
    title: 'Multi-Page College Event Manager',
    image: 'assets/project-event-manager.svg',
    video: 'certificates/MultiPageEventCollageManager/WhatsApp Video 2026-09-06 at 1.46.31 AM.mp4',
    description: 'A multi-page website for managing and presenting college events. It allows users to browse events, view event details, access registration information and navigate through different sections.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    features: [
      'Multiple pages with intuitive navigation',
      'Comprehensive event information & category filter',
      'Detailed event view layout',
      'Interactive student registration form',
      'Dedicated contact section',
      'Responsive design across mobile and desktop',
      'Client-side form validation'
    ],
    github: 'https://github.com',
    demo: null
  },

  'shopping-website': {
    title: 'Shopping Website',
    image: 'assets/project-business-website.svg',
    video: 'certificates/Shopping website/20260905-2022-13.0333001.mp4',
    description: 'A feature-rich web-based e-commerce shopping platform providing interactive product catalogs, filtering capabilities, shopping cart interactions, and a clean modern user interface.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'E-Commerce UI'],
    features: [
      'Dynamic product grid display & layout',
      'Interactive cart management experience',
      'Responsive mobile and desktop UI styling',
      'Modern user interface design and filtering'
    ],
    github: 'https://github.com',
    demo: null
  }
};

// --- Mobile Drawer Navigation ---
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
const mobileDrawerClose = document.getElementById('mobile-drawer-close');
const mobileLinks = document.querySelectorAll('.mobile-link');

function openMobileDrawer() {
  if (mobileNavDrawer && mobileNavOverlay) {
    mobileNavDrawer.classList.add('open');
    mobileNavOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeMobileDrawer() {
  if (mobileNavDrawer && mobileNavOverlay) {
    mobileNavDrawer.classList.remove('open');
    mobileNavOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobileDrawer);
if (mobileDrawerClose) mobileDrawerClose.addEventListener('click', closeMobileDrawer);
if (mobileNavOverlay) mobileNavOverlay.addEventListener('click', closeMobileDrawer);

mobileLinks.forEach(link => {
  link.addEventListener('click', closeMobileDrawer);
});

// --- Scroll Spy & Active Nav Link Highlight ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu .nav-link');

function scrollActiveHighlight() {
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 110;
    const sectionId = current.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', scrollActiveHighlight);

// --- Project Modal Logic ---
function openProjectModal(projectId) {
  const project = PROJECTS_DATA[projectId];
  if (!project) return;

  const imgContainer = document.querySelector('#project-modal .modal-img-container');
  if (imgContainer) {
    if (project.video) {
      imgContainer.innerHTML = `
        <video controls playsinline muted preload="metadata" class="modal-project-video" poster="${project.image}">
          <source src="${project.video}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      `;
    } else {
      imgContainer.innerHTML = `<img src="${project.image}" id="modal-project-img" alt="${project.title}">`;
    }
  }

  document.getElementById('modal-project-title').textContent = project.title;
  document.getElementById('modal-project-desc').textContent = project.description;

  // Tech stack
  const techContainer = document.getElementById('modal-project-tech');
  techContainer.innerHTML = project.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('');

  // Features list
  const featuresContainer = document.getElementById('modal-project-features');
  featuresContainer.innerHTML = project.features.map(f => `<li>${f}</li>`).join('');

  // Actions
  const actionsContainer = document.getElementById('modal-project-actions');
  let githubBtnHtml = project.github
    ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        GitHub Repository
      </a>`
    : `<button class="btn btn-disabled btn-sm" disabled>GitHub Repository</button>`;

  let demoBtnHtml = project.video
    ? `<a href="${project.video}" target="_blank" class="btn btn-primary btn-sm">🎬 Open Video File</a>`
    : (project.demo
        ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Live Demo</a>`
        : `<button class="btn btn-disabled btn-sm" disabled title="Live demo link not available yet">Live Demo (Not Available)</button>`);

  actionsContainer.innerHTML = githubBtnHtml + demoBtnHtml;

  const modal = document.getElementById('project-modal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.remove('active');
    // Pause any modal videos
    const videos = modal.querySelectorAll('video');
    videos.forEach(v => v.pause());
  }
  document.body.style.overflow = '';
}

// --- Lightbox Modal Logic ---
function openLightbox(imgSrc, captionText) {
  const modal = document.getElementById('lightbox-modal');
  const imgEl = document.getElementById('lightbox-img');
  const captionEl = document.getElementById('lightbox-caption');

  if (modal && imgEl) {
    imgEl.src = imgSrc;
    imgEl.alt = captionText || 'Full View';
    if (captionEl) captionEl.textContent = captionText || '';

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

// --- Close Modal on Overlay Click ---
function closeModalOnOverlay(event, modalId) {
  if (event.target.id === modalId) {
    if (modalId === 'project-modal') closeProjectModal();
    if (modalId === 'lightbox-modal') closeLightbox();
  }
}

// Global ESC Key Listener
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
    closeLightbox();
    closeMobileDrawer();
  }
});

// --- Contact Form Handler ---
function handleContactSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('user-name').value.trim();
  const email = document.getElementById('user-email').value.trim();
  const statusEl = document.getElementById('form-status');

  if (!name || !email) return;

  statusEl.className = 'form-status success';
  statusEl.textContent = `Thank you, ${name}! Your message preview has been submitted. For direct contact, feel free to email devanshi.goyal@example.com!`;
  
  document.getElementById('contact-form').reset();

  setTimeout(() => {
    statusEl.style.display = 'none';
  }, 6000);
}
