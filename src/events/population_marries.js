import Immutable from 'immutable';
import { isMale, isSingle } from '../models/person';
import * as config from '../config'

export function populationMarries(settlement, random = Math.random) {
  let { people, turn, logs } = settlement;
  let alivePeople = people.filter(settler => !settler.dead && settler.age >= config.MINIMUM_AGE_TO_MARRY);
  let singles = singlesMap(alivePeople);
  let pairs = pairUpSingles(singles, random);
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

  return {
    ...settlement,
    people: newPeople,
    logs: logs.update(turn, currentEvents => currentEvents.concat(newLogs))
  };
}

function singlesMap(people) {
  return people.reduce((acc, settler) => {
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

function pairUpSingles(singlesMap, random) {
  let numberOfPairs = singlesMap.minBy(e => e.count()).count();
  let pairs = singlesMap.map(e => e.sortBy(e => e.age).take(numberOfPairs))

  return pairs.get('singleFemales').zipWith((a, b) => {
    return Immutable.List.of(a, b)
  }, pairs.get('singleMales')).filter(pair => {
    return Math.abs(pair.first().age - pair.last().age) <= config.MAX_AGE_DIFFERENCE_TO_MARRY &&
      random() < config.PROBABILITY_TO_MARRY;
  });
}

function marryPairs(pairs) {
  return pairs.flatMap(pair => {
    return Immutable.List.of(
      { ...pair.first(), marriedTo: pair.last().id },
      { ...pair.last(), marriedTo: pair.first().id }
    )
  })
}
