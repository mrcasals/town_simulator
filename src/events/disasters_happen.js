import Immutable from 'immutable';
import { randomElement } from '../utils/random';
import { id, isDead } from '../models/person';
import { NATURAL_DISASTER_CHANCE } from '../config';

const DISASTER_TYPES = [
  'flood',
  'fire',
];

export function disastersHappen(settlement, random = Math.random) {
  if (random() > NATURAL_DISASTER_CHANCE) {
    return settlement;
  }

  let alivePeople= settlement.get('people')
    .filter(settler => !isDead(settler));

  let newPeopleAndDeaths = killPeople(alivePeople, random)
  let disasterLog = Immutable.fromJS({
    event: 'DISASTER',
    eventType: randomElement(DISASTER_TYPES),
    killed: newPeopleAndDeaths.get('killed')
  });

  return settlement
    .set('people', newPeopleAndDeaths.get('newPeople'))
    .updateIn(['logs', settlement.get('turn')], currentEvents => currentEvents.push(disasterLog));
}

function killPeople(people, random) {
  let chanceToDie = 1 / people.count(); // Everyone has the same chances to die

  return people.reduce((acc, person) => {
    if (random() > chanceToDie) {
      return acc.update('newPeople', newPeople => newPeople.set(id(person), person));
    }

    return acc.update('killed', killed => killed.push(person));
  }, Immutable.fromJS({newPeople: {}, killed: []}))
}

function dieByNaturalDisaster(settler, chance, random) {
  if (random() > chanceToDie) {
    return settler;
  }

  return settler.set('dead', true)
}
