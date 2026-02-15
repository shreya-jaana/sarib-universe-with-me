// Global Variables
const sections = document.querySelectorAll('.section');
let currentSection = 0;
const canvas = document.getElementById('rain-canvas');
const ctx = canvas.getContext('2d');
let raindrops = [];

// Initialize Canvas Size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Rain Animation
function createRaindrop() {
    return {
        x: Math.random() * canvas.width,
        y: 0,
        speed: Math.random() * 5 + 2,
        length: Math.random() * 20 + 10
    };
}

function updateRain() {
    raindrops.forEach(drop => {
        drop.y += drop.speed;
        if (drop.y > canvas.height) {
            drop.y = 0;
            drop.x = Math.random() * canvas.width;
        }
    });
}

function drawRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    raindrops.forEach(drop => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.stroke();
    });
}

function animateRain() {
    updateRain();
    drawRain();
    requestAnimationFrame(animateRain);
}

// Initialize Rain
for (let i = 0; i < 100; i++) {
    raindrops.push(createRaindrop());
}
animateRain();

// Section Transitions
function transitionToSection(nextIndex) {
    sections[currentSection].classList.add('transitioning');
    setTimeout(() => {
        sections[currentSection].classList.remove('active', 'transitioning');
        currentSection = nextIndex;
        sections[currentSection].classList.add('active');
    }, 500);
}

// Section 1: Password Portal
const passwordInput = document.getElementById('password-input');
const unlockBtn = document.getElementById('unlock-btn');
const errorMsg = document.getElementById('error-msg');

unlockBtn.addEventListener('click', () => {
    if (passwordInput.value === '14022024') { // Example date; change as needed
        transitionToSection(1);
    } else {
        errorMsg.classList.remove('hidden');
        setTimeout(() => errorMsg.classList.add('hidden'), 2000);
    }
});

// Section 2: Mini Game
const gameArea = document.getElementById('game-area');
const scoreEl = document.getElementById('score');
const gameOverEl = document.getElementById('game-over');
const winMsgEl = document.getElementById('win-msg');
const enterGiftsBtn = document.getElementById('enter-gifts-btn');
let score = 0;
let hearts = [];
let gameActive = false;

function startGame() {
    score = 0;
    hearts = [];
    scoreEl.textContent = 'Score: 0';
    gameOverEl.classList.add('hidden');
    winMsgEl.classList.add('hidden');
    enterGiftsBtn.classList.add('hidden');
    gameActive = true;
    spawnHearts();
}

function spawnHearts() {
    if (!gameActive) return;
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = '❤️';
    heart.style.left = Math.random() * (gameArea.offsetWidth - 50) + 'px';
    heart.addEventListener('click', () => {
        heart.remove();
        score++;
        scoreEl.textContent = 'Score: ' + score;
        if (score >= 10) {
            gameActive = false;
            winMsgEl.classList.remove('hidden');
            enterGiftsBtn.classList.remove('hidden');
        }
    });
    gameArea.appendChild(heart);
    hearts.push(heart);
    setTimeout(() => {
        if (heart.parentElement && gameActive) {
            gameActive = false;
            gameOverEl.classList.remove('hidden');
            setTimeout(startGame, 2000); // Reset after 2s
        }
    }, 3000);
    if (gameActive) setTimeout(spawnHearts, 1000);
}

startGame();

// Section 3: Typing Animation
const giftParagraph = document.getElementById('gift-paragraph');
const nextGiftBtn = document.getElementById('next-gift-btn');
const fullText = "In the quiet moments of our long-distance love, I've learned the true meaning of patience. Waiting for your messages, your calls, your laughter – it's like waiting for rain in a drought, and when it comes, it nourishes my soul. You are the sweetness in my days, the bond that ties us forever, no matter the miles. Happy birthday, my love. This is just the beginning.";

let index = 0;
function typeText() {
    if (index < fullText.length) {
        giftParagraph.textContent += fullText.charAt(index);
        index++;
        setTimeout(typeText, 50);
    } else {
        nextGiftBtn.classList.remove('hidden');
    }
}
typeText();

nextGiftBtn.addEventListener('click', () => transitionToSection(3));

// Section 4: Gift Boxes
const giftBoxes = document.querySelectorAll('.gift-box');
const biggestGiftBtn = document.getElementById('biggest-gift-btn');
const messages = {
    1: 'You are the best person.',
    2: 'I am proud of you.',
    3: 'I love you deeply and truly.',
    4: 'This is our first birthday together, but the beginning of many till our last breath.'
};
let openedCount = 0;

giftBoxes.forEach(box => {
    box.addEventListener('click', () => {
        if (!box.classList.contains('
