import * as event from './population_marries';
import { make as makePerson } from '../models/person';
import { make as makeSettlement } from '../models/settlement';
import Immutable from 'immutable';

describe('populationMarries', () => {
  describe('when there are possible matches', () => {
    let settlement = makeSettlement({ people: 0 });
    settlement.people = Immutable.Map.of(
      1,
      { ...makePerson(), id: 1, gender: 'male' },
      2,
      { ...makePerson(), id: 2, gender: 'female' },
      3,
      { ...makePerson(), id: 3, gender: 'male' },
    );

    it('marries them', () => {
      let output = event.populationMarries(settlement);

      expect(output.people.get(2).marriedTo).toEqual(output.people.get(3).id)
      expect(Immutable.Map.isMap(output.people)).toEqual(true);
    })

    it('does not marry the people that cannot have a partner', () => {
      let output = event.populationMarries(settlement);

      expect(output.people.get(1).marriedTo).toEqual(undefined)
    })

    it('adds some logs', () => {
      let output = event.populationMarries(settlement);
      let marriageLogs = output.logs.get(settlement.turn)
      .filter(event => {
        return event.event === 'NEW_MARRIAGE'
      })

      expect(marriageLogs.toArray()).not.toEqual([]);
    })
  })

  describe('when some families already exist', () => {
    let settlement = makeSettlement({ people: 0 });
    settlement.people = Immutable.Map.of(
      1,
      { ...makePerson(), id: 1, gender: 'male' },
      2,
      { ...makePerson(), id: 2, gender: 'female' },
      3,
      { ...makePerson(), id: 3, gender: 'male' },
      4,
      { ...makePerson(), id: 4, gender: 'female', marriedTo: 5 },
      5,
      { ...makePerson(), id: 5, gender: 'male', marriedTo: 4 },
    );

    it('does not remarry people with a partner', () => {
      let output = event.populationMarries(settlement);

      expect(output.people.get(4).marriedTo).toEqual(output.people.get(5).id)
    })
  })
})
