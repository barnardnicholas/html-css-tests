const intervalQueue1 = [Math.random() * 5000 + 1000];
const intervalQueue2 = [Math.random() * 5000 + 1000];
const intervalQueue3 = [Math.random() * 5000 + 1000];
const slug1 = "X";
const slug2 = "Y";
const slug3 = "Z";

const loop = (slug, iq) => {
  if (iq.length > 0) {
    const thisInterval = iq.shift();
    setTimeout(() => {
      iq.push(Math.random() * 5000 + 1000);
      console.log(slug, thisInterval);
      loop(slug, iq);
    }, thisInterval);
  }
};

const loopParent = (func, slug, iq) => {
  func(slug, iq);
};

loopParent(loop, slug1, intervalQueue1);
loopParent(loop, slug2, intervalQueue2);
loopParent(loop, slug3, intervalQueue3);
