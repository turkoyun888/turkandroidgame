// Canvas ve bağlamı al
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

// Oyuncu nesnesi
const player = {
    x: 100,
    y: 300,
    width: 20,
    height: 40,
    speed: 5,
    color: "blue"
};

// Top nesnesi
const ball = {
    x: player.x + player.width / 2,
    y: player.y - 10,
    radius: 10,
    dx: 0,
    dy: 0,
    speed: 7,
    color: "white",
    inMotion: false
};

// Klavye kontrolleri
const keys = {};
window.addEventListener("keydown", (e) => keys[e.key] = true);
window.addEventListener("keyup", (e) => keys[e.key] = false);

// Oyuncu hareket fonksiyonu
function movePlayer() {
    if (keys["ArrowLeft"] && player.x > 0) player.x -= player.speed;
    if (keys["ArrowRight"] && player.x + player.width < canvas.width) player.x += player.speed;
    if (keys["ArrowUp"] && player.y > 0) player.y -= player.speed;
    if (keys["ArrowDown"] && player.y + player.height < canvas.height) player.y += player.speed;

    // Eğer top hareketsizse, oyuncuyla birlikte hareket eder
    if (!ball.inMotion) {
        ball.x = player.x + player.width / 2;
        ball.y = player.y - 10;
    }
}

// Şut atma fonksiyonu
function shootBall() {
    if (keys[" "] && !ball.inMotion) { // Boşluk tuşu + top hareketsizse
        ball.dx = Math.random() * 4 - 2; // Hafif rastgele yönlendirme
        ball.dy = -ball.speed;
        ball.inMotion = true;
    }
}

// Topu hareket ettirme fonksiyonu
function moveBall() {
    if (!ball.inMotion) return; // Eğer top hareketsizse hareket ettirme

    ball.x += ball.dx;
    ball.y += ball.dy;
    ball.dy += 0.2; // Yerçekimi efekti

    // Duvarlara çarpma
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx *= -1;
    }

    if (ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    // Yere düşme
    if (ball.y + ball.radius > canvas.height) {
        ball.inMotion = false;
        ball.dy = 0;
        ball.dx = 0;
        ball.y = canvas.height - ball.radius;
    }
}

// Çizim fonksiyonu
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Oyuncuyu çiz
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Topu çiz
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

// Oyun döngüsü
function gameLoop() {
    movePlayer();
    shootBall();
    moveBall();
    draw();
    requestAnimationFrame(gameLoop);
}

// Oyunu başlat
gameLoop();
