class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 55;
    speed = 1.5;
    characterIsInRange = false;
    offsetTop = 55;
    offsetBottom = 15;
    offsetRight = 10;
    offsetLeft = 10;
    energy = 100;
    lastHit = 0;
    repetitions = 0;
    world;
    winningSound = new Audio('audio/winningSound.mp3');
    hitBossSound = new Audio('audio/hitBoss.mp3');
    bossDead = new Audio('audio/bossDeath.mp3');
    speedIncrease;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ]

    constructor(speedIncrease) {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
        this.x = 3000;
        this.move();
        sounds.push(this.winningSound);
        sounds.push(this.hitBossSound);
        sounds.push(this.bossDead);
        this.hitBossSound.volume = 0.5;
        this.bossDead.volume = 0.5;
        this.speedIncrease = speedIncrease;
    }

    /**
     * play death animation for endboss
     */
    playDeathAnimation() {
        this.repetitions++;
        this.playAnimation(this.IMAGES_DEAD);
        this.speed = 0;
        playSound(this.bossDead);
        if (this.repetitions == 10) {
            this.handleDeath();
        }
    }

    /**
     * stop game, show dead boss, play sound and show winning screen
     */
    handleDeath() {
        this.world.clearAllIntervals();
        this.loadImage('img/4_enemie_boss_chicken/5_dead/G26.png');
        this.height = 200;
        this.width = 125;
        this.y = 300;
        playSound(this.winningSound);
        showWiningScreen();
    }

    /**
     * animate endboss
     */
    animate() {
        setInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                playSound(this.hitBossSound);
                this.speed += this.speedIncrease;
            } else if (this.isDead()) {
                this.playDeathAnimation();
            } else if (this.characterIsInRange) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 200);
    }

    /**
     * moving endboss
     */
    move() {
        setInterval(() => {
            if (this.characterIsInRange) {
                this.moveLeft();
            }
        }, 50);
    }
}