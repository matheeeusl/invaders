const config = {
    type: Phaser.AUTO,
    width: 1500,
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

let playerLifes = 3;
let bombCounter = 3;
let GameScore = 0;
let GameLevel = 9;
let bossLifes;

let bulletGroup;
let currentPlayer;
let enemyBulletGroup;
let invadersGroup;

let GameEnemies;
let GamePlayer;
let GameBullet;

let bulletTime = 0;
let enemyBulletTime = 0;
let powerRate = 0;

let spaceBar;
let cursors;

let scoreText;
let levelText;
let bombText;
let lifeText;
let msgText;
let spaceImage;

function preload() {
    this.load.image('bullet', 'assets/invaders/bullets/red-bullet.png');
    this.load.spritesheet('big-explosion', 'assets/invaders/explosions/boom3.png', {
        frameWidth: 128,
        frameHeight: 128
    });
    this.load.spritesheet('giant-explosion', 'assets/invaders/explosions/big-boom3.png', {
        frameWidth: 500,
        frameHeight: 500
    });
    this.load.image('enemy-bullet', 'assets/invaders/bullets/enemy-bullet.png');
    this.load.image('invader-bullet', 'assets/invaders/bullets/enemy-bullet2.png');
    this.load.image('boss-1-bullet', 'assets/invaders/bullets/boss-1-bullet.png');

    this.load.spritesheet('explode', 'assets/invaders/explosions/explode2.png', {
        frameWidth: 70,
        frameHeight: 70
    });
    this.load.spritesheet('invader', 'assets/invaders/enemies/invader.png', {
        frameWidth: 16,
        frameHeight: 16
    });

    this.load.spritesheet('boss-1', 'assets/invaders/enemies/boss-1.png', {
        frameWidth: 219,
        frameHeight: 243
    });
    this.load.spritesheet('boss-2', 'assets/invaders/enemies/boss-2.png', {
        frameWidth: 252,
        frameHeight: 240
    });
    this.load.spritesheet('boss-3', 'assets/invaders/enemies/boss-3.png', {
        frameWidth: 317,
        frameHeight: 235
    });
    this.load.spritesheet('boss-4', 'assets/invaders/enemies/boss-4.png', {
        frameWidth: 282,
        frameHeight: 320
    });
    this.load.spritesheet('boss-5', 'assets/invaders/enemies/boss-5.png', {
        frameWidth: 340,
        frameHeight: 322
    });
    this.load.spritesheet('boss-6', 'assets/invaders/enemies/boss-6.png', {
        frameWidth: 486,
        frameHeight: 449
    });
    this.load.spritesheet('boss-7', 'assets/invaders/enemies/boss-7.png', {
        frameWidth: 564,
        frameHeight: 1037
    });
    this.load.spritesheet('boss-8', 'assets/invaders/enemies/boss-8.png', {
        frameWidth: 911,
        frameHeight: 1114
    });
    this.load.spritesheet('boss-9', 'assets/invaders/enemies/boss-9.png', {
        frameWidth: 1629,
        frameHeight: 1278
    });
    this.load.spritesheet('boss-10', 'assets/invaders/enemies/boss-10.png', {
        frameWidth: 1219,
        frameHeight: 1361
    });

    this.load.image('player', 'assets/invaders/player/player.png');

    this.load.image('space-1', 'assets/invaders/skies/space-1.png');
    this.load.image('space-2', 'assets/invaders/skies/space-2.png');
    this.load.image('space-3', 'assets/invaders/skies/space-3.png');
    this.load.image('space-4', 'assets/invaders/skies/space-4.png');
    this.load.image('space-5', 'assets/invaders/skies/space-5.png');
    this.load.image('space-6', 'assets/invaders/skies/space-6.png');
    this.load.image('space-7', 'assets/invaders/skies/space-7.png');
    this.load.image('space-8', 'assets/invaders/skies/space-8.png');
    this.load.image('space-9', 'assets/invaders/skies/space-9.png');
    this.load.image('space-10', 'assets/invaders/skies/space-10.png');

    this.load.spritesheet('enemy',
        'assets/invaders/enemies/invader32x32x4.png', {
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
    enemyBulletGroup = this.add.group();
    invadersGroup = this.physics.add.group();

    this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('explode', { start: 0, end: 15 }),
        frameRate: 25,
        repeat: 0,
        hideOnComplete: true
    });

    this.anims.create({
        key: 'big-explosion',
        frames: this.anims.generateFrameNumbers('big-explosion', { start: 0, end: 63 }),
        frameRate: 120,
        repeat: 0,
        hideOnComplete: true
    });

    this.anims.create({
        key: 'giant-explosion',
        frames: this.anims.generateFrameNumbers('giant-explosion', { start: 0, end: 63 }),
        frameRate: 120,
        repeat: 0,
        hideOnComplete: true
    });

    this.input.on('pointerdown', function(pointer) {
        if (typeof currentPlayer.body === 'undefined' && playerLifes <= 0) {
            bombCounter = 3;
            GameLevel = 1;
            playerLifes = 3;
            this.scene.restart();
        }
    }, this);

    this.physics.world.on('worldbounds', function(body) {
        body.gameObject.destroy();
    }, this);

    spaceImage = this.add.image(750, 384, "space-1");
    GameEnemies.noEnemiesHandler();
    GamePlayer.addPlayer();

    spaceBar = this.input.keyboard.addKey('SPACE');
    shiftBar = this.input.keyboard.addKey('SHIFT');

    bombText = this.add.text(16, 568, 'Bombs: ' + bombCounter, { fontSize: '32px', fill: '#fff' });
    scoreText = this.add.text(16, 632, 'Score: 0', { fontSize: '32px', fill: '#fff' });
    msgText = this.add.text(500, 300, '', { fontSize: '32px', fill: '#fff' });
    levelText = this.add.text(16, 600, 'Level ' + GameLevel, { fontSize: '32px', fill: '#fff' });
    lifeText = this.add.text(16, 536, 'Lifes:  ' + playerLifes, { fontSize: '32px', fill: '#fff' });
}

function update() {
    let speed = 300;
    const entry = invadersGroup.children.entries;
    const isBoss = entry.length > 0 ? entry[0].texture.key.includes("boss") : false;
    if (!entry.length) {
        GameLevel++;
        if (GameLevel > 100) {
            this.physics.pause();
            msgText.setText('YOU WON!');
            gameOver = true;

        } else {
            levelText.setText('Level: ' + GameLevel);
            if (GameLevel % 10 === 0) {
                bossLifes = 100 * (GameLevel / 10);
            }
            if ((GameLevel - 1) % 10 === 0) {
                spaceImage.setTexture(`space-${(GameLevel - 1)/10 + 1}`);
            }
            GameEnemies.noEnemiesHandler();
        }
    }

    if (entry.length > 0 && typeof currentPlayer.body !== 'undefined') {
        const velocity = entry[entry.length - 1].body.velocity.y;
        const entryY = entry[entry.length - 1].y;
        const fireRate = isBoss ? 500 - (50 * (Math.ceil(GameLevel / 10))) : 1000 - (30 * (Math.ceil(GameLevel / 20) - 1));
        if (velocity > 0 && entryY >= 200) {
            invadersGroup.setVelocityY(0);
            invadersGroup.children.iterate((invader) => {
                invader.setVelocityX(250 + (2 * GameLevel));
            });
        }

        if (this.time.now > enemyBulletTime) {
            invadersGroup.children.iterate((invader) => {
                GameEnemies.attackPlayer(invader);
            });
            enemyBulletTime = this.time.now + (fireRate);
        }
    }

    if (!currentPlayer || !currentPlayer.body) return;

    if (cursors.up.isDown) {
        currentPlayer.setVelocityY(-(speed));
    }
    if (cursors.down.isDown) {
        currentPlayer.setVelocityY(speed);
    }
    if (cursors.left.isDown) {
        currentPlayer.setVelocityX(-(speed));
    }
    if (cursors.right.isDown) {
        currentPlayer.setVelocityX(speed);
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
    if (shiftBar.isDown) {
        if (this.time.now > powerRate && bombCounter > 0) {
            enemyBulletGroup.clear(true, true);
            GameScore += 10 * entry.length;

            if (isBoss && bossLifes > 0) {
                bossLifes -= 50;
                if (bossLifes === 0) {
                    invadersGroup.clear(true, true);
                }
            } else {
                invadersGroup.clear(true, true);
            }

            scoreText.setText('Score: ' + GameScore);
            bombCounter--;
            powerRate = this.time.now + 1000;
            const explosion = this.physics.add.sprite(currentPlayer.x, currentPlayer.y - 500, 'giant-explosion');
            bombText.setText('Bombs: ' + bombCounter);

            explosion.anims.play('giant-explosion', true);

            explosion.on("animationcomplete", () => {
                explosion.destroy();
            });
        }
    }
}