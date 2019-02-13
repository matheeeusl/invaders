class Enemies {

    constructor(invaders) {
        this.invaders = invaders;
    }

    addEnemies(quantidadeLinhas, quantidadeColunas) {
        let distanciaX = 300;
        let distanciaY = 0;
        for (let index = 0; index < quantidadeLinhas * quantidadeColunas; index++) {
            const distanciaEntreInimigos = 40;
            const posicaoMapaX = 200;

            if (index % quantidadeColunas === 0) {
                distanciaY = 100 + (index * 3);
                distanciaX = 300;
            }

            const invader = this.invaders.physics.add.sprite(distanciaX, distanciaY, "enemy");

            distanciaX += 32;

            invadersGroup.add(invader);
        }
    }

}