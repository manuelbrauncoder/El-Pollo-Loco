class Coin extends CollectableObject {
    y = 200;
    height = 100;
    width = 100;
    possibleY = [300, 200, 150];

    offsetTop = 35;
    offsetBottom = 35;
    offsetRight = 35;
    offsetLeft = 35;

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = 200 + Math.random() * 2600;
        this.y = this.possibleY[this.generateRndIndex()];
    }

    /**
     * 
     * @returns random index between 0 and 3
     */
    generateRndIndex() {
        let rndIndex = Math.random() * 4;
        let roundedIndex = Math.round(rndIndex);
        return roundedIndex;
    }
}
