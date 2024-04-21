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
    statusBar = new Statusbar();
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

    /**
     * passes the world class to the character class
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * intervall to run different methods
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.collectObjects(this.level.bottles);
        }, 200);
    }

    /**
     * throw objects if key F is pressed, and bottles collected
     */
    checkThrowObjects() {
        if (this.keyboard.KEY_F && this.statusBarBottle.bottlesPercentage >= 10) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.statusBarBottle.bottlesPercentage -= 10;
            this.statusBarBottle.setBottles(this.statusBarBottle.bottlesPercentage);
        }
    }

    /**
     * check if the character collides with an enemy 
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBarLive.setPercentage(this.character.energy);
            }
        })
    }

    
/**
 * collect objects
 * @param {object} collectableObj 
 */
    collectObjects(collectableObj) {
        collectableObj.forEach((obj) => {
            if (this.character.isColliding(obj)) {
                this.statusBarBottle.hitCollectebleItem(this.statusBarBottle.bottlesPercentage);
                this.deleteObject(obj, this.level.bottles); 
            }
        });
    }
    
    /**
     * delete object and redraw world
     * @param {obj} obj to delete
     * @param {Array} arr from the object
     */
    deleteObject(obj, arr) {
        let index = arr.indexOf(obj);
        arr.splice(index, 1);
        this.draw();
    }

    /**
     * add obj to map and draw the world
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);    // canvas wird gelöscht
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
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

    /**
     * add object to map
     * @param {object} movableObject 
     */
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

    /**
     * add array of objects to map
     * @param {object} objects 
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * flip image 180 degree
     * @param {object} movableObject 
     */
    flipImage(movableObject) {
        this.ctx.save();    // speichert die aktuellen ctx (context) informationen ab
        this.ctx.translate(movableObject.width, 0); // verschiebt das bild
        this.ctx.scale(-1, 1);  // spiegelt das bild
        movableObject.x = movableObject.x * -1; // da auch das koordinatensystem sich dreht, muss die x Koordinate gespiegelt werden
    }

    /**
     * flip image back
     * @param {object} movableObject 
     */
    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();     // stellt die informationen zum ctx von oben wieder her
    }
}