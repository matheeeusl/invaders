class Enemies {

    constructor(invaders) {
        this.invaders = invaders;
        this.enemyType = "enemy";
    }

    addEnemies(quantidadeLinhas, quantidadeColunas) {
        let distanciaX = 300;
        let distanciaY = 0;
        let contadorColuna = 1;
        for (let index = 0; index < quantidadeLinhas * quantidadeColunas; index++) {

            if (index % quantidadeColunas === 0) {
                distanciaY = (contadorColuna * 32);
                distanciaX = 300;
                contadorColuna++;
            }

            const invader = invadersGroup.create(distanciaX, distanciaY, this.enemyType);
            invader.setVelocityY(100);
            invader.setBounce(1);
            invader.setCollideWorldBounds(true);

            distanciaX += 32;
        }
    }

    attackPlayer(invader) {
        let bulletType = this.enemyType + "-bullet"
        if (this.invaders.time.now > enemyBulletTime) {
            const bullet = this.invaders.physics.add.sprite(invader.x, invader.y, bulletType);
            bullet.setCollideWorldBounds(false);
            this.invaders.physics.moveTo(bullet, currentPlayer.x, currentPlayer.y, 300 + (10 * (Math.ceil(GameLevel / 5))));
            enemyBulletGroup.add(bullet);

            this.invaders.physics.add.collider(bullet, currentPlayer, (bullet, player) => {
                const explosion = this.invaders.physics.add.sprite(player.x, player.y, 'explode');

                explosion.anims.play('explode', true);

                explosion.on("animationcomplete", () => {
                    explosion.destroy();
                });

                player.destroy();
                bullet.destroy();

            });
            enemyBulletTime = this.invaders.time.now + (500 - (10 * (Math.ceil(GameLevel / 5) - 1)));
        }
    }

    noEnemiesHandler() {
        this.enemyType = GameLevel % 2 === 0 ? "invader" : "enemy";

        this.addEnemies(Math.ceil(GameLevel / 10), 3 + Math.ceil(GameLevel / 5));
    }

    getRandomIntInclusive(min, max) {
        const minimum = Math.ceil(min);
        const maximum = Math.floor(max);
        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    }
}