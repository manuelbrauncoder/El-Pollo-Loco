class ChickenSmall extends Chicken {
    y = 375;
    height = 50;
    width = 50;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 3000;
        this.speed = 0.2 + Math.random() * 0.3;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }
}
