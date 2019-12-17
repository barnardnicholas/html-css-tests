const sound1Button = document.getElementById("sound1button");
const stopButton = document.getElementById("stopbutton");

const sound1 = new Howl({ src: ["audio/tyunwin.mp3"] });

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
  console.log("Stopping all audio...");
  sound1Button.className = "stopped";
  console.dir(sound1Button);
  sound1.stop();
};

// buttons.forEach(button => {
//   button.addEventListener("click", buttonClicked);
// });

sound1Button.addEventListener("click", button1Clicked);
stopButton.addEventListener("click", stopButtonClicked);
