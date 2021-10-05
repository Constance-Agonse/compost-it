function createWaste() {
    const waste = document.createElement('div');
    waste.classList.add('object-falling');
    document.body.appendChild(waste);
    //make them appear in the random X axis position
    waste.style.left = Math.random() * window.innerWidth + 'px';
    //setting animation duration randomly from 2 to 5s for each object created
    waste.style.animationDuration = Math.random() * 3 + 2 + 's';
    //setting opacity randomly for each object created;
    waste.style.opacity = Math.random();
  
    //setting the size randomly TO DO
    //also make them twist a little;
    //setting a random waste among all the waste data;
  
    // let wasteposition = waste.getBoundingClientRect(); //attention, il faut le faire pour chaque;
  
    //we want the animation to last between 2 and 5 s so we had 2 because it's always gonna be 2 at least
    //we want to erase them from the screen after 5 sec
    setTimeout(() => {
      waste.remove();
    }, 5000)
  }
  createWaste();