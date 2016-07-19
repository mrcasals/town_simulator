import { randomElement, randomBetween } from '../utils/random';
import { composeName } from '../utils/name_generator'

const GENDERS = ["male", "female"];

export function make() {
  return {
    name: composeName(),
    age: randomBetween(15, 35),
    dead: false,
    gender: randomElement(GENDERS) ,
  }
}

export function render(people) {
  return people
  .map(renderSettler)
  .toArray();
}

export function renderSettler({ name, age, gender, dead, ...settler }) {
  return `${name} (${age}${gender[0]})`;
}

export function isMale({ gender }) {
  return gender === 'male';
}

export function isFemale({ gender }) {
  return gender === 'female';
}
