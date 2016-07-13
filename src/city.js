import { Person } from './person';
import { randomBetween } from './utils/random';

export class City {
  constructor(initialPeople = 10) {
    this.food = 500000;
    this.people = []
    for(var i = 0; i < initialPeople; i++) {
      this.people.push(new Person(randomBetween(15, 25)));
    }
  }

  turn() {
    this.food -= this.people.length * 12; // people eat each month
    this.people.forEach(p => p.turn());
  }

  inspect() {
    let peopleInspect = this.people.map(p => `${p.inspect()}`)
    return `${peopleInspect}; Remaining food: ${this.food}`;
  }
}
