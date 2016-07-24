require('pixi');
require('p2');
require('phaser');

require('./styles/styles.sass');

import { make as makeSettlement } from './models/settlement'
import { render as renderSettlement } from './views/settlement'
import { turn } from './events/turn'

const { TownSimulatorGame } = require('./game');

// document.getElementById('log_details').innerHTML = '';
// document.getElementById('settlers_details').innerHTML = '';
let delay = 500;
let timeoutId;
let loopOn = true;

let settlement = makeSettlement({food: 500000, people: 10, eatingRate: 12})
//renderSettlement(settlement);
let game = new TownSimulatorGame(settlement);

document.body.addEventListener('click', toggleLoop, true);

function toggleLoop() {
  loopOn = !loopOn;

  if(loopOn) {
    run();
  } else {
    clearTimeout(timeoutId)
  }
}

function run() {
  timeoutId = setInterval(() => {
    settlement = turn(settlement)
    game._settlement = settlement;

    if (settlement.get('people').count() === 0) {
      toggleLoop();
    }

    // renderSettlement(settlement);
  }, delay);
}

run();
