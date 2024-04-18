class Character extends MovableObject {
    height = 220;
    x = 80;
    y = 210;
    speed = 10;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    world;
    walking_sound = new Audio('audio/running.mp3');


    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');      // super() wird nur am Anfang angegeben. Die Funktionen danach werden mit this.fn-Name aufgerufen
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        setInterval( () => {
            //this.walking_sound.pause();
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x ) {
                this.x += this.speed;
                this.otherDirection = false;
                //console.log(this.x);
                //this.walking_sound.play();
            }
            if(this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
                //this.walking_sound.play();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 50)
    }

    jump() {

    }
}