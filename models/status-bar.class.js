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
        if(this.percentage == 100) {
            return 5;
        } else if(this.percentage > 80) {
            return 4;
        } else if(this.percentage > 60) {
            return 3;
        } else if(this.percentage > 40) {
            return 2;
        } else if(this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}