// Canvas ve bağlamı al
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

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
    x: 200,
    y: 320,
    radius: 10,
    dx: 0,
    dy: 0,
    speed: 7,
    color: "white"
};

// Klavye kontrolleri
const keys = {};
window.addEventListener("keydown", (e) => keys[e.key] = true);
window.addEventListener("keyup", (e) => keys[e.key] = false);

// Oyuncu hareket fonksiyonu
function movePlayer() {
    if (keys["ArrowLeft"]) player.x -= player.speed;
    if (keys["ArrowRight"]) player.x += player.speed;
    if (keys["ArrowUp"]) player.y -= player.speed;
    if (keys["ArrowDown"]) player.y += player.speed;
}

// Şut atma fonksiyonu
function shootBall() {
    if (keys[" "]) {  // Boşluk tuşuna basınca şut at
        ball.dx = ball.speed;
        ball.dy = -Math.random() * 3; // Hafif yukarı eğimli şut
    }
}

// Topu hareket ettirme fonksiyonu
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Sınırdan çıkmayı engelle
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx; // Sağ veya sol çarpınca yön değiştir
    }

    if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy; // Üst sınırdan sekme
    }

    // Top yere düşünce durması
    if (ball.y + ball.radius > canvas.height) {
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
