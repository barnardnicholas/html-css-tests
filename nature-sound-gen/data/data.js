const soundData = {
  jungle: {
    name: "Jungle",
    howl: {
      src: ["../audio/loops/jungle2.ogg"],
      volume: 0.7,
      loop: true,
      html5: false
    },
    channelVolume: 0.7,
    channelPan: 0
  },
  crickets: {
    name: "Crickets",
    howl: {
      src: ["../audio/loops/crickets.ogg"],
      volume: 0.7,
      loop: true,
      html5: false
    },
    channelVolume: 0.7,
    channelPan: 0
  },
  swamp: {
    name: "Swamp",
    howl: {
      src: ["../audio/loops/Swamp.ogg"],
      volume: 0.7,
      loop: true,
      html5: false
    },
    channelVolume: 0.7,
    channelPan: 0
  },
  blackbird: {
    name: "Blackbird",
    howl: {
      src: [
        "../audio/bird_calls/blackbird-sprite.ogg",
        "../audio/bird_calls/blackbird-sprite.m4a",
        "../audio/bird_calls/blackbird-sprite.ac3",
        "../audio/bird_calls/blackbird-sprite.mp3"
      ],
      html5: false,
      volume: 0.7,
      sprite: {
        blackbird1: [0, 3342.2222222222226],
        blackbird2: [5000, 2602.0861678004535],
        blackbird3: [9000, 2793.650793650794],
        blackbird5: [13000, 3789.2063492063494],
        blackbird6: [18000, 2099.9546485260757],
        blackbird7: [22000, 2515.011337868479],
        blackbird8: [26000, 3121.6326530612264],
        blackbird9: [31000, 2935.873015873014],
        blackbird10: [35000, 4482.902494331064],
        blackbird11: [41000, 4009.795918367345],
        blackbird12: [47000, 3243.537414965985],
        blackbird13: [52000, 3112.9251700680243],
        blackbird14: [57000, 4018.5034013605473],
        blackbird15: [63000, 2950.385487528351],
        blackbird16: [67000, 2973.605442176876]
      }
    },
    channelVolume: 0.7,
    channelFrequency: 0.5
  },
  owl: {
    name: "Owl",
    howl: {
      src: [
        "../audio/bird_calls/owl-sprite.ogg",
        "../audio/bird_calls/owl-sprite.m4a",
        "../audio/bird_calls/owl-sprite.ac3",
        "../audio/bird_calls/owl-sprite.mp3"
      ],
      html5: false,
      volume: 0.7,
      sprite: {
        Owl1a: [0, 2149.297052154195],
        Owl1b: [4000, 5609.07029478458],
        Owl1c: [11000, 2915.5555555555566],
        Owl1d: [15000, 3867.5736961451257],
        Owl1e: [20000, 4401.632653061224],
        Owl1f: [26000, 5400.090702947846],
        Owl1g: [33000, 4169.433106575965],
        Owl1h: [39000, 3310.2947845804993],
        Owl1i: [44000, 4239.09297052154],
        Owl1j: [50000, 1336.5986394557794],
        Owl1k: [53000, 1940.317460317459],
        Owl1l: [56000, 4169.433106575965],
        Owl1m: [62000, 2265.39682539682],
        Owl2a: [66000, 2675.9863945578245],
        Owl2b: [70000, 3401.3378684807235],
        Owl2c: [75000, 1150.839002267574]
      }
    },
    channelVolume: 0.7,
    channelFrequency: 0.5
  },
  bee: {
    name: "Bee",
    howl: {
      src: [
        "../audio/insects/bee-sprite.ogg",
        "../audio/insects/bee-sprite.m4a",
        "../audio/insects/bee-sprite.ac3",
        "../audio/insects/bee-sprite.mp3"
      ],
      html5: false,
      volume: 0.7,
      sprite: {
        "bee 1": [0, 2117.369614512472],
        "bee 2": [4000, 2224.7619047619055],
        "bee 3": [8000, 811.2471655328796],
        "bee 4": [10000, 988.2993197278918],
        "bee 5": [12000, 2143.492063492063]
      }
    },
    channelVolume: 0.7,
    channelFrequency: 0.5
  }
};

const scenarioData = {
  jungle: ["jungle", "swamp", "blackbird", "bee"],
  nightforest: ["crickets", "owl"]
};
