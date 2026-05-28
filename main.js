// ======================================
// MAGIC MIND READER WEBSITE
// PROFESSIONAL JAVASCRIPT
// ======================================

const startBtn = document.getElementById("startBtn");

const gameSection = document.getElementById("gameSection");

const resultSection = document.getElementById("resultSection");

const numbersGrid = document.getElementById("numbersGrid");

const yesBtn = document.getElementById("yesBtn");

const noBtn = document.getElementById("noBtn");

const cardNumber = document.getElementById("cardNumber");

const progressFill = document.getElementById("progressFill");

const finalNumber = document.getElementById("finalNumber");

const restartBtn = document.getElementById("restartBtn");

const magicCard = document.getElementById("magicCard");

// ======================================
// VARIABLES
// ======================================

let currentCard = 0;

let guessedNumber = 0;

// Binary cards for 1-100
const binaryCards = [1, 2, 4, 8, 16, 32, 64];

// ======================================
// GENERATE CARD
// ======================================

function generateCard(bitValue){

  numbersGrid.innerHTML = "";

  for(let i = 1; i <= 100; i++){

    if(i & bitValue){

      const box = document.createElement("div");

      box.classList.add("number-box");

      box.textContent = i;

      numbersGrid.appendChild(box);

    }

  }

}

// ======================================
// UPDATE CARD
// ======================================

function updateCard(){

  // All cards completed
  if(currentCard >= binaryCards.length){

    showResult();

    return;

  }

  // Generate current card
  generateCard(binaryCards[currentCard]);

  // Update progress
  cardNumber.textContent = currentCard + 1;

  progressFill.style.width =
    ((currentCard + 1) / binaryCards.length) * 100 + "%";

  // Re-trigger animation
  magicCard.style.animation = "none";

  void magicCard.offsetWidth;

  magicCard.style.animation = "fadeIn .6s ease";

}

// ======================================
// NEXT CARD
// ======================================

function nextCard(answer){

  // If YES add binary value
  if(answer){

    guessedNumber += binaryCards[currentCard];

  }

  currentCard++;

  updateCard();

}

// ======================================
// SHOW RESULT
// ======================================

function showResult(){

  // Hide game section completely
  gameSection.style.display = "none";

  // Show result section
  resultSection.classList.remove("hidden");

  resultSection.style.display = "flex";


  // If number greater than 100
if(guessedNumber > 100){

  finalNumber.innerHTML =
    "⚠️<br>You thought of a number greater than 100";

  return;
}

// If number less than 1
if(guessedNumber === 0){

  finalNumber.innerHTML =
    "⚠️<br>You thought of a number less than 1";

  return;
}
  // Reset animation number
  finalNumber.textContent = "0";

  let count = 0;

  // Number counting animation
  const interval = setInterval(()=>{

    count++;

    finalNumber.textContent = count;

    if(count >= guessedNumber){

      clearInterval(interval);

    }

  },25);

}

// ======================================
// START GAME
// ======================================

startBtn.addEventListener("click",()=>{

  startBtn.style.display = "none";

  gameSection.style.display = "block";

  gameSection.classList.remove("hidden");

  updateCard();

});

// ======================================
// YES BUTTON
// ======================================

yesBtn.addEventListener("click",()=>{

  nextCard(true);

});

// ======================================
// NO BUTTON
// ======================================

noBtn.addEventListener("click",()=>{

  nextCard(false);

});

// ======================================
// PLAY AGAIN
// ======================================

restartBtn.addEventListener("click",()=>{

  // Reset values
  currentCard = 0;

  guessedNumber = 0;

  // Hide result
  resultSection.classList.add("hidden");

  resultSection.style.display = "none";

  // Show game section again
  gameSection.style.display = "block";

  gameSection.classList.remove("hidden");

  // Reset progress bar
  progressFill.style.width = "0%";

  // Load first card
  updateCard();

});

// ======================================
// OPTIONAL:
// ENTER KEY SUPPORT
// ======================================

document.addEventListener("keydown",(e)=>{

  // Start game with Enter
  if(e.key === "Enter" &&
     startBtn.style.display !== "none"){

    startBtn.click();

  }

  // YES with ArrowRight
  if(e.key === "ArrowRight" &&
     gameSection.style.display !== "none"){

    yesBtn.click();

  }

  // NO with ArrowLeft
  if(e.key === "ArrowLeft" &&
     gameSection.style.display !== "none"){

    noBtn.click();

  }

});