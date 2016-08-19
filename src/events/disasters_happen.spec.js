import * as event from './disasters_happen';
import { make as makeSettlement } from '../models/settlement';
import Immutable from 'immutable';

let randomness = () => 0;

describe('disastersHappen', () => {
  let settlement = makeSettlement({ people: 1 })
  let output = event.disastersHappen(settlement, randomness);

  it('kills people', () => {
    let resultingPeople = output.get('people');

    expect(resultingPeople.count()).toEqual(0);
  })

  it('adds new logs', () => {
    let disasterLogs = output.get('logs').get(settlement.get('turn'))
      .filter(event => {
        return event.get('event') === 'DISASTER'
      })
    let logKeys = disasterLogs.first().keySeq().toArray().sort();

    expect(disasterLogs.count()).toEqual(1);
    expect(logKeys).toEqual(['event', 'eventType', 'killed'])
  })
})
