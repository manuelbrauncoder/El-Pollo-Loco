class MovableObject {
    x = 120;
    y = 300;
    img;
    height = 100;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }

        }, 1000 / 25)
    }

    isAboveGround() {
        return this.y < 210;
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

    moveRight() {
        this.x += this.speed;  
    }

    moveLeft() {
        this.x -= this.speed;
    }

    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length; // modulo: i startet bei 0 bis zur länge des array. Dann geht es wieder bei 0 los
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump() {
        this.speedY = 25;
    }
}