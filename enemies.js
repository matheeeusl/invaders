class Enemies {

    constructor(invaders) {
        this.invaders = invaders;
    }

    addEnemies(quantidadeLinhas, quantidadeColunas) {
        for (let index = 0; index < quantidadeLinhas; index++) {
            const distanciaX = 32;
            const distanciaY = 100 + (index * 40);
            const distanciaEntreInimigos = 40;
            const posicaoMapaX = 200;

            const invader = this.invaders.add.group({ key: 'enemy', frame: 0, repeat: quantidadeColunas, setXY: { x: distanciaX, y: distanciaY, stepX: distanciaEntreInimigos } });

            Phaser.Actions.IncX(invader.getChildren(), posicaoMapaX);
        }
    }

}