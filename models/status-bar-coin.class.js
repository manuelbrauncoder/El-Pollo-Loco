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
    collecting_coin_sound = new Audio('audio/collect_Coins.mp3');

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 0;
        this.y = 40;
        this.setCoins(this.coinPercentage);
        sounds.push(this.collecting_coin_sound);
    }

    /**
     * 
     * @returns the index for percentage image
     */
    getIndexForCoinImage() {
        if (this.coinPercentage == 100) {
            return 5;
        } else if (this.coinPercentage >= 80) {
            return 4;
        } else if (this.coinPercentage >= 60) {
            return 3;
        } else if (this.coinPercentage >= 40) {
            return 2;
        } else if (this.coinPercentage >= 20) {
            return 1
        } else if (this.coinPercentage >= 0) {
            return 0;
        }
    }

    /**
     * increase the coins for the status bar
     */
    hitCollectebleCoin() {
        this.coinPercentage += 10;
        this.collecting_coin_sound.play();
        if (this.coinPercentage >= 100) {
            this.coinPercentage = 100;
        }
        this.setCoins(this.coinPercentage);
    }

    /**
     * set the correct status bar image
     * @param {number} percentage 
     */
    setCoins(percentage) {
        this.coinPercentage = percentage;
        let path = this.IMAGES[this.getIndexForCoinImage()];
        this.img = this.imageCache[path];
    }
}