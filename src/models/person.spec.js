import * as person from './person';

describe('Person', () => {
  describe('make', () => {
    it('creates a living person', () => {
      let settler = person.make();
      expect(settler.dead).toBe(false);
    })

    it('assigns a gender to the person', () => {
      let settler = person.make();
      expect(settler.gender).toEqual(jasmine.any(String));
    })

    it('assigns a name to the person', () => {
      let settler = person.make();
      expect(settler.name).toEqual(jasmine.any(String));
    })

    it('assigns an age to the person', () => {
      let settler = person.make();
      expect(settler.age).toEqual(jasmine.any(Number));
    })
  })

  describe('isMale', () => {
    it('returns true if the person is male', () => {
      let male = { gender: 'male' }
      expect(person.isMale(male)).toBe(true);
    })

    it('returns false if the person is female', () => {
      let female = { gender: 'female' }
      expect(person.isMale(female)).toBe(false);
    })
  })

  describe('isFemale', () => {
    it('returns false if the person is male', () => {
      let male = { gender: 'male' }
      expect(person.isFemale(male)).toBe(false);
    })

    it('returns true if the person is female', () => {
      let female = { gender: 'female' }
      expect(person.isFemale(female)).toBe(true);
    })
  })
});
