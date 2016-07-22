import { randomElement, randomBetween } from '../utils/random';
import { composeName } from '../utils/name_generator'
import Immutable from 'immutable';

const GENDERS = ["male", "female"];

let personId = 1;
export function make(data = {}) {
  return Immutable.fromJS({
    id: personId++,
    name: composeName(),
    age: randomBetween(15, 35),
    dead: false,
    gender: randomElement(GENDERS) ,
  }).merge(Immutable.fromJS(data));
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
