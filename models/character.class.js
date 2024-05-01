class Character extends MovableObject {
    height = 220;
    x = 80;
    y = 80;
    speed = 10;
    isStandingSince;
    isStanding = false;
    offsetTop = 85;
    offsetBottom = 10;
    offsetRight = 15;
    offsetLeft = 20;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_HURTING = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_SLEEP = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    world;
    walking_sound = new Audio('audio/running.mp3');
    jumping_sound = new Audio('audio/jumping.mp3');
    throwing_sound = new Audio('audio/throwing.mp3');
    repetitions = 0;
    energy = 100;
    lastHit = 0;



    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEP);
        this.applyGravity();
        this.animate();
        this.walking_sound.volume = 0.3;
    }

    /**
     * 
     * @param {number} speed for jumping
     */
    jump(speed) {
        super.jump(speed);
        this.jumping_sound.play();
    }

    /**
     * character moving right
     */
    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        this.walking_sound.play();
    }

    /**
     * character moving left
     */
    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        this.walking_sound.play();
    }

    /**
     * 
     * @returns true if character is jumping
     */
    isJumping() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    /**
     * 
     * @returns boolean
     */
    isMovingLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    /**
     * 
     * @returns boolean
     */
    isMovingRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    /**
     * play death animation and stop game
     */
    playDeathAnimation() {
        this.isStanding = false;
        this.repetitions++;
        this.playAnimation(this.IMAGES_DEAD);
        if (this.repetitions == 20) {
            this.isStanding = false;
            this.world.clearAllIntervals();
            this.loadImage('img/2_character_pepe/5_dead/D-57.png');
        }
    }

    /**
     * play animation for character hurting
     */
    playHurtAnimation() {
        this.isStanding = false;
        this.playAnimation(this.IMAGES_HURTING);
    }

    /**
     * play animation for character jumping
     */
    playJumpAnimation() {
        this.isStanding = false;
        this.playAnimation(this.IMAGES_JUMPING);
    }

    /**
     * 
     * @returns true if character is in idle
     */
    isInIdle() {
        return this.isStanding === true && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.isAboveGround();
    }

    /**
     * play idle or sleep animation
     */
    playIdleAnimation() {
        if (this.isObjStanding(this.isStandingSince, 3000)) {
            this.playAnimation(this.IMAGES_IDLE);
        }
        if (this.isObjStanding(this.isStandingSince, 6000)) {
            this.playAnimation(this.IMAGES_SLEEP);
        }
    }

    /**
     * 
     * @returns true if character is not moving
     */
    isNotMoving() {
        return !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.isAboveGround();
    }

    /**
     * save time in variable
     */
    saveStandingSinceTime() {
        this.isStandingSince = new Date().getTime();
        this.isStanding = true;
    }

    /**
     * 
     * @returns true if character is moving left or right
     */
    isMovingLeftOrRight() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }

    /**
     * play animation for character is moving
     */
    playMovingAnimation() {
        this.isStanding = false;
        this.playAnimation(this.IMAGES_WALKING);
    }

    /**
     * animate character
     */
    animateCharacter() {
        if (this.isDead()) this.playDeathAnimation();
        else if (this.isHurt()) this.playHurtAnimation();
        else if (this.isAboveGround()) this.playJumpAnimation();
        else if (this.isInIdle()) this.playIdleAnimation();
        else if (this.isNotMoving()) this.saveStandingSinceTime();
        else if (this.isMovingLeftOrRight()) this.playMovingAnimation(); 
    }

    /**
     * move character
     */
    moveCharacter() {
        this.walking_sound.pause();
        if (this.isMovingRight()) this.moveRight();
        if (this.isMovingLeft()) this.moveLeft();
        if (this.isJumping()) this.jump(25);
        this.world.camera_x = -this.x + 100;
    }

    /**
     * animate intervals
     */
    animate() {
        setInterval(() => this.moveCharacter(), 1000 / 60);
        setInterval(() => this.animateCharacter(), 200);
    }
}