import Immutable from 'immutable';
import { make as makePerson, marriedTo, id, isMarried, isAlive, isFemale, isMale } from '../models/person';
import * as config from '../config';

export function populationBreeds(settlement, random = Math.random) {
  let people = settlement.get('people');
  let newPeopleAndLogs = getMarriedCouples(people).reduce((acc, couple) => {
    let result = coupleBreeds(couple, random);

    return acc
      .update('people', people => people.merge(result.get('people')))
      .update('logs', logs => logs.merge(result.get('logs')))
  }, Immutable.fromJS({'people': [], 'logs': []}))

  let newPeople = newPeopleAndLogs.get('people').reduce((people, person) => {
    return people.set(id(person), person)
  }, people);

  return settlement
    .set('people', newPeople)
    .updateIn(['logs', settlement.get('turn')], currentEvents => currentEvents.concat(newPeopleAndLogs.get('logs')));
}

function getMarriedCouples(people) {
  let alivePeople = people.filter(isAlive);
  let marriedPeople = alivePeople.filter(isMarried);

  return marriedPeople.reduce((marriages, person) => {
    let partner = people.get(marriedTo(person));

    if (partner !== undefined && isAlive(partner)){
      return marriages.add(Immutable.Set.of(person, partner))
    }

    return marriages;
  }, Immutable.Set());
}

function coupleBreeds(couple, random) {
  if (random() > config.PROBABILITY_TO_BREED) {
    return couple.toList();
  }

  let father = couple.find(isMale);
  let mother = couple.find(isFemale);
  let child = makePerson({ age: 0, parents: Immutable.Set.of(id(father), id(mother)) });

  return Immutable.fromJS(
    {
      'people': [
        child,
        father.update('children', Immutable.List(), children => children.push(id(child))),
        mother.update('children', Immutable.List(), children => children.push(id(child))),
      ],
      'logs': [
        {
          event: 'NEW_CHILD',
          parentIds: [id(father), id(mother)],
          childId: id(child),
        },
      ],
    }
  );
}
