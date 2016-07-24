import { Villager } from '../villager';
import { getMessage } from '../../views/logger';

const TEXT_STYLE = { font: "12px Arial", fill: "#fff", align: "center" };
const GREEN_BG = "#519872";

export class MainState extends Phaser.State {
  preload() {
    this.load.spritesheet('villager_male_adult', require('../images/villager_male_adult.png'), 32, 48);
    this.load.spritesheet('villager_female_adult', require('../images/villager_female_adult.png'), 32, 48);
    this.load.spritesheet('villager_male_child', require('../images/villager_male_child.png'), 32, 48);
    this.load.spritesheet('villager_female_child', require('../images/villager_female_child.png'), 32, 48);
    this.load.image('tomb', require('../images/tomb.png'));
  }

  create() {
    this.game.stage.backgroundColor = GREEN_BG;

    this.villagers = this.game._settlement.get('people')
      .map(person => new Villager(this.game, person));

    this.toggleLogKey = this.game.input.keyboard.addKey(Phaser.Keyboard.L);

    this.currentTurn = -1;
    this.messages = [];

    this.logsGUI = this.add.group();
    this.logsGUI.alpha = 0;

    this.foodText = this.game.add.text(this.game.width - 10, 10, `Remaining food: ${this.game._settlement.get('food')}`, TEXT_STYLE);
    this.foodText.anchor.setTo(1, 0);
    this.turnText = this.game.add.text(this.game.width - 10, 30, `Turn: ${this.game._settlement.get('turn')}`, TEXT_STYLE);
    this.turnText.anchor.setTo(1, 0);

    this.toggleLogKey.onDown.add(() => {
      this.logsGUI.alpha = 1 - this.logsGUI.alpha;
    });
  }

  update() {
    let settlementTurn = this.game._settlement.get('turn');

    if (settlementTurn !== this.currentTurn) {
      this.updateVillagers();

      let message = this.game._settlement.get('logs')
        .get(settlementTurn)
        .forEach(ev => {
          this.messages.unshift(getMessage(ev, this.game._settlement));
        });

      this.logsGUI.removeAll();
      this.messages
        .forEach((msg, index) => {
          let text = this.game.add.text(10, 10 + 20 * index, msg, TEXT_STYLE);
          this.logsGUI.add(text);
        });

      this.foodText.text = `Remaining food: ${this.game._settlement.get('food')}`;
      this.turnText.text = `Turn: ${this.game._settlement.get('turn')}`;
      this.currentTurn = settlementTurn;
    }

    this.game.world.bringToTop(this.logsGUI);
  }

  updateVillagers() {
    let townPeople = this.game._settlement.get('people');

    let deadPeople = this.villagers
      .filter(villager => {
        return !townPeople.has(villager._data.get('id'));
      });

    deadPeople.map(people => people.die());

    let bornVillagers = townPeople
      .filter(person => {
        return !this.villagers.has(person.get('id'));
      })
      .map(person => new Villager(this.game, person));

    this.villagers = this.villagers.merge(bornVillagers);
  }
}