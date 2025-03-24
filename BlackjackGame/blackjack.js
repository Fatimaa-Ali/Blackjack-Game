let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";

let messageEL = document.getElementById("message-el");
let cardsEL = document.getElementById("cards-el");
let sumEL = document.getElementById("sum-el");

let startGameBtn = document.querySelector("button:nth-of-type(1)");
let newCardBtn = document.querySelector("button:nth-of-type(2)");

// Generate a random card (1 - 11)
function getRandomCard() {
    return Math.floor(Math.random() * 11) + 1;
}

// Start Game
function startGame() {
    isAlive = true;
    hasBlackJack = false;
    
    // Disable "START GAME" button
    startGameBtn.disabled = true;
    newCardBtn.disabled = false; // Enable "NEW CARD" button

    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    renderGame();
}

// Update UI and game state
function renderGame() {
    cardsEL.textContent = "Cards: " + cards.join(" ");
    sumEL.textContent = "Sum: " + sum;

    if (sum < 21) {
        message = "Do you want to draw a new card? 🙂";
    } else if (sum === 21) {
        message = "Wohoo! You've got Blackjack! 🎉🥳";
        hasBlackJack = true;
        startConfetti(); // Start celebration
        endGame(); // Disable buttons since the game is over
    } else {
        message = "You're out of the game! 😢";
        isAlive = false;
        endGame(); // Disable buttons since the game is over
    }

    messageEL.textContent = message;
}

// Draw new card
function newCard() {
    if (isAlive && !hasBlackJack) {
        let card = getRandomCard();
        cards.push(card);
        sum += card;
        renderGame();
    }
}

// End game: enable "START GAME" and disable "NEW CARD"
function endGame() {
    startGameBtn.disabled = false;
    newCardBtn.disabled = true;
}

// Confetti Effect
function startConfetti() {
    let confettiCanvas = document.createElement("canvas");
    document.body.appendChild(confettiCanvas);
    confettiCanvas.style.position = "absolute";
    confettiCanvas.style.top = "0";
    confettiCanvas.style.left = "0";
    confettiCanvas.style.width = "100vw";
    confettiCanvas.style.height = "100vh";
    confettiCanvas.style.pointerEvents = "none";
    let ctx = confettiCanvas.getContext("2d");

    let confettiParticles = [];
    
    for (let i = 0; i < 100; i++) {
        confettiParticles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            r: Math.random() * 10 + 2,
            dx: Math.random() * 4 - 2,
            dy: Math.random() * 4 - 2,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`
        });
    }

    function drawConfetti() {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        confettiParticles.forEach((p) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            p.x += p.dx;
            p.y += p.dy;
            p.dy += 0.1; // Gravity effect
        });

        if (confettiParticles.some((p) => p.y < window.innerHeight)) {
            requestAnimationFrame(drawConfetti);
        }
    }

    drawConfetti();

    // Remove confetti effect after 5 seconds
    setTimeout(() => {
        document.body.removeChild(confettiCanvas);
    }, 5000);
}
