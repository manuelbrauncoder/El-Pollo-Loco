class CollectableObject extends MovableObject {
    constructor() {
        super();
    }

    flyAway(obj) {
        setInterval(() => {
            obj.x -= 3;
            obj.y -= 3;
        }, 25);
    }
}