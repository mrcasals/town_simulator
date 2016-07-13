import { randomElement } from './utils/random';
import { composeName } from './utils/name_generator'

const GENDERS = ["male", "female"];

export class People {
  constructor(age = 20) {
    this.age = age;
    this.gender = randomElement(GENDERS);
    this.name = composeName();
  }

  turn() {
    this.getOlder();
  }

  getOlder() {
    this.age += 1;
  }

  inspect() {
    return `${this.name}: ${this.age}${this.gender[0]}`;
  }
}
