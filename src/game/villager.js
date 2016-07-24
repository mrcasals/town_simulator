import { MINIMUM_AGE_TO_MARRY } from '../config';

export class Villager extends Phaser.Sprite {
  constructor(game, data) {
    let textureId = `villager_${data.get('gender')}_`;
    textureId += data.get('age') >= MINIMUM_AGE_TO_MARRY ? 'adult' : 'child'
    
    super(game, 0, 0, textureId);

    this.position.x = game.rnd.integerInRange(this.width, game.width - this.width);
    this.position.y = game.rnd.integerInRange(this.height, game.height - this.height);

    this._data = data;
    this.anchor.setTo(0.5);
    
    this.game.add.existing(this);
  }

  die() {
    if (!this.isDead) {
      let tweenDead = this.game.add.tween(this).to( { alpha: 0 }, 500, "Linear", true);
      this.isDead = true;
      tweenDead.onComplete.add(() => {
        let tomb = this.game.add.sprite(this.position.x, this.position.y, 'tomb');
        tomb.anchor.setTo(0.5);
        this.destroy();
      });
    }
  }
}