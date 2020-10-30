const startButton = document.querySelector('.start-btn');
const startContainer = document.querySelector('.start-container');
const game = document.querySelector('.game');
const cards = document.querySelectorAll('.card');
const finalMessage = document.querySelector('.final-message');
const replayButton = document.querySelector('.replay-btn');

let flippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let i = 0;

function startGame(){
    startContainer.style.display = 'none';
    game.style.display = 'flex';
};

function replayGame(){
    resetGame();
    cards.forEach(card => {
        card.classList.add('initial-bg');
        card.classList.remove('flip');
        card.children[0].style.display = 'none';
    });
    cards.forEach(card => card.addEventListener('click', flipCard));
    i = 0;
    finalMessage.style.display = 'none';
    game.style.display = 'flex';
};

function flipCard() {
    if (this === firstCard) return;

    this.classList.add('flip');
    this.classList.remove('initial-bg');
    this.children[0].style.display = 'block';
    if (!flippedCard) {
        flippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    isMatch();
}

function isMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;
    if(isMatch){
        disableCards();
        i ++;
        const numPairs = cards.length / 2;
        if(i ==  numPairs){
            setTimeout(() => {
                game.style.display = 'none';
                finalMessage.style.display = 'block';
            }, 1000);
        }
    }else{
        resetCards();
    }
}

function resetCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.add('initial-bg');
        secondCard.classList.add('initial-bg');
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        firstCard.children[0].style.display = 'none';
        secondCard.children[0].style.display = 'none';
        resetGame();
    }, 1000);
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetGame();
}

function resetGame() {
    flippedCard = false;
    lockedBoard = false;
    firstCard = null;
    secondCard = null;
}

(function shuffle() {
    const cardValue = cards.length;
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cardValue);

        card.style.order = randomPos;
    });
})();


cards.forEach(card => card.addEventListener('click', flipCard));
startButton.addEventListener('click', startGame);
replayButton.addEventListener('click', replayGame);