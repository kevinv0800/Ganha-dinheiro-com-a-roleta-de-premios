const canvas = document.getElementById("roleta");
const ctx = canvas.getContext("2d");

const premios = [
  "100 Meticais", "500 Meticais", "BOA SORTE",
  "500 Meticais", "10.000 Meticais", "5.000 Meticais",
  "10 Meticais", "1.000 Meticais", "BOA SORTE",
  "5.000 Meticais", "10.000 Meticais", "BOA SORTE"
];

const cores = [
  "#1976d2", "#388e3c", "#c62828",
  "#388e3c", "#fbc02d", "#7b1fa2",
  "#d32f2f", "#2e7d32", "#c62828",
  "#1565c0", "#fbc02d", "#c62828"
];

const segmentos = premios.length;
const anguloPorSegmento = 2 * Math.PI / segmentos;
let anguloAtual = 0;
let tentativas = 2;

function desenharRoleta() {
  for (let i = 0; i < segmentos; i++) {
    const inicio = i * anguloPorSegmento;
    const fim = inicio + anguloPorSegmento;

    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 140, inicio, fim);
    ctx.fillStyle = cores[i];
    ctx.fill();
    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate(inicio + anguloPorSegmento / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "bold 14px Arial";
    ctx.fillText(premios[i], 130, 5);
    ctx.restore();
  }
}

desenharRoleta();

document.getElementById("girar").onclick = function () {
  if (tentativas <= 0) {
    alert("Você já usou suas tentativas grátis!");
    return;
  }

  tentativas--;
  const extra = Math.floor(Math.random() * 360);
  const rotacao = 360 * 5 + extra;
  canvas.style.transition = "transform 5s ease-out";
  canvas.style.transform = rotate(${rotacao + anguloAtual}deg);

  setTimeout(() => {
    anguloAtual = (anguloAtual + rotacao) % 360;
    const index = Math.floor(((360 - anguloAtual + 15) % 360) / (360 / segmentos));
    const premio = premios[index];
    document.getElementById("resultado").innerHTML = 🎁 ${premio};

    if (premio !== "BOA SORTE") {
      setTimeout(() => {
        window.location.href = "https://media1.placard.co.mz/redirect.aspx?pid=5427&bid=1690";
      }, 2500);
    }
  }, 5200);
};

// Contador
let tempo = 120;
setInterval(() => {
  if (tempo <= 0) return;
  tempo--;
  const min = String(Math.floor(tempo / 60)).padStart(2, "0");
  const seg = String(tempo % 60).padStart(2, "0");
  document.getElementById("minutos").innerText = min;
  document.getElementById("segundos").innerText = seg;
}, 1000);
