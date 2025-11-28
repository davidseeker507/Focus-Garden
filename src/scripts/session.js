const timerDisplay = document.getElementById("timer-display");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const sessionStatus = document.getElementById("session-status");
const sessionLengthSelect = document.getElementById("session-length");
const streakCount = document.getElementById("streak-count");
const weeklyMinute = document.getElementById("weekly-minute");
const gardenLog = document.getElementById("garden-log");
const growthScene = document.getElementById("growth-scene");
const growthProgress = document.getElementById("growth-progress");
const plantPhoto = document.getElementById("growthPhoto");
let timerId = null;
let remainingSeconds = Number(sessionLengthSelect.value) * 60;
let totalSessionSeconds = remainingSeconds;
let isRunning = false;
let plantValue = 0;
let selectedPlant = document.getElementById("plantSelect");
let selectedPlantValue = null;
let changeRate = Math.floor(Number((sessionLengthSelect.value) * 60) / 4) 
let ChangeRateUpdate = document.getElementById("session-length");
console.log(changeRate)

ChangeRateUpdate.addEventListener("change", (event) => {
    let changeRate = Math.floor(Number((sessionLengthSelect.value) * 60) / 4);
    console.log("Changed", changeRate);
});

function plantChange(plantValue){
    console.log("Hello world");
}

setInterval(test, 1000);

const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const renderTimer = () => {
    timerDisplay.textContent = formatTime(remainingSeconds);
};
renderTimer();

const updateGrowthVisual = () => {
    if (!growthScene || !growthProgress) return;
    if (!totalSessionSeconds || totalSessionSeconds <= 0) {
        growthScene.style.setProperty("--growth-percent", "0%");
        growthProgress.textContent = "0%";
        return;
    }

    const progressRatio = Math.min(
        1,
        Math.max(0, 1 - remainingSeconds / totalSessionSeconds),
    );
    const percent = Math.round(progressRatio * 100);

    growthScene.style.setProperty("--growth-percent", `${percent}%`);
    growthProgress.textContent = `${percent}%`;
};
updateGrowthVisual();

startBtn.addEventListener("click", () => {
    if (isRunning) return;

    isRunning = true;
    sessionStatus.textContent = "Focus session in progress";
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;

    totalSessionSeconds = remainingSeconds;
    updateGrowthVisual();

    timerId = setInterval(() =>  {
       remainingSeconds -= 1;
        plantValue += 1;
        console.log(plantValue);
        renderTimer();
        updateGrowthVisual();

        if (remainingSeconds <= 0) {
            clearInterval(timerId);
            isRunning = false;
            sessionStatus.textContent = "Session complete!";
            pauseBtn.disabled = true;
            startBtn.disabled = false;
            remainingSeconds = 0;
            updateGrowthVisual();
            plantStageProgression();
        }
    }, 1000);
});

pauseBtn.addEventListener("click", () => {
    if (!isRunning) return;

    clearInterval(timerId);
    isRunning = false;
    sessionStatus.textContent = "Session paused";
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    updateGrowthVisual();
});

resetBtn.addEventListener("click", () => {
    clearInterval(timerId);
    isRunning = false;

    remainingSeconds = Number(sessionLengthSelect.value) * 60;
    totalSessionSeconds = remainingSeconds;
    renderTimer();
    updateGrowthVisual();

    sessionStatus.textContent = "Timer reset.";
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
});

sessionLengthSelect.addEventListener("change", () => {
    if (isRunning) return;

    remainingSeconds = Number(sessionLengthSelect.value) * 60;
    totalSessionSeconds = remainingSeconds;
    renderTimer();
    updateGrowthVisual();
    sessionStatus.textContent = "Time length updated.";

    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
});

const addGardenEntry = (minutes) => {
    const emptyState = gardenLog.querySelector(".garden-log__empty");
    if (emptyState) emptyState.remove();
  
    const entry = document.createElement("li");
    entry.className = "garden-log__entry";
    entry.textContent = `🌱 ${minutes} minute bloom`;
  
    gardenLog.prepend(entry);
};

function imgChange(plantValue){
    selectedPlantValue = selectedPlant.options[selected.selectedIndex].InnerHTML;
    console.log(selectedPlantValue);
}
imgChange();
function imgChange() {
    const plantSelect = document.getElementById('plantSelect');
    if (!plantSelect) return; // safety
  
    const selectedPlantValue =
      plantSelect.options[plantSelect.selectedIndex].innerHTML;
  
    console.log(selectedPlantValue);
  }