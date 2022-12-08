import Immutable from 'immutable'
import { make as makeSettler, id } from './person'
import { composeTownName } from '../utils/name_generator'

export function make({ people, ...settlementOpts }) {
  let settlers = Immutable.Range(0, people).reduce((settlers, _) => {
    let settler = makeSettler()
    return settlers.set(id(settler), settler)
  }, Immutable.Map())

  return Immutable.fromJS({
    name: composeTownName(),
    people: settlers,
    turn: 0,
    logs: Immutable.Map.of(0, Immutable.List()),
  }).merge(Immutable.fromJS(settlementOpts))
}
