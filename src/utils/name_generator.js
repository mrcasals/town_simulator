import { randomBetween, randomElement } from './random'

const firstNameSyllables = [
  'mon',
  'fay',
  'shi',
  'zag',
  'blarg',
  'rash',
  'izen',
]

const secondNameSyllables = [
  'mon',
  'fay',
  'shi',
  'zag',
  'blarg',
  'rash',
  'izen',
]

export function composeName() {
  return `${generateName(firstNameSyllables)} ${generateName(secondNameSyllables)}`
}

function generateName(syllables) {
  let name = '';
  let numberOfSyllables = randomBetween(1, 4);

  for(var i = 0; i < numberOfSyllables; i++) {
    name += randomElement(syllables);
  }

  return capitalize(name);
}

export function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
