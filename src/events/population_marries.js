import Immutable from 'immutable';
import { isMale, isSingle } from '../models/person';

export function populationMarries({ logs, people, ...settlement }) {
  let singleMales = Immutable.List();
  let singleFemales = Immutable.List();
  let currentEvents = logs.get(settlement.turn) || Immutable.List();

  people.forEach(person => {
    if (isMale(person) && isSingle(person)) {
      singleMales = singleMales.push(person.id);
    } else if (!isMale(person) && isSingle(person)) {
      singleFemales = singleFemales.push(person.id);
    }
  })

  let familiesToForm = Math.min(singleMales.count(), singleFemales.count());

  for (let i = 0; i < familiesToForm; i++) {
    let singleMaleId = singleMales.last();
    let singleFemaleId = singleFemales.last();

    people = people.set(
      singleMaleId,
      { ...people.get(singleMaleId), marriedTo: singleFemaleId}
    );
    people = people.set(
      singleFemaleId,
      { ...people.get(singleFemaleId), marriedTo: singleMaleId}
    );

    currentEvents = currentEvents.push(
      {
        event: 'NEW_MARRIAGE',
        peopleIds: Immutable.List.of(singleMaleId, singleFemaleId)
      }
    )

    singleMales = singleMales.pop();
    singleFemales = singleFemales.pop();
  }

  logs = logs.set(
    settlement.turn,
    currentEvents
  )

  return { ...settlement, people, logs };
}
