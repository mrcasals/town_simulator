import Immutable from 'immutable';
import { isMale, isSingle } from '../models/person';

export function populationMarries(settlement) {
  let { people, turn, logs } = settlement;
  let alivePeople = people.filter(settler => !settler.dead);
  let singles = singlesMap(alivePeople);
  let pairs = pairUpSingles(singles);
  let married = marryPairs(pairs);

  let newLogs = pairs.map(pair => {
    return Immutable.fromJS({
      event: 'NEW_MARRIAGE',
      peopleIds: pair.map(person => person.id)
    });
  })

  let newPeople = married.reduce((people, newlyWed) => {
    return people.set(newlyWed.id, newlyWed)
  }, people);

  return { ...settlement, people: newPeople, logs: logs.update(turn, currentEvents => currentEvents.concat(newLogs)) };
}

function singlesMap(people) {
  return people.reduce((acc, settler, settlerId) => {
    if (isSingle(settler)) {
      if (isMale(settler)) {
        return acc.update('singleMales', (males) => males.push(settler));
      } else {
        return acc.update('singleFemales', (females) => females.push(settler));
      }
    } else {
      return acc;
    }

  }, Immutable.fromJS({singleFemales: [], singleMales: []}))
}

function pairUpSingles(singlesMap) {
  let numberOfPairs = singlesMap.minBy(e => e.count()).count();
  let pairs = singlesMap.map(e => e.take(numberOfPairs))
  return pairs.get('singleFemales').zipWith((a, b) => {
    return Immutable.List.of(a, b)
  }, pairs.get('singleMales'));
}

function marryPairs(pairs) {
  return pairs.flatMap(pair => {
    return Immutable.List.of(
      { ...pair.first(), marriedTo: pair.last().id },
      { ...pair.last(), marriedTo: pair.first().id }
    )
  })
}
