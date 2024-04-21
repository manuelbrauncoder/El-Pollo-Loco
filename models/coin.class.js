class Coin extends CollectableObject {
    y = 200;
    height = 100;
    width = 100;
    possibleY = [300, 200];

    offsetTop = 35;
    offsetBottom = 35;
    offsetRight = 35;
    offsetLeft = 35;

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = 200 + Math.random() * 2600;
        this.y = this.possibleY[this.generateRndIndex()];
        //this.id = CollectableObject.idCounter++;
    }

    generateRndIndex() {
        let rndIndex = Math.random();
        let roundedIndex = Math.round(rndIndex);
        return roundedIndex;
    }
}
