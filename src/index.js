import { City } from './city'

let city = new City();

setInterval(() => {
  city.turn();
  console.log(city.inspect());
}, 1000);
