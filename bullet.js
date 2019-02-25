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

            this.invaders.physics.add.overlap(bullet, invadersGroup, (bullet, invader) => {
                const explosion = this.invaders.physics.add.sprite(invader.x, invader.y, 'explode');

                explosion.anims.play('explode', true);

                explosion.on("animationcomplete", () => {
                    explosion.destroy();
                });

                if (invader.texture.key.includes("boss") && bossLifes > 0) {
                    bossLifes--;
                    if (bossLifes === 0) {
                        invader.destroy();
                        GameScore += 1000;
                    }
                } else {
                    invader.destroy();
                    GameScore += 10;
                }

                bullet.destroy();

                scoreText.setText('Score: ' + GameScore);
            });
            bulletTime = this.invaders.time.now + 300;
        }

    }
}