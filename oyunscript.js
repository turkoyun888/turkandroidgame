const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

// Oyuncu ve top nesneleri
const player = { x: 100, y: 180, radius: 20, color: "blue", speed: 5 };
const ball = { x: 400, y: 200, radius: 10, color: "red", dx: 2, dy: 2 };

// Klavye hareket kontrolü
const keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };

document.addEventListener("keydown", (e) => { if (keys.hasOwnProperty(e.key)) keys[e.key] = true; });
document.addEventListener("keyup", (e) => { if (keys.hasOwnProperty(e.key)) keys[e.key] = false; });

// Oyuncu ve top hareketi
function update() {
    // Oyuncu hareketi
    if (keys.ArrowUp && player.y > player.radius) player.y -= player.speed;
    if (keys.ArrowDown && player.y < canvas.height - player.radius) player.y += player.speed;
    if (keys.ArrowLeft && player.x > player.radius) player.x -= player.speed;
    if (keys.ArrowRight && player.x < canvas.width - player.radius) player.x += player.speed;

    // Top hareketi ve sınır çarpışmaları
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) ball.dx *= -1;
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) ball.dy *= -1;
}

// Oyun çizme fonksiyonu
function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Oyuncuyu çiz
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.closePath();

    // Topu çiz
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

// Oyun döngüsü
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}
gameLoop();
