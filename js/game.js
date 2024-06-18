let canvas;
let world;
let keyboard;
let sounds = [];
let isMuted = false;
let backgroundMusic = new Audio("audio/background_Sound.mp3");
backgroundMusic.loop = true;
let currentLvl = "lvl1";
const PLAY_BUTTONS = ["left", "right", "jump", "throw", "fullScreenBtn"];

/**
 * init is running when body is loaded
 */
function init() {
   addDNone(PLAY_BUTTONS);
   showNextLvl();
}

function defineNextLvl() {
   if (currentLvl === "lvl1") {
      currentLvl = "lvl2";
   } else if (currentLvl === "lvl2") {
      currentLvl = "lvl3";
   } else if (currentLvl === "lvl3") {
      currentLvl = "lvl4";
   }
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
 * show recent level
 */
function showNextLvl() {
   if (currentLvl === "lvl1") {
      getElementById("nextLvl").innerHTML = `Level 1`;
   } else if (currentLvl === "lvl2") {
      getElementById("nextLvl").innerHTML = `Level 2`;
   } else if (currentLvl === "lvl3") {
      getElementById("nextLvl").innerHTML = `Level 3`;
   } else if (currentLvl === "lvl4") {
      getElementById("nextLvl").innerHTML = `Level 4`;
   }
}

/**
 * show buttons to play, play music if not muted and start the game
 */
function startGame() {
   nextLvl();
   playSound(backgroundMusic);
   sounds.push(backgroundMusic);
   let hide = ["startScreen", "startBtn", "gameOverScreen", "lostScreen"];
   let show = ["canvas", "stopBtn"];
   checkAudioBtns();
   removeDNone(show);
   addDNone(hide);
   removeDNone(PLAY_BUTTONS);
}

/**
 * load level 1
 */
function loadLvl1() {
   initLevel1();
   canvas = document.getElementById("canvas");
   keyboard = new Keyboard();
   world = new World(canvas, keyboard, level1);
}

/**
 * load level 2
 */
function loadLvl2() {
   initLevel2();
   canvas = document.getElementById("canvas");
   keyboard = new Keyboard();
   world = new World(canvas, keyboard, level2);
}

/**
 * load level 2
 */
function loadLvl3() {
   initLevel3();
   canvas = document.getElementById("canvas");
   keyboard = new Keyboard();
   world = new World(canvas, keyboard, level3);
}

/**
 * load level 2
 */
function loadLvl4() {
   initLevel4();
   canvas = document.getElementById("canvas");
   keyboard = new Keyboard();
   world = new World(canvas, keyboard, level4);
}

/**
 * show game in fullscreen mode
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
   let hide = ["canvas", "stopBtn", "gameOverScreen", "lostScreen", "muteBtn", "unmuteBtn"];
   let show = ["startScreen", "startBtn"];
   addDNone(hide);
   removeDNone(show);
   addDNone(PLAY_BUTTONS);
}

/**
 * show winning screen
 */
function showWiningScreen() {
   let hide = [
      "unmuteBtn",
      "muteBtn",
      "stopBtn",
      "lostScreen",
      "startScreen",
      "canvas",
      "muteBtn",
      "unmuteBtn",
   ];
   let show = ["startBtn", "gameOverScreen"];
   addDNone(hide);
   removeDNone(show);
   world.clearAllIntervals();
   backgroundMusic.pause();
   addDNone(PLAY_BUTTONS);
   defineNextLvl();
   showNextLvl();
}

/**
 * show losing screen
 */
function showLosingScreen() {
   let hide = ["stopBtn", "gameOverScreen", "startScreen", "canvas", "muteBtn", "unmuteBtn"];
   let show = ["startBtn", "lostScreen"];
   addDNone(hide);
   removeDNone(show);
   world.clearAllIntervals();
   backgroundMusic.pause();
   addDNone(PLAY_BUTTONS);
   currentLvl = "lvl1";
   showNextLvl();
}

/**
 *
 * @param {Array} arr with id´s for elements to hide
 */
function addDNone(arr) {
   arr.forEach((element) => {
      if (element) {
         getElementById(element).classList.add("d-none");
      }
   });
}

/**
 *
 * @param {Array} arr with id´s for elements to show
 */
function removeDNone(arr) {
   arr.forEach((element) => {
      if (element) {
         getElementById(element).classList.remove("d-none");
      }
   });
}

/**
 * mute all sounds
 */
function muteAudio() {
   sounds.forEach((audioElement) => (audioElement.muted = true));
   isMuted = true;
   checkAudioBtns();
}

/**
 * unmute all sounds
 */
function unMuteAudio() {
   sounds.forEach((audioElement) => (audioElement.muted = false));
   isMuted = false;
   checkAudioBtns();
}

/**
 * toggle audio
 */
function toggleAudio() {
   if (isMuted) {
      unMuteAudio();
   } else {
      muteAudio();
   }
}

/**
 * show audio buttons
 */
function checkAudioBtns() {
   if (isMuted) {
      getElementById("unmuteBtn").classList.remove("d-none");
      getElementById("muteBtn").classList.add("d-none");
   } else {
      getElementById("unmuteBtn").classList.add("d-none");
      getElementById("muteBtn").classList.remove("d-none");
   }
}

/**
 * play sound
 * @param {audioElement} sound
 */
function playSound(sound) {
   try {
      sound.play();
      sound.volume = 0.1;
   } catch (e) {
      console.log("playing sound failed", e);
   }
}

/**
 * load next level
 */
function nextLvl() {
   if (currentLvl === "lvl1") {
      loadLvl1();
   } else if (currentLvl === "lvl2") {
      loadLvl2();
   } else if (currentLvl === "lvl3") {
      loadLvl3();
   } else if (currentLvl === "lvl4") {
      loadLvl4();
   }
}
