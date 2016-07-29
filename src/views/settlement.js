import { render as renderSettlers } from './settlers';
import { render as renderLogs } from './logger';

export function render(settlement) {
  let turn = settlement.get('turn');
  let food = settlement.get('food');
  let name = settlement.get('name');
  let foodElement = document.getElementById('remaining_food');
  let townNameElement = document.getElementById('town_name');
  foodElement.innerHTML = `${food} (${turn})`;
  townNameElement.innerHTML = `${name}`;

  renderSettlers(settlement);
  renderLogs(settlement);
}
