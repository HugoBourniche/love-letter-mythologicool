import { DEFAULT_STYLE } from "../../cst";
import { SimpleLabelField } from "./simple-label.field";
import { SimpleButtonField } from "./buttons/simple-button.field";
import { SimpleInteractiveField } from "./simple-interactive.field";

export class SelectorField extends SimpleInteractiveField {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  private _label: SimpleLabelField;
  private _arrowLeft: SimpleButtonField;
  private _value: SimpleLabelField;
  private _arrowRight: SimpleButtonField;

  private readonly _values: string[];
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
    this._label = new SimpleLabelField(
      context,
      positionX,
      positionY,
      label,
      style
    );
    this._arrowLeft = new SimpleButtonField(
      context,
      positionX + origin,
      positionY + 9,
      "",
      () => this.onClickLeft()
    );
    this._value = new SimpleLabelField(
      context,
      positionX + origin + 25,
      positionY,
      this._values[this._listIndex],
      style
    );
    this._arrowRight = new SimpleButtonField(
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

  override clear(): void {
    this._label.clear();
    this._arrowRight.clear();
    this._arrowLeft.clear();
    this._value.clear();
  }

  refresh(value: string | number): void {
    this._listIndex = this._values.indexOf(value.toString());
    this._value.updateValue(this.value());
  }

  override disable(): void {
    this._arrowRight.disable();
    this._arrowLeft.disable();
  }

  override enable(): void {
    this._arrowRight.enable();
    this._arrowLeft.enable();
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
  // PRIVATE METHODS
  // *****************************************************************************************************************
}
