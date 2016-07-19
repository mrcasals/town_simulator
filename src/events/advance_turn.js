export function advanceTurn({ turn, ...settlement }) {
  return {
    ...settlement,
    turn: turn + 1
  }
}
