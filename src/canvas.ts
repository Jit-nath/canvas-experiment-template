const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;

  // Clear canvas
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Grid
  ctx.strokeStyle = "#111";
  ctx.lineWidth = 1;
  const gridSize = 20;
  for (let x = 0; x <= canvas.width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y <= canvas.height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function startDrawing(e: MouseEvent) {
  isDrawing = true;
  const rect = canvas.getBoundingClientRect();
  lastX = e.clientX - rect.left;
  lastY = e.clientY - rect.top;
}

function draw(e: MouseEvent) {
  if (!isDrawing) return;

  const rect = canvas.getBoundingClientRect();
  const currentX = e.clientX - rect.left;
  const currentY = e.clientY - rect.top;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(currentX, currentY);
  ctx.strokeStyle = "#00ff00";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.stroke();

  lastX = currentX;
  lastY = currentY;
}

function stopDrawing() {
  isDrawing = false;
}

// Touch Events
canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  canvas.dispatchEvent(
    new MouseEvent("mousedown", {
      clientX: touch.clientX,
      clientY: touch.clientY,
    })
  );
});

canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  canvas.dispatchEvent(
    new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY,
    })
  );
});

canvas.addEventListener("touchend", (e) => {
  e.preventDefault();
  canvas.dispatchEvent(new MouseEvent("mouseup"));
});

// Mouse Events
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

// Resize
window.addEventListener("load", resizeCanvas);
window.addEventListener("resize", resizeCanvas);
