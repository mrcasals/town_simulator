import * as event from './population_eats';
import Immutable from 'immutable';

describe('populationEats', () => {
  it('makes the population eat', () => {
    let people = Immutable.List.of({}, {});
    let settlement = { people: people, eatingRate: 12, food: 100 };
    let output = event.populationEats(settlement);

    expect(output.food).toEqual(76);
  })
})
