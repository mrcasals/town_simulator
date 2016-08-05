import * as Immutable from 'immutable';
import { randomElement } from '../utils/random'
import { capitalize } from '../utils/name_generator'
import { id, isDead, gender, age, name, isMale } from '../models/person'
import { MAX_AGE } from '../config';

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

export function gravediggerWorks(settlement) {
  let people = settlement.get('people');
  let turn = settlement.get('turn');

  let blah = deadAndAlive(people);
  let deadLog = blah.get('deadLog');

  let newPeople = blah.get('alive').reduce((people, alivePerson) => {
    return people.set(id(alivePerson), alivePerson)
  }, Immutable.Map());

  return settlement
    .set('people', newPeople)
    .updateIn(['logs', turn], currentEvents => currentEvents.concat(deadLog));
}

function deadAndAlive(people) {
  return people.reduce((acc, settler) => {
    if (isDead(settler)) {
      return acc.update('deadLog', (log) => log.push(generateLog(settler)));
    } else {
      return acc.update('alive', (settlers) => settlers.push(settler));
    }

  }, Immutable.fromJS({ alive: [], deadLog: [] }))
}

function generateLog(settler) {
  return Immutable.fromJS({
    event: 'DEATH',
    person: settler,
    message: deathMessage(settler)
  });
}

function deathMessage(person) {
  return `${name(person)} (${gender(person)}) died at the age of ${age(person)}. ${deathReason(person)}`
}

function deathReason(person) {
  let reason = ''
  if (age(person) >= MAX_AGE) {
    reason = randomElement(DEATH_BY_AGE);
  } else {
    reason = randomElement(OTHER_DEATH_REASONS);
  }

  let possessive = isMale(person) ? 'his' : 'her';
  let personal_pronoun = isMale(person) ? 'he' : 'she';
  let pronoun = isMale(person) ? 'him' : 'her';

  return capitalize(reason
                    .replace('+pos', possessive)
                    .replace('+pro', pronoun)
                    .replace('+per', personal_pronoun)
                    .replace('+PER', capitalize(personal_pronoun))
                   )
}
