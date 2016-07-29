import { maleNames } from './maleNames';
import { femaleNames } from './femaleNames';
let Foswig = require('foswig');

// Notes on surname generation: Algo-Saxons used only personal names, sometimes
// with nicknames and patronymics, so it was not until after the Norman
// Conquest (1066) that inherited surnames were adopted. Originally these were
// only borne by nobles and were likely to be restricted to the place of
// origin, preceded by 'de' as in modern French, or the father's name preceded
// by 'Fitz' (from French fils 'son')

export function composeName(gender) {
  let name = new Foswig(3);
  let surname = new Foswig(2);

  if (gender === 'male') {
    name.addWordsToChain(maleNames);
  } else {
    name.addWordsToChain(femaleNames);
  }

  surname.addWordsToChain(maleNames);

  return `${capitalize(name.generateWord(3, 15, true))} ${capitalize(surname.generateWord(3, 15, true))}`;
}

export function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
