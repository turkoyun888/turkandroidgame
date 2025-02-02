const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 0 }, debug: false }
    },
    scene: { preload, create, update }
};

const game = new Phaser.Game(config);

let player, cursors, bullets, enemies, lastFired = 0;

function preload() {
    this.load.image('player', 'https://labs.phaser.io/assets/sprites/phaser-dude.png');
    this.load.image('bullet', 'https://labs.phaser.io/assets/sprites/bullet.png');
    this.load.image('enemy', 'https://labs.phaser.io/assets/sprites/red.png');
}

function create() {
    player = this.physics.add.sprite(400, 500, 'player').setCollideWorldBounds(true);
    cursors = this.input.keyboard.createCursorKeys();
    bullets = this.physics.add.group({ defaultKey: 'bullet', maxSize: 10 });
    enemies = this.physics.add.group();
    
    this.time.addEvent({ delay: 1000, callback: spawnEnemy, callbackScope: this, loop: true });
    this.physics.add.collider(bullets, enemies, hitEnemy, null, this);
    this.physics.add.collider(player, enemies, gameOver, null, this);
}

function update(time) {
    player.setVelocity(0);
    if (cursors.left.isDown) player.setVelocityX(-200);
    if (cursors.right.isDown) player.setVelocityX(200);
    if (cursors.up.isDown) player.setVelocityY(-200);
    if (cursors.down.isDown) player.setVelocityY(200);

    if (cursors.space.isDown && time > lastFired) {
        let bullet = bullets.get(player.x, player.y - 20);
        if (bullet) {
            bullet.setActive(true).setVisible(true);
            bullet.body.velocity.y = -300;
            lastFired = time + 500;
        }
    }

    bullets.children.iterate(b => {
        if (b && b.y < 0) bullets.killAndHide(b);
    });
}

function spawnEnemy() {
    let x = Phaser.Math.Between(50, 750);
    let enemy = enemies.create(x, 0, 'enemy');
    enemy.setVelocityY(100);
}

function hitEnemy(bullet, enemy) {
    bullet.destroy();
    enemy.destroy();
}

function gameOver() {
    this.scene.restart();
}
