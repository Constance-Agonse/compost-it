import { dataWasteItems } from "./data.js";

export class Waste {
  constructor(gameContainer) {
    this.xPosition = Math.random() * window.innerWidth;
    this.yPosition = -80;

    this.wasteElement = document.createElement('div');
    this.wasteElement.classList.add('waste-item');
    this.wasteElement.style.left = `${this.xPosition}px`;

    const randomIndex = Math.floor(Math.random() * (dataWasteItems.length - 1));
    const randomWasteElement = dataWasteItems[randomIndex];
    this.wasteElement.style.backgroundImage = `url(${randomWasteElement.imageurl})`;
    this.category = randomWasteElement.category;
    this.name = randomWasteElement.name;
    this.score = randomWasteElement.score;

    gameContainer.appendChild(this.wasteElement);

    this.rainInterval = null;
  }

  //for each element created, it update the position
  makeItRain(callback) {
    this.rainInterval = setInterval(() => {
      this.yPosition += 0.5;
      callback(this.yPosition, this.xPosition);
      if (this.yPosition > window.innerHeight) {
        this.removeWaste();
      } else {
        this.updateDom();
      }
    }, this.getRandomValue(1, 10));
  }

  getRandomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  getYPosition() {
    return this.yPosition;
  }

  removeWaste() {
    this.wasteElement.remove();
    clearInterval(this.rainInterval);
  }

  updateDom() {
    this.wasteElement.style.left = `${this.xPosition}px`;
    this.wasteElement.style.top = `${this.yPosition}px`;
  }
}