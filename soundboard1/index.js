const sound1Button = document.getElementById("sound1button");
const sound2Button = document.getElementById("sound2button");
const sound3Button = document.getElementById("sound3button");

const sound1 = new Howl({ src: ["audio/tyunwin.mp3"] });

const soundRef = {
  sound1button: sound1
};

const buttons = document.querySelectorAll("li");

const button1Clicked = clickEvent => {
  const clickedItem = clickEvent.target;
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

// buttons.forEach(button => {
//   button.addEventListener("click", buttonClicked);
// });

sound1Button.addEventListener("click", button1Clicked);
