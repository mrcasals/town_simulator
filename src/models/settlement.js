import Immutable from 'immutable';
import { make as makeSettler, render as renderPeople } from './person';
import { randomBetween } from '../utils/random';

export function make({ people, ...settlement }) {
  let settlers = Immutable.Range(0, people).
    map(settler => makeSettler())
    .toList();

  return { ...settlement, people: settlers };
}

export function render({ people, food, ...settlement }) {
  return `${renderPeople(people)}; Remaining food: ${food}`;
}

