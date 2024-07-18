import { PositionedSceneGameObject } from "../positioned-scene.game-object";
import { ACardData } from "../../objects/data/game/cards/a-card.data";
import { ACardGameObject } from "../cards/a-card.game-object";
import { SimpleLabelGameObject } from "../simple-label.game-object";
import { DEFAULT_STYLE_WHITE } from "../../utils/constants/cst";

export abstract class ACardStackGameObject<
  C extends ACardData,
  CG extends ACardGameObject<C>
> extends PositionedSceneGameObject {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  // INPUTS
  protected _cardStack: C[];
  protected _label: string;

  // OBJECTS
  protected _topCardObject?: CG;
  protected _labelObject?: SimpleLabelGameObject;

  // VARIABLES
  protected _showCount = true;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  protected constructor(
    context: Phaser.Scene,
    positionX: number,
    positionY: number,
    label: string,
    cardStack: C[],
    showCount: boolean
  ) {
    super(context, positionX, positionY);
    this._label = label;
    this._cardStack = cardStack;
    this._showCount = showCount;
    this.initCanvas();
  }

  // *****************************************************************************************************************
  // ABSTRACT METHODS
  // *****************************************************************************************************************

  // *****************************************************************************************************************
  // OVERRIDE METHODS
  // *****************************************************************************************************************

  public clear(): void {
    this._topCardObject?.clear();
    this._labelObject?.clear();
  }

  // *****************************************************************************************************************
  // PRIVATE METHODS
  // *****************************************************************************************************************

  protected initCanvas() {
    const labelWithCount =
      this._label + (this._showCount ? "(" + this._cardStack.length + ")" : "");
    this._labelObject = new SimpleLabelGameObject(
      this._context,
      this._positionX,
      this._positionY,
      labelWithCount,
      DEFAULT_STYLE_WHITE
    );
  }

  protected adjustLabelPositionWithCard() {
    let xOffset = 0;
    let yOffset = 0;
    if (this._topCardObject != null) {
      xOffset += this._topCardObject.getImageWidth() / 2;
      yOffset += this._topCardObject.getImageHeight() / 2;
    }

    if (this._labelObject != null) {
      yOffset += this._labelObject.getHeight();
      this._labelObject.moveXPosition(-xOffset);
      this._labelObject.moveYPosition(-yOffset);
    }
  }
}
