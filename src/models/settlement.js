import { Person } from './person';
import { Gravedigger } from '../services/gravedigger';
import { randomBetween } from '../utils/random';

export class Settlement {
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
    this.people = new Gravedigger(this.people).perform();
  }

  inspect() {
    let peopleInspect = this.people.map(p => `${p.inspect()}`)
    return `${peopleInspect}; Remaining food: ${this.food}`;
  }
}
