class Coin extends MovableObject {
    y = 200;
    height = 100;
    width = 100;
    possibleY = [300, 200];

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = 200 + Math.random() * 2600;
        this.y = this.possibleY[this.generateRndIndex()];
    }

    generateRndIndex() {
        let rndIndex = Math.random();
        let roundedIndex = Math.round(rndIndex);
        return roundedIndex;
    }
}
