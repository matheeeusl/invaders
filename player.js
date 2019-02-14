class Player {

    constructor(invaders) {
        this.invaders = invaders;
    }

    addPlayer() {
        currentPlayer = this.invaders.physics.add.sprite(512, 600, 'player');
        currentPlayer.setCollideWorldBounds(true);

        this.invaders.physics.add.collider(currentPlayer, invadersGroup, (player, invader) => {
            const explosion = this.invaders.physics.add.sprite(invader.x, invader.y, 'explode');

            explosion.anims.play('explode', true);

            explosion.on("animationcomplete", () => {
                explosion.destroy();
            });

            invader.destroy();
            player.destroy();
        });
    }
}