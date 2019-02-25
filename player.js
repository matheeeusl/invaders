class Player {

    constructor(invaders) {
        this.invaders = invaders;
    }

    addPlayer() {
        currentPlayer = this.invaders.physics.add.sprite(750, 600, 'player');
        currentPlayer.setCollideWorldBounds(true);

        this.invaders.physics.add.collider(currentPlayer, invadersGroup, (player, invader) => {
            const explosion = this.invaders.physics.add.sprite(invader.x, invader.y, 'big-explosion');

            explosion.anims.play('big-explosion', true);

            explosion.on("animationcomplete", () => {
                explosion.destroy();
                if (playerLifes > 0) {
                    playerLifes--;
                    GamePlayer.addPlayer();
                    lifeText.setText('Lifes: ' + playerLifes);
                } else {
                    this.invaders.physics.pause();
                    msgText.setText('YOU LOST!\nClick to Restart.');
                    this.invaders.gameOver = true;
                }
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

            player.destroy();

        });
    }
}