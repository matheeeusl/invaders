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
let bulletTime = 0;
let spaceBar;

function preload() {
    this.load.image('bullet', 'assets/invaders/bullet.png');
    this.load.image('enemy-bullet', 'assets/invaders/enemy-bullet.png');
    this.load.spritesheet('explode', 'assets/invaders/explode2.png', {
        frameWidth: 70,
        frameHeight: 70
    });
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
    invadersGroup = this.physics.add.group();

    this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('explode', { start: 0, end: 15 }),
        frameRate: 25,
        repeat: 0,
        hideOnComplete: true
    });

    this.add.image(512, 384, "starfield");
    GameEnemies.addEnemies(4, 13);
    GamePlayer.addPlayer();

    spaceBar = this.input.keyboard.addKey('SPACE');
}

function update() {
    let speed = 300;
    const entry = invadersGroup.children.entries;

    if (entry.length > 0) {
        const velocity = entry[0].body.velocity.y;
        const entryY = entry[0].y;
        if (velocity > 0 && entryY >= 100) {
            invadersGroup.setVelocityY(0);
            invadersGroup.children.iterate((invader) => {
                invader.setVelocityX(250);
            });
        }
    }

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
    if (spaceBar.isDown) {
        GameBullet.shootBullet();
    }
}