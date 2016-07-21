import { MainState } from './states/main.state';

export class TownSimulatorGame extends Phaser.Game {
  constructor(settlement) {
    super()

    this._settlement = settlement;
    
    this.state.add('main', MainState);

    this.state.start('main');
  }
}