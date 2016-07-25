import { Range, Map, List, fromJS } from 'immutable';
import { make as makeSettler, id } from './person';
import { randomBetween } from '../utils/random';
import { composeTownName } from '../utils/name_generator';

export function make(settlementOpts) {
  let { people } = settlementOpts;

  let settlers = Range(0, people).reduce((settlers, _) => {
    let settler = makeSettler();
    return settlers.set(id(settler), settler);
  }, Map())

  return Map(settlementOpts).merge(fromJS({
    name: composeTownName(),
    people: settlers,
    turn: 0,
    logs: Map.of(0, List())
  }));
}
