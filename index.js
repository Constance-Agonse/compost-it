import { Waste } from "./waste.js";

// CONSTANTES
const BASKET_WIDTH = 200;
const BASKET_HEIGHT = 200;
const GAME_TIME = 10000;
const BASKET_MOVE_STEP = 10; // il se déplace 10px par 10px;

let screenDimensions = document.body.getBoundingClientRect();
let screenLimitWidth = screenDimensions.width;
let basket = document.getElementById("basket");
let body = document.querySelector('body');
let rainInterval = null;
let countdownInterval = null;

const countdownEl = document.getElementById('timer');

//ALL THE HTML SECTIONS
const gameContainer = document.getElementById('game-container');
const startScreenContainer = document.getElementById('start-screen-container');
const maturationStage = document.getElementById('maturation-stage');



const state = {
  basketXPosition: screenLimitWidth / 2 - BASKET_WIDTH / 2,
  totalScore: 0,
}

const result = state.totalScore;


const endGame = () => {

  clearInterval(rainInterval);
  const gameOverScreen = document.createElement('div'); ///
  maturationStage.style.display = 'block';
  gameContainer.style.display = 'none';
  clearInterval(countdownInterval);
  gameOverScreen.classList.add('gameover-screen');
  gameContainer.appendChild(gameOverScreen);
  basket.remove();
}


//UPDATE COUNTDOWN IN THE HTML
let currentTime = (GAME_TIME / 1000) - 1000;

const updateCountDown = () => {
  const minutes = Math.floor(currentTime / 60);
  let seconds = currentTime % 60;
  countdownEl.innerHTML = `${minutes}: ${seconds}`;
  currentTime--;
};



//QUAND ON PRESSE LE START BTN
const startButton = document.getElementById('start-btn');
startButton.addEventListener('click', () => {
  startScreenContainer.style.display = 'none';
  // startButton.remove();
  startGame();
  setTimeout(() => {
    endGame();
  }, GAME_TIME);
});

const startGame = () => {
  countdownInterval = setInterval(updateCountDown, 1000);
  gameContainer.style.display = 'block';
  const renderBasket = () => {
    basket.style.left = `${state.basketXPosition}px`;
  }

  renderBasket();
  // interval that generates one new item ones a second (1000ms)
  rainInterval = setInterval(() => {
    const wasteItem = new Waste(gameContainer);
    wasteItem.makeItRain((wasteItemYPosition, wasteItemXPosition) => {
      if (isCollided(wasteItemYPosition, wasteItemXPosition)) {
        state.totalScore += wasteItem.score;
        wasteItem.removeWaste();
      }
    });
  }, 1000);

  // MAKE THE BASKET MOVE FROM LEFT TO RIGHT
  window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' && state.basketXPosition < screenLimitWidth - BASKET_WIDTH) {
      state.basketXPosition += BASKET_MOVE_STEP;
    }
    if (event.key === 'ArrowLeft' && state.basketXPosition > 0) {
      state.basketXPosition -= BASKET_MOVE_STEP;
    }
    renderBasket();
  });
}

//VERIFIER LA COLLISION
const isCollided = (wasteItemYPosition, wasteItemXPosition) => {
  const collisionY = window.innerHeight - BASKET_HEIGHT + 70;
  const wasteItemWidth = 80;
  const wasteItemHeight = 80;
  if (state.basketXPosition < wasteItemXPosition + wasteItemWidth &&
    state.basketXPosition + BASKET_WIDTH > wasteItemXPosition &&
    collisionY < wasteItemYPosition + wasteItemHeight &&
    collisionY + collisionY > wasteItemYPosition) {
    return true
  } else {
    return false;
  }
};




//STOP THE GAME AT THE END OF THE TIMER

//if (result > 100) {
  //display wiining page
//}

//if (result < 100) {
  //display losing page
//}

