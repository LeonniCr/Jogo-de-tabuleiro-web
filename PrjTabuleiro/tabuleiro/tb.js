const board = document.getElementById("board");
const diceEl = document.getElementById("dice");
const turnEl = document.getElementById("turn");
const rollBtn = document.getElementById("roll");

const totalCasas = 36;
const cells = [];

/* 📌 Mapa de coordenadas (ajuste conforme sua imagem tabuleiro.png)
   Cada objeto é {top, left} em px
*/
const pathCoords = [
  {top: 100, left: 20},   // casa 0 (start)
  {top: 100, left: 80},
  {top: 60,  left: 140},
  {top: 20,  left: 200},
  {top: 60,  left: 260},
  {top: 100, left: 320},
  {top: 140, left: 380},
  {top: 100, left: 440},
  {top: 60,  left: 500},
  {top: 20,  left: 560},
  {top: 60,  left: 620},
  {top: 100, left: 680},
  {top: 140, left: 740},
  {top: 100, left: 800},
  {top: 60,  left: 860},
  {top: 20,  left: 920},
  {top: 60,  left: 980},
  {top: 100, left: 1040},
  {top: 140, left: 1100},
  {top: 100, left: 1160},
  {top: 60,  left: 1220},
  {top: 20,  left: 1280},
  {top: 60,  left: 1340},
  {top: 100, left: 1400},
  {top: 140, left: 1460},
  {top: 100, left: 1520},
  {top: 60,  left: 1580},
  {top: 20,  left: 1640},
  {top: 60,  left: 1700},
  {top: 100, left: 1760},
  {top: 140, left: 1820},
  {top: 100, left: 1880},
  {top: 60,  left: 1940},
  {top: 20,  left: 2000},
  {top: 60,  left: 2060}  // casa 35 (end)
];

// --- cria tabuleiro ---
for (let i = 0; i < totalCasas; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.index = i;

  if (i === 0) cell.classList.add("start");
  if (i === totalCasas - 1) cell.classList.add("end");

  const evento = eventos.find(e => e.casa === i);
  if (evento) {
    cell.classList.add("event");
    cell.dataset.eventId = evento.id;
  }

  // posiciona conforme o mapa
  cell.style.top = pathCoords[i].top + "px";
  cell.style.left = pathCoords[i].left + "px";

  board.appendChild(cell);
  cells.push(cell);
}

// --- jogadores ---
const players = [
  { icon: "⚫", pos: 0 },
  { icon: "🔴", pos: 0 }
];
let currentPlayer = 0;

// --- renderização ---
function render() {
  cells.forEach(c => c.textContent = "");
  players.forEach(p => {
    cells[p.pos].textContent += p.icon;
  });
}

// --- modificadores ---
function aplicModificador(player, modificador){
  modificador = modificador.toLowerCase();

  if (modificador.includes("avance") || modificador.includes("anda")){
    const CASAS = parseInt(modificador.match(/\d+/));
    player.pos += CASAS;

  } else if(modificador.includes("volte")){
    const CASAS = parseInt(modificador.match(/\d+/))
    player.pos -= CASAS;
  } else if(modificador.includes("perde 1 turno")){
    player.pularTurno = true
  }

  if (player.pos < 0) player.pos = 0;
  if (player.pos >= cells.length) player.pos = cells.length - 1;
}

// --- movimento ---
function movePlayer(player, steps) {
  if (player.pularTurno){
    alert(player.icon + " perdeu a vez!");
    player.pularTurno = false;
    return;
  }

  player.pos += steps;
  if (player.pos >= cells.length - 1) {
    player.pos = cells.length - 1;
    alert(player.icon + " chegou ao fim!");
  }

  const evento = eventos.find(e => e.casa === player.pos);
  if (evento) {
    alert(`🎲 Evento: ${evento.nome}\n\n📖 ${evento.descricao}\n\n⚡ Modificador: ${evento.modificador}`);
    aplicModificador(player, evento.modificador)
  }
}

// --- dado ---
rollBtn.addEventListener("click", () => {
  const roll = Math.floor(Math.random() * 6) + 1;
  diceEl.textContent = roll;

  movePlayer(players[currentPlayer], roll);
  render();

  currentPlayer = (currentPlayer + 1) % players.length;
  turnEl.textContent = currentPlayer + 1;
});

render();
