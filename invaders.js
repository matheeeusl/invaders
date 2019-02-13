const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 700,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let currentPlayer;
let bulletGroup;
let invadersGroup;
let GameEnemies;
let cursors;
let GamePlayer;
let GameBullet;

function preload() {
    this.load.image('bullet', 'assets/invaders/bullet.png');
    this.load.image('enemy-bullet', 'assets/invaders/enemy-bullet.png');
    this.load.image('explode', 'assets/invaders/explode.png');
    this.load.image('invader', 'assets/invaders/invader.png');
    this.load.image('player', 'assets/invaders/player.png');
    this.load.image('starfield', 'assets/invaders/starfield.png');
    this.load.spritesheet('enemy',
        'assets/invaders/invader32x32x4.png', {
            frameWidth: 32,
            frameHeight: 32
        }
    );
}

function create() {
    cursors = this.input.keyboard.createCursorKeys();
    GameEnemies = new Enemies(this);
    GamePlayer = new Player(this);
    GameBullet = new Bullet(this);
    bulletGroup = this.add.group();
    invadersGroup = this.add.group();

    this.add.image(512, 384, "starfield");
    GameEnemies.addEnemies(4, 13);
    GamePlayer.addPlayer();

    this.input.keyboard.on('keydown_SPACE', () => {
        GameBullet.shootBullet();
    });
}

function update() {
    let speed = 300;

    if (!currentPlayer || !currentPlayer.body) return;

    if (cursors.left.isDown) {
        currentPlayer.setVelocityX(-(speed));
    }
    if (cursors.right.isDown) {
        currentPlayer.setVelocityX(speed);
    }
    if (cursors.up.isDown) {
        currentPlayer.setVelocityY(-(speed));
    }
    if (cursors.down.isDown) {
        currentPlayer.setVelocityY(speed);
    }
    if (!cursors.left.isDown && !cursors.right.isDown) {
        currentPlayer.setVelocityX(0);
    }
    if (!cursors.up.isDown && !cursors.down.isDown) {
        currentPlayer.setVelocityY(0);
    }

}