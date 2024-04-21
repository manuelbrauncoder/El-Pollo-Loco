class StatusbarBottle extends Statusbar {
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ];
    
    bottlesPercentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 0;
        this.y = 80;
        this.setBottles(this.bottlesPercentage);
    }

    getIndexForBottleImage() {
        if (this.bottlesPercentage == 100) {
            return 5;
        } else if(this.bottlesPercentage >= 80) {
            return 4;
        } else if(this.bottlesPercentage >= 60) {
            return 3;
        } else if (this.bottlesPercentage >= 40) {
            return 2;
        } else if (this.bottlesPercentage >= 20) {
            return 1
        } else if(this.bottlesPercentage >= 0) {
            return 0;
        }
    }

    hitCollectebleBottle() {
        this.bottlesPercentage += 10;
        if(this.bottlesPercentage >= 100) {
            this.bottlesPercentage = 100;
        }
        console.log('bottles:', this.bottlesPercentage);
        this.setBottles(this.bottlesPercentage);
    }

    setBottles(percentage) {
        this.bottlesPercentage = percentage;
        let path = this.IMAGES[this.getIndexForBottleImage()];
        this.img = this.imageCache[path];
    }
}