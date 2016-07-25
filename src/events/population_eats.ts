export function populationEats(settlement) {
  let eatingRate = settlement.get('eatingRate');
  let peopleCount = settlement.get('people').count();

  return settlement.update('food', food => food - (peopleCount * eatingRate))
}
