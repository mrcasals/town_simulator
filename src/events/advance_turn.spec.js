import * as event from './advance_turn';
import { make as makeSettlement } from '../models/settlement';
import Immutable from 'immutable';

describe('advanceTurn', () => {
  it('advances the turn of the settlement', () => {
    let settlement = makeSettlement({ people: 0, turn: 0 });
    let nextSettlement = event.advanceTurn(settlement);

    expect(nextSettlement.get('turn')).toEqual(1);
  })
})
