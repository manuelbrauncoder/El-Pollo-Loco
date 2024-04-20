class Level {
    clouds;
    enemies;
    backgroundObjects;
    bottles;
    level_end_x = 719 * 4;

    constructor(enemies, clouds, backgroundObjects, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
    }
}