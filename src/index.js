require('./styles/styles.sass');

import { make as makeSettlement } from './models/settlement'
import { render as renderSettlement } from './views/settlement'
import { turn } from './events/turn'

document.getElementById('log_details').innerHTML = '';
document.getElementById('settlers_details').innerHTML = '';

let settlement = makeSettlement({food: 500000, people: 10, eatingRate: 12})
renderSettlement(settlement);

setInterval(() => {
  settlement = turn(settlement)
  renderSettlement(settlement);
}, 500);
