import * as event from './population_breeds';
import { make as makePerson, id, age } from '../models/person';
import { make as makeTown } from '../models/settlement';
import Immutable from 'immutable';

let random = () => 0;

describe('populationBreeds', () => {
  let people = Immutable.Map.of(
    1,
    makePerson({ id: 1, marriedTo: 2, gender: 'male' }),
    2,
    makePerson({ id: 2, marriedTo: 1, gender: 'female' }),
  );
  let town = makeTown({ people: 0 })
    .set('people', people);
  let output = event.populationBreeds(town, random);

  it('generates one single child', () => {
    let people = output.get('people');
    let child = people.find(person => age(person) === 0)

    expect(people.getIn([1, 'children', 0])).toEqual(id(child))
    expect(people.getIn([2, 'children', 0])).toEqual(id(child))
    expect(child.get('parents')).toEqual(Immutable.Set.of(1, 2))
  })
});
