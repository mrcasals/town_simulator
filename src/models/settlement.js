import Immutable from 'immutable';
import { make as makeSettler, render as renderPeople } from './person';
import { randomBetween } from '../utils/random';

export function make({ people, ...settlement }) {
  let settlers = Immutable.Map();

  for (let i = 0; i < people; i++) {
    let settler = makeSettler();
    settlers = settlers.set(settler.id, settler);
  }

  return { ...settlement, people: settlers, turn: 0, logs: Immutable.Map() };
}
