class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    speedX = 0;
    acceleration = 2;
    
/**
 * gravity method
 */
    applyGravity(bottom) {
        setInterval(() => {
            if (this.isAboveGround(bottom) || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }

        }, 1000 / 25)
    }

    /**
     * 
     * @returns true if obj is above ground
     */
    isAboveGround(bottom) {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < bottom; // 210 for character
        }
    }

    /**
     * continuous movement to the right
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * continuous movement to the left
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * play animation
     * @param {Array} images 
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * 
     * @param {number} speed for jumping
     */
    jump(speed) {
        this.speedY = speed;
    }

    /**
     * 
     * @param {number} damage to reduce
     */
    hit(damage) {
        this.energy -= damage;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * 
     * @returns true if zero energy
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * 
     * @returns true if time is passed xx seconds
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // difference in ms
        timepassed = timepassed / 1000; // difference in sec
        return timepassed < 1;
    }

    /**
     * 
     * @param {Object} obj 
     * @returns true if objects are colliding
     */
    isColliding(obj) {
        return this.x + this.width - this.offsetRight > obj.x + obj.offsetLeft &&
            this.y + this.height - this.offsetBottom > obj.y + obj.offsetTop &&
            this.x + this.offsetLeft < obj.x + obj.width - obj.offsetRight &&
            this.y + this.offsetTop < obj.y + obj.height - obj.offsetBottom;
    }

    /**
     * 
     * @param {Date} standingTime 
     * @param {number} time to reach
     * @returns true if object is standing for xx time
     */
    isObjStanding(standingTime, time) {
        let difference = new Date().getTime() - standingTime
        return difference >= time;
    }
}