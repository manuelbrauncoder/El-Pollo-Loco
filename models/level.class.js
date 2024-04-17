class Level {
    clouds;
    enemies;
    backgroundObjects;
    level_end_x = 719 * 4;

    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}