let canvas;
let world;
let keyboard;

let backgroundMusic = new Audio('audio/background_Sound.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.1;

function getElementById(id) {
    return document.getElementById(id);
}

function startGame() {
    initLevel();
    backgroundMusic.play();
    getElementById('canvas').classList.remove('d-none');
    getElementById('startScreen').classList.add('d-none');
    getElementById('startBtn').classList.add('d-none');
    getElementById('stopBtn').classList.remove('d-none');
    getElementById('fullScreenBtn').classList.remove('d-none');
    canvas = document.getElementById('canvas');
    keyboard = new Keyboard();
    world = new World(canvas, keyboard);
}

function fullScreen() {
    canvas.requestFullscreen();
}

function stopGame() {
    world.clearAllIntervals();
    backgroundMusic.pause();
    getElementById('canvas').classList.add('d-none');
    getElementById('startScreen').classList.remove('d-none');
    getElementById('startBtn').classList.remove('d-none');
    getElementById('stopBtn').classList.add('d-none');
    getElementById('fullScreenBtn').classList.add('d-none');
}