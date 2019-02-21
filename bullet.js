class Bullet {

    constructor(invaders) {
        this.invaders = invaders;
    }

    shootBullet() {
        if (this.invaders.time.now > bulletTime) {
            const bullet = this.invaders.physics.add.sprite(currentPlayer.x, currentPlayer.y, "bullet");
            bullet.setCollideWorldBounds(false);
            bullet.setVelocityY(-1000);
            bulletGroup.add(bullet);

            this.invaders.physics.add.collider(bullet, invadersGroup, (bullet, invader) => {
                const explosion = this.invaders.physics.add.sprite(invader.x, invader.y, 'explode');

                explosion.anims.play('explode', true);

                explosion.on("animationcomplete", () => {
                    explosion.destroy();
                });

                invader.destroy();
                bullet.destroy();

                GameScore += 10;
                scoreText.setText('Score: ' + GameScore);
            });
            bulletTime = this.invaders.time.now + 300;
        }

    }
}