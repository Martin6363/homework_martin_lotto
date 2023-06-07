const randomDiv = document.querySelectorAll(".lotto-block");
const randomButton = document.getElementById("random-button");
const container = document.getElementById("container");
const lottoContainer = document.getElementById("lotto-container");
const playButton = document.getElementById("play-button");
const runButton = document.getElementById("run-button");
const stopButton = document.getElementById("stop-button")
const loadingBar = document.getElementById("loading");
const percentLoading = document.getElementById("percent");
const loadingContainer = document.getElementById("loading-cont");
const runNumberText = document.getElementById("run-number-text");
const body = document.querySelector ("body");
const bgMusic = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");
const clickSoundTrack = document.createElement("audio");
clickSoundTrack.src = "./sound-track/select-click.wav";
clickSoundTrack.volume = 0.5;
let isPlaying = false;
const burgerMenu = document.getElementById("burger-menu");
const closeBurgerMenu = document.getElementById("close-burger-menu");


function displayRandom() {
  let startIndex = 0;
  const numbers = getRandomNumArr(1, 99, lottoContainer.children.length);
  for (let i = 0; i < lottoContainer.children.length; i++) {
    lottoContainer.children[i].innerHTML = numbers[i];
    
    if ((i + 1) % 9 === 0) {
      startIndex = i - 8;
      const randomIndexes = getRandomNumArr(startIndex, i, 4);
      lottoContainer.children[randomIndexes[0]].innerHTML = '';
      lottoContainer.children[randomIndexes[1]].innerHTML = '';
      lottoContainer.children[randomIndexes[2]].innerHTML = '';
      lottoContainer.children[randomIndexes[3]].innerHTML = '';
    }
  }
}


function getRandomNumArr(start, end, arrLength) {
  const randomIndexes = [];
  while (randomIndexes.length < arrLength) {
    const randomNumber = getRandomNumber(start, end);

    if (randomIndexes.indexOf(randomNumber) === -1) {
      randomIndexes.push(randomNumber);
    }
  }
  return randomIndexes;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


// Random number 
function randomGenerator () {
    let generatedNumbers = [];

    for (let i = 1; i <= 99; i++) {
        generatedNumbers.push(i);
    }

    for (let i = generatedNumbers.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        let temp = generatedNumbers[i];
        generatedNumbers[i] = generatedNumbers[randomIndex];
        generatedNumbers[randomIndex] = temp;
    }

    return generatedNumbers;
}

   
// Loading bar animation settings
function loadingAnimate () {
    let count = 0;
    let loading = setInterval(() => {
        count++
    loadingBar.style.width = count + '%';
    percentLoading.textContent = count + '%';
    if (count >= 100) {
        clearInterval(loading);
    }
    if (count === 100) {
        percentLoading.style.color = '#fff';
        percentLoading.textContent = 'Finish';
        setTimeout(() => {
            loadingContainer.style.display = 'none';
            playButton.style.display = "block"
        }, 3 * 1000);
    }
}, 50);
}
loadingAnimate();


// Random Number
function randomText(generateNumber) {
    let i = 1;
    let runRandom;

    runRandom = setInterval(() => {
        if (i < generateNumber.length) {
            runNumberText.innerHTML = parseInt(generateNumber[i])
            numberBlockClickDraw()
            i++
        }    
        if (i >= generateNumber.length) {
            finish(runRandom);
         }
    }, 3 * 1000);
    stopButton.onclick = function () {
        stopInterval(runRandom);
        randomButton.disabled = false;
        randomButton.style.opacity = "initial";
        runNumberText.textContent = "";
    } 
}  



// function displayNumbers(array) {
//     array.forEach((element) => {
//       console.log(element);
//       runNumberText.innerHTML = parseInt(element);
//       numberBlockClickDraw();
//     });
//     return array
// }


function numberBlockClickDraw() {
    for (let index = 0; index < lottoContainer.children.length; index++) {
        let child = lottoContainer.children[index];
        // child.addEventListener("click", checkNumberMatch);
        checkNumberMatch(child)
    }
}


function checkNumberMatch(event) {
    let clickedElement = event;
    // .target
    console.log("Ashxateci");
    if (clickedElement.innerHTML === runNumberText.innerHTML) {
      clickedElement.style.backgroundColor = "rgb(188, 0, 0)"
    }
    //  else {
    //   clickedElement.style.backgroundColor = "initial";
    // }

}


function finish(runRandom) {
    runNumberText.textContent = "Finish";
    runNumberText.style.color = "rgb(53, 232, 33)";
    clearInterval(runRandom);
    stopButton.style.display = "none";
    runButton.style.display = "block";
}


function stopInterval(runRandom) {
    clearInterval(runRandom);
    clickSoundTrack.currentTime = 0;
    clickSoundTrack.play();
    stopButton.style.display = "none";
    runButton.style.display = "block";
}



// Background Music functions
function backgroundMusic (music) {
       if (isPlaying) {
            music.pause()
       } else {
            music.play();
       }
}


// Random button reset colors lotto Container 
function resetColors() {
    for (let index = 0; index < lottoContainer.children.length; index++) {
        let child = lottoContainer.children[index];
        child.style.backgroundColor = "initial";
    }
}


// Playing music settings
bgMusic.onplaying = function() {
    isPlaying = true;
};
bgMusic.onpause = function() {
    isPlaying = false;
};

musicBtn.onclick = function () {
    backgroundMusic(bgMusic)
}


// Friends menu bar
closeBurgerMenu.onclick = function () {
    body.classList.toggle('active')
}

burgerMenu.onclick = function () {
    body.classList.toggle('active')
}


// display setting play button
function playButtonDisplayStyle () {
    randomButton.style.display = 'block';
    lottoContainer.style.display = 'flex';
    runNumberText.style.display = "block";
    playButton.style.display = "none"
    runButton.style.display = "block"
}


// Play Game Button
playButton.onclick = function () {
    body.classList.toggle("display-style")
    displayRandom();
    backgroundMusic(bgMusic);
    clickSoundTrack.play();
    playButtonDisplayStyle();
}

// Start game button
runButton.onclick = function () {
    randomButton.disabled = true;
    randomButton.style.opacity = "0.5"
    randomButton.style.color = "black"
        resetColors();
    if (runNumberText.style.color === "rgb(53, 232, 33)") {
        runNumberText.style.color = "#333";
    }
    runNumberText.textContent = "...";
    runNumberText.style.color = "#333"
    runButton.style.display = "none";
    if (runButton.style.display === "none") {
        stopButton.style.display = "block";
    }
    clickSoundTrack.currentTime = 0;
    clickSoundTrack.play();
    let randomNum = randomGenerator();
    randomText(randomNum);
}


// Random number button
randomButton.onclick = function () {
    body.classList.add("random-btn-animate");
    if (!randomButton.disabled) {
        resetColors();
        displayRandom();
    }
    setTimeout(function() {
        body.classList.remove("random-btn-animate");
    }, 400);
}