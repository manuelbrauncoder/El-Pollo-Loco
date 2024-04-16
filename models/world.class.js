class World {
    character = new Character();
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;
    enemies = level1.enemies;
    canvas;
    ctx;    // ctx = context
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this; // übergibt die world an die class Character, damit die variablen dort auch verfügbar sind
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);    // canvas wird gelöscht
        this.ctx.translate(this.camera_x, 0);
        
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;                        // this funktioniert nicht in der folgenden Funktion, deswegen wird es einer Variable zugewiesen
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addToMap(movableObject) {
        if(movableObject.otherDirection) {
            this.ctx.save();    // speichert die aktuellen ctx (context) informationen ab
            this.ctx.translate(movableObject.width, 0); // verschiebt das bild
            this.ctx.scale(-1, 1);  // spiegelt das bild
            movableObject.x = movableObject.x * -1; // da auch das koordinatensystem sich dreht, muss die x Koordinate gespiegelt werden
        }
        this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.width, movableObject.height);
        if(movableObject.otherDirection) {
            movableObject.x = movableObject.x * -1;
            this.ctx.restore();     // stellt die informationen zum ctx von oben wieder her
        }
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }
}