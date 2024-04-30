class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 300;
    height = 100;
    width = 100;

    offsetTop = 10;
    offsetBottom = 10;
    offsetRight = 10;
    offsetLeft = 10;

    constructor() {

    }

    /**
     * create a ne image
     * @param {string} path 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * create new images from array
     * @param {Array} arr 
     */
    loadImages(arr) {                      
        arr.forEach((path) => {             
            let img = new Image();      
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * draw image
     * @param {context} ctx 
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * draw a frame around the object
     * @param {context} ctx 
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Bottle || this instanceof Coin || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * draw the offset frame around the object
     * @param {context} ctx 
     */
    drawOffsetFrame(ctx) {
        if(this instanceof Character || this instanceof Chicken || this instanceof Bottle || this instanceof Coin || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'red';
            ctx.rect((this.x + this.offsetLeft), (this.y + this.offsetTop), (this.width - this.offsetRight - this.offsetLeft), (this.height - this.offsetTop - this.offsetBottom));
            ctx.stroke();
        }
    }

    
}