class Enemies {

    constructor(invaders) {
        this.invaders = invaders;
        this.enemyType = "enemy";
    }

    addEnemies(quantidadeLinhas, quantidadeColunas) {
        const randomX = this.getRandomIntInclusive(200, 1000);
        let distanciaX = randomX;
        let distanciaY = 0;
        let contadorColuna = 1;
        for (let index = 0; index < quantidadeLinhas * quantidadeColunas; index++) {

            if (index % quantidadeColunas === 0) {
                distanciaY = (contadorColuna * 32);
                distanciaX = randomX;
                contadorColuna++;
            }

            const invader = invadersGroup.create(distanciaX, distanciaY, this.enemyType);

            if (this.enemyType.includes("boss")) {
                invader.setDisplaySize(200, 200);
                invader.setVelocityY(200);
            } else {
                invader.setVelocityY(100);
            }
            invader.setBounce(1);
            invader.setCollideWorldBounds(true);

            distanciaX += 32;
        }
    }

    attackPlayer(invader) {
        let bulletType = this.enemyType + "-bullet";
        let bullet = this.invaders.physics.add.sprite(invader.x, invader.y, bulletType);
        const velocity = this.enemyType.includes("boss") ? 10 * Math.ceil(GameLevel / 10) : 5 * Math.ceil(GameLevel / 60);
        bullet.body.setCollideWorldBounds(true);
        bullet.body.onWorldBounds = true;

        this.invaders.physics.moveTo(bullet, currentPlayer.x, currentPlayer.y, 300 + (velocity));
        enemyBulletGroup.add(bullet);

        this.invaders.physics.add.collider(bullet, currentPlayer, (bullet, player) => {
            const explosion = this.invaders.physics.add.sprite(player.x, player.y - 30, 'big-explosion');

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

            player.destroy();
            bullet.destroy();
        });
    }

    noEnemiesHandler() {
        let width = 10 + Math.ceil(GameLevel / 5);
        let height = Math.ceil(GameLevel / 15);
        this.enemyType = GameLevel % 2 === 0 ? "invader" : "enemy";

        if (GameLevel % 10 === 0) {
            this.enemyType = "boss-" + String(GameLevel / 10);
            height = 1;
            width = 1;
        }

        this.addEnemies(height, width);
    }

    getRandomIntInclusive(min, max) {
        const minimum = Math.ceil(min);
        const maximum = Math.floor(max);
        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    }
}