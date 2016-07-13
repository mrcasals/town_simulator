import { randomElement } from './utils/random';
import { composeName } from './utils/name_generator'

const GENDERS = ["male", "female"];

export class Person {
  constructor(age = 20) {
    this.age = age;
    this.gender = randomElement(GENDERS);
    this.name = composeName();
    this.isDead = false
  }

  turn() {
    this.getOlder();

    if (this.age >= 65) {
      this.isDead = true
    }
  }

  getOlder() {
    this.age += 1;
  }

  inspect() {
    return `${this.name}: ${this.age}${this.gender[0]}`;
  }
}
