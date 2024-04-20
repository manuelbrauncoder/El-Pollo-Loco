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

    jump() {
        this.speedY = 25;
    }

    // isColliding(mo) {
    //     return this.x + this.width > mo.x &&
    //         this.y + this.height > mo.y &&
    //         this.x < mo.x &&
    //         this.y < mo.y + mo.height;
    // }

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

    //     isColliding(obj) {
    //         return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
    //             (this.y + this.offsetY + this.height) >= obj.y &&
    //             (this.y + this.offsetY) <= (obj.y + obj.height) &&
    //             obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    //     }

    isColliding(obj) {
        return this.x + this.width - this.offsetRight > obj.x + obj.offsetLeft &&
            this.y + this.height - this.offsetBottom > obj.y + obj.offsetTop &&
            this.x + this.offsetLeft < obj.x + obj.width - obj.offsetRight &&
            this.y + this.offsetBottom < obj.y + obj.height - obj.offsetBottom;
    }
}