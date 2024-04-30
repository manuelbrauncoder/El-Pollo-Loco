class Cloud extends MovableObject {
    x;
    y = 30;
    width = 400;
    height = 200;
    speed = 0.2;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 4000;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}