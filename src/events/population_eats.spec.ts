import * as event from './population_eats';
import { make as makeSettlement } from '../models/settlement';
import Immutable from 'immutable';

describe('populationEats', () => {
  it('makes the population eat', () => {
    let settlement = makeSettlement({ people: 2 }).set('eatingRate', 12).set('food', 100);
    let output = event.populationEats(settlement);

    expect(output.get('food')).toEqual(76);
  })
})
