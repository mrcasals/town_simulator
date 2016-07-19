import * as event from './advance_turn';

describe('advanceTurn', () => {
  it('advances the turn of the settlement', () => {
    let settlement = { turn: 0 };
    let output = event.advanceTurn(settlement);

    expect(output.turn).toEqual(1);
  })
})
