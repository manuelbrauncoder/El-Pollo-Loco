class Statusbar extends DrawableObject {
    percentage = 100;
    width = 160;
    height = 50;
    
    
    constructor() {
        super();
    }

    /**
     * set correct percentage
     * @param {number} percentage 
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.getIndexForImage()];
        this.img = this.imageCache[path];
    }

    getIndexForImage() {
        if(this.percentage == 0) {
            return 0;
        } else if (this.percentage > 80) {
            return 5;
        } else if (this.percentage > 60) {
            return 4;
        } else if (this.percentage > 40) {
            return 3;
        } else if (this.percentage > 20) {
            return 2;
        } else if (this.percentage > 0) {
            return 1;
        }
    }

   
}