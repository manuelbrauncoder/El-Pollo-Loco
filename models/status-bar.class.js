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

    /**
     * 
     * @returns index for status bar image
     */
    getIndexForImage() {
        if (this.percentage == 100) {
            return 5;
        }
        return Math.floor(this.percentage / 20);
    }
}