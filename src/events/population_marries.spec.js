import * as event from './population_marries';
import { make as makePerson } from '../models/person';
import { make as makeSettlement } from '../models/settlement';
import Immutable from 'immutable';

describe('populationMarries', () => {
  describe('when there are possible matches', () => {
    let people = Immutable.List.of(
      { ...makePerson(), gender: 'male' },
      { ...makePerson(), gender: 'female' },
      { ...makePerson(), gender: 'male' },
    );
    let settlement = { ...makeSettlement({ people: 1 }), people: people };

    it('marries them', () => {
      let output = event.populationMarries(settlement);

      expect(output.people.get(2).marriedTo).toEqual(output.people.get(1).id)
    })

    it('does not marry the people that cannot have a partner', () => {
      let output = event.populationMarries(settlement);

      expect(output.people.get(0).marriedTo).toEqual(undefined)
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
    let married1 = { ...makePerson(), gender: 'male' }
    let married2 = { ...makePerson(), gender: 'female' }

    let people = Immutable.List.of(
      { ...makePerson(), gender: 'male' },
      { ...makePerson(), gender: 'female' },
      { ...makePerson(), gender: 'male' },
      { ...married1, marriedTo: married2.id },
      { ...married2, marriedTo: married1.id },
    );
    let settlement = { ...makeSettlement({ people: 1 }), people: people };

    it('does not remarry people with a partner', () => {
      let output = event.populationMarries(settlement);

      expect(output.people.get(-1).marriedTo).toEqual(output.people.get(-2).id)
    })
  })
})
