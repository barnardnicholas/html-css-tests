const startButton = document.getElementById("soundscapestart");
const stopButton = document.getElementById("stopbutton");

const sound2 = new Howl({ src: ["audio/jump.wav"], html5: false });
const sound3 = new Howl({
  src: ["audio/genloop.wav"],
  loop: true,
  html5: false
});

const allSounds = [];
let loadCounter = 0;
let soundscapeRunning = false;

sound2.once("load", () => {
  allSounds.push(sound2);
  loadCounter++;
});
sound3.once("load", () => {
  allSounds.push(sound3);
  loadCounter++;
});

// let soundQueue = [...sounds.sort(() => Math.random() - 0.5)];

// let lastPlayed = ["N/A"];

function playSound(delay) {
  if (soundscapeRunning === false) {
    return null;
  }
  // if (soundQueue.length === 0) {
  //   soundQueue = [...sounds.sort(() => Math.random() - 0.5)];
  // }
  // const thisSound = soundQueue.shift();
  const panAmount = Math.floor(Math.random() * 2 - 1);
  const volumeAmount = Math.floor(Math.random());
  sound2.volume = volumeAmount;
  sound2.stereo = panAmount;
  sound2.play();
  console.log(
    `Sound: --     Delay: ${delay}ms     Volume: ${volumeAmount}     Pan: ${panAmount}`
  );
  // lastPlayed.shift();
  // lastPlayed.push(thisSound);
}

const loop = () => {
  let interval = Math.round(Math.random() * (5000 - 500)) + 500;
  setTimeout(function() {
    playSound(interval);
    if (soundscapeRunning === true) {
      loop();
    }
  }, interval);
};

startButton.addEventListener("click", clickEvent => {
  console.log("Starting Soundscape...");
  let clickedItemClass = clickEvent.target.className;
  const clickedItemId = clickEvent.target.attributes[0].value;
  soundscapeRunning = true;
  sound3.play();
  loop();
});

stopButton.addEventListener("click", clickEvent => {
  console.log("Stopping soundscape...");
  soundscapeRunning = false;
  sound3.stop();
});
