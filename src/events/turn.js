import { populationEats } from './population_eats';
import { populationAges } from './population_ages';
import { gravediggerWorks } from './gravedigger_works';

export function turn(settlement) {
  settlement = populationEats(settlement);
  settlement = populationAges(settlement);
  settlement = gravediggerWorks(settlement);

  return settlement;
}
