let canvas;
let world;
let keyboard = new Keyboard();

let backgroundMusic = new Audio('audio/background_Sound.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.4;

document.addEventListener('keydown', (e) => {
    if(e.keyCode == 32) { keyboard.SPACE = true };
    if(e.keyCode == 37) { keyboard.LEFT = true };
    if(e.keyCode == 38) { keyboard.UP = true };
    if(e.keyCode == 40) { keyboard.DOWN = true };
    if(e.keyCode == 39) { keyboard.RIGHT = true };
    if(e.keyCode == 70) { keyboard.KEY_F = true };
});

document.addEventListener('keyup', (e) => {
    if(e.keyCode == 32) { keyboard.SPACE = false };
    if(e.keyCode == 37) { keyboard.LEFT = false };
    if(e.keyCode == 38) { keyboard.UP = false };
    if(e.keyCode == 40) { keyboard.DOWN = false };
    if(e.keyCode == 39) { keyboard.RIGHT = false };
    if(e.keyCode == 70) { keyboard.KEY_F = false };
});

function getElementById(id) {
    return document.getElementById(id);
}

function startGame() {
    backgroundMusic.play();
    getElementById('canvas').classList.remove('d-none');
    getElementById('startScreen').classList.add('d-none');
    getElementById('startBtn').classList.add('d-none');
    getElementById('stopBtn').classList.remove('d-none');
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function fullScreen() {
    canvas.requestFullscreen();
}

function stopGame() {
    world.clearAllIntervals();
    backgroundMusic.pause();
}