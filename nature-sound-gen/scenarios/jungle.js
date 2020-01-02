// import { initSounds, playRandomSound, loop } from "../utils/utils";
// import { soundData, scenarioData } from "../data/data";

const playButton = document.getElementById("t_playpause");
const stopButton = document.getElementById("t_stop");
const muteBackground = document.getElementById("t_mutebg");
const muteRandom = document.getElementById("t_muterandom");

const backgroundReadout = document.getElementById("bgreadout");
const randomReadout = document.getElementById("randomreadout");

const jungleFader = document.getElementById("jungle_range");
const jungleVol = document.getElementById("jungle_vol");
jungleVol.innerHTML = jungleFader.value;

const blackbirdFader = document.getElementById("blackbird_range");
const blackbirdVol = document.getElementById("blackbird_vol");
blackbirdVol.innerHTML = blackbirdFader.value;

let pageIsLoading = true;

const allSounds = initSounds(scenarioData.jungle);
const bgSounds = allSounds.bgSounds;
const randomSounds = allSounds.randomSounds;

let soundscapeRunning = false;

let lastPlayed = ["N/A"];

playButton.addEventListener("click", clickEvent => {
  let clickedItemClass = clickEvent.target.className;
  const clickedItemId = clickEvent.target.attributes[0].value;
  if (soundscapeRunning === false) {
    console.log("Starting Soundscape...");
    soundscapeRunning = true;
    clickEvent.target.className = "playing";
    Howler.volume(1);
    muteBackground.className = "unmuted";
    const bgList = [];
    bgSounds.forEach(sound => {
      const thisSound = Object.keys(sound)[0];
      bgList.push(thisSound);
      sound[thisSound].howl.mute(false);
      console.log(`Starting loop for ${thisSound}`);
      sound[thisSound].howl.play();
    });
    backgroundReadout.innerText = `Background sound: ${bgList.toString()}`;
    console.log(`Background Sound: ${bgList.toString()}`);
    muteRandom.className = "unmuted";
    randomSounds.forEach(sound => {
      const thisSound = Object.keys(sound)[0];
      sound[thisSound].howl.mute(false);
      loop(sound, sound[thisSound].volume);
    });
  } else if (soundscapeRunning === true) {
    console.log("Soundscape already running.");
    return null;
  }
});

stopButton.addEventListener("click", clickEvent => {
  console.log("Stopping soundscape...");
  playButton.className = "stopped";
  muteBackground.className = "unmuted";
  muteRandom.className = "unmuted";
  soundscapeRunning = false;
  Howler.volume(0);
  bgSounds.forEach(sound => {
    const thisSound = Object.keys(sound)[0];
    sound[thisSound].howl.mute(false);
    sound[thisSound].howl.stop();
  });
  backgroundReadout.innerText = "Background sound: -";
  randomReadout.innerText = "Last-played sound: -";
});

muteBackground.addEventListener("click", clickEvent => {
  if (clickEvent.target.className === "unmuted") {
    console.log("Muting Background sounds...");
    clickEvent.target.className = "muted";
    bgSounds.forEach(sound => {
      const thisSound = Object.keys(sound)[0];
      sound[thisSound].howl.mute(true);
    });
  } else if (clickEvent.target.className === "muted") {
    console.log("Un-muting Background sounds...");
    clickEvent.target.className = "unmuted";
    bgSounds.forEach(sound => {
      const thisSound = Object.keys(sound)[0];
      sound[thisSound].howl.mute(false);
    });
  }
});

muteRandom.addEventListener("click", clickEvent => {
  if (clickEvent.target.className === "unmuted") {
    console.log("Muting Random sounds...");
    clickEvent.target.className = "muted";
    randomSounds.forEach(sound => {
      const thisSound = Object.keys(sound)[0];
      sound[thisSound].howl.mute(true);
    });
  } else if (clickEvent.target.className === "muted") {
    console.log("Un-muting Random sounds...");
    clickEvent.target.className = "unmuted";
    randomSounds.forEach(sound => {
      const thisSound = Object.keys(sound)[0];
      sound[thisSound].howl.mute(false);
    });
  }
});

jungleFader.oninput = () => {
  jungleVol.innerHTML = jungleFader.value;
  let thisSound = {};
  bgSounds.forEach(sound => {
    if (sound.hasOwnProperty("jungle")) {
      thisSound = sound;
    }
  });
  thisSound.jungle.volume = jungleFader.value / 100;
};

blackbirdFader.oninput = () => {
  blackbirdVol.innerHTML = blackbirdFader.value;
  let thisSound = {};
  randomSounds.forEach(sound => {
    if (sound.hasOwnProperty("blackbird")) {
      thisSound = sound;
    }
  });
  thisSound.blackbird.volume = blackbirdFader.value / 100;
};
