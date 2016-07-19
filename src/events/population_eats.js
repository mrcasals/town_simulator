export function populationEats({ food, people, eatingRate, ...settlement }) {
  food -= people.count() * eatingRate;

  return { food, people, eatingRate, ...settlement };
}
