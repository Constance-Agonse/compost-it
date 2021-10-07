import { Waste } from "./waste.js";
import { Chronometer } from "./chronometer.js";

// CONSTANTES
const BASKET_WIDTH = 200;
const BASKET_HEIGHT = 200;
const GAME_TIME = 35000;
const BASKET_MOVE_STEP = 10; // il se déplace 10px par 10px;

const chronometer = new Chronometer(GAME_TIME / 1000);

let screenDimensions = document.body.getBoundingClientRect();
let screenLimitWidth = screenDimensions.width;
let basket = document.getElementById("basket");
// let body = document.querySelector('body');
let rainInterval = null;
let countdownInterval = null;


//ALL THE HTML SECTIONS
const gameContainer = document.getElementById('game-container');
const startScreenContainer = document.getElementById('start-screen-container');
const maturationStage = document.getElementById('maturation-stage');
const countdownEl = document.getElementById('timer');
const winningPage = document.getElementById('winning');
const losingPage = document.getElementById('losing');
const scorewinHTML = document.getElementById('scorewinHTML');
const scorelooseHTML = document.getElementById('scorelooseHTML');
const winPlayAgain = document.querySelector('winPlayAgain')


const state = {
  basketXPosition: screenLimitWidth / 2 - BASKET_WIDTH / 2,
  totalScore: 0,
}



const endGame = () => {
  clearInterval(rainInterval);
  const gameOverScreen = document.createElement('div');
  maturationStage.style.display = 'block';
  gameContainer.style.display = 'none';
  clearInterval(countdownInterval);
  basket.remove();

  //au bout de 5 secondes, le maturation stage disparait, si on a gagné la winning page s'affiche, 
  //si on a perdu, la losing page s'affiche
  console.log(state.totalScore);
  setTimeout(() => {
    maturationStage.style.display = 'none';
    if (state.totalScore > 20) {
      winningPage.style.display = 'block';
      scorewinHTML.innerHTML = state.totalScore;
      losingPage.style.display = 'none';
      //display wiining page
    }
    else {
      losingPage.style.display = 'block';
      winningPage.style.display = 'none';
      scorelooseHTML.innerHTML = state.totalScore;
    };
    // gameOverScreen.classList.add('gameover-screen');
    // gameContainer.appendChild(gameOverScreen);
  }, 5000);
  // la page maturation stage est là pendant 5 secondes
}

//UPDATE COUNTDOWN IN THE HTML
const updateCountDown = () => {
  const minutes = chronometer.getMinutes();
  const seconds = chronometer.getSeconds();
  countdownEl.innerHTML = `${minutes}: ${seconds}`;
};


//QUAND ON PRESSE LE START BTN
const startButton = document.getElementById('start-btn');
startButton.addEventListener('click', () => {
  startScreenContainer.style.display = 'none';
  startGame();

  setTimeout(() => {
    endGame();
  }, GAME_TIME);
});

const startGame = () => {

  chronometer.start(updateCountDown)

  //countdownInterval = setInterval(updateCountDown, 1000);
  gameContainer.style.display = 'block';
  winningPage.style.display = 'none';
  losingPage.style.display = 'none';

  //recacher les display none des deux écrans win et loose;
  const renderBasket = () => {
    basket.style.left = `${state.basketXPosition}px`;
  }

  // let result = state.totalScore;
  // setInterval(() => {
  //   console.log(result);
  // }, 1000);

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

  // MOVE BASKET FROM LEFT TO RIGHT
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


winPlayAgain.addEventListener('click', () => {
  winningPage.style.display = 'none';
  gameContainer.style.display = 'block';

});

