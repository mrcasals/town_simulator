import Immutable from 'immutable';
import { id, isDead } from '../models/person';
import { NATURAL_DISASTER_CHANCE } from '../config';

export function disastersHappen(settlement, random = Math.random) {
  if (random() > NATURAL_DISASTER_CHANCE) {
    return settlement;
  }

  let alivePeople= settlement.get('people')
    .filter(settler => !isDead(settler));

  let newPeopleAndDeaths = killPeople(alivePeople, random)
  let disasterLog = Immutable.fromJS({
    event: 'DISASTER',
    killedIds: newPeopleAndDeaths.get('killedIds')
  });

  return settlement
    .set('people', newPeopleAndDeaths.get('newPeople'))
    .updateIn(['logs', settlement.get('turn')], currentEvents => currentEvents.push(disasterLog));
}

function killPeople(people, random) {
  let chanceToDie = 1 / people.count(); // Everyone has the same chances to die

  return people.reduce((acc, person) => {
    if (random() > chanceToDie) {
      return acc.update('newPeople', newPeople => newPeople.push(person));
    }

    return acc.update('killedIds', killed => killed.push(id(person)));
  }, Immutable.fromJS({newPeople: [], killedIds: []}))
}

function dieByNaturalDisaster(settler, chance, random) {
  if (random() > chanceToDie) {
    return settler;
  }

  return settler.set('dead', true)
}
