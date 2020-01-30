const { loop, loopParent } = require("./test-scripts");

const intervalQueue1 = [Math.random() * 5000 + 1000];
const intervalQueue2 = [Math.random() * 5000 + 1000];
const intervalQueue3 = [Math.random() * 5000 + 1000];

const cb1 = int => {
  console.log("X", int);
};
const cb2 = int => {
  console.log("Y", int);
};
const cb3 = int => {
  console.log("Z", int);
};

loopParent(loop, cb1, intervalQueue1);
loopParent(loop, cb2, intervalQueue2);
loopParent(loop, cb3, intervalQueue3);
