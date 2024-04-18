class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 300;
    height = 100;
    width = 100;

    constructor() {

    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {                       // läd images aus einem array, array wird via parameter übergeben
        arr.forEach((path) => {             // in dem array stehen die einzelnen dateipfade // Das Array ist ein Objekt
            let img = new Image();          // Variable für neues img wird deklariert
            img.src = path;                 // pfad wird zugewiesen
            this.imageCache[path] = img;    // pfad wird dem img zugewiesen
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    
}