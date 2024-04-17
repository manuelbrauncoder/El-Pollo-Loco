class Coin extends MovableObject {
    y = 100;
    height = 100;
    width = 100;

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = 200 + Math.random() * 500;
        this.y = 150 + Math.random() * 200;
    }
}