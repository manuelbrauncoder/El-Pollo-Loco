class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;    // ctx = context
    keyboard;
    camera_x = 0;
    statusBarLive = new StatusbarLive();
    statusBarCoin = new StatusbarCoin();
    statusBarBottle = new StatusbarBottle();
    throwableObjects = [];
    bottle = new Bottle();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
       
    }

    setWorld() {
        this.character.world = this; // übergibt die world an die class Character, damit die variablen dort auch verfügbar sind
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.collectObjects(this.level.bottles);
        }, 200);
    }

    checkThrowObjects() {
        if(this.keyboard.KEY_F) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBarLive.setPercentage(this.character.energy);
            }
        })
    }

    collectObjects(collectableObj) {
            setInterval(() => {
                collectableObj.forEach( (obj) => {
                    if (this.character.isColliding(obj)) {
                        this.bottle.flyAway(obj);
                        this.statusBarBottle.hitCollectebleItem();
                    }
                })
            }, 200);
         
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);    // canvas wird gelöscht
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        // --------------Space for fixed Objects-------------------
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarLive);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.ctx.translate(this.camera_x, 0);
        // --------------Space for fixed Objects-------------------
        this.ctx.translate(-this.camera_x, 0);

        let self = this;                        // this funktioniert nicht in der folgenden Funktion, deswegen wird es einer Variable zugewiesen
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.flipImage(movableObject);
        }
        movableObject.draw(this.ctx);
        movableObject.drawFrame(this.ctx);
        movableObject.drawOffsetFrame(this.ctx);

        if (movableObject.otherDirection) {
            this.flipImageBack(movableObject);
        }
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    flipImage(movableObject) {
        this.ctx.save();    // speichert die aktuellen ctx (context) informationen ab
        this.ctx.translate(movableObject.width, 0); // verschiebt das bild
        this.ctx.scale(-1, 1);  // spiegelt das bild
        movableObject.x = movableObject.x * -1; // da auch das koordinatensystem sich dreht, muss die x Koordinate gespiegelt werden
    }

    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();     // stellt die informationen zum ctx von oben wieder her
    }
}