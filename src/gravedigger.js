export class Gravedigger {
  constructor(people) {
    this.people = people
  }

  perform() {
    let alive = [];

    this.people.forEach(person => {
      if (person.isDead) {
        console.log(`${person.name} (${person.gender}) has died at the age of ${person.age}`)
      } else {
        alive.push(person);
      }
    });

    return alive;
  }
}
