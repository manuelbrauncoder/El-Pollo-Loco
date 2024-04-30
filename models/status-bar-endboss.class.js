class StatusbarEndboss extends Statusbar {

    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/green/green0.png',
        'img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'img/7_statusbars/2_statusbar_endboss/green/green100.png',
    ];

    healthEndboss;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 550;
        this.y = 10;
        this.setHealth(100);
    }

    /**
     * 
     * @returns index for status bar image
     */
    getIndexForBossImage() {
        if (this.healthEndboss == 100) {
            return 5;
        } else if(this.healthEndboss >= 80) {
            return 4;
        } else if(this.healthEndboss >= 60) {
            return 3;
        } else if (this.healthEndboss >= 40) {
            return 2;
        } else if (this.healthEndboss >= 20) {
            return 1
        } else if(this.healthEndboss >= 0) {
            return 0;
        }
    }

    /**
     * set correct image for status bar
     * @param {number} percentage 
     */
    setHealth(percentage) {
        this.healthEndboss = percentage;
        let path = this.IMAGES[this.getIndexForBossImage()];
        this.img = this.imageCache[path];
    }

}