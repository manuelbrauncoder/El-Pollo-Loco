class Chicken extends MovableObject {
    y = 345;
    height = 80;
    width = 80;
    
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    dead_sound = new Audio('audio/splash.mp3');

    offsetTop = 5;
    offsetBottom = 5;
    offsetRight = 5;
    offsetLeft = 5;
    isDead = false;
    energy = 100;
    moveInterval = [];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 3000;
        this.speed = 0.15 + Math.random() * 0.3;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }


    animate() {
        let moveLeftInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);


        let animateIntervall = setInterval(() => {
            if (this.isDead) {
                this.dead_sound.play();
                this.stopAnimation();
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200)

        this.moveInterval.push(moveLeftInterval, animateIntervall);
    }

    stopAnimation() {
        this.moveInterval.forEach(id => clearInterval(id));
        this.moveInterval = [];
    }

}