class Bottle extends MovableObject {
    y = 360;
    width = 70;
    height = 70;

    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = 200 + Math.random() * 2600;
    }
}