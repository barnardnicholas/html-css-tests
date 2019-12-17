const sound1Button = document.getElementById("sound1button");
const stopButton = document.getElementById("stopbutton");
const qfButton = document.getElementById("qfbutton");
const loopButton = document.getElementById("loopbutton");
const stopLoopButton = document.getElementById("stoploopbutton");
const panicButton = document.getElementById("panicbutton");

const allSounds = [];

const sound1 = new Howl({ src: ["audio/tyunwin.mp3"] });
const sound2 = new Howl({ src: ["audio/jump.wav"], html5: false });
const sound3 = new Howl({
  src: ["audio/genloop.wav"],
  loop: true,
  html5: false
});

sound1.once("load", () => {
  allSounds.push(sound1);
});
sound2.once("load", () => {
  allSounds.push(sound2);
});
sound3.once("load", () => {
  allSounds.push(sound3);
});

console.log("allSounds:", allSounds);

const soundRef = {
  sound1button: sound1
};

const buttons = document.querySelectorAll("li");

const button1Clicked = clickEvent => {
  let clickedItemClass = clickEvent.target.className;
  const clickedItemId = clickEvent.target.attributes[0].value;
  if (clickedItemClass === "stopped") {
    console.log(`Playing sound for ${clickedItemId}...`);
    clickEvent.target.className = "playing";
    sound1.play();
    console.dir(clickEvent.target);
  } else if (clickedItemClass === "playing") {
    console.log(`Pausing sound for ${clickedItemId}...`);
    clickEvent.target.className = "paused";
    sound1.pause();
  } else if (clickedItemClass === "paused") {
    console.log(`Unpausing sound for ${clickedItemId}...`);
    clickEvent.target.className = "playing";
    sound1.play();
  }
};

const stopButtonClicked = clickEvent => {
  console.log("Stopping audio...");
  sound1Button.className = "stopped";
  sound1.stop();
};

const qfButtonClicked = clickEvent => {
  console.log("Playing Quickfire Sound...");
  qfButton.className = "playing";
  sound2.play();
  sound2.once("end", () => {
    qfButton.className = "stopped";
  });
};

const loopButtonClicked = clickEvent => {
  let clickedItemClass = clickEvent.target.className;
  const clickedItemId = clickEvent.target.attributes[0].value;
  if (clickedItemClass === "stopped") {
    console.log(`Playing looping sound for ${clickedItemId}...`);
    clickEvent.target.className = "playing";
    sound3.play();
    console.dir(clickEvent.target);
  } else if (clickedItemClass === "playing") {
    console.log(`Pausing looping sound for ${clickedItemId}...`);
    clickEvent.target.className = "paused";
    sound3.pause();
  } else if (clickedItemClass === "paused") {
    console.log(`Unpausing looping sound for ${clickedItemId}...`);
    clickEvent.target.className = "playing";
    sound3.play();
  }
};

const stopLoopButtonClicked = clickEvent => {
  console.log("Stopping Sound 1...");
  loopButton.className = "stopped";
  sound3.stop();
};

const panicButtonClicked = clickEvent => {
  console.log("STOPPING ALL SOUNDS...");
  loopButton.className = "stopped";
  sound1Button.className = "stopped";
  qfButton.className - "stopped";
  allSounds.forEach(sound => {
    console.log(`Stopping ${sound._src}`);
    sound.stop();
  });
};

// buttons.forEach(button => {
//   button.addEventListener("click", buttonClicked);
// });

sound1Button.addEventListener("click", button1Clicked);
stopButton.addEventListener("click", stopButtonClicked);
qfButton.addEventListener("click", qfButtonClicked);
loopButton.addEventListener("click", loopButtonClicked);
stopLoopButton.addEventListener("click", stopLoopButtonClicked);
panicButton.addEventListener("click", panicButtonClicked);
