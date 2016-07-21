import * as event from './advance_turn';
import { make as makeSettlement } from '../models/settlement';
import Immutable from 'immutable';

describe('advanceTurn', () => {
  it('advances the turn of the settlement', () => {
    let settlement = {
      ...makeSettlement({ people: 0 }),
      turn: 0
    };
    let { turn, logs } = event.advanceTurn(settlement);

    expect(turn).toEqual(1);
    expect(Immutable.Map.isMap(logs)).toEqual(true);
  })
})
