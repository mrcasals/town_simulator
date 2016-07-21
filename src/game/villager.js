export class Villager extends Phaser.Sprite {
  constructor(game, data) {
    super(game, 0, 0, 'villager');

    this.position.x = game.rnd.integerInRange(this.width, game.width - this.width);
    this.position.y = game.rnd.integerInRange(this.height, game.height - this.height);

    this._data = data;
    this.anchor.setTo(0.5);
    
    this.game.add.existing(this);
  }
}