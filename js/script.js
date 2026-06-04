(function() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const section = document.getElementById('hero-section');
  if (!section) return;
  const CELL = 40;
  const COLOR = '#7C3AED';
  let offsetX = 0, offsetY = 0;
  let mouseX = -9999, mouseY = -9999;
  let animId;

  function resize() {
    canvas.width  = section.offsetWidth;
    canvas.height = section.offsetHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  section.addEventListener('mousemove', function(e) {
    const r = canvas.getBoundingClientRect();
    mouseX = e.clientX - r.left;
    mouseY = e.clientY - r.top;
  });
  section.addEventListener('mouseleave', function() {
    mouseX = -9999; mouseY = -9999;
  });

  function drawGrid(alpha) {
    ctx.save();
    ctx.strokeStyle = COLOR;
    ctx.globalAlpha = alpha;
    ctx.lineWidth = 1;
    ctx.beginPath();
    const sx = ((offsetX % CELL) + CELL) % CELL - CELL;
    const sy = ((offsetY % CELL) + CELL) % CELL - CELL;
    for (let x = sx; x <= canvas.width + CELL; x += CELL) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
    }
    for (let y = sy; y <= canvas.height + CELL; y += CELL) {
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
    }
    ctx.stroke();
    ctx.restore();
  }

  function drawReveal() {
    if (mouseX < 0) return;
    const r = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 300);
    r.addColorStop(0, 'rgba(124,58,237,0.18)');
    r.addColorStop(1, 'rgba(124,58,237,0)');
    ctx.save();
    ctx.fillStyle = r;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(0.07);
    drawReveal();
    offsetX += 0.4;
    offsetY += 0.4;
    animId = requestAnimationFrame(animate);
  }

  animate();
})();

(function() {
  const nav = document.querySelector('.fyn-navbar');
  if (!nav) return;

  function updateNav() {
    nav.classList.toggle('scrolled', window.scrollY > 64);
  }

  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });
})();
