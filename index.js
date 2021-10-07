import { Waste } from "./waste.js";
import { Chronometer } from "./chronometer.js";

// CONSTANTES
const BASKET_WIDTH = 170;
const BASKET_HEIGHT = 170;
const GAME_TIME = 60000;
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
const endPage = document.getElementById('end-page');
const scorewHTML = document.getElementById('scoreHTML');
const playAgain = document.getElementById('play-again');
let rewardSentence = document.getElementById('reward-sentence');
let congratsWord = document.getElementById('congrats-word');
const startButton = document.getElementById('start-btn');
let collideMusic = document.getElementById('collide-music');
let scoreGameContainer = document.getElementById('score-game-container');

const state = {
  basketXPosition: screenLimitWidth / 2 - BASKET_WIDTH / 2,
  totalScore: 0,
}



const endGame = () => {
  clearInterval(rainInterval);
  // const gameOverScreen = document.createElement('div');
  maturationStage.style.display = 'flex';
  gameContainer.style.display = 'none';
  clearInterval(countdownInterval);
  chronometer.stop();
  collideMusic.innerHTML = '';

  //instead of removing, move to style.display='none'
  // basket.remove();
  basket.style.display = 'none';

  const miamSound = document.getElementById('miam-sound');
  miamSound.play();

  //au bout de 5 secondes, le maturation stage disparait, si on a gagné la winning page s'affiche, 
  //si on a perdu, la losing page s'affiche
  console.log(state.totalScore);
  setTimeout(() => {
    // la page maturation stage est visible pendant 5 secondes
    maturationStage.style.display = 'none';
    if (state.totalScore > 20) {
      endPage.style.backgroundImage = `url('./images/YOUWON.png')`;

      rewardSentence.innerHTML = 'You are a compost master';
      congratsWord.innerHTML = 'Yeah! ';
      endPage.style.display = 'block';
      scorewHTML.innerHTML = state.totalScore;
    };

    if (state.totalScore <= 20) {
      endPage.style.display = 'block';
      congratsWord.innerHTML = 'Oups! '
      scorewHTML.innerHTML = state.totalScore;
      endPage.style.backgroundImage = `url('./images/YOULOSE.png')`
      rewardSentence.innerHTML = 'Try again, you are not gonna save the planet at this pace!';
    };

  }, 5000);

}




//UPDATE COUNTDOWN IN THE HTML
const updateCountDown = () => {
  const minutes = chronometer.getMinutes();
  const seconds = chronometer.getSeconds();
  countdownEl.innerHTML = `${minutes}:${seconds}`;
};


//QUAND ON PRESSE LE START BTN
startButton.addEventListener('click', () => {
  startScreenContainer.style.display = 'none';
  startGame();
  setTimeout(() => {
    endGame();
  }, GAME_TIME);
});

const startGame = () => {
  state.totalScore = 0;
  chronometer.start(updateCountDown)
  gameContainer.style.display = 'block';
  endPage.style.display = 'none';

  //recacher les display none de l'écran de fin;
  const renderBasket = () => {
    basket.style.left = `${state.basketXPosition}px`;
    basket.style.display = 'block';
  }

  renderBasket();

  // interval that generates one new item ones a second (1000ms)
  rainInterval = setInterval(() => {
    const wasteItem = new Waste(gameContainer);
    wasteItem.makeItRain((wasteItemYPosition, wasteItemXPosition) => {
      if (isCollided(wasteItemYPosition, wasteItemXPosition)) {
        if (wasteItem.category === 'good') {
          collideMusic.innerHTML = `<audio controls autoplay style="display: none">
        <source src="./sounds/242501__gabrielaraujo__powerup-success.wav" type="audio/mpeg" >
        </audio>`};
        if (wasteItem.category === 'bad') {
          collideMusic.innerHTML = `<audio controls autoplay style="display: none">
        <source src="sounds/457752__tissman__fail4.wav" type="audio/mpeg" >
        </audio>`};
        if (wasteItem.category === 'dunno') {
          collideMusic.innerHTML = `<audio controls autoplay style="display: none">
        <source src="sounds/neutralsong.wav" >
        </audio>`};
        state.totalScore += wasteItem.score;
        wasteItem.removeWaste();
      }
      //display score in the game container
      scoreGameContainer.innerHTML = state.totalScore;
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

// //VERIFIER LA COLLISION
// const isCollided = (wasteItemYPosition, wasteItemXPosition) => {
//   const collisionY = window.innerHeight - BASKET_HEIGHT + 70;
//   const wasteItemWidth = 80;
//   const wasteItemHeight = 80;
//   if (state.basketXPosition < wasteItemXPosition + wasteItemWidth &&
//     state.basketXPosition + BASKET_WIDTH > wasteItemXPosition &&
//     collisionY < wasteItemYPosition + wasteItemHeight &&
//     collisionY + collisionY > wasteItemYPosition) {
//     return true
//   } else {
//     return false;
//   }
// };

//VERIFIER LA COLLISION
const isCollided = (wasteItemYPosition, wasteItemXPosition) => {
  const collisionY = window.innerHeight - BASKET_HEIGHT + 70;
  const wasteItemWidth = 70;
  const wasteItemHeight = 70;
  // if (state.basketXPosition < wasteItemXPosition + wasteItemWidth &&
  //   state.basketXPosition + BASKET_WIDTH > wasteItemXPosition &&
  //   collisionY < wasteItemYPosition + wasteItemHeight &&
  //   collisionY + collisionY > wasteItemYPosition) {
  //   return true
  // } else {
  //   return false;
  // }
  const collisionLineA = window.innerHeight - BASKET_HEIGHT;
  const collisionLineB = window.innerHeight - 120;

  if (state.basketXPosition < wasteItemXPosition + wasteItemWidth &&
    state.basketXPosition + BASKET_WIDTH > wasteItemXPosition &&
    wasteItemYPosition > collisionLineA && wasteItemYPosition < collisionLineB
  ) {
    return true;
  } else {
    return false;
  }
};

///SET LE BOUTON DE PLAY AGAIN
playAgain.addEventListener('click', () => {
  endPage.style.display = 'none';

  startGame();
  setTimeout(() => {
    endGame();
  }, GAME_TIME);
});


