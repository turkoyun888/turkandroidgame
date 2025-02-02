const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 400,
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 500 }, debug: false }
    },
    scene: { preload, create, update }
};

let top, oyuncu1, oyuncu2, solKale, sagKale, zemin;

const game = new Phaser.Game(config);

function preload() {
    this.load.image('top', 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Soccerball.svg');
}

function create() {
    // **Gökyüzü Arka Planı**
    this.cameras.main.setBackgroundColor('#87CEEB'); // Açık mavi (gökyüzü rengi)

    // **Halı Saha Zemini**
    zemin = this.add.rectangle(400, 370, 800, 60, 0x008000);
    this.physics.add.existing(zemin, true); // Statik yap

    // **Kaleler**
    solKale = this.add.rectangle(50, 250, 20, 100, 0xffffff);
    sagKale = this.add.rectangle(750, 250, 20, 100, 0xffffff);
    this.physics.add.existing(solKale, true);
    this.physics.add.existing(sagKale, true);

    // **Oyuncular**
    oyuncu1 = this.add.circle(200, 300, 20, 0xff0000);
    oyuncu2 = this.add.circle(600, 300, 20, 0x0000ff);
    this.physics.add.existing(oyuncu1);
    this.physics.add.existing(oyuncu2);
    oyuncu1.body.setBounce(0.3).setCollideWorldBounds(true);
    oyuncu2.body.setBounce(0.3).setCollideWorldBounds(true);

    // **Top**
    top = this.physics.add.image(400, 200, 'top').setScale(0.1);
    top.setCollideWorldBounds(true);
    top.setBounce(0.7);

    // **Çarpışma Ayarları**
    this.physics.add.collider(top, zemin);
    this.physics.add.collider(oyuncu1, zemin);
    this.physics.add.collider(oyuncu2, zemin);
    this.physics.add.collider(top, oyuncu1);
    this.physics.add.collider(top, oyuncu2);
    this.physics.add.collider(top, solKale);
    this.physics.add.collider(top, sagKale);

    // **Kontroller**
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    // **Oyuncu 1 (Kırmızı) Kontrolleri**
    if (cursors.left.isDown) { oyuncu1.body.setVelocityX(-200); }
    else if (cursors.right.isDown) { oyuncu1.body.setVelocityX(200); }
    else { oyuncu1.body.setVelocityX(0); }

    if (cursors.up.isDown && oyuncu1.body.touching.down) {
        oyuncu1.body.setVelocityY(-400);
    }
}
