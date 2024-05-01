class Bottle extends CollectableObject {
    y = 360;
    width = 70;
    height = 70;


    offsetTop = 10;
    offsetBottom = 5;
    offsetRight = 10;
    offsetLeft = 20;

    

    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = 200 + Math.random() * 2600;
    }
}