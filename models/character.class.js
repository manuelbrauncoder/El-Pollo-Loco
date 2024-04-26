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



    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');      // super() wird nur am Anfang angegeben. Die Funktionen danach werden mit this.fn-Name aufgerufen
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEP);
        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {

            this.walking_sound.pause();

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.jumping_sound.play();
            }

            this.world.camera_x = -this.x + 100;

        }, 1000 / 60);

        let charCheckInterval = setInterval(() => {
            if (this.isDead()) {
                this.isStanding = false;
                this.repetitions++;
                this.playAnimation(this.IMAGES_DEAD);

                if (this.repetitions == 20) {
                    this.isStanding = false;
                    this.world.clearAllIntervals();
                    this.loadImage('img/2_character_pepe/5_dead/D-57.png');
                }
            } else if (this.isHurt()) {
                this.isStanding = false;
                this.playAnimation(this.IMAGES_HURTING);

            } else if (this.isAboveGround()) {
                this.isStanding = false;
                this.playAnimation(this.IMAGES_JUMPING);
                
            } else if(this.isStanding === true && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.isAboveGround()) {
                if(this.isObjStanding(this.isStandingSince, 3000)) {
                    this.playAnimation(this.IMAGES_IDLE);
                }
                if(this.isObjStanding(this.isStandingSince, 6000)) {
                    this.playAnimation(this.IMAGES_SLEEP);
                }
            
            } else if(!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.isAboveGround()) {
                this.isStandingSince = new Date().getTime();
                this.isStanding = true;
                
             
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.isStanding = false;
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 50)
    }
}