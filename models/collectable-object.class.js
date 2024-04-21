class CollectableObject extends MovableObject {

    //static idCounter = 0;

    constructor() {
        super();
    }

    flyAway(obj) {
        setInterval(() => {
            obj.x -= 3;
            obj.y -= 100;
        }, 25);
    }
}