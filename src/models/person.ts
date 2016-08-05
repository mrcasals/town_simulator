import { randomElement, randomBetween } from '../utils/random';
import { composePersonName } from '../utils/name_generator'
import { fromJS } from 'immutable';

const GENDERS = ["male", "female"];

let personId = 1;
export function make(data = {}) {
  let gender = randomElement(GENDERS);

  return fromJS({
    id: personId++,
    name: composePersonName(gender),
    age: randomBetween(15, 35),
    dead: false,
    gender: gender,
  }).merge(fromJS(data));
}

export function id(person) {
  return person.get('id');
}

export function marriedTo(person) {
  return person.get('marriedTo');
}

export function age(person) {
  return person.get('age');
}

export function name(person) {
  return person.get('name');
}

export function gender(person) {
  return person.get('gender');
}

export function isAlive(person) {
  return !isDead(person);
}

export function isDead(person) {
  return person.get('dead');
}

export function isMale(person) {
  return gender(person) === 'male';
}

export function isFemale(person) {
  return gender(person) === 'female';
}

export function isSingle(person) {
  return marriedTo(person) === undefined;
}

export function isMarried(person) {
  return !isSingle(person);
}
