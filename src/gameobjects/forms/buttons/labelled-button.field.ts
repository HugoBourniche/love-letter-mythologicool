import Text = Phaser.GameObjects.Text;
import { Scene } from "phaser";
import { SimpleButtonField } from "./simple-button.field";
import { DEFAULT_STYLE } from "../../../cst";

export class LabelledButtonField extends SimpleButtonField {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  private _textObject: Text;
  private _label: string;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor(
    context: Scene,
    positionX: number,
    positionY: number,
    label: string,
    action: () => void,
    buttonStyle: string,
    style: Phaser.Types.GameObjects.Text.TextStyle = DEFAULT_STYLE
  ) {
    super(context, positionX, positionY, buttonStyle, action);
    this._label = label;
    this._textObject = context.add.text(
      positionX - 7 * label.length,
      positionY - 10,
      label,
      style
    );
  }

  // *****************************************************************************************************************
  // PUBLIC METHOD
  // *****************************************************************************************************************

  public clear() {
    super.clear();
    this._textObject.removedFromScene();
  }

  public refreshLabel(value: string) {
    this._label = value;
    this._textObject.text = value;
    this._textObject.x = this._positionX - 7 * value.length;
  }

  // *****************************************************************************************************************
  // PRIVATE METHOD
  // *****************************************************************************************************************
}
