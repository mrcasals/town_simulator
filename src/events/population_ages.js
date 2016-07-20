import { MAX_AGE } from '../config';

export function populationAges({ people, ...settlement }) {
  people = people.
    map(age)
    .toList()
  return { people, ...settlement };
}

function age({ age, dead, ...settler }) {
  let nextAge = age + 1;

  if (nextAge >= MAX_AGE || Math.random() < 0.1) {
    return { age: nextAge, dead: true, ...settler }
  }
  return { ...settler, age: nextAge, dead: false }
}
