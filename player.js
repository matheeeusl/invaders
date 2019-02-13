class Player {

    constructor(invaders) {
        this.invaders = invaders;
    }

    addPlayer() {
        currentPlayer = this.invaders.physics.add.sprite(512, 600, 'player');
        currentPlayer.setCollideWorldBounds(true);

        this.invaders.physics.add.collider(currentPlayer, invadersGroup, (player, invader) => {
            invader.destroy();
            player.destroy();
        });
    }
}