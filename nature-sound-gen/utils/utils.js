const initSounds = soundsArr => {
  let soundCount = 0;
  loadCounter = soundsArr.length;
  const bgSounds = [];
  const randomSounds = [];
  soundsArr.forEach(sound => {
    const thisHowl = new Howl(soundData[sound].howl);
    thisHowl.once("load", () => {
      console.log(`Loaded ${sound}`);
      soundCount++;
      const thisObj = { [sound]: { howl: thisHowl } };
      if (soundData[sound].howl.loop) {
        thisObj[sound].volume = 0.7;
        bgSounds.push(thisObj);
      } else {
        thisObj[sound].sprites = Object.keys(soundData[sound].howl.sprite);
        thisObj[sound].playlist = Object.keys(soundData[sound].howl.sprite);
        thisObj[sound].playlist.sort(() => Math.random() - 0.5);
        thisObj[sound].volume = 0.7;
        randomSounds.push(thisObj);
      }
      if (soundCount >= loadCounter) {
        console.log(`${soundCount} sounds loaded`);
        console.log("Background Sounds:", bgSounds);
        console.log("Random Sounds:", randomSounds);
      }
    });
  });

  return { bgSounds: bgSounds, randomSounds: randomSounds };
};

const playRandomSound = (soundObj, soundVol, delay) => {
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
  const channelVolume = parseInt(blackbirdVol.innerHTML) / 100;
  const volumeAmount = channelVolume - Math.random() * 0.2;
  console.log(volumeAmount);
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

const loop = (sound, vol) => {
  let interval = Math.round(Math.random() * (5000 - 500)) + 500;
  setTimeout(function() {
    playRandomSound(sound, vol, interval);
    if (soundscapeRunning === true) {
      loop(sound, vol);
    }
  }, interval);
};
