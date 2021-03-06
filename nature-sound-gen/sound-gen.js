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

const bgSounds = [];
const randomSounds = [];
let loadCounter = 0;
let pageIsLoading = true;

const soundData = {
  jungle2: {
    src: ["audio/loops/jungle2.ogg"],
    loop: true,
    html5: false
  },
  blackbird: {
    src: [
      "./audio/bird_calls/blackbird-sprite.ogg",
      "./audio/bird_calls/blackbird-sprite.m4a",
      "./audio/bird_calls/blackbird-sprite.ac3",
      "./audio/bird_calls/blackbird-sprite.mp3"
    ],
    html5: false,
    volume: 0.5,
    sprite: {
      blackbird1: [0, 3342.2222222222226],
      blackbird2: [5000, 2602.0861678004535],
      blackbird3: [9000, 2793.650793650794],
      blackbird5: [13000, 3789.2063492063494],
      blackbird6: [18000, 2099.9546485260757],
      blackbird7: [22000, 2515.011337868479],
      blackbird8: [26000, 3121.6326530612264],
      blackbird9: [31000, 2935.873015873014],
      blackbird10: [35000, 4482.902494331064],
      blackbird11: [41000, 4009.795918367345],
      blackbird12: [47000, 3243.537414965985],
      blackbird13: [52000, 3112.9251700680243],
      blackbird14: [57000, 4018.5034013605473],
      blackbird15: [63000, 2950.385487528351],
      blackbird16: [67000, 2973.605442176876]
    }
  }
};

const initSounds = () => {
  let soundCount = 0;
  const dataKeys = Object.keys(soundData);
  loadCounter = dataKeys.length;
  dataKeys.forEach(key => {
    const thisHowl = new Howl(soundData[key]);
    thisHowl.once("load", () => {
      soundCount++;
      console.log(`Loaded ${key}`);
      const thisObj = { [key]: { howl: thisHowl } };
      if (soundData[key].loop) {
        bgSounds.push(thisObj);
      } else {
        thisObj[key].sprites = Object.keys(soundData[key].sprite);
        thisObj[key].playlist = Object.keys(soundData[key].sprite);
        thisObj[key].playlist.sort(() => Math.random() - 0.5);
        randomSounds.push(thisObj);
      }
      if (soundCount >= loadCounter) {
        console.log(`${soundCount} sounds loaded`);
        pageIsLoading = false;
      }
    });
  });
};

initSounds();

let soundscapeRunning = false;

let lastPlayed = ["N/A"];

const playRandomSound = (soundObj, delay) => {
  if (soundscapeRunning === false) {
    return null;
  }
  const soundKey = Object.keys(soundObj)[0];
  const thisHowl = soundObj[soundKey].howl;
  const thisPlaylist = soundObj[soundKey].playlist;
  const thisSoundSprite = thisPlaylist.shift();
  const shuffledPlaylist = [...thisPlaylist.sort(() => Math.random() - 0.5)];
  if (shuffledPlaylist[0] !== thisPlaylist[thisPlaylist.length - 1]) {
    thisPlaylist.push(shuffledPlaylist[0]);
  } else {
    thisPlaylist.push(shuffledPlaylist[1]);
  }
  const panAmount = Math.random() * 1.5 - 0.75;
  const volumeAmount = Math.random() * 0.6 + (0.4 * randRange.value) / 100;
  thisHowl.volume(volumeAmount);
  thisHowl.stereo(panAmount);
  thisHowl.play(thisSoundSprite);
  randomReadout.innerText = `Last-played sound: ${thisSoundSprite}`;
  console.log(
    `Sound: ${thisSoundSprite}     Delay: ${delay}ms     Volume: ${volumeAmount}     Pan: ${panAmount}    Last played: ${lastPlayed[0]}`
  );
  lastPlayed.shift();
  lastPlayed.push(thisSoundSprite);
};

const loop = sound => {
  let interval = Math.round(Math.random() * (5000 - 500)) + 500;
  setTimeout(function() {
    playRandomSound(sound, interval);
    if (soundscapeRunning === true) {
      loop(sound);
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
  startButton.className = "stopped";
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

bgRange.oninput = () => {
  bgVol.innerHTML = bgRange.value;
  bgSounds.forEach(sound => {
    const thisSound = Object.keys(sound)[0];
    sound[thisSound].howl.volume(bgRange.value / 100);
  });
};
randRange.oninput = () => {
  randVol.innerHTML = randRange.value;
  randomSounds.forEach(sound => {
    const thisSound = Object.keys(sound)[0];
    sound[thisSound].howl.volume(randRange.value / 100);
  });
};
