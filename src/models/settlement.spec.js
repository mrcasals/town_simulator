import * as settlement from './settlement';
import Immutable from 'immutable';

describe('Settlement', () => {
  describe('make', () => {
    it('generates a list of settlers in a map', () => {
      let town = settlement.make({ people: 1 })
      expect(town.get('people').count()).toEqual(1)
    })

    it('sets some initial values', () => {
      let town = settlement.make({ people: 1 })
      expect(town.get('turn')).toEqual(0)
    })
  })
})
