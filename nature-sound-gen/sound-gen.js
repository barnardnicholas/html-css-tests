const startButton = document.getElementById("soundscapestart");
const stopButton = document.getElementById("stopbutton");
const muteBackground = document.getElementById("mutebg");
const muteRandom = document.getElementById("muterandom");
const backgroundReadout = document.getElementById("bgreadout");
const randomReadout = document.getElementById("randomreadout");
const bgRange = document.getElementById("bg_range");
const randRange = document.getElementById("rand_range");
const bgVol = document.getElementById("bg_vol");
const randVol = document.getElementById("rand_vol");
bgVol.innerHTML = bgRange.value;
randVol.innerHTML = randRange.value;

const bgLoop = new Howl({
  src: ["audio/loops/jungle2.ogg"],
  loop: true,
  html5: false
});
const sound1 = new Howl({
  src: ["audio/bird_calls/Junglebird1.ogg"],
  html5: false,
  volume: 0.5
});
const sound2 = new Howl({
  src: ["audio/bird_calls/Junglebird2.ogg"],
  html5: false,
  volume: 0.5
});
const sound3 = new Howl({
  src: ["audio/bird_calls/Junglebird3.ogg"],
  html5: false,
  volume: 0.5
});
const sound4 = new Howl({
  src: ["audio/bird_calls/Junglebird4.ogg"],
  html5: false,
  volume: 0.5
});
const sound5 = new Howl({
  src: ["audio/bird_calls/Junglebird5.ogg"],
  html5: false,
  volume: 0.5
});
const sound6 = new Howl({
  src: ["audio/bird_calls/Junglebird6.ogg"],
  html5: false,
  volume: 0.5
});
const sound7 = new Howl({
  src: ["audio/bird_calls/Junglebird7.ogg"],
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
  const panAmount = Math.random() * 1.5 - 0.75;
  const volumeAmount = Math.random() * randRange.value;
  thisSound.volume(volumeAmount);
  thisSound.stereo(panAmount);
  thisSound.play();
  randomReadout.innerText = `Last-played sound: ${thisSound._src}`;
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
    Howler.volume(1);
    bgLoop.mute(false);
    muteBackground.className = "unmuted";
    allSounds.forEach(sound => {
      sound.mute(false);
    });
    muteRandom.className = "unmuted";
    console.log(`Background Sound: ${bgLoop._src}`);
    bgLoop.play();
    backgroundReadout.innerText = `Background sound: ${bgLoop._src}`;
    loop();
  } else if (soundscapeRunning === true) {
    console.log("Soundscape already running.");
    return null;
  }
});

stopButton.addEventListener("click", clickEvent => {
  console.log("Stopping soundscape...");
  startButton.className = "stopped";
  muteBackground.className = "unmuted";
  muteRandom.className = "unmuted";
  soundscapeRunning = false;
  Howler.volume(0);
  bgLoop.stop();
  backgroundReadout.innerText = "Background sound: -";
  randomReadout.innerText = "Last-played sound: -";
});

muteBackground.addEventListener("click", clickEvent => {
  if (clickEvent.target.className === "unmuted") {
    console.log("Muting Background sounds...");
    clickEvent.target.className = "muted";
    bgLoop.mute(true);
  } else if (clickEvent.target.className === "muted") {
    console.log("Un-muting Background sounds...");
    clickEvent.target.className = "unmuted";
    bgLoop.mute(false);
  }
});

muteRandom.addEventListener("click", clickEvent => {
  if (clickEvent.target.className === "unmuted") {
    console.log("Muting Random sounds...");
    clickEvent.target.className = "muted";
    allSounds.forEach(sound => {
      sound.mute(true);
    });
  } else if (clickEvent.target.className === "muted") {
    console.log("Un-muting Random sounds...");
    clickEvent.target.className = "unmuted";
    allSounds.forEach(sound => {
      sound.mute(false);
    });
  }
});

bgRange.oninput = () => {
  bgVol.innerHTML = bgRange.value;
  bgLoop.volume(bgRange.value / 100);
};
randRange.oninput = () => {
  randVol.innerHTML = randRange.value;
  sound1.volume(randRange.value / 100);
  sound2.volume(randRange.value / 100);
  sound3.volume(randRange.value / 100);
  sound4.volume(randRange.value / 100);
  sound5.volume(randRange.value / 100);
  sound6.volume(randRange.value / 100);
  sound7.volume(randRange.value / 100);
};
