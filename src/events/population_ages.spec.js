import * as event from './population_ages';
import Immutable from 'immutable';

describe('populationAges', () => {
  it('makes the population age', () => {
    let people = Immutable.List();
    let person = { age: 10 };
    people = people.push(person);
    let settlement = { people: people };
    let output = event.populationAges(settlement);

    expect(output.people.get(0).age).toEqual(11);
  })
})
