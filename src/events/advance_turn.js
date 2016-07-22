import Immutable from 'immutable';
export function advanceTurn(settlement) {
  let nextTurn = settlement.get('turn') + 1;

  return settlement
    .set('turn', nextTurn)
    .update('logs', logs => logs.set(nextTurn, Immutable.List()))
}
