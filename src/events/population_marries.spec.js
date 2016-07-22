import * as event from './population_marries';
import { make as makePerson } from '../models/person';
import { make as makeSettlement } from '../models/settlement';
import Immutable from 'immutable';

let randomness = () => 0.5;

describe('populationMarries', () => {
  describe('when singles are under age', () => {
    let settlement = makeSettlement({ people: 0 });
    settlement.people = Immutable.Map.of(
      1,
      { ...makePerson(), id: 1, age: 16, gender: 'male' },
      2,
      { ...makePerson(), id: 2, gender: 'female' },
    );

    it('does not marry them', () => {
      let output = event.populationMarries(settlement, randomness);
      let marriedPeople = output.people.filter(person => {
        return person.marriedTo !== undefined
      })

      expect(marriedPeople.count()).toEqual(0)
    })

  })

  describe('when there are possible matches', () => {
    let settlement = makeSettlement({ people: 0 });
    settlement.people = Immutable.Map.of(
      1,
      { ...makePerson(), id: 1, age: 20, gender: 'male' },
      2,
      { ...makePerson(), id: 2, age: 20, gender: 'female' },
      3,
      { ...makePerson(), id: 3, age: 20, gender: 'male' },
    );

    it('marries them', () => {
      let output = event.populationMarries(settlement, randomness);
      let marriedPeople = output.people.filter(person => {
        return person.marriedTo !== undefined
      })

      expect(marriedPeople.count()).toEqual(2)
      expect(marriedPeople.first().marriedTo).toEqual(marriedPeople.last().id)
      expect(marriedPeople.last().marriedTo).toEqual(marriedPeople.first().id)
      expect(Immutable.Map.isMap(output.people)).toEqual(true);
    })

    it('does not marry the people that cannot have a partner', () => {
      let output = event.populationMarries(settlement, randomness);
      let singlePeople = output.people.filter(person => {
        return person.marriedTo === undefined
      })

      expect(singlePeople.count()).toEqual(1)
      expect(singlePeople.first().gender).toEqual('male')
    })

    it('adds some logs', () => {
      let output = event.populationMarries(settlement, randomness);
      let marriageLogs = output.logs.get(settlement.turn)
      .filter(event => {
        return event.get('event') === 'NEW_MARRIAGE'
      })

      expect(marriageLogs.count()).not.toEqual(0);
    })
  })

  describe('when some families already exist', () => {
    let settlement = makeSettlement({ people: 0 });
    settlement.people = Immutable.Map.of(
      1,
      { ...makePerson(), id: 1, age: 20, gender: 'male' },
      2,
      { ...makePerson(), id: 2, age: 20, gender: 'female' },
      3,
      { ...makePerson(), id: 3, age: 20, gender: 'male' },
      4,
      { ...makePerson(), id: 4, age: 20, gender: 'female', marriedTo: 5 },
      5,
      { ...makePerson(), id: 5, age: 20, gender: 'male', marriedTo: 4 },
    );

    it('does not remarry people with a partner', () => {
      let output = event.populationMarries(settlement, randomness);

      expect(output.people.get(4).marriedTo).toEqual(output.people.get(5).id)
    })
  })
})
