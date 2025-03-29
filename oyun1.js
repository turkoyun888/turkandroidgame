var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var ball;
var cursors;
var playerColor = 'blue'; // Varsayılan renk
var playerScore = 0;
var aiScore = 0;
var playerScoreText;
var aiScoreText;
var isGameRunning = false;

var game = new Phaser.Game(config);

function preload() {
    this.load.image('field', 'assets/field.png');
    this.load.image('ball', 'assets/ball.png');
    this.load.image('player', 'assets/player.png'); // Şu an tek renkli
}

function create() {
    // Menü Ekranı
    if (!isGameRunning) {
        var title = this.add.text(400, 100, 'Türk Oyun - Futbol', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        
        var startButton = this.add.text(400, 200, 'Başla', { fontSize: '24px', fill: '#0f0' }).setOrigin(0.5).setInteractive();
        startButton.on('pointerdown', startGame, this);
        
        var costumeButton = this.add.text(400, 250, 'Kostüm', { fontSize: '24px', fill: '#0f0' }).setOrigin(0.5).setInteractive();
        costumeButton.on('pointerdown', openCostumeMenu, this);
        
        var settingsButton = this.add.text(400, 300, 'Ayarlar', { fontSize: '24px', fill: '#0f0' }).setOrigin(0.5).setInteractive();
        settingsButton.on('pointerdown', openSettingsMenu, this);
    } else {
        // Oyun başladıysa, futbol sahasını ve oyuncuları oluştur
        this.add.image(400, 300, 'field');
        
        player = this.physics.add.image(100, 300, 'player').setCollideWorldBounds(true).setScale(0.5).setTint(getColor(playerColor));
        ball = this.physics.add.image(400, 300, 'ball').setCircle(15).setBounce(1).setCollideWorldBounds(true);
        
        playerScoreText = this.add.text(300, 20, 'Player: ' + playerScore, { fontSize: '32px', fill: '#fff' });
        aiScoreText = this.add.text(500, 20, 'AI: ' + aiScore, { fontSize: '32px', fill: '#fff' });
        
        cursors = this.input.keyboard.createCursorKeys();
        
        this.physics.add.collider(player, ball);
        this.physics.add.collider(ball, this.add.rectangle(0, 300, 10, 600), goalScored); // Sol kale
        this.physics.add.collider(ball, this.add.rectangle(800, 300, 10, 600), goalScored); // Sağ kale
    }
}

function update() {
    if (isGameRunning) {
        if (cursors.left.isDown) {
            player.setVelocityX(-160);
        } else if (cursors.right.isDown) {
            player.setVelocityX(160);
        } else {
            player.setVelocityX(0);
        }

        if (cursors.up.isDown) {
            player.setVelocityY(-160);
        } else if (cursors.down.isDown) {
            player.setVelocityY(160);
        } else {
            player.setVelocityY(0);
        }
        
        // Topun hareketini yavaşlatıyoruz
        ball.setVelocityX(ball.body.velocity.x * 0.99);
        ball.setVelocityY(ball.body.velocity.y * 0.99);
    }
}

function startGame() {
    isGameRunning = true;
    this.scene.restart();
}

function openCostumeMenu() {
    var colors = ['blue', 'red', 'green', 'yellow', 'purple'];
    var text = this.add.text(400, 100, 'Kostüm Seç:', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
    
    colors.forEach((color, index) => {
        var button = this.add.text(400, 150 + index * 40, color, { fontSize: '24px', fill: '#fff' }).setOrigin(0.5).setInteractive();
        button.on('pointerdown', () => {
            playerColor = color;
            text.setText('Kostüm: ' + color);
        });
    });
}

function openSettingsMenu() {
    var settingsText = this.add.text(400, 100, 'Ayarlar:', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
    var soundButton = this.add.text(400, 150, 'Ses: Aç/Kapa', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5).setInteractive();
    var graphicsButton = this.add.text(400, 200, 'Grafik: Yüksek/Düşük', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5).setInteractive();
    
    soundButton.on('pointerdown', toggleSound, this);
    graphicsButton.on('pointerdown', toggleGraphics, this);
}

function toggleSound() {
    // Ses açma/kapama işlemi
    console.log('Ses açma/kapama');
}

function toggleGraphics() {
    // Grafik ayarlarını değiştirme
    console.log('Grafik ayarları');
}

function goalScored() {
    if (ball.x < 50) {
        aiScore++;
        aiScoreText.setText('AI: ' + aiScore);
        resetBall();
    } else if (ball.x > 750) {
        playerScore++;
        playerScoreText.setText('Player: ' + playerScore);
        resetBall();
    }
}

function resetBall() {
    ball.setPosition(400, 300);
    ball.setVelocity(0, 0);
}

function getColor(color) {
    switch (color) {
        case 'red': return 0xff0000;
        case 'green': return 0x00ff00;
        case 'yellow': return 0xffff00;
        case 'purple': return 0x800080;
        default: return 0x0000ff; // Blue
    }
                                                               }var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var ball;
var cursors;
var playerColor = 'blue'; // Varsayılan renk
var playerScore = 0;
var aiScore = 0;
var playerScoreText;
var aiScoreText;
var isGameRunning = false;

var game = new Phaser.Game(config);

function preload() {
    this.load.image('field', 'assets/field.png');
    this.load.image('ball', 'assets/ball.png');
    this.load.image('player', 'assets/player.png'); // Şu an tek renkli
}

function create() {
    // Menü Ekranı
    if (!isGameRunning) {
        var title = this.add.text(400, 100, 'Türk Oyun - Futbol', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        
        var startButton = this.add.text(400, 200, 'Başla', { fontSize: '24px', fill: '#0f0' }).setOrigin(0.5).setInteractive();
        startButton.on('pointerdown', startGame, this);
        
        var costumeButton = this.add.text(400, 250, 'Kostüm', { fontSize: '24px', fill: '#0f0' }).setOrigin(0.5).setInteractive();
        costumeButton.on('pointerdown', openCostumeMenu, this);
        
        var settingsButton = this.add.text(400, 300, 'Ayarlar', { fontSize: '24px', fill: '#0f0' }).setOrigin(0.5).setInteractive();
        settingsButton.on('pointerdown', openSettingsMenu, this);
    } else {
        // Oyun başladıysa, futbol sahasını ve oyuncuları oluştur
        this.add.image(400, 300, 'field');
        
        player = this.physics.add.image(100, 300, 'player').setCollideWorldBounds(true).setScale(0.5).setTint(getColor(playerColor));
        ball = this.physics.add.image(400, 300, 'ball').setCircle(15).setBounce(1).setCollideWorldBounds(true);
        
        playerScoreText = this.add.text(300, 20, 'Player: ' + playerScore, { fontSize: '32px', fill: '#fff' });
        aiScoreText = this.add.text(500, 20, 'AI: ' + aiScore, { fontSize: '32px', fill: '#fff' });
        
        cursors = this.input.keyboard.createCursorKeys();
        
        this.physics.add.collider(player, ball);
        this.physics.add.collider(ball, this.add.rectangle(0, 300, 10, 600), goalScored); // Sol kale
        this.physics.add.collider(ball, this.add.rectangle(800, 300, 10, 600), goalScored); // Sağ kale
    }
}

function update() {
    if (isGameRunning) {
        if (cursors.left.isDown) {
            player.setVelocityX(-160);
        } else if (cursors.right.isDown) {
            player.setVelocityX(160);
        } else {
            player.setVelocityX(0);
        }

        if (cursors.up.isDown) {
            player.setVelocityY(-160);
        } else if (cursors.down.isDown) {
            player.setVelocityY(160);
        } else {
            player.setVelocityY(0);
        }
        
        // Topun hareketini yavaşlatıyoruz
        ball.setVelocityX(ball.body.velocity.x * 0.99);
        ball.setVelocityY(ball.body.velocity.y * 0.99);
    }
}

function startGame() {
    isGameRunning = true;
    this.scene.restart();
}

function openCostumeMenu() {
    var colors = ['blue', 'red', 'green', 'yellow', 'purple'];
    var text = this.add.text(400, 100, 'Kostüm Seç:', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
    
    colors.forEach((color, index) => {
        var button = this.add.text(400, 150 + index * 40, color, { fontSize: '24px', fill: '#fff' }).setOrigin(0.5).setInteractive();
        button.on('pointerdown', () => {
            playerColor = color;
            text.setText('Kostüm: ' + color);
        });
    });
}

function openSettingsMenu() {
    var settingsText = this.add.text(400, 100, 'Ayarlar:', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
    var soundButton = this.add.text(400, 150, 'Ses: Aç/Kapa', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5).setInteractive();
    var graphicsButton = this.add.text(400, 200, 'Grafik: Yüksek/Düşük', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5).setInteractive();
    
    soundButton.on('pointerdown', toggleSound, this);
    graphicsButton.on('pointerdown', toggleGraphics, this);
}

function toggleSound() {
    // Ses açma/kapama işlemi
    console.log('Ses açma/kapama');
}

function toggleGraphics() {
    // Grafik ayarlarını değiştirme
    console.log('Grafik ayarları');
}

function goalScored() {
    if (ball.x < 50) {
        aiScore++;
        aiScoreText.setText('AI: ' + aiScore);
        resetBall();
    } else if (ball.x > 750) {
        playerScore++;
        playerScoreText.setText('Player: ' + playerScore);
        resetBall();
    }
}

function resetBall() {
    ball.setPosition(400, 300);
    ball.setVelocity(0, 0);
}

function getColor(color) {
    switch (color) {
        case 'red': return 0xff0000;
        case 'green': return 0x00ff00;
        case 'yellow': return 0xffff00;
        case 'purple': return 0x800080;
        default: return 0x0000ff; // Blue
    }
            }
