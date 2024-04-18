class Level {
    clouds;
    enemies;
    backgroundObjects;
    collectObjects;
    level_end_x = 719 * 4;

    constructor(enemies, clouds, backgroundObjects, collectObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectObjects = collectObjects;
    }
}