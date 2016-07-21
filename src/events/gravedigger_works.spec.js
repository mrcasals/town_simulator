import * as event from './gravedigger_works';
import { make as makePerson } from '../models/person';
import { make as makeSettlement } from '../models/settlement';
import Immutable from 'immutable';

describe('gravedigger', () => {
  describe('perform', () => {
    describe('when someone is dead', () => {
      let settlement = makeSettlement({ people: 0 });
      settlement.people = Immutable.Map.of(
        1,
        { ...makePerson(), id: 1, name: 'Alive' },
        2,
        { ...makePerson(), id: 2, name: 'Dead', dead: true },
      );

      it('removes the dead people', () => {
        let newSettlement = event.gravediggerWorks(settlement);

        expect(newSettlement.people.count()).toEqual(1);
        expect(newSettlement.people.first().id).toEqual(1);
      })

      it('adds new logs', () => {
        let newSettlement = event.gravediggerWorks(settlement);

        expect(newSettlement.logs.get(settlement.turn).count()).toEqual(1);
      })
    })
  })
})
