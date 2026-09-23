/* ===== PRELOADER: HELLO IN DIFFERENT LANGUAGES ===== */
(function () {
  const words = [
    'Hello',        // English
    'Bonjour',      // French
    'Hola',         // Spanish
    'হ্যালো',        // Bengali
    'Ciao',         // Italian
    'こんにちは',      // Japanese
    'Hallo',        // German
    '안녕하세요',      // Korean
    'Привет',       // Russian
    'مرحبا',        // Arabic
    'Olá',          // Portuguese
    '你好',          // Chinese
    'Hello'         // back to English before reveal
  ];

  const preloader = document.getElementById('preloader');
  const wordEl = document.getElementById('preloader-word');
  if (!preloader || !wordEl) return;

  document.body.classList.add('preloader-active');

  let i = 0;
  const stepMs = 180;

  const interval = setInterval(() => {
    i++;
    if (i >= words.length) {
      clearInterval(interval);
      setTimeout(hidePreloader, 400);
      return;
    }
    wordEl.textContent = words[i];
  }, stepMs);

  function hidePreloader() {
    preloader.classList.add('preloader-hidden');
    document.body.classList.remove('preloader-active');
    setTimeout(() => preloader.remove(), 700);
  }

  // Safety net: never let the preloader block the site
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (document.getElementById('preloader')) hidePreloader();
    }, words.length * stepMs + 1500);
  });
})();

/* ===== MATRIX RAIN ===== */
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
let cols, drops;

function initMatrix() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const fontSize = 14;
  cols = Math.floor(canvas.width / fontSize);
  drops = Array(cols).fill(1);
}

function getMatrixColors() {
  const theme = document.documentElement.getAttribute('data-theme') || 'dark';
  if (theme === 'light') {
    return { fade: 'rgba(244,247,244,0.14)', glyph: '#00a855' };
  }
  return { fade: 'rgba(10,12,15,0.05)', glyph: '#00ff88' };
}

function drawMatrix() {
  const colors = getMatrixColors();
  ctx.fillStyle = colors.fade;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = colors.glyph;
  ctx.font = '14px Share Tech Mono';

  const chars = '01アイウエオカキクケコセキュリティネットワーク';

  drops.forEach((y, i) => {
    const char = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(char, i * 14, y * 14);
    if (y * 14 > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  });
}

initMatrix();
setInterval(drawMatrix, 50);
window.addEventListener('resize', initMatrix);

/* ===== TYPED TERMINAL ===== */
const lines = [
  { text: 'whoami', delay: 400 },
  { output: '<span class="t-green-txt">m_mohtasin_akbar_labib</span>', delay: 300 },
  { text: 'cat skills.txt', delay: 600 },
  { output: '<span class="t-green-txt">cybersecurity | networking | pentesting | C | Python</span>', delay: 300 },
  { text: 'echo $STATUS', delay: 600 },
  { output: '<span class="t-success">✔ ready_to_defend_networks</span>', delay: 200 },
];

let lineIndex = 0;
let charIndex = 0;
const typedEl = document.getElementById('typed-text');
const outputEl = document.getElementById('terminal-output');

function typeNextLine() {
  if (!typedEl || !outputEl) return;
  if (lineIndex >= lines.length) {
    setTimeout(() => {
      lineIndex = 0; charIndex = 0;
      typedEl.textContent = '';
      outputEl.innerHTML = '';
      typeNextLine();
    }, 3000);
    return;
  }

  const line = lines[lineIndex];

  if (line.output) {
    const p = document.createElement('p');
    p.innerHTML = line.output;
    outputEl.appendChild(p);
    lineIndex++;
    setTimeout(typeNextLine, line.delay);
    return;
  }

  if (charIndex < line.text.length) {
    typedEl.textContent += line.text[charIndex];
    charIndex++;
    setTimeout(typeNextLine, 65);
  } else {
    const p = document.createElement('p');
    p.innerHTML = '<span class="t-prompt">root@labib:~$</span> ' + line.text;
    outputEl.appendChild(p);
    typedEl.textContent = '';
    charIndex = 0;
    lineIndex++;
    setTimeout(typeNextLine, line.delay);
  }
}

if (typedEl && outputEl) setTimeout(typeNextLine, 800);

/* ===== PARALLAX BACKGROUND ===== */
(function () {
  const shapes = document.querySelectorAll('.parallax-shape');
  if (!shapes.length) return;

  let ticking = false;

  function updateParallax() {
    const y = window.scrollY;
    shapes.forEach(el => {
      const speed = parseFloat(el.dataset.speed) || 0.2;
      const rotate = el.dataset.rotate === 'true';
      const offset = y * speed;
      el.style.transform = rotate
        ? `translateY(${offset}px) rotate(${offset * 0.15}deg)`
        : `translateY(${offset}px)`;
    });
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  updateParallax();
})();

/* ===== HERO ENTRANCE + GLITCH + TILT ===== */
(function () {
  const terminal = document.querySelector('.terminal-window');
  const heroText = document.querySelector('.hero-text');
  const heroName = document.querySelector('.hero-name');
  if (!terminal && !heroText) return; // not on hero page

  // Staggered entrance
  const revealTargets = [terminal, heroText].filter(Boolean);
  revealTargets.forEach(el => el.classList.add('reveal-up'));

  function playReveal() {
    revealTargets.forEach((el, i) => {
      setTimeout(() => el.classList.add('is-visible'), i * 180);
    });
  }

  const preloader = document.getElementById('preloader');
  if (preloader && !preloader.classList.contains('preloader-hidden')) {
    const obs = new MutationObserver(() => {
      if (preloader.classList.contains('preloader-hidden')) {
        playReveal();
        obs.disconnect();
      }
    });
    obs.observe(preloader, { attributes: true, attributeFilter: ['class'] });
  } else {
    playReveal();
  }

  // Periodic glitch on the name
  if (heroName) {
    function triggerGlitch() {
      heroName.classList.add('glitching');
      setTimeout(() => heroName.classList.remove('glitching'), 350);
      setTimeout(triggerGlitch, 4000 + Math.random() * 3000);
    }
    setTimeout(triggerGlitch, 2500);
  }

  // Mouse-follow 3D tilt on the terminal window
  if (terminal) {
    terminal.addEventListener('mousemove', (e) => {
      const rect = terminal.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      terminal.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    });
    terminal.addEventListener('mouseleave', () => {
      terminal.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
    });
  }
})();

/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ===== HAMBURGER ===== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ===== SECTION FADE-IN ===== */
const fadeEls = document.querySelectorAll('.skill-card, .project-card, .about-grid, .contact-wrap');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  fadeObserver.observe(el);
});

/* ===== CONTACT FORM ===== */
function handleSubmit(e) {
  e.preventDefault();
  const status = document.getElementById('form-status');
  const btn = e.target.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending...';

  setTimeout(() => {
    status.textContent = '✔ Message sent! I\'ll get back to you soon.';
    e.target.reset();
    btn.disabled = false;
    btn.textContent = 'Send Message ↗';
    setTimeout(() => status.textContent = '', 4000);
  }, 1200);
}

/* ===== ACTIVE NAV LINK ON SCROLL ===== */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--green)' : '';
  });
});

/* ===== THEME ===== */
(function () {
  const STORAGE_KEY = 'theme';

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
    }
    document.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  }

  function initTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
      return;
    }
    const system = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    setTheme(system);
  }

  initTheme();

  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }
})();
