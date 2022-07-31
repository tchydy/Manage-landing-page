const slides = document.querySelector('.slides');
const slider = document.querySelector('.slider');
const cards = document.querySelectorAll('.card');
const counters = document.querySelectorAll('.counter');
const navBtn = document.querySelector('.nav-btn');
const modal = document.querySelector('.modal');
const form = document.querySelector('form');
const inputError = document.querySelector('#input-error');
const error = document.querySelector('.error');
const email = document.getElementById('mail');


// nav-btn transform to a close form on click
const mobileQuery = window.matchMedia('(max-width: 480px)');
navBtn.addEventListener('click', () => {
    navBtn.classList.toggle('open');
    modal.classList.toggle('hidden');
    modal.classList.toggle('opacity-0');
    console.log(modal.classList);

})


let moving = false; // this is to track movements
let startX; // used later for calculating the differnce between the point the mouse movements taps the screen and the left edge of the slider.
let x;

// had this console to keep track of all widths and offsets

// console.log(cards[0].offsetLeft, cards[1].offsetLeft, cards[2].offsetLeft, cards[3].offsetLeft, slider.offsetWidth, slides.offsetWidth, slides.offsetLeft);

// different mouse movements
slider.addEventListener('mousedown', (e) => {
  moving = true;
  slider.style.cursor = 'grabbing';
  startX = e.offsetX - slides.offsetLeft; //used for calculating the differnce between the point the mouse taps the screen and the left edge of the slider.
  console.log(startX);
})

slider.addEventListener('mouseenter', (e) => {
 slider.style.cursor = 'grab';
})

slider.addEventListener('mouseup', (e) => {
 moving = false;
 slider.style.cursor = 'grab';
})

slider.addEventListener('mouseleave', (e) => {
 moving = false;
 slider.style.cursor = 'grab';
})
//mousemove has the most logic
slider.addEventListener('mousemove', (e) => {
  // console.log(moving);
  if (!moving) return; //if moving is false do nothing
  e.preventDefault(); //prevent slecting text
  e.stopPropagation();
  x = e.offsetX; //the point the mouse taps the screen 
  slides.style.left = `${x - startX}px`; // this sets the 
  console.log(slides.offsetLeft, e.offsetX, startX);
  checkBoundary(); //ensure the slider does not exceed the first and last card
})

// counter buttons become active when clicked
counters.forEach((counter) => {
counter.addEventListener('click', () => {
    counters.forEach( page => {page.classList.remove('active')}); 
    counter.classList.add('active')
})
})

//on large screens when page is loaded slider moves to start
const mediaQuery = window.matchMedia('(min-width: 768px)');
window.onload = function () {
    if (mediaQuery.matches) {
    slider.scrollTo(0, 0);
    
}
};

// calculate padding between cards 
cardsPadding = (cards[0].getBoundingClientRect().left + cards[0].getBoundingClientRect().width) - cards[1].getBoundingClientRect().left;

// function for mobile devices 
slider.addEventListener('touchmove', (e) => {
    const sliderLeft = slider.getBoundingClientRect().left - 18;
     
        activeScroll();
     
})

// when cards slider moves set counter active to the card on the center of screen
 function activeScroll() {
   let current = '';
   cards.forEach((card) => {
     const cardLeft = -(card.getBoundingClientRect().left - 18);
     const cardWidth = card.getBoundingClientRect().width;
    //  check for card within a boundary on left and right 
     if (cardLeft >= cardsPadding && cardLeft <= cardWidth) {
    //    console.log(cardLeft, cardsPadding);
       current = card.getAttribute('id');
     }
    //  once id is obtained find the matching id to counter href then add active class 
     counters.forEach((counter) => {
       counter.classList.remove('active');
       let href = counter.parentElement.getAttribute('href').slice(1);
       // console.log(href, current)
       if (current === href) {
         counter.classList.add('active');
       }
     });
   });
 }
 activeScroll();

const checkBoundary = () => {
    let outer = slider.getBoundingClientRect();
    let inner = slides.getBoundingClientRect();

    if (parseInt(slides.style.left) > 0) {
        console.log(slides.style.left);
        slides.style.left = "0px";
    }

    if (inner.right < outer.right) {
        slides.style.left = `-${inner.width - outer.width}px`;
    }
};

// mobile event of mousedown
slider.addEventListener('touchstart', (e) => {
 console.log(cards[0].offsetLeft, cards[1].offsetLeft, cards[2].offsetLeft, cards[3].offsetLeft, slider.offsetWidth, slides.offsetWidth, slides.offsetLeft);
});

// form validation
form.addEventListener('submit', (e) => {
  
  if (!email.validity.valid) {
    console.log('invalid');
    // if the email field is valid, we let the form submit
    e.preventDefault();
    // If it isn't, we display an appropriate error message
    showError();
      // Then we prevent the form from being sent by canceling the event
    }
  
})

// email.addEventListener('input', function (e) {
//     e.preventDefault();
//     if (email.validity.valid) {
//         inputError.classList.remove('error');
//         inputError.classList.add('hidden');
//         inputError.classList.add('opacity-0');
//     }else{
//         showError();
//     }
// });

function showError() {
  
 if (email.validity.valueMissing || email.validity.typeMismatch  ) {
    inputError.classList.add('error')
    inputError.classList.remove('hidden')
    inputError.classList.remove('opacity-0')
    // console.log('error');
 }else{
    inputError.classList.remove('error')
    inputError.classList.add('hidden');
    inputError.classList.add('opacity-0');
 }
}