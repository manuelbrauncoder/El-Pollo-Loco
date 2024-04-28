class Cloud extends MovableObject {

    y = 30;
    width = 400;
    height = 200;
    speed = 0.5;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }

    
}