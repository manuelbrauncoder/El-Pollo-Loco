class Coin extends CollectableObject {
    y = 200;
    height = 100;
    width = 100;
    possibleY = [300, 200, 150];

    offsetTop = 35;
    offsetBottom = 35;
    offsetRight = 35;
    offsetLeft = 35;

    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_COINS[0]);
        this.loadImages(this.IMAGES_COINS);
        this.x = 200 + Math.random() * 2600;
        this.y = this.possibleY[this.generateRndIndex()];
        this.blink();
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

    blink() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 350);
    }
}
