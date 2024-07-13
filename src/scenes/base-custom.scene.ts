export abstract class BaseCustomScene extends Phaser.Scene {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  protected _timeStamp = 0;

  // *****************************************************************************************************************
  // PHASER LIFECYCLE
  // *****************************************************************************************************************

  update(time: number, delta: number) {
    super.update(time, delta);

    const timeSpent = time - this._timeStamp;
    if (timeSpent >= this.updateRate) {
      this._timeStamp = time;
      this.onUpdate();
    }
  }

  abstract get updateRate(): number;
  abstract onUpdate(): void;
}
