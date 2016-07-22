import Immutable from 'immutable';
import { isMale, isSingle, isDead, id, age } from '../models/person';
import * as config from '../config'

export function populationMarries(settlement, random = Math.random) {
  let people = settlement.get('people');
  let alivePeople = people.filter(settler => !isDead(settler) && age(settler) >= config.MINIMUM_AGE_TO_MARRY);
  let singles = singlesMap(alivePeople);
  let pairs = pairUpSingles(singles, random);
  let married = marryPairs(pairs);

  let newLogs = pairs.map(pair => {
    return Immutable.fromJS({
      event: 'NEW_MARRIAGE',
      peopleIds: pair.map(id)
    })
  })

  let newPeople = married.reduce((people, newlyWed) => {
    return people.set(id(newlyWed), newlyWed)
  }, people);

  return settlement
    .set('people', newPeople)
    .updateIn(['logs', settlement.get('turn')], currentEvents => currentEvents.concat(newLogs));
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
  let pairs = singlesMap.map(e => e.sortBy(age).take(numberOfPairs))

  return pairs.get('singleFemales').zipWith((a, b) => {
    return Immutable.List.of(a, b)
  }, pairs.get('singleMales')).filter(pair => {
    return Math.abs(age(pair.first()) - age(pair.last())) <= config.MAX_AGE_DIFFERENCE_TO_MARRY &&
      random() < config.PROBABILITY_TO_MARRY;
  });
}

function marryPairs(pairs) {
  return pairs.flatMap(pair => {
    return Immutable.List.of(
      pair.first().set('marriedTo', id(pair.last())),
      pair.last().set('marriedTo', id(pair.first())),
    )
  })
}
