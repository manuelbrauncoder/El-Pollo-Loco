let canvas;
let world;
let keyboard;
let sounds = [];
isMuted = false;
let backgroundMusic = new Audio('audio/background_Sound.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.1;

const PLAY_BUTTONS = ['left', 'right', 'jump', 'throw', 'fullScreenBtn'];

/**
 * init is running when body is loaded
 */
function init() {
    hidePlayBtns();
}

/**
 * a wrapper function for getElementById
 * @param {string} id 
 * @returns the element
 */
function getElementById(id) {
    return document.getElementById(id);
}

/**
 * show buttons to play, play music if not muted and start the game
 */
function startGame() {
    initLevel();
    backgroundMusic.play();
    sounds.push(backgroundMusic);
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

/**
 * show game is fullscreen mode
 */
function fullScreen() {
    canvas.requestFullscreen();
}

/**
 * stop the game, show start screen
 */
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

/**
 * hide play buttons
 */
function hidePlayBtns() {
    PLAY_BUTTONS.forEach((btn) => {
        getElementById(btn).classList.add('d-none');
    })
}

/**
 * show play buttons
 */
function showPlayBtns() {
    PLAY_BUTTONS.forEach((btn) => {
        getElementById(btn).classList.remove('d-none');
    })
}

/**
 * show winning screen
 */
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

/**
 * show losing screen
 */
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

/**
 * mute all sounds
 */
function muteAudio() {
    sounds.forEach((audioElement) => audioElement.muted = true);
    isMuted = true;
    getElementById('unmuteBtn').classList.add('d-none');
    getElementById('muteBtn').classList.remove('d-none');
}

/**
 * unmute all sounds
 */
function unMuteAudio() {
    sounds.forEach((audioElement) => audioElement.muted = false);
    isMuted = false;
    getElementById('unmuteBtn').classList.remove('d-none');
    getElementById('muteBtn').classList.add('d-none');
}

/**
 * toggle audio
 */
function toggleAudio() {
    if(isMuted) {
        unMuteAudio();
    } else {
        muteAudio();
    }
}



