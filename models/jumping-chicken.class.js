class JumpingChicken extends Chicken {
    y = 0;
    height = 50;
    width = 50;
    speedY = 0;
    acceleration = 5;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

    offsetTop = 5;
    offsetBottom = 5;
    offsetRight = -5;
    offsetLeft = -5;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 400 + Math.random() * 3000;
        this.applyGravity(375);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    move() {
        let jumpId = setInterval(() => {
            this.jump(40);
        }, 2000);
        this.moveIntervals.push(jumpId);
    }

    
}