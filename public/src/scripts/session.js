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
let hasSwappedImage1 = false;
let hasSwappedImage2 = false;
let hasSwappedImage3 = false;
let hasSwappedImage4 = false;
let plantFinished = false;

console.log(changeRate)

ChangeRateUpdate.addEventListener("change", (event) => {
    changeRate = Math.floor(Number((sessionLengthSelect.value) * 60) / 4);
    console.log("Changed", changeRate);
});


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
    sessionLengthSelect.disabled = true;
    if (plantFinished){
        plantPhoto.src="Pixel Art Flower Pack/Bush 1 (No Flowers)/Bush 1 (no flowers) - GREEN.png";
    }

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

        if(!hasSwappedImage1 && plantValue >= changeRate) {
            plantPhoto.src = "img/Pixel Art Plants/Grape Plant/1.png";   
            hasSwappedImage1 = true  
            console.log("Changephoto1");
           }
        else if(!hasSwappedImage2 && plantValue >= (changeRate * 2)){
            plantPhoto.src = "img/Pixel Art Plants/Grape Plant/2.png";   
            hasSwappedImage2 = true  
            console.log("Changephoto2");
        }
        else if (!hasSwappedImage3 && plantValue  >= (changeRate * 3)){
            plantPhoto.src = "img/Pixel Art Plants/Grape Plant/3.png";   
            hasSwappedImage3 = true  
            console.log("Changephoto3");
        }
        else if (!hasSwappedImage4 && plantValue >= (changeRate * 4)){
            plantPhoto.src = "img/Pixel Art Plants/Grape Plant/4.png";   
            hasSwappedImage4 = true 
            plantValue = 0; 
            console.log("Changephoto4");
            hasSwappedImage1 = false;
            hasSwappedImage2 = false;
            hasSwappedImage3 = false
            hasSwappedImage4 = false;
        }
        
        

        if (remainingSeconds <= 0) {
            sessionLengthSelect.disabled = false;
            hasSwappedImage1 = false;
            hasSwappedImage2 = false;
            hasSwappedImage3 = false
            hasSwappedImage4 = false;
            clearInterval(timerId);
            isRunning = false;
            sessionStatus.textContent = "Session complete!";
            pauseBtn.disabled = true;
            startBtn.disabled = true;
            plantFinished = true;
            remainingSeconds = 0;
            updateGrowthVisual();
        }
    }, 1000);
});

pauseBtn.addEventListener("click", () => {
    if (!isRunning) return;
    sessionLengthSelect.disabled = false;

    clearInterval(timerId);
    isRunning = false;
    sessionStatus.textContent = "Session paused";
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    updateGrowthVisual();
});

resetBtn.addEventListener("click", () => {
    sessionLengthSelect.disabled = true;
    hasSwappedImage1 = false;
    hasSwappedImage2 = false;
    hasSwappedImage3 = false
    hasSwappedImage4 = false;
    clearInterval(timerId);
    isRunning = false;
    plantValue = 0; 
    plantPhoto.src="Pixel Art Flower Pack/Bush 1 (No Flowers)/Bush 1 (no flowers) - GREEN.png";

    remainingSeconds = Number(sessionLengthSelect.value) * 60;
    totalSessionSeconds = remainingSeconds;
    renderTimer();
    updateGrowthVisual();

    sessionStatus.textContent = "Timer reset.";
    startBtn.disabled = true;
    pauseBtn.disabled = true;
    resetBtn.disabled = false;
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