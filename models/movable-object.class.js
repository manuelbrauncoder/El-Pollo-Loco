class MovableObject {
    x = 120;
    y = 300;
    img;
    height = 100;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;

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
        console.log('moving right');
    }

    moveLeft() {
        setInterval( () => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}