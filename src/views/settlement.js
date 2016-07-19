import { render as renderSettlers } from './settlers';

export function render({ food, people, ...settlement }) {
  let element = document.getElementById('remaining_food');
  element.innerHTML = food;

  renderSettlers(people);
}
