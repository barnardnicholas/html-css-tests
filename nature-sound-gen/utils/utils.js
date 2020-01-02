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
        thisObj[sound].channelVolume = soundData[sound].channelVolume;
        thisObj[sound].channelPan = soundData[sound].channelPan;
        bgSounds.push(thisObj);
      } else {
        thisObj[sound].sprites = Object.keys(soundData[sound].howl.sprite);
        thisObj[sound].playlist = Object.keys(soundData[sound].howl.sprite);
        thisObj[sound].playlist.sort(() => Math.random() - 0.5);
        thisObj[sound].channelVolume = soundData[sound].channelVolume;
        thisObj[sound].channelFrequency = soundData[sound].channelFrequency;
        thisObj[sound].channelPan = soundData[sound].channelPan;
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

const playRandomSound = (soundObj, delay) => {
  if (soundscapeRunning === false) {
    return null;
  }
  const soundKey = Object.keys(soundObj)[0];
  // console.log("this sound object:", soundObj[soundKey]);
  const thisHowl = soundObj[soundKey].howl;
  const thisPlaylist = soundObj[soundKey].playlist;
  const thisSoundSprite = thisPlaylist.shift();
  const shuffledPlaylist = [...thisPlaylist.sort(() => Math.random() - 0.5)];
  if (shuffledPlaylist[0] !== thisPlaylist[thisPlaylist.length - 1]) {
    thisPlaylist.push(shuffledPlaylist[0]);
  } else {
    thisPlaylist.push(shuffledPlaylist[1]);
  }
  const channelPan = soundObj[soundKey].channelPan;
  let panAmount = channelPan - Math.random() * channelPan;
  if (channelPan === 0) {
    panAmount = Math.random() * 0.3 - 0.15;
  }
  const channelVolume = soundObj[soundKey].channelVolume;
  const volumeAmount = channelVolume - Math.random() * channelVolume;
  thisHowl.volume(volumeAmount);
  thisHowl.stereo(panAmount);
  thisHowl.play(thisSoundSprite);
  randomReadout.innerText = `Last-played sound: ${thisSoundSprite}`;
  console.log(
    `Sound: ${thisSoundSprite}     Delay: ${delay}ms     Volume: ${volumeAmount}    ChannelVolume:${channelVolume}     Pan: ${panAmount}    Last played: ${lastPlayed[0]}`
  );
  lastPlayed.shift();
  lastPlayed.push(thisSoundSprite);
};

const loop = sound => {
  const soundKey = Object.keys(sound)[0];
  const channelFreq = sound[soundKey].channelFrequency * 10000;
  // let interval = Math.round(Math.random() * (5000 - 500)) + 500;
  let intervalOffset = Math.random() * channelFreq;
  let interval = channelFreq + intervalOffset;
  setTimeout(function() {
    playRandomSound(sound, interval);
    if (soundscapeRunning === true) {
      loop(sound, interval);
    }
  }, interval);
};
