// import { initSounds, playRandomSound, loop } from "../utils/utils";
// import { soundData, scenarioData } from "../data/data";

const playButton = document.getElementById("t_playpause");
const stopButton = document.getElementById("t_stop");
const muteBackground = document.getElementById("t_mutebg");
const muteRandom = document.getElementById("t_muterandom");

const backgroundReadout = document.getElementById("bgreadout");
const randomReadout = document.getElementById("randomreadout");

const jungleChannel = document.getElementById("jungle");
const jungleFader = document.getElementById("jungle_range");
const jungleVol = document.getElementById("jungle_vol");
jungleVol.innerHTML = jungleFader.value;
const jungleMute = document.getElementById("jungle_mute");
const jungleSolo = document.getElementById("jungle_solo");

const blackbirdChannel = document.getElementById("blackbird");
const blackbirdFader = document.getElementById("blackbird_range");
const blackbirdVol = document.getElementById("blackbird_vol");
blackbirdVol.innerHTML = blackbirdFader.value;
const blackbirdFreqFader = document.getElementById("blackbird_freqfad");
const blackbirdFreq = document.getElementById("blackbird_freq");
blackbirdFreq.innerHTML = blackbirdFreqFader.value;
const blackbirdMute = document.getElementById("blackbird_mute");
const blackbirdSolo = document.getElementById("blackbird_solo");

const beeChannel = document.getElementById("bee");
const beeFader = document.getElementById("bee_range");
const beeVol = document.getElementById("bee_vol");
beeVol.innerHTML = beeFader.value;
const beeFreqFader = document.getElementById("bee_freqfad");
const beeFreq = document.getElementById("bee_freq");
beeFreq.innerHTML = beeFreqFader.value;
const beeMute = document.getElementById("bee_mute");
const beeSolo = document.getElementById("bee_solo");

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
      loop(sound);
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
  thisSound.jungle.channelVolume = jungleFader.value / 100;
  thisSound.jungle.howl.volume(jungleFader.value / 100);
};

blackbirdFader.oninput = () => {
  blackbirdVol.innerHTML = blackbirdFader.value;
  let thisSound = {};
  randomSounds.forEach(sound => {
    if (sound.hasOwnProperty("blackbird")) {
      thisSound = sound;
    }
  });
  thisSound.blackbird.channelVolume = blackbirdFader.value / 100;
};
blackbirdFreqFader.oninput = () => {
  blackbirdFreq.innerHTML = blackbirdFreqFader.value;
  let thisSound = {};
  randomSounds.forEach(sound => {
    if (sound.hasOwnProperty("blackbird")) {
      thisSound = sound;
    }
  });
  thisSound.blackbird.channelFrequency = blackbirdFreqFader.value / 100;
};

beeFader.oninput = () => {
  beeVol.innerHTML = beeFader.value;
  let thisSound = {};
  randomSounds.forEach(sound => {
    if (sound.hasOwnProperty("bee")) {
      thisSound = sound;
    }
  });
  thisSound.bee.channelVolume = beeFader.value / 100;
};
beeFreqFader.oninput = () => {
  beeFreq.innerHTML = beeFreqFader.value;
  let thisSound = {};
  randomSounds.forEach(sound => {
    if (sound.hasOwnProperty("bee")) {
      thisSound = sound;
    }
  });
  thisSound.bee.channelFrequency = beeFreqFader.value / 100;
};

jungleMute.addEventListener("click", event => {
  if (event.target.className === "ch_unmute") {
    console.log("Muting Jungle...");
    jungleChannel.className = "muted";
    event.target.className = "ch_mute";
    bgSounds.forEach(sound => {
      const thisSound = Object.keys(sound)[0];
      if (thisSound === "jungle") {
        sound[thisSound].howl.mute(true);
      }
    });
  } else if (event.target.className === "ch_mute") {
    console.log("Un-muting Jungle...");
    jungleChannel.className = "unmuted";
    event.target.className = "ch_unmute";
    bgSounds.forEach(sound => {
      const thisSound = Object.keys(sound)[0];
      if (thisSound === "jungle") {
        sound[thisSound].howl.mute(false);
      }
    });
  }
});

blackbirdMute.addEventListener("click", event => {
  if (event.target.className === "ch_unmute") {
    console.log("Muting Blackbird...");
    blackbirdChannel.className = "muted";
    event.target.className = "ch_mute";
    randomSounds.forEach(sound => {
      const thisSound = Object.keys(sound)[0];
      if (thisSound === "blackbird") {
        sound[thisSound].howl.mute(true);
      }
    });
  } else if (event.target.className === "ch_mute") {
    console.log("Un-muting Blackbird...");
    blackbirdChannel.className = "unmuted";
    event.target.className = "ch_unmute";
    randomSounds.forEach(sound => {
      const thisSound = Object.keys(sound)[0];
      if (thisSound === "blackbird") {
        sound[thisSound].howl.mute(false);
      }
    });
  }
});

beeMute.addEventListener("click", event => {
  if (event.target.className === "ch_unmute") {
    console.log("Muting Bee...");
    beeChannel.className = "muted";
    event.target.className = "ch_mute";
    randomSounds.forEach(sound => {
      const thisSound = Object.keys(sound)[0];
      if (thisSound === "bee") {
        sound[thisSound].howl.mute(true);
      }
    });
  } else if (event.target.className === "ch_mute") {
    console.log("Un-muting Bee...");
    beeChannel.className = "unmuted";
    event.target.className = "ch_unmute";
    randomSounds.forEach(sound => {
      const thisSound = Object.keys(sound)[0];
      if (thisSound === "bee") {
        sound[thisSound].howl.mute(false);
      }
    });
  }
});
