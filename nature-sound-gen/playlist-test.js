const allSounds = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let soundQueue = [...allSounds.sort(() => Math.random() - 0.5)];

const playSound = () => {
  const shuffledQueue = [...soundQueue.sort(() => Math.random() - 0.5)];
  let thisSound = soundQueue.shift();
  if (shuffledQueue[0] !== soundQueue[soundQueue.length - 1]) {
    soundQueue.push(shuffledQueue[0]);
  } else {
    soundQueue.push(shuffledQueue[1]);
  }
  console.log(`Sound playing: ${thisSound}`);
  console.log(`Sound queue: ${soundQueue}`);
};

const loop = () => {
  let interval = 1000;
  setTimeout(function() {
    playSound();
    loop();
  }, interval);
};

loop();
