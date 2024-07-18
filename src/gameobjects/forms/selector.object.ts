import { DEFAULT_STYLE } from "../../cst";
import { SimpleLabelObject } from "../simple-label.object";
import { SimpleButtonObject } from "./buttons/simple-button.object";
import { SimpleInteractiveObject } from "./simple-interactive.object";

export class SelectorObject extends SimpleInteractiveObject {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  // INPUT
  private readonly _values: string[];

  // OBJECTS
  private _label: SimpleLabelObject;
  private _arrowLeft: SimpleButtonObject;
  private _value: SimpleLabelObject;
  private _arrowRight: SimpleButtonObject;

  // VARIABLES
  private _listIndex: number;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor(
    context: Phaser.Scene,
    positionX: number,
    positionY: number,
    label: string,
    values: string[],
    style: Phaser.Types.GameObjects.Text.TextStyle = DEFAULT_STYLE
  ) {
    super(context, positionX, positionY);

    this._values = values;
    this._listIndex = 0;

    const origin = label.length * 16;
    this._label = new SimpleLabelObject(
      context,
      positionX,
      positionY,
      label,
      style
    );
    this._arrowLeft = new SimpleButtonObject(
      context,
      positionX + origin,
      positionY + 9,
      "",
      () => this.onClickLeft()
    );
    this._value = new SimpleLabelObject(
      context,
      positionX + origin + 25,
      positionY,
      this._values[this._listIndex],
      style
    );
    this._arrowRight = new SimpleButtonObject(
      context,
      positionX + origin + 60,
      positionY + 9,
      "",
      () => this.onClickRight()
    );
  }

  // *****************************************************************************************************************
  // PUBLIC METHODS
  // *****************************************************************************************************************

  value(): string {
    return this._values[this._listIndex];
  }

  refresh(value: string | number): void {
    this._listIndex = this._values.indexOf(value.toString());
    this._value.updateValue(this.value());
  }

  // Events

  onClickLeft() {
    this._listIndex = this._listIndex - 1;
    if (this._listIndex < 0) {
      this._listIndex = this._values.length - 1;
    }
    this._value.updateValue(this.value());
  }

  onClickRight() {
    this._listIndex = (this._listIndex + 1) % this._values.length;
    this._value.updateValue(this.value());
  }

  // *****************************************************************************************************************
  // OVERRIDE  METHODS
  // *****************************************************************************************************************

  public override clear(): void {
    this._label.clear();
    this._arrowRight.clear();
    this._arrowLeft.clear();
    this._value.clear();
  }

  public override disable(): void {
    this._arrowRight.disable();
    this._arrowLeft.disable();
  }

  public override enable(): void {
    this._arrowRight.enable();
    this._arrowLeft.enable();
  }

  // *****************************************************************************************************************
  // PRIVATE METHODS
  // *****************************************************************************************************************
}
