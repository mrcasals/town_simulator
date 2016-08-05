import { name, age, gender } from '../models/person';

export function render(settlement) {
  let logs = settlement.get('logs');
  let turn = settlement.get('turn');

  let currentEvents = logs.get(turn)

  let element = document.getElementById('log_details');
  currentEvents.forEach(event => element.innerHTML = `<p>Year ${turn}: ${getMessage(event, settlement)}</p>` + element.innerHTML);
}

function getMessage(event, settlement) {
  if (event.get('message') !== undefined) {
    return event.get('message')
  }

  switch(event.get('event')) {

  case 'NEW_MARRIAGE':
    let [ person1, person2 ] = event.get('peopleIds').map(id => settlement.getIn(['people', id]))
    return `${name(person1)} (${age(person1)}${gender(person1)[0]}) and ${name(person2)} (${age(person2)}${gender(person2)[0]}) got married`;

  case 'NEW_CHILD':
    let [ parent1, parent2 ] = event.get('parentIds').map(id => settlement.getIn(['people', id]))
    let child = settlement.getIn(['people', event.get('childId')])
    return `${name(parent1)} (${age(parent1)}${gender(parent1)[0]}) and ${name(parent2)} (${age(parent2)}${gender(parent2)[0]}) had a child: ${name(child)}!`;
  }
}
