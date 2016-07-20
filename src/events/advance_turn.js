import Immutable from 'immutable';
export function advanceTurn({ logs, turn, ...settlement }) {
  return {
    ...settlement,
    turn: turn + 1,
    logs: logs.set(turn + 1, Immutable.List()),
  }
}
