/* 
    Students! You will all be completing this matching card game.
    Follow the directions throughout this file to slowly build out 
    the game's features.
*/


// These are all the symbols that the game is going to use
const symbols = ['🍎', '🍌', '🍇', '🍓', '🍍', '🍉', '🍒', '🥝'];
// You're going to need this to display the cards on the screen (remember there should be two of each card)
let cards = [];
// These will be used when the user starts choosing cards
let firstCard = null, secondCard = null;
// You will need to lock the board to stop users from choosing cards when they choose two wrong cards
// (Don't have to worry about this too much)
let lockBoard = false;

/* 
    You must initialize the game board. You have been given a shuffleArray() function.
    This function should also reset the entire game board by making sure there's no HTML inside of the game-board div.
    Use the createCard() function to initialize each cardElement and add it to the gameBoard.
*/
function initGame() {
    // Write your code here
    // Clear the inner HTML of game-board div
    let gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';

    // Create 16 cards total, 2 for each symbol 
    // Create a new array that duplicates symbols twice
    let allSymbols = symbols.concat(symbols);
    
    // Shuffle the new array so that the symbols are randomly ordered
    shuffleArray(allSymbols);

    // Iterate over the symbols array and create 2 cards for each symbol.
    for (let i = 0; i < 16; i++) {
        // Create a cardElement for the ith symbol
        createCard(allSymbols[Math.floor(i)]);
    }

    // Reset board when user clicks restart button 
    document.getElementById('restart-btn').addEventListener('click', initGame);
}

/*
    The card will have the class 'card' and it would be a good idea to somehow save what its symbol is
    within the element itself, since we'll need it for later and there's no easy way to get it from the arrays.
    Also make sure to add the event listener with the 'flipCard' function
*/
function createCard(symbol) {
    // Write your code here

    // Create div element with class card to represent the card in HTML
    const cardElement = document.createElement('div');

    // Add the 'card' class to the card using classList add()
    cardElement.classList.add('card');

    // Save the card's symbol within the element itself
    cardElement.dataset.symbol = symbol;

    // Add the event listener with the flipCard function
    // Arrow function delays execution of the flipCard function
    cardElement.addEventListener('click', () => flipCard(cardElement));

    // Add the card to cards array
    cards.push(cardElement);

    // Add cardElement to gameboard HTML using appendChild
    let gameBoard = document.getElementById('game-board')
    gameBoard.appendChild(cardElement);
}

/*
    This function will handle all the logic for flipping the card. You can check if a variable doesn't
    have a value attached to it or is null by doing if (variable === null) {} or if (variable == null) {} or  if (!variable){}
    If a card get's flipped, add the 'flipped' class and also display the symbol. 
    Also, if this is the first card you picked, then set the firstCard variable to the card you just picked.
    If it's the second, then set the secondCard variable to it. Also, if that's the second card, then you 
    want to check for a match using the checkForMatch() function. 
*/
function flipCard(card) {
    // Write your code here    

    // If board is locked or user clicked on the first card again or on a flipped card, do nothing
    if (lockBoard || card === firstCard || card.classList.contains('flipped')) return;

    // Add 'flipped' class and show the symbol
    card.classList.add('flipped');

    // Display symbol
    card.textContent = card.dataset.symbol;


    // If this is the first card picked, set firstCard
    if (firstCard === null) {
        firstCard = card;
    } else {
        // If first card is alrready picked, set secondCard
        secondCard = card;

        // Lock board to keep user from clicking on other cards
        lockBoard = true;

        // Check for match between first and second cards
        checkForMatch();
    }
}

/* 
    If there's a match between the first two cards that you picked, you want to take those cards out of the
    game and then reset the board so that there is firstCard == null and secondCard == null.
    Otherwise, you should unflip the card and continue playing normally.
*/
function checkForMatch() {
    // Write your code here
    // Check if firstCard and secondCard match
    // If their symbols match, take those card out of the game 
    
    if (firstCard === secondCard) {
        unflipCards();
    }

    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        disableCards();
    } else {
        // If the cards don't match, then lock the board and unflip the cards
        unflipCards();
    }
 }

/* 
    Disable both of the cards by adding the "matched" class to them. The "matched" class will add CSS
    properties to make sure that they can no longer be clicked at all. Then use the resetBoard() function
    to reset the firstCard, secondCard, and lockBoard variables. (That's been written for you already)
*/
function disableCards() {
    // Write your code here
    // Add the matched class
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    // Reset board
    resetBoard();
}
 
/* ---------------------  Everything under has already been done for you -------------------------- */

function unflipCards() {

    // We lock the board so that the user can't touch the board while it is unflipping
    lockBoard = true;

    // The cards will be flipped back after 1 second and the board will be reset
    // The 1 second is to give the user time to actaully see the card so they can memorize them before they unflip
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

initGame();
