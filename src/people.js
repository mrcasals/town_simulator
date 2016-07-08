import { randomElement } from './utils/random';

const GENDERS = ["male", "female"];

export class People {
  constructor(age = 20) {
    this.age = age;
    this.gender = randomElement(GENDERS);
  }

  turn() {
    this.getOlder();
  }

  getOlder() {
    this.age += 1;
  }

  inspect() {
    return `${this.age}${this.gender[0]}`;
  }
}
