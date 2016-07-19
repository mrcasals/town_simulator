import { Gravedigger } from './gravedigger';
import Immutable from 'immutable';

describe('Gravedigger', () => {
  describe('perform', () => {
    describe('when someone is dead', () => {
      let people = Immutable.List();
      let alive = {dead: false, age: 5, gender: 'male', name: 'Alive'}
      let dead = {dead: true, age: 15, gender: 'female', name: 'Dead'}
      people = people.push(alive)
      people = people.push(dead)
      let turn = 1;
      let settlement = { people: people, turn: turn, logs: Immutable.Map() };
      let worker = new Gravedigger(settlement);

      it('removes the dead people', () => {
        let newSettlement = worker.perform();

        expect(newSettlement.people.toArray()).toEqual([alive]);
      })

      it('adds new logs', () => {
        let newSettlement = worker.perform();

        expect(newSettlement.logs.get(turn).count()).toEqual(1);
      })
    })
  })
})
