class Player {

    constructor(invaders) {
        this.invaders = invaders;
    }

    addPlayer() {
        currentPlayer = this.invaders.physics.add.sprite(512, 600, 'player');
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

            invader.destroy();
            player.destroy();

        });
    }
}