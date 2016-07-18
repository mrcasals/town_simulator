import { Settlement } from './models/settlement'

let settlement = new Settlement();

setInterval(() => {
  settlement.turn();
  console.log(settlement.inspect());
}, 1000);
