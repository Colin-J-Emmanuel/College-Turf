//Wait for the DOM to be fully-loaded
document.addEventListener("DOMContentLoaded", function () {

  // TODO: Query for button with an id "theme-button"
  let themebutton = document.getElementById("theme-button");
  
  // TODO: Complete the toggleDarkMode function
  const toggleDarkMode = () => {
      // Write your code to manipulate the DOM here
    document.body.classList.toggle("dark-mode");
  }
  
  let signnowbutton = document.getElementById("sign-now-button");

  let count = 3;

  let person = {}; // Declare 'person' here so it's accessible in both functions
  let scaleFactor = 1;

  let modalImage = document.getElementById("thanks-modal-image")
  
  const addSignature = () => {
    // Getting inputs that were submitted using DOM methods
    //const name = document.getElementById("Name").value;
    const name = person.name;
    //const hometown = document.getElementById("Hometown").value;
    const hometown = person.hometown;
    //const email = document.getElementById("Email").value;
    const email = person.email;
    // The end of getting inputs
    // Creating a new paragraph element on the page where other signatures are
    const signature = document.createElement("p");
    signature.textContent = "️🖊️" + " " + name + " from " + hometown + " supports this.";
    // A DOM method that finds where the signature sections is on the web page
    const signatures = document.querySelector(".signatures");
    // A DOM method that appends a new signature to the signatures section
    signatures.appendChild(signature);
    
    count = count + 1;
    const counter = document.querySelector("#counter");
    counter.textContent = "️🖊️" + " " + count + " people have signed this petition and support this cause.";
  }
  
  const validateForm = () => {

    let containsErrors = false;
    
    const email = document.getElementById('Email');
    if(!email.value.includes('.com')) {
      containsErrors = true;
      email.classList.add('error');
    }
    else {
      email.classList.remove('error');
    }
    
    let petitionInputs = document.getElementById("sign-petition").elements;

    person = {
        name: petitionInputs[0].value, // accesses and saves value of first input
        hometown: petitionInputs[1].value, // accesses and saves value of second input
        email: petitionInputs[2].value // accesses and saves value of third input
    };
    
    // TODO: Loop through all inputs
    for (let i =0; i < petitionInputs.length; i++) {
      if(petitionInputs[i].value.length < 2) {
        petitionInputs[i].classList.add('error');
        containsErrors = true;
      }
      else {
        petitionInputs[i].classList.remove('error');
      }
    }
    // TODO: Validate the value of each input
    if (containsErrors === false) {
      // TODO: Call addSignature() and clear fields if no errors
      addSignature(person);
      toggleModal(person);
      for(let i = 0; i < petitionInputs.length; i++) {
        petitionInputs[i].value = " ";
        containsErrors = false;
      }
    }
  }

  // TODO: Register a 'click' event listener for the theme button
  // Set toggleDarkMode as the callback function.
  themebutton.addEventListener("click", toggleDarkMode);
  signnowbutton.addEventListener('click', validateForm);
  window.addEventListener('scroll', reveal);
  window.addEventListener('scroll', reduceMotion);
});

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
}

let revealableContainers = document.querySelectorAll(".revealable");

const reveal = () => {
  for(let i = 0; i < revealableContainers.length; i++) {
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
    if(topOfRevealableContainer < window.innerHeight - animation.revealDistance) {
      /*add the active class to the revealableContainer's classlist */
      revealableContainers[i].classList.add("active");
    }
    else {
      /* remove the active class to the revealableContainer's classlist */
      revealableContainers[i].classList.remove("active");
    }
  }
}

const reduceMotion = () => {
  animation.transitionDuration = '0s';
  animation.transitionDelay = '0s';
  animation.transitionProperty = 'none';
  animation.initialOpacity = 1;
  for(let i = 0; i < revealableContainers.length; i++) {
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
    if(topOfRevealableContainer < window.innerHeight - animation.revealDistance) {
      revealableContainers[i].style.transitionDelay = animation.transitionDelay;
    }
  }
}

const toggleModal = (person) => {
  let interValId = setInterval(() => {
    scaleImage(0.5);
  })
  
  let modal = document.getElementById("thanks-modal");
  let modalContent = document.getElementById("thanks-modal-content");
  modal.style.display = "flex";
  modalContent.textContent = "Thank you for signing the petition, " + person.name + " from " + person.hometown + ". We will be in touch soon.";

  setTimeout(() => {
    modal.style.display = "none";
  }, 4000)
    clearInterval(interValId);
}

const scaleImage = () => {
  if (scaleFactor===1) {
    scaleFactor = 0.8;
  } else {
    scaleFactor = 1;
  }

modalImage.style.transform = `scale(${scaleFactor})`;
}
