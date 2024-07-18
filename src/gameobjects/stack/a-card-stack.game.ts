import { SimpleField } from "../forms/simple.field";
import { ACardData } from "../../objects/data/game/cards/a-card.data";
import { ACardGame } from "../cards/a-card.game";
import { SimpleLabelField } from "../forms/simple-label.field";
import { DEFAULT_STYLE_WHITE } from "../../cst";

export abstract class ACardStackGame<
  C extends ACardData,
  CG extends ACardGame<C>
> extends SimpleField {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  // INPUTS
  protected _cardStack: C[];
  protected _label: string;

  // OBJECTS
  protected _topCardObject?: CG;
  protected _labelObject?: SimpleLabelField;

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
    this._labelObject = new SimpleLabelField(
      this._context,
      this._positionX,
      this._positionY,
      labelWithCount,
      DEFAULT_STYLE_WHITE
    );
  }

  protected adjustLabelPositionWithCard() {
    if (this._topCardObject == null || this._labelObject == null) {
      return;
    }

    const xOffset = this._topCardObject.getImageWidth() / 2;
    const yOffset =
      this._topCardObject.getImageHeight() / 2 + this._labelObject.getHeight();

    this._labelObject.moveXPosition(-xOffset);
    this._labelObject.moveYPosition(-yOffset);
  }
}
