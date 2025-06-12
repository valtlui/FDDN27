
const canvas = document.getElementById('fogos');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fogos = [];

function criarFogo(x, y) {
  for (let i = 0; i < 50; i++) {
    fogos.push({
      x: x,
      y: y,
      radius: Math.random() * 2 + 1,
      angle: Math.random() * 2 * Math.PI,
      speed: Math.random() * 5 + 1,
      alpha: 1,
      decay: Math.random() * 0.02 + 0.01,
      color: 'rgba(255,105,180,1)'
    });
  }
}

function animarFogos() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fogos.forEach((f, index) => {
    f.x += Math.cos(f.angle) * f.speed;
    f.y += Math.sin(f.angle) * f.speed;
    f.alpha -= f.decay;
    if (f.alpha <= 0) {
      fogos.splice(index, 1);
    } else {
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.radius, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(255,105,180,${f.alpha})`;
      ctx.fill();
    }
  });
  requestAnimationFrame(animarFogos);
}

animarFogos();

document.addEventListener('click', (e) => {
  criarFogo(e.clientX, e.clientY);

  const novaMensagem = document.createElement('div');
  novaMensagem.classList.add('mensagem-click');
  novaMensagem.style.top = `${e.clientY}px`;
  novaMensagem.style.left = `${e.clientX}px`;
  novaMensagem.innerText = 'Feliz Dia dos Namorados';
  document.body.appendChild(novaMensagem);

  setTimeout(() => {
    document.body.removeChild(novaMensagem);
  }, 3000);
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
