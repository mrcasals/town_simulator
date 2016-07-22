import { render as renderSettlers } from './settlers';
import { render as renderLogs } from './logger';

export function render(settlement) {
  let turn = settlement.get('turn');
  let food = settlement.get('food');
  let element = document.getElementById('remaining_food');
  element.innerHTML = `${food} (${turn})`;

  renderSettlers(settlement);
  renderLogs(settlement);
}
