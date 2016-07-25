import { id, name, age, gender } from '../models/person';

export function render(settlement) {
  let turn = settlement.get('turn');
  let people = settlement.get('people');
  let element = document.getElementById('settlers_details');
  element.innerHTML = '';

  let content = people.reduce((content, settler) => {
    return content + `<li>${renderSettler(settler)}</li>`;
  }, '');

  element.innerHTML = `<ul>${content}</ul>`;
}

function renderSettler(settler) {
  let theName = name(settler);
  let theAge = age(settler);
  let theGender = gender(settler);
  let theId = id(settler);

  return `${theId}) ${theName} (${theAge}${theGender[0]})`;
}
