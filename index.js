
//comment set le basket au milieu??
let screenDimensions = document.body.getBoundingClientRect();
let screenLimitWidth = screenDimensions.width;
let basket = document.getElementById("basket");
const modifier = 10; // il se déplace 10px par 10px;
let basketX = 0; //pas sûre que ça serve à qqchose
let counter = 0;
let firstObject = document.getElementById('myObject');
let basketposition = null;
let objectPosition = null;
let timer = document.getElementById('timer');



//Mes datas //A BOUGER D'ENDROIT APRES
const data = [
  {name: 'plasticbottle',
  category: 'bad',
  imageurl: "./images/img1.jpg",
 },
 {name: 'glassbottle',
 category: 'bad',
 imageurl: "./images/img2.jpg",

 },
 {name: 'glassbottle',
 category: 'bad',
 imageurl: "./images/img2.jpg",

 },
 {name: 'metalcan',
 category: 'bad',
 imageurl: "./images/img3.jpg",

 }, {name: 'milkbottle',
 category: 'bad',
 imageurl: "./images/img4.jpg",

 },

]



//on a deux classes
//bad
//good

//on essaie de faire fonctionner la collision pour un seul élément qui est le div déjà créé
//OK CA MARCHE

//ensuite il faudra que chaque élément créé ait sa propre position

function getBasketPosition() {
  return basket.getBoundingClientRect();
}

function getObjectPosition() {
  return firstObject.getBoundingClientRect();
};
//caculer les positions des items à chaque 500ms;
setInterval(()=> {
  basketposition = getBasketPosition();
  objectPosition = getObjectPosition();
} ,500);


function detectCollision(){
// console.log(objectPosition);
if (basketposition.x < objectPosition.x + objectPosition.width &&
  basketposition.x + basketposition.width > objectPosition.x &&
  basketposition.y < objectPosition.y + objectPosition.height &&
  basketposition.y + basketposition.height > objectPosition.y) {
  // collision detected;
  console.log('yeah! collision!')
  
  //si une collision détectée = on en compte qu'une 
  //arrêter la collision 

  if (element.classList.contains('bad')){
    counter --;
    //play a loose song
  };
  if(element.classList.contains('good')) {
    counter ++;
    //play a win song
  };

  //il faut arrêter

}
}


setInterval(()=>{
  detectCollision();
}, 500);



// let wasteposition = waste.getBoundingClientRect();





window.addEventListener('load', () => {
  basket.style.position = 'absolute';
  basket.style.left = 0; //on veut mettre le basket au milieu par défaut
  basket.style.bottom = 0;
})


//MAKE THE BASKET MOVE FROM LEFT TO RIGHT
window.addEventListener('keydown', (event) => {
  let basketposition = getBasketPosition();
  console.log(basketposition);
  if (basketposition.x < (screenLimitWidth - 100)) { ///100 correspond à la taille de mon basket
    if (event.key === 'ArrowRight') {
      basket.style.left = parseInt(basket.style.left) + modifier + 'px';
      basketX += modifier; //PAS SURE QUE CA SERVE A QQCHOSE
    }
  }
  if (basketposition.x > 0) {
    if (event.key === 'ArrowLeft') {
      basket.style.left = parseInt(basket.style.left) - modifier + 'px';
      basketX -= modifier; //PAS SURE QUE CA SERVE A QQCHOSE
    }
  }
}
)



//MAKE OBJECTS FALL
function random(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}


function createWaste() {
  const waste = document.createElement('div');
  document.body.appendChild(waste); // where we gonna put all this raining divs
  waste.classList.add('object-falling');
  //assign a random element in the list of data
 const randomNumber =  Math.floor(Math.random() * (data.length-1)) // random number among all the datas //ATTENTION ENELEVER LE -1???
 const wasteElement = data[randomNumber];
//  console.log(wasteElement);

 //on va donner à l'élement toutes les properties de l'élément du data choisi
 const ClassGoodOrBad = data[randomNumber].category
  waste.classList.add('ClassGoodOrBad');
  //donner l'image correspondante
  const imagesrc = data[randomNumber].imageurl
  const wasteImage = document.createElement("img");
  wasteImage.src = imagesrc;
  waste.appendChild(wasteImage);


  //make them appear in the random X axis position
  waste.style.left = Math.random() * window.innerWidth + 'px';
  //setting animation duration randomly from 2 to 5s for each object created
  waste.style.animationDuration = Math.random() * 3 + 2 + 's';
  //setting opacity randomly for each object created;
  waste.style.opacity = Math.random();


  //setting the size randomly TO DO
  //also make them twist a little;
 

  // let wasteposition = waste.getBoundingClientRect(); //attention, il faut le faire pour chaque;

  //we want the animation to last between 2 and 5 s so we had 2 because it's always gonna be 2 at least
  //we want to erase them from the screen after 5 sec
  setTimeout(() => {
    waste.remove();
  }, 5000)
}
createWaste();
createWaste();
createWaste();

//


//call the function createWaste every X ms 

//setInterval(createWaste, 1000); /////////////////////////


// pour chaque waste, définir sa position


//TIMER UNE MINUTE QUI DEFINIT LE DEBUT ET LA FIN DU JEU
//timer



