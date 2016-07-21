import { Villager } from '../villager';

export class MainState extends Phaser.State {
  preload() {
    this.load.spritesheet('villager', require('../images/villager.png'), 32, 48);
  }

  create() {
    this.people = this.game._settlement.people
      .map(person => new Villager(this.game, person));
  }

  update() {
    let deadPeople = this.people.filter(person => !this.game._settlement.people.has(person._data.id));

    deadPeople.map(people => people.destroy());
  }
}