import { Gravedigger } from '../services/gravedigger';

export function gravediggerWorks(settlement) {
  return new Gravedigger(settlement).perform();
}
