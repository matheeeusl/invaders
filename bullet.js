class Bullet {

    constructor(invaders) {
        this.invaders = invaders;
    }

    shootBullet() {
        const bullet = this.invaders.physics.add.sprite(currentPlayer.x, currentPlayer.y, "bullet");
        bulletGroup.add(bullet);
        bullet.setCollideWorldBounds(false);
        bullet.setVelocityY(-1000);

        this.invaders.physics.add.collider(bullet, invadersGroup, (bullet, invader) => {
            invader.destroy();
            bullet.destroy();
        });
    }
}