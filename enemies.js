class Enemies {

    constructor(invaders) {
        this.invaders = invaders;
        this.enemyType = "enemy";
    }

    addEnemies(quantidadeLinhas, quantidadeColunas) {
        let distanciaX = 300;
        let distanciaY = 0;
        for (let index = 0; index < quantidadeLinhas * quantidadeColunas; index++) {

            if (index % quantidadeColunas === 0) {
                distanciaY = (index * 3);
                distanciaX = 300;
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
            this.invaders.physics.moveTo(bullet, currentPlayer.x, currentPlayer.y, 300);
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
            enemyBulletTime = this.invaders.time.now + 1000;
        }
    }

    noEnemiesHandler(){
        const lines = this.getRandomIntInclusive(1,10);
        const columns = this.getRandomIntInclusive(1,10);
        this.enemyType = lines % 2 === 0 ? "invader" : "enemy";

        this.addEnemies(lines, columns);
    }
    
    getRandomIntInclusive(min, max) {
        const minimum = Math.ceil(min);
        const maximum = Math.floor(max);
        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    }
}