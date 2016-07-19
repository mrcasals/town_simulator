import { render as renderSettlers } from './settlers';
import { render as renderLogs } from './logger';

export function render({ turn, logs, food, people, ...settlement }) {
  let element = document.getElementById('remaining_food');
  element.innerHTML = `${food} (${turn})`;

  renderSettlers(people);
  renderLogs(logs.get(turn), turn);
}
