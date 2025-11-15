const timerDisplay = document.getElementById("timer-display");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const sessionStatus = document.getElementById("session-status");
const sessionLengthSelect = document.getElementById("session-length");
const streakCount = document.getElementById("streak-count");
const weeklyMinute = document.getElementById("weekly-minute");
let timerId = null;
let remainingSeconds = Number(sessionLengthSelect.value) * 60;
let isRunning = false;

const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

const renderTimer = () => {
    timerDisplay.textContent = formatTime(remainingSeconds);
}
renderTimer();

startBtn.addEventListener("click", () => {
    if (isRunning) return;

    isRunning = true;
    sessionStatus.textContent = "Focus session in progress";
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;

    timerId = setInterval(() =>  {
        remainingSeconds -= 1;
        renderTimer();

    if (remainingSeconds <= 0) {
        clearInterval(timerId);
        isRunning = false;
        sessionStatus.textContent = "Session complete!";
        pauseBtn.disabled = true;
        startBtn.disabled = false;

        }
    },1000);
});

pauseBtn.addEventListener("click", () => {
    if (!isRunning) return;

    clearInterval(timerId);
    isRunning = false;
    sessionStatus.textContent = "Session paused";
    startBtn.disabled = false;
    pauseBtn.disabled = true;
});

resetBtn.addEventListener(("click"), () => {
    clearInterval(timerId);
    isRunning = false;

    remainingSeconds = Number(sessionLengthSelect.value) * 60;
    renderTimer();

    sessionStatus.textContent = "Timer reset.";
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
});