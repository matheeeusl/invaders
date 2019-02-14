class Enemies {

    constructor(invaders) {
        this.invaders = invaders;
    }

    addEnemies(quantidadeLinhas, quantidadeColunas) {
        let distanciaX = 300;
        let distanciaY = 0;
        for (let index = 0; index < quantidadeLinhas * quantidadeColunas; index++) {

            if (index % quantidadeColunas === 0) {
                distanciaY = (index * 3);
                distanciaX = 300;
            }

            const invader = invadersGroup.create(distanciaX, distanciaY, "enemy");
            invader.setVelocityY(100);
            invader.setBounce(1);
            invader.setCollideWorldBounds(true);

            distanciaX += 32;
        }
    }

    attackPlayer() {
        console.log("Test");
    }

}