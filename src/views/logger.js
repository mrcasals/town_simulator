import { name, age, gender } from '../models/person';

export function render(settlement) {
  let logs = settlement.get('logs');
  let turn = settlement.get('turn');

  let currentEvents = logs.get(turn)

  let element = document.getElementById('log_details');
  currentEvents.forEach(event => element.innerHTML += `<p>Year ${turn}: ${getMessage(event, settlement)}</p>`);
}

export function getMessage(event, settlement) {
  if (event.get('message') !== undefined) {
    return event.get('message')
  }

  switch(event.get('event')) {
  case 'NEW_MARRIAGE':
    let [ person1, person2 ] = event.get('peopleIds').map(id => settlement.getIn(['people', id]))
    return `${name(person1)} (${age(person1)}${gender(person1)[0]}) and ${name(person2)} (${age(person2)}${gender(person2)[0]}) got married`;
  }
}
