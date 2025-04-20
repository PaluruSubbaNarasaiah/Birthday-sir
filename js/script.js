const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const pieces = [];
const numberOfPieces = 150;

function randomColor() {
  const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#843b62'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function createPiece() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    size: Math.random() * 8 + 2,
    speed: Math.random() * 3 + 1,
    color: randomColor(),
    rotation: Math.random() * 360
  };
}

for (let i = 0; i < numberOfPieces; i++) {
  pieces.push(createPiece());
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let piece of pieces) {
    ctx.fillStyle = piece.color;
    ctx.save();
    ctx.translate(piece.x, piece.y);
    ctx.rotate(piece.rotation * Math.PI / 180);
    ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
    ctx.restore();

    piece.y += piece.speed;
    piece.rotation += piece.speed;

    if (piece.y > canvas.height) {
      Object.assign(piece, createPiece());
      piece.y = 0;
    }
  }

  requestAnimationFrame(draw);
}

draw();
