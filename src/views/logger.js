import { inspect, name, age, gender } from '../models/person';
import { deathReason } from '../utils/death_reason';

export function render(settlement) {
  let logs = settlement.get('logs');
  let turn = settlement.get('turn');

  let currentEvents = logs.get(turn)

  let element = document.getElementById('log_details');
  currentEvents.forEach(event => element.innerHTML = `<p>Year ${turn}: ${getMessage(event, settlement)}</p>` + element.innerHTML);
}

function getMessage(event, settlement) {
  switch(event.get('event')) {
  case 'DEATH': {
    let person = event.get('person');
    return `${name(person)} (${gender(person)}) died at the age of ${age(person)}. ${deathReason(person)}`
  }

  case 'NEW_MARRIAGE':
    let [ person1, person2 ] = event.get('peopleIds').map(id => settlement.getIn(['people', id]))
    return `${inspect(person1)} and ${inspect(person2)} got married`;

  case 'NEW_CHILD':
    let [ parent1, parent2 ] = event.get('parentIds').map(id => settlement.getIn(['people', id]))
    let child = settlement.getIn(['people', event.get('childId')])
    return `${inspect(parent1)} and ${inspect(parent2)} had a child: ${inspect(child)}!`;

  case 'DISASTER': {
    let killed = event.get('killed');
    if (killed.count() === 0) {
      return `A terrible ${event.get('eventType')} occured, but luckily no one died.`;
    }

    return `A terrible ${event.get('eventType')} occured. ${humanizedList(killed.map(inspect))} died.`;
  }
  }
}

function humanizedList(list) {
  var joinedList = list.join(', ');
  var i = joinedList.lastIndexOf(',');

  if (i < 0) {
    return joinedList;
  }

  return `${joinedList.substr(0, i) } and ${joinedList.substr(i + 2)}`;
}
