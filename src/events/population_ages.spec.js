import * as event from './population_ages';
import { make as makeSettlement } from '../models/settlement';
import Immutable from 'immutable';

describe('populationAges', () => {
  it('makes the population age', () => {
    let settlement = makeSettlement({ people: 1 });
    let person = settlement.people.first();
    let output = event.populationAges(settlement);

    expect(output.people.first().age).toEqual(person.age + 1);
  })
})
