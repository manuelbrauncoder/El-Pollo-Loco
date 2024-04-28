class World {
    character = new Character();
    endboss = new Endboss();
    level = level1;
    canvas;
    ctx;    // ctx = context
    keyboard;
    camera_x = 0;
    statusBarLive = new StatusbarLive();
    statusBarCoin = new StatusbarCoin();
    statusBarBottle = new StatusbarBottle();
    statusBar = new Statusbar();
    statusBarBoss = new StatusbarEndboss();
    throwableObjects = [];
    bottle = new Bottle();
    //hitEnemyAt;
    intervalIds = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.setStoppableInterval(this.run.bind(this), 100);
    }

    /**
     * passes the world class to the character class
     */
    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }

    /**
     * start interval
     * @param {function} fn to repeat
     * @param {number} time for the interval
     */
    setStoppableInterval(fn, time) {
        let id = setInterval(fn, time);
        this.intervalIds.push(id);
    }

    stopGame() {
        this.intervalIds.forEach(clearInterval);
    }

    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }


    /**
     * start checks
     */
    run() {
        this.checkCollisions();
        this.checkThrowObjects();
        this.collectBottles(this.level.bottles);
        this.collectCoins(this.level.coins);
        this.hitEnemyWithBotte();
    }

  

   

    hitEndboss(throwableObject) {
        this.deleteObject(throwableObject, this.throwableObjects);
        this.endboss.hit(20);
        this.statusBarBoss.setHealth(this.endboss.energy);
    }

    hitEnemyWithBotte() {
        this.throwableObjects.forEach((throwableObject) => {
            if (this.endboss.isColliding(throwableObject)) this.hitEndboss(throwableObject);
            this.level.enemies.forEach((enemy) => {
                if (throwableObject.isColliding(enemy)) {
                    this.deleteObject(enemy, this.level.enemies);
                }
            })
        })
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
            this.character.throwing_sound.play();
        }
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy)) {
                if(this.character.isAboveGround() && this.character.speedY < 0 ) {
                    console.log('jumped on enemy!');
                    this.deleteObject(enemy, this.level.enemies);
                } else {
                    this.character.hit(5);
                    this.statusBarLive.setPercentage(this.character.energy);
                }
            }
        });
    }


    /**
     * collect objects
     * @param {object} collectableObj 
     */
    collectBottles(collectableObj) {
        collectableObj.forEach((obj) => {
            if (this.character.isColliding(obj)) {
                this.statusBarBottle.hitCollectebleBottle(this.statusBarBottle.bottlesPercentage);
                this.deleteObject(obj, this.level.bottles);
            }
        });
    }

    /**
 * collect objects
 * @param {object} collectableObj 
 */
    collectCoins(collectableObj) {
        collectableObj.forEach((obj) => {
            if (this.character.isColliding(obj)) {
                this.statusBarCoin.hitCollectebleCoin(this.statusBarCoin.coinPercentage);
                this.deleteObject(obj, this.level.coins);
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

    isBossInRange() {
        if (this.character.x > 2400) {
            this.addToMap(this.statusBarBoss);
        }
    }

    /**
     * add obj to map and draw the world
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);    // canvas wird gelöscht
        this.ctx.translate(this.camera_x, 0);
        this.addMovableObjectsToMap();
        this.addFixedObjectsToMap();
        this.ctx.translate(-this.camera_x, 0);
        let self = this;                        // this funktioniert nicht in der folgenden Funktion, deswegen wird es einer Variable zugewiesen
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addMovableObjectsToMap() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addToMap(this.character);
        this.addToMap(this.endboss);
        this.addObjectsToMap(this.throwableObjects);
    }

    addFixedObjectsToMap() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarLive);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.isBossInRange();
        this.ctx.translate(this.camera_x, 0);
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