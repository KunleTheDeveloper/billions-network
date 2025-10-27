const coin = document.getElementById("coin");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const shareBtn = document.getElementById("shareBtn");

let score = 0;
let timeLeft = 30;
let timerInterval;
let gameActive = false;

function randomPosition() {
  const gameArea = document.getElementById("game-area");
  const maxX = gameArea.offsetWidth - 60;
  const maxY = gameArea.offsetHeight - 60;
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;
  coin.style.left = `${x}px`;
  coin.style.top = `${y}px`;
}

coin.addEventListener("click", () => {
  if (!gameActive) return;
  score++;
  scoreDisplay.textContent = score;
  randomPosition();
});

startBtn.addEventListener("click", () => {
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;
  coin.style.display = "block";
  startBtn.disabled = true;
  shareBtn.disabled = true;
  gameActive = true;

  randomPosition();

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      gameActive = false;
      coin.style.display = "none";
      startBtn.disabled = false;
      shareBtn.disabled = false;
      alert(`Time's up! You scored ${score} points!`);
    }
  }, 1000);
});

shareBtn.addEventListener("click", () => {
  const text = `🚀 I just scored ${score} points in the Billion Network Game! 💎
Play now and tag @kunleyr 👇`;
  const url = "https://x.com/kunleyr";
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text
  )}&url=${encodeURIComponent(url)}`;
  window.open(shareUrl, "_blank");
});
