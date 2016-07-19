import * as settlement from './settlement';
import Immutable from 'immutable';

describe('Settlement', () => {
  describe('make', () => {
    it('generates a list of settlers', () => {
      let town = settlement.make({ people: 1 })
      expect(town.people.count()).toEqual(1)
    })

    it('sets some initial values', () => {
      let town = settlement.make({ people: 1 })
      expect(town.turn).toEqual(0)
      expect(town.logs).toEqual(Immutable.Map())
    })
  })
})
