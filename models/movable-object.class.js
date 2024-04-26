class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    speedX = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }

        }, 1000 / 25)
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { // throwable object should always fall
            return true;
        } else {
            return this.y < 210;
        }
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; // modulo: i startet bei 0 bis zur länge des array. Dann geht es wieder bei 0 los
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * beta!!
     * @param {*} images 
     */
    playAnimationWithoutLoop(images) {
        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            let path = image;
            this.img = this.imageCache[path];
        }
    }

    jump() {
        this.speedY = 25;
    }

    hit() {
        this.energy -= 5;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // difference in ms
        timepassed = timepassed / 1000; // difference in sec
        return timepassed < 1;
    }

    isColliding(obj) {
        return this.x + this.width - this.offsetRight > obj.x + obj.offsetLeft &&
            this.y + this.height - this.offsetBottom > obj.y + obj.offsetTop &&
            this.x + this.offsetLeft < obj.x + obj.width - obj.offsetRight &&
            this.y + this.offsetTop < obj.y + obj.height - obj.offsetBottom;
    }

    isObjStanding(standingTime, time) {
        let difference = new Date().getTime() - standingTime
        if (difference >= time) {
            return true;
        } else {
            return false
        }
    }
    
}