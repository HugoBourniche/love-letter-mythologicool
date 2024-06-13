import { SimpleField } from "./simple.field";

export abstract class SimpleInteractiveField extends SimpleField {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  protected _isDisabled = false;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  protected constructor(
    context: Phaser.Scene,
    positionX: number,
    positionY: number
  ) {
    super(context, positionX, positionY);
  }

  // *****************************************************************************************************************
  // ABSTRACT METHODS
  // *****************************************************************************************************************

  public abstract enable(): void;
  public abstract disable(): void;

  // *****************************************************************************************************************
  // PUBLIC METHODS
  // *****************************************************************************************************************

  public setDisable(value?: boolean) {
    if (value) {
      this._isDisabled = true;
      this.disable();
    } else {
      this._isDisabled = false;
      this.enable();
    }
  }
}
