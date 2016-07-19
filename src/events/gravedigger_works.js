import { Gravedigger } from '../services/gravedigger';

export function gravediggerWorks({ people, ...settlement }) {
  return {
    ...settlement,
    people: new Gravedigger(people).perform()
  }
}
