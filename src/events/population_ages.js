import { MAX_AGE } from '../config';

export function populationAges(settlement ) {
  return settlement.update('people', people => people.map(age))
}

function age(settler) {
  let nextAge = settler.get('age') + 1;

  return settler.set('age', nextAge).set('dead', nextAge >= MAX_AGE || Math.random() < 0.01)
}
