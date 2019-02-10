const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

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
    this.add.image(512, 384, "starfield");
}

function update() {

}