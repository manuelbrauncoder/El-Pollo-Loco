class Level {
    clouds;
    enemies;
    backgroundObjects;
    bottles;
    coins;
    level_end_x = 719 * 4;

    constructor(enemies, clouds, backgroundObjects, bottles, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }
}