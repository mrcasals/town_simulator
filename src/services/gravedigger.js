import { randomElement } from '../utils/random'
import { capitalize } from '../utils/name_generator'

const DEATH_BY_AGE = [
  '+per had so much love that +pos heart exploded',
  '+per was left behind',
]

const OTHER_DEATH_REASONS = [
  '+per ate too many berries',
  '+per died of dysentery',
  'a wolf played with +pro',
  'a wolf chased +pro until +per fell off a cliff',
  'reminder: do not play with angry bears',
  '+per went off chasing a butterfly. +PER didn\'t see the cliff',
]

export class Gravedigger {
  constructor(people) {
    this.people = people
  }

  perform() {
    let alive = [];

    this.people.forEach(person => {
      if (person.isDead) {
        console.log(this.deathMessage(person));
      } else {
        alive.push(person);
      }
    });

    return alive;
  }

  deathMessage(person) {
    return `${person.name} (${person.gender}) has died at the age of ${person.age}. ${this.deathReason(person)}`
  }

  deathReason(person) {
    let reason = ''
    if (person.age >= 63) {
      reason = randomElement(DEATH_BY_AGE);
    } else {
      reason = randomElement(OTHER_DEATH_REASONS);
    }

    let possessive = person.isMale() ? 'his' : 'her';
    let personal_pronoun = person.isMale() ? 'he' : 'she';
    let pronoun = person.isMale() ? 'him' : 'her';

    return capitalize(reason
                      .replace('+pos', possessive)
                      .replace('+pro', pronoun)
                      .replace('+per', personal_pronoun)
                      .replace('+PER', capitalize(personal_pronoun))
                     )
  }
}
