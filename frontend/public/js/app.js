let currentRole = 'Manager';

  function animateSteppers(container) {
    const lines = container.querySelectorAll('.step-line');
    lines.forEach(line => {
      const fill = line.querySelector('.step-line-fill');
      if (!fill) return;
      if (line.classList.contains('done')) {
        fill.style.width = '0%';
        setTimeout(() => {
          fill.style.width = '100%';
        }, 80);
      } else {
        fill.style.width = '0%';
      }
    });
  }

  function animateNumbers(container) {
    const stats = container.querySelectorAll('.stat-card h3, .stat-item h3');
    stats.forEach(el => {
      const text = el.textContent.trim();
      const match = text.match(/^([0-9,.]+)(.*)$/);
      if (!match) return;

      const numStr = match[1].replace(/,/g, '');
      const isFloat = numStr.includes('.');
      const target = isFloat ? parseFloat(numStr) : parseInt(numStr);
      const suffix = match[2] || '';
      
      const duration = 1200; // ms
      const startTime = performance.now();

      function update(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const ease = progress * (2 - progress); // Ease out quad
        const val = ease * target;
        
        if (isFloat) {
          el.textContent = val.toFixed(1) + suffix;
        } else {
          el.textContent = Math.floor(val).toLocaleString() + suffix;
        }

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = text;
        }
      }
      
      requestAnimationFrame(update);
    });
  }

  function goTo(screenId) {
    const currentActive = document.querySelector('.screen.active');
    const target = document.getElementById(screenId);
    
    if (!target || currentActive === target) return;

    if (currentActive) {
      currentActive.classList.remove('active');
      currentActive.classList.add('leaving');
      
      setTimeout(() => {
        currentActive.classList.remove('leaving');
      }, 450);
    }

    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    animateSteppers(target);
    animateNumbers(target);
  }

  function handleSignIn() {
    if (currentRole === 'Manager') {
      goTo('screen-manager-dashboard');
    } else {
      goTo('screen-owner-dashboard');
    }
  }

  function setRole(btn, role) {
    currentRole = role;
    btn.closest('.role-selector').querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  function toggleTag(el) {
    const parent = el.closest('.tag-row');
    if (!parent) return;
    // Single-select behavior for ID types
    parent.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
  }

  function adjustCount(id, delta) {
    const el = document.getElementById(id);
    if (!el) return;
    let val = parseInt(el.textContent) + delta;
    if (val < 0) val = 0;
    if (val > 20) val = 20;
    el.textContent = val;
  }

  // Trigger stats animation on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      const landing = document.getElementById('screen-landing');
      if (landing) animateNumbers(landing);
    });
  } else {
    setTimeout(() => {
      const landing = document.getElementById('screen-landing');
      if (landing) animateNumbers(landing);
    }, 100);
  }
