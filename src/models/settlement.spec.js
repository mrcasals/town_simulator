import * as settlement from './settlement';
import Immutable from 'immutable';

describe('Settlement', () => {
  describe('make', () => {
    it('generates a list of settlers in a map', () => {
      let town = settlement.make({ people: 1 })
      expect(town.people.count()).toEqual(1)
      expect(Immutable.Map.isMap(town.people)).toEqual(true)
    })

    it('sets some initial values', () => {
      let town = settlement.make({ people: 1 })
      expect(town.turn).toEqual(0)
      expect(town.logs).toEqual(Immutable.Map())
    })
  })
})
