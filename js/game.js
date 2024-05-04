let canvas;
let world;
let keyboard;

let backgroundMusic = new Audio('audio/background_Sound.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.1;

const PLAY_BUTTONS = ['left', 'right', 'jump', 'throw', 'fullScreenBtn'];

function init() {
    hidePlayBtns();
}

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
    getElementById('gameOverScreen').classList.add('d-none');
    getElementById('lostScreen').classList.add('d-none');
    showPlayBtns();
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
    getElementById('gameOverScreen').classList.add('d-none');
    getElementById('lostScreen').classList.add('d-none');
    hidePlayBtns();
}

function hidePlayBtns() {
    PLAY_BUTTONS.forEach((btn) => {
        getElementById(btn).classList.add('d-none');
    })
}

function showPlayBtns() {
    PLAY_BUTTONS.forEach((btn) => {
        getElementById(btn).classList.remove('d-none');
    })
}

function showWiningScreen() {
    getElementById('startBtn').classList.remove('d-none');
    getElementById('stopBtn').classList.add('d-none');
    getElementById('gameOverScreen').classList.remove('d-none');
    getElementById('lostScreen').classList.add('d-none');
    getElementById('startScreen').classList.add('d-none');
    getElementById('canvas').classList.add('d-none');
    world.clearAllIntervals();
    backgroundMusic.pause();
    hidePlayBtns();
}

function showLosingScreen() {
    getElementById('startBtn').classList.remove('d-none');
    getElementById('stopBtn').classList.add('d-none');
    getElementById('gameOverScreen').classList.add('d-none');
    getElementById('lostScreen').classList.remove('d-none');
    getElementById('startScreen').classList.add('d-none');
    getElementById('canvas').classList.add('d-none');
    world.clearAllIntervals();
    backgroundMusic.pause();
    hidePlayBtns();
}



