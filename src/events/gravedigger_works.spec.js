import * as event from './gravedigger_works'
import { make as makePerson, id } from '../models/person'
import { make as makeSettlement } from '../models/settlement'
import Immutable from 'immutable'

describe('gravedigger', () => {
  describe('perform', () => {
    describe('when someone is dead', () => {
      let settlement = makeSettlement({ people: 0 }).set(
        'people',
        Immutable.Map.of(
          1,
          makePerson({ id: 1 }),
          2,
          makePerson({ id: 2, dead: true }),
        ),
      )

      it('removes the dead people', () => {
        let newSettlement = event.gravediggerWorks(settlement)

        expect(newSettlement.get('people').count()).toEqual(1)
        expect(id(newSettlement.get('people').first())).toEqual(1)
      })

      it('adds new logs', () => {
        let newSettlement = event.gravediggerWorks(settlement)

        expect(
          newSettlement.getIn(['logs', newSettlement.get('turn')]).count(),
        ).toEqual(1)
      })
    })
  })
})
