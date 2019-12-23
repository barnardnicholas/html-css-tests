const ch1Fader = document.getElementById("ch1fader");
const ch2Fader = document.getElementById("ch2fader");
const ch1Vol = document.getElementById("ch1_vol");
const ch2Vol = document.getElementById("ch2_vol");
ch1Vol.innerHTML = ch1Fader.value; // Display the default slider value
ch1Vol.innerHTML = ch1Fader.value; // Display the default slider value

ch1Fader.oninput = function() {
  ch1Vol.innerHTML = this.value;
};
ch2Fader.oninput = function() {
  ch2Vol.innerHTML = this.value;
};
