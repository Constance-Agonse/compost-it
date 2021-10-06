import { Waste } from "./waste.js";

// CONSTANTS
const BASKET_WIDTH = 200;
const BASKET_HEIGHT = 200;
const GAME_TIME = 5000;

//comment set le basket au milieu??
let screenDimensions = document.body.getBoundingClientRect();
let screenLimitWidth = screenDimensions.width;
let basket = document.getElementById("basket");
let body = document.querySelector('body');
let rainInterval = null;
const BASKET_MOVE_STEP = 10; // il se déplace 10px par 10px;
const gameContainer = document.getElementById('game-container');
const startScreenContainer = document.getElementById('start-screen-container');

const state = {
  basketXPosition: screenLimitWidth / 2 - BASKET_WIDTH / 2,
  totalScore: 0,
}

const startButton = document.getElementById('start-btn');
startButton.addEventListener('click', () => {
  startScreenContainer.style.display = 'none';
  startButton.remove();
  startGame();
  setTimeout(() => {
    // gameOver();
  }, GAME_TIME);
});

const startGame = () => {
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

const gameOver = () => {
 clearInterval(rainInterval);
 const gameOverScreen = document.createElement('div');
 gameOverScreen.classList.add('gameover-screen');
 gameContainer.appendChild(gameOverScreen);
 basket.remove();
}

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
}





// createWaste();
//call the function createWaste every X ms

//setInterval(createWaste, 1000); /////////////////////////




//TIMER UNE MINUTE QUI DEFINIT LE DEBUT ET LA FIN DU JEU
//timer



//créer une fonction qui remove les elements créés de l'array wasteInScreen;

