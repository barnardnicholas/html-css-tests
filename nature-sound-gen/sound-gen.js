const startButton = document.getElementById("soundscapestart");
const stopButton = document.getElementById("stopbutton");

const bgLoop = new Howl({
  src: ["audio/loops/forest_loop1.wav"],
  loop: true,
  html5: false
});
console.dir(bgLoop.volume);
const sound1 = new Howl({
  src: ["audio/bird_calls/bird001.wav"],
  html5: false,
  volume: 0.5
});
const sound2 = new Howl({
  src: ["audio/bird_calls/coot.wav"],
  html5: false,
  volume: 0.5
});
const sound3 = new Howl({
  src: ["audio/bird_calls/crow.wav"],
  html5: false,
  volume: 0.5
});
const sound4 = new Howl({
  src: ["audio/bird_calls/robin.wav"],
  html5: false,
  volume: 0.5
});
const sound5 = new Howl({
  src: ["audio/bird_calls/rooster.wav"],
  html5: false,
  volume: 0.5
});
const sound6 = new Howl({
  src: ["audio/bird_calls/tawny_owl.wav"],
  html5: false,
  volume: 0.5
});
const sound7 = new Howl({
  src: ["audio/bird_calls/yellow_wattlebird.wav"],
  html5: false,
  volume: 0.5
});

const allSounds = [];
let loadCounter = 0;
let soundscapeRunning = false;

sound1.once("load", () => {
  allSounds.push(sound1);
  loadCounter++;
});
sound2.once("load", () => {
  allSounds.push(sound2);
  loadCounter++;
});
sound3.once("load", () => {
  allSounds.push(sound3);
  loadCounter++;
});
sound4.once("load", () => {
  allSounds.push(sound4);
  loadCounter++;
});
sound5.once("load", () => {
  allSounds.push(sound5);
  loadCounter++;
});
sound6.once("load", () => {
  allSounds.push(sound6);
  loadCounter++;
});
sound7.once("load", () => {
  allSounds.push(sound7);
  loadCounter++;
});

let soundQueue = [...allSounds.sort(() => Math.random() - 0.5)];

let lastPlayed = ["N/A"];

function playSound(delay) {
  if (soundscapeRunning === false) {
    return null;
  }
  if (soundQueue.length === 0) {
    soundQueue = [...allSounds.sort(() => Math.random() - 0.5)];
  }
  const thisSound = soundQueue.shift();
  const panAmount = Math.random() * 2 - 1;
  const volumeAmount = Math.random() * 0.5;
  thisSound.volume(volumeAmount);
  // thisSound.stereo(panAmount);
  thisSound.play();
  console.log(
    `Sound: ${thisSound._src}     Delay: ${delay}ms     Volume: ${volumeAmount}     Pan: ${panAmount}    Last played: ${lastPlayed}`
  );
  lastPlayed.shift();
  lastPlayed.push(thisSound._src);
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
  let clickedItemClass = clickEvent.target.className;
  const clickedItemId = clickEvent.target.attributes[0].value;
  if (soundscapeRunning === false) {
    console.log("Starting Soundscape...");
    soundscapeRunning = true;
    clickEvent.target.className = "playing";
    bgLoop.play();
    loop();
  } else if (soundscapeRunning === true) {
    console.log("Soundscape already running.");
    return null;
  }
});

stopButton.addEventListener("click", clickEvent => {
  console.log("Stopping soundscape...");
  startButton.className = "stopped";
  Howler.mute = true;
  soundscapeRunning = false;
  bgLoop.stop();
});
