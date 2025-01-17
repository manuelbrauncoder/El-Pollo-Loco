class ThrowableObject extends MovableObject {
    isDestroyed = false;
    bottleIsSplashed = false;
    repetitions = 0;
    bottleIsFlying = false;
    IMAGES_BOTTLE_ROTATE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.loadImages(this.IMAGES_BOTTLE_ROTATE);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.throw();
    }

    /**
     * throw object
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        let throwDirection = world.character.otherDirection ? -1 : 1;
        let animateId = setInterval(() => {
            if (this.isDestroyed) {
                this.playSplashAnimation(animateId);
            } else if (this.bottleHitGround()) {
                this.playSplashAnimation(animateId);
            } else {
                this.x += 10 * throwDirection;
                this.playAnimation(this.IMAGES_BOTTLE_ROTATE);
            }
        }, 50);
    }

    /**
     * play animation for splashing bottle
     * @param {id} animateId 
     */
    playSplashAnimation(animateId) {
        this.repetitions++;
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        if (this.repetitions == 2) {
            clearInterval(animateId);
            this.bottleIsSplashed = true;
        }
    }

    /**
     * 
     * @returns true if bottle hit ground
     */
    bottleHitGround() {
        return this.y >= 320;
    }
}