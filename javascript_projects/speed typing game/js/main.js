window.addEventListener('load',init)

let score = 0;
let time = 5;
let isPlaying;

const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const highscoreDisplay = document.querySelector('#highscore');

const words = [
  'hat',
  'river',
  'lucky',
  'statue',
  'generate',
  'stubborn',
  'cocktail',
  'runaway',
  'joke',
  'developer',
  'establishment',
  'hero',
  'javascript',
  'nutrition',
  'revolver',
  'echo',
  'siblings',
  'investigate',
  'horrendous',
  'symptom',
  'laughter',
  'magic',
  'master',
  'space',
  'definition'
];


function init() {
  
  showWord(words);
  wordInput.addEventListener('input',matchingWord)
  setInterval(changeTime,1000);
  setInterval(checkGame,50)

}

function matchingWord() {
  if(matchWord()) {
    isPlaying = true
    time = 6;
    wordInput.value = '';
    showWord(words);
    score++;
  }
  if(score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

function matchWord() {
  if(wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'correct!'
    return true
  } else {
    message.innerHTML = '';
    return false
  }
}

function showWord(words) {
  const randIndex = Math.floor(Math.random() * words.length)
  currentWord.innerHTML = words[randIndex];
}

function changeTime() {
  if(time > 0) {
    time--;
  }
  else if (time === 0) {
    isPlaying = false;
  }
  timeDisplay.innerHTML = time;
}

function checkGame() {
  if(!isPlaying && time === 0) {
    score = -1;
    message.innerHTML = 'gameover!';
  }
}