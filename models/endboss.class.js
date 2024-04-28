class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 50;

    offsetTop = 55;
    offsetBottom = 15;
    offsetRight = 10;
    offsetLeft = 10;

    energy = 100;
    lastHit = 0;
    repetitions = 0;
    world;

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

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.x = 3000;
    }

    playDeathAnimation() {
        this.repetitions++;
        this.playAnimation(this.IMAGES_DEAD);
        if (this.repetitions == 2) {
            this.world.clearAllIntervals();
            this.loadImage('img/4_enemie_boss_chicken/5_dead/G26.png');
            this.y = 150;
        }
    }
    
    animate() {
        setInterval(() => {
            if (this.isHurt()) {
                
                this.playAnimation(this.IMAGES_HURT);
                
               
            } else if(this.isDead()) {
               
                this.playDeathAnimation();

            } else {
                this.playAnimation(this.IMAGES_ALERT);
                
                
            }
        }, 200);
    }
}