import { PositionedSceneGameObject } from "./positioned-scene.game-object";
import Text = Phaser.GameObjects.Text;
import TextStyle = Phaser.Types.GameObjects.Text.TextStyle;
import { DEFAULT_STYLE } from "../utils/constants/cst";

export class SimpleLabelGameObject extends PositionedSceneGameObject {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  // INPUT
  protected _label: string;

  // OBJECTS
  protected _text: Text;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor(
    context: Phaser.Scene,
    positionX: number,
    positionY: number,
    label: string,
    style: TextStyle = DEFAULT_STYLE
  ) {
    super(context, positionX, positionY);
    this._label = label;
    this._text = context.add.text(positionX, positionY, this._label, style);
  }

  // *****************************************************************************************************************
  // OVERRIDE METHODS
  // *****************************************************************************************************************

  public override clear() {
    this._text.removedFromScene();
  }

  // *****************************************************************************************************************
  // PUBLIC METHODS
  // *****************************************************************************************************************

  public getWidth(): number {
    return this._text.width;
  }

  public getHeight(): number {
    return this._text.height;
  }

  public updateValue(value: string) {
    this._label = value;
    this._text.text = value;
  }

  public moveXPosition(offset: number) {
    this._text.setX(this._text.x + offset);
  }

  public moveYPosition(offset: number) {
    this._text.setY(this._text.y + offset);
  }
}
