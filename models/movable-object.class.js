class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    speedX = 0;
    acceleration = 2;
    
    

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }

        }, 1000 / 25)
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
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
        let i = this.currentImage % images.length;
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

    hit(damage) {
        this.energy -= damage;
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
        return timepassed < 2;
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