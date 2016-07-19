import { make as makeSettlement, render as renderSettlement } from './models/settlement'
import { turn } from './events/turn'

let settlement = makeSettlement({food: 500000, people: 10, eatingRate: 12})
console.log(renderSettlement(settlement));

setInterval(() => {
  settlement = turn(settlement)
  console.log(renderSettlement(settlement));
}, 1000);
