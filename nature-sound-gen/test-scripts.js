const intervalQueue1 = [Math.random() * 5000 + 1000];
const intervalQueue2 = [Math.random() * 5000 + 1000];
const intervalQueue3 = [Math.random() * 5000 + 1000];

const loop = (cb, iq) => {
  if (iq.length > 0) {
    const thisInterval = iq.shift();
    setTimeout(() => {
      iq.push(Math.random() * 5000 + 1000);
      cb(thisInterval);
      loop(cb, iq);
    }, thisInterval);
  }
};

const loopParent = (func, slug, iq) => {
  func(slug, iq);
};

module.exports = {
  loop,
  loopParent
};
