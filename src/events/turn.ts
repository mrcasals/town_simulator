import { advanceTurn } from './advance_turn';
import { populationEats } from './population_eats';
import { populationAges } from './population_ages';
import { gravediggerWorks } from './gravedigger_works';
import { populationMarries } from './population_marries';
import { populationBreeds } from './population_breeds';

export function turn(settlement) {
  settlement = advanceTurn(settlement);
  settlement = populationEats(settlement);
  settlement = populationAges(settlement);
  settlement = populationMarries(settlement);
  settlement = populationBreeds(settlement);
  settlement = gravediggerWorks(settlement);

  return settlement;
}
