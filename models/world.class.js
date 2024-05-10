class World {
    character = new Character();
    endboss = lvl1 ? new Endboss(0.5) : new Endboss(0.8);
    level;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarLive = new StatusbarLive();
    statusBarCoin = new StatusbarCoin();
    statusBarBottle = new StatusbarBottle();
    statusBar = new Statusbar();
    statusBarBoss = new StatusbarEndboss();
    throwableObjects = [];
    destroyedObjects = [];
    bottle = new Bottle();
    intervalIds = [];
    deadEnemies = [];
    lastHit;
    bossIsSpawned = false;

    constructor(canvas, keyboard, lvl) {
        this.level = lvl;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.setStoppableInterval(this.run.bind(this), 10);
        this.setStoppableInterval(this.checkThrowObjects.bind(this), 150);
        this.setStoppableInterval(this.checkCollisionsWithEnemies.bind(this), 20);
        this.setStoppableInterval(this.checkCollisionWithEndboss.bind(this), 20);
        this.setStoppableInterval(this.checkBottleHitGround.bind(this), 20);
    }

    /**
     * passes the world class to the character and endboss class
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

    /**
     * delete bottle after timeout
     */
    checkBottleHitGround() {
        this.throwableObjects.forEach((obj) => {
            if(obj.bottleHitGround()) {
                this.deleteObjectAfterTimeout(obj, this.throwableObjects, 80);
            }
        })
    }

    /**
     * stop intervals
     */
    stopGame() {
        this.intervalIds.forEach(clearInterval);
    }

    /**
     * stop all intervals
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }

    /**
     * start checks
     */
    run() {
        this.collectBottles(this.level.bottles);
        this.collectCoins(this.level.coins);
        this.hitEnemyWithBottle();
    }

    /**
     * hit endboss
     * @param {object} throwableObject 
     */
    hitEndboss(throwableObject) {
        throwableObject.isDestroyed = true;
        this.destroyedObjects.push(throwableObject);
        this.endboss.hit(20);
        this.statusBarBoss.setHealth(this.endboss.energy);
        this.deleteObjectAfterTimeout(throwableObject, this.throwableObjects, 100);
    }

    /**
     * hit enemy with bottle
     */
    hitEnemyWithBottle() {
        this.throwableObjects.forEach((throwableObject) => {
            if (this.isEndbossHitWithBottle(throwableObject)) this.hitEndboss(throwableObject);
            this.level.enemies.forEach((enemy) => {
                if (this.isEnemyHitWithBottle(throwableObject, enemy)) {
                    this.killEnemy(enemy);
                    throwableObject.isDestroyed = true;
                    this.deleteObjectAfterTimeout(throwableObject, this.throwableObjects, 50);
                }
            });
        });
    }

    /**
     * delete object after timeout
     * @param {obj} obj obj to delete
     * @param {Array} arr arr where obj is stored
     * @param {number} time in ms
     */
    deleteObjectAfterTimeout(obj, arr, time) {
        setTimeout(() => {
            this.deleteObject(obj, arr);
        }, time);
    }

    /**
     * 
     * @param {*} throwableObject 
     * @param {*} enemy 
     * @returns true if obj is colliding with alive enemy
     */
    isEnemyHitWithBottle(throwableObject, enemy) {
        return throwableObject.isColliding(enemy) && !this.isEnemyDead(enemy);
    }

    /**
     * 
     * @param {object} throwableObject 
     * @returns true if is endboss is colliding with obj and obj is not destroyed yet
     */
    isEndbossHitWithBottle(throwableObject) {
        return this.endboss.isColliding(throwableObject) && !this.isThrowableObjectDestroyed(throwableObject);
    }

    /**
     * push enemy object to array and set boolean to true
     * @param {object} enemy 
     */
    killEnemy(enemy) {
        enemy.isDead = true;
        this.deadEnemies.push(enemy);
    }

    /**
     * 
     * @param {obj} enemy 
     * @returns true if enemy is in array
     */
    isEnemyDead(enemy) {
        return this.deadEnemies.some(e => e === enemy);
    }

    /**
     * 
     * @param {object} obj 
     * @returns true if obj in in destroyedObjects array
     */
    isThrowableObjectDestroyed(obj) {
        return this.destroyedObjects.some(destroyedObject => destroyedObject === obj);
    }

    /**
     * throw objects if key F is pressed, and bottles collected
     */
    checkThrowObjects() {
        if (this.isBottleThrown()) {
            this.throwBottle();
        }
    }
    /**
     * create new throwable object and push to array
     * set bottle status bar
     */
    throwBottle() {
        let bottle = new ThrowableObject(this.character.x + 40, this.character.y + 90);
        this.throwableObjects.push(bottle);
        this.statusBarBottle.bottlesPercentage -= 10;
        this.statusBarBottle.setBottles(this.statusBarBottle.bottlesPercentage);
        this.character.throwing_sound.play();
    }

    /**
     * 
     * @returns true if f is pressed and bottles are collected
     */
    isBottleThrown() {
        return this.keyboard.THROW && this.statusBarBottle.bottlesPercentage >= 10
    }

    /**
     * collision control
     */
    checkCollisionsWithEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.isJumpingOnEnemy(enemy)) {
                this.killEnemy(enemy);
                this.character.jump(10);
            } else if (this.character.isColliding(enemy) && !this.isEnemyDead(enemy)) {
                if (this.lastHit === undefined || this.checkLastHit()) {
                    this.characterTakesDamage(15);
                } else {
                    return;
                }
            }
        });
    }

    /**
     * set damage and reduce health bar
     * @param {number} dmg 
     */
    characterTakesDamage(dmg) {
        this.character.hit(dmg);
        this.statusBarLive.setPercentage(this.character.energy);
        this.lastHit = new Date().getTime();
    }

    /**
     * check collisions with endboss
     */
    checkCollisionWithEndboss() {
        if (this.character.isColliding(this.endboss)) {
            if (this.lastHit === undefined || this.checkLastHit()) {
                this.characterTakesDamage(25);
            }
        }
    }

    /**
     * 
     * @returns true if last hit was longer than 500ms ago
     */
    checkLastHit() {
        let hit = new Date().getTime();
        let difference = hit - this.lastHit;
        return difference >= 500;
    }

    /**
     * 
     * @param {object} enemy 
     * @returns true if character is jumping on enemy
     */
    isJumpingOnEnemy(enemy) {
        return this.character.isAboveGround(210) && this.character.speedY < 0 && !this.isEnemyDead(enemy) && this.character.isColliding(enemy);
    }

    /**
     * collect bottles
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
     * collect coins
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

    /**
     * show statusbar for boss
     */
    isBossInRange() {
        if (this.character.x > 2400 || this.bossIsSpawned) {
            this.addToMap(this.statusBarBoss);
            this.endboss.characterIsInRange = true;
            this.bossIsSpawned = true;
        }
    }

    /**
     * add obj to map and draw the world
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addMovableObjectsToMap();
        this.addFixedObjectsToMap();
        this.ctx.translate(-this.camera_x, 0);
        this.requestFrame();
    }

    requestFrame() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * add movable objects to map
     */
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

    /**
     * add fixed objects to map
     */
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
     * remove // to see the frames
     * @param {object} movableObject 
     */
    addToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.flipImage(movableObject);
        }
        movableObject.draw(this.ctx);
        //movableObject.drawFrame(this.ctx);
        //movableObject.drawOffsetFrame(this.ctx);
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
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }

    /**
     * flip image back
     * @param {object} movableObject 
     */
    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }
}