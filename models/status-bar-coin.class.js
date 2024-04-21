class StatusbarCoin extends Statusbar {

    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];

    coinPercentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 0;
        this.y = 40;
        this.setCoins(this.coinPercentage);
    }

    getIndexForCoinImage() {
        if (this.coinPercentage == 100) {
            return 5;
        } else if(this.coinPercentage >= 80) {
            return 4;
        } else if(this.coinPercentage >= 60) {
            return 3;
        } else if (this.coinPercentage >= 40) {
            return 2;
        } else if (this.coinPercentage >= 20) {
            return 1
        } else if(this.coinPercentage >= 0) {
            return 0;
        }
    }

    hitCollectebleCoin() {
        this.coinPercentage += 10;
        if(this.coinPercentage >= 100) {
            this.coinPercentage = 100;
        }
        console.log('coins:', this.coinPercentage);
        this.setCoins(this.coinPercentage);
    }

    setCoins(percentage) {
        this.coinPercentage = percentage;
        let path = this.IMAGES[this.getIndexForCoinImage()];
        this.img = this.imageCache[path];
    }
}