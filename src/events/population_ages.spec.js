import * as event from './population_ages';
import { make as makeSettlement } from '../models/settlement';
import { age } from '../models/person';
import Immutable from 'immutable';

describe('populationAges', () => {
  it('makes the population age', () => {
    let settlement = makeSettlement({ people: 1 });
    let person = settlement.get('people').first();
    let output = event.populationAges(settlement);

    expect(age(output.get('people').first())).toEqual(age(person) + 1);
  })
})
