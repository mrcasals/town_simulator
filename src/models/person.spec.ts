import * as model from './person';

describe('model', () => {
  describe('make', () => {
    it('creates a living model', () => {
      let settler = model.make();
      expect(model.isDead(settler)).toBe(false);
    })

    it('assigns a gender to the model', () => {
      let settler = model.make();
      expect(settler.get('gender')).toEqual(jasmine.any(String));
    })

    it('assigns a name to the model', () => {
      let settler = model.make();
      expect(settler.get('name')).toEqual(jasmine.any(String));
    })

    it('assigns an age to the model', () => {
      let settler = model.make();
      expect(settler.get('age')).toEqual(jasmine.any(Number));
    })

    it('assigns consecutive IDs', () => {
      let settler1 = model.make();
      let settler2 = model.make();

      expect(model.id(settler2)).toEqual(model.id(settler1) + 1);
    })
  })

  describe('isMale', () => {
    it('returns true if the model is male', () => {
      let male = model.make().set('gender', 'male');
      expect(model.isMale(male)).toBe(true);
    })

    it('returns false if the model is female', () => {
      let female = model.make().set('gender', 'female');
      expect(model.isMale(female)).toBe(false);
    })
  })

  describe('isFemale', () => {
    it('returns false if the model is male', () => {
      let male = model.make().set('gender', 'male');
      expect(model.isFemale(male)).toBe(false);
    })

    it('returns true if the model is female', () => {
      let female = model.make().set('gender', 'female');
      expect(model.isFemale(female)).toBe(true);
    })
  })

  describe('isSingle', () => {
    it('returns false if the model belongs to a family', () => {
      let settler = model.make().set('marriedTo', 1);
      expect(model.isSingle(settler)).toBe(false);
    })

    it('returns true if the model does not belong to any family', () => {
      let settler = model.make();
      expect(model.isSingle(settler)).toBe(true);
    })
  })
});
