class Statusbar extends DrawableObject {
    percentage = 100;
    width = 160;
    height = 50;
    
    
    constructor() {
        super();
        
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.getIndexForImage()];
        this.img = this.imageCache[path];
    }

    getIndexForImage() {
        if (this.percentage == 100) {
            return 5;
        }
        return Math.floor(this.percentage / 20);
    }
}