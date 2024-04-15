class Character extends MovableObject {

    height = 220;
    x = 80;
    y = 210;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');      // super() wird nur am Anfang angegeben. Die Funktionen danach werden mit this.fn-Name aufgerufen
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length; // modulo: i startet bei 0 bis zur länge des array. Dann geht es wieder bei 0 los
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 100)
    }

    jump() {

    }
}