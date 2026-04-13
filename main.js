// =============== NAV ===============
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const nav = document.querySelector('.nav');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(4px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(4px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
}

if (navLinks) {
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      if (navToggle) {
        navToggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
  });
}

window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
});

// =============== SCROLL REVEAL ===============
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// =============== WAITLIST ===============
document.querySelectorAll('.waitlist-form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('.waitlist-input');
    if (!input || !input.value.trim()) return;
    form.style.display = 'none';
    const success = form.nextElementSibling;
    if (success && success.classList.contains('waitlist-success')) {
      success.style.display = 'block';
    }
    input.value = '';
  });
});

// =============== FAQ ===============
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// =============== STYLE QUIZ ===============
const quizContainer = document.querySelector('.quiz-container');
if (quizContainer) {
  let currentStep = 0;
  const steps = quizContainer.querySelectorAll('.quiz-step');
  const dots = quizContainer.querySelectorAll('.quiz-dot');

  function showStep(index) {
    steps.forEach((s, i) => s.classList.toggle('active', i === index));
    dots.forEach((d, i) => {
      d.classList.remove('active', 'done');
      if (i === index) d.classList.add('active');
      else if (i < index) d.classList.add('done');
    });
  }

  quizContainer.querySelectorAll('.quiz-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const step = opt.closest('.quiz-step');
      const stepIndex = Array.from(steps).indexOf(step);
      step.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      setTimeout(() => {
        if (stepIndex < steps.length - 1) {
          currentStep = stepIndex + 1;
          showStep(currentStep);
        }
      }, 350);
    });
  });
}

// =============== CONTACT FORM ===============
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    contactForm.style.display = 'none';
    const success = document.getElementById('contactSuccess');
    if (success) success.style.display = 'block';
  });
}
