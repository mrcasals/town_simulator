import Immutable from 'immutable';
import { id, isDead } from '../models/person'
import { MAX_AGE } from '../config';

export function gravediggerWorks(settlement) {
  let people = settlement.get('people');
  let turn = settlement.get('turn');

  let result = deadAndAlive(people);
  let deadLog = result.get('deadLog');

  let newPeople = result.get('alive').reduce((people, alivePerson) => {
    return people.set(id(alivePerson), alivePerson)
  }, Immutable.Map());

  return settlement
    .set('people', newPeople)
    .updateIn(['logs', turn], currentEvents => currentEvents.concat(deadLog));
}

function deadAndAlive(people) {
  return people.reduce((acc, settler) => {
    if (isDead(settler)) {
      return acc.update('deadLog', (log) => log.push(generateLog(settler)));
    } else {
      return acc.update('alive', (settlers) => settlers.push(settler));
    }

  }, Immutable.fromJS({ alive: [], deadLog: [] }))
}

function generateLog(settler) {
  return Immutable.fromJS({
    event: 'DEATH',
    person: settler,
  });
}

