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
    moveIntervals = [];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 380 + Math.random() * 3000;
        this.speed = 0.15 + Math.random() * 0.3;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        sounds.push(this.dead_sound);
    }

    /**
     * start intervals for chicken movement and animation
     */
    animate() {
        this.move();
        this.animateChicken();
    }

    /**
     * animation for chicken
     */
    animateChicken() {
        let animateInterval = setInterval(() => {
            if(this.isDead) {
                this.animateDeath();
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
        this.moveIntervals.push(animateInterval);
    }

    /**
     * moving interval
     */
    move() {
        let moveLeftInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        this.moveIntervals.push(moveLeftInterval)
    }

    /**
     * clear intervals
     */
    stopAnimation() {
        this.moveIntervals.forEach(id => clearInterval(id));
        this.moveIntervals = [];
    }

    /**
     * animation for death
     */
    animateDeath() {
        playSound(this.dead_sound);
        this.stopAnimation();
        this.playAnimation(this.IMAGES_DEAD);
    }

}