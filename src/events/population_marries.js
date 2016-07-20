import Immutable from 'immutable';
import { isMale, isSingle } from '../models/person';

export function populationMarries({ logs, people, ...settlement }) {
  let singleMales = Immutable.List();
  let singleFemales = Immutable.List();
  let marriedPeople = Immutable.List();
  let currentEvents = logs.get(settlement.turn) || Immutable.List();

  people.forEach(person => {
    if (isMale(person) && isSingle(person)) {
      singleMales = singleMales.push(person);
    } else if (!isMale(person) && isSingle(person)) {
      singleFemales = singleFemales.push(person);
    } else {
      marriedPeople = marriedPeople.push(person);
    }
  })

  let familiesToForm = Math.min(singleMales.count(), singleFemales.count());

  for (let i = 0; i < familiesToForm; i++) {
    let singleMale = singleMales.last();
    let singleFemale = singleFemales.last();

    marriedPeople = Immutable.List.of(
      ...marriedPeople,
      {
        ...singleMale,
        marriedTo: singleFemale.id
      },
      {
        ...singleFemale,
        marriedTo: singleMale.id
      }
    );

    currentEvents = currentEvents.push(
      {
        event: 'NEW_MARRIAGE',
        peopleIds: Immutable.List.of(singleMale.id, singleFemale.id)
      }
    )

    singleMales = singleMales.pop();
    singleFemales = singleFemales.pop();
  }

  people = Immutable.List.of(
    ...marriedPeople,
    ...singleMales,
    ...singleFemales
  ).sortBy((value, key) => value.id)

  logs = logs.set(
    settlement.turn,
    currentEvents
  )

  return { ...settlement, people, logs };
}
