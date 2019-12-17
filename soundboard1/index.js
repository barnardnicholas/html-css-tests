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
  const clickedItemId = clickEvent.target.attributes[0].value;
  console.log(`Playing sound for ${clickedItemId}...`);
  sound1.play();
};

// buttons.forEach(button => {
//   button.addEventListener("click", buttonClicked);
// });

sound1Button.addEventListener("click", button1Clicked);
