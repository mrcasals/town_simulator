import { MAX_AGE } from '../config';

export function populationAges({ people, ...settlement }) {
  return { people: people.map(age), ...settlement };
}

function age({ age, dead, ...settler }) {
  let nextAge = age + 1;

  if (nextAge >= MAX_AGE || Math.random() < 0.1) {
    return { age: nextAge, dead: true, ...settler }
  }
  return { ...settler, age: nextAge, dead: false }
}
