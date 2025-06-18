// Initialize canvas
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

// Set canvas size
function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;

  // Clear canvas with a subtle grid pattern
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw grid
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

// Basic drawing functionality
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

// Event listeners
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

// Touch events for mobile
canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  const mouseEvent = new MouseEvent("mousedown", {
    clientX: touch.clientX,
    clientY: touch.clientY,
  });
  canvas.dispatchEvent(mouseEvent);
});

canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  const mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY,
  });
  canvas.dispatchEvent(mouseEvent);
});

canvas.addEventListener("touchend", (e) => {
  e.preventDefault();
  const mouseEvent = new MouseEvent("mouseup", {});
  canvas.dispatchEvent(mouseEvent);
});

// Window control buttons
document.getElementById("close-btn")?.addEventListener("click", () => {
  if (confirm("Are you sure you want to close the application?")) {
    document.body.style.opacity = "0";
    setTimeout(() => {
      document.body.innerHTML =
        '<div style="display: flex; justify-content: center; align-items: center; height: 100vh; color: white; font-family: system-ui;">Application Closed</div>';
    }, 300);
  }
});

document.getElementById("minimize-btn")?.addEventListener("click", () => {
  canvas.style.transform = "scale(0.1)";
  canvas.style.transition = "transform 0.3s ease";
  setTimeout(() => {
    canvas.style.transform = "scale(1)";
  }, 1000);
});

document.getElementById("maximize-btn")?.addEventListener("click", () => {
  const frame = document.getElementById("frame");
  if (!frame) return;
  if (frame.style.width === "100vw") {
    frame.style.width = "min(90vw, 800px)";
    frame.style.height = "min(70vh, 600px)";
  } else {
    frame.style.width = "100vw";
    frame.style.height = "100vh";
    frame.style.borderRadius = "0";
  }
  setTimeout(resizeCanvas, 100);
});

// Initialize
window.addEventListener("load", resizeCanvas);
window.addEventListener("resize", resizeCanvas);
