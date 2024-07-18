import { ACardStackObject } from "./a-card-stack.object";
import { LoveLetterCardData } from "../../objects/data/game/cards/love-letter-card.data";
import { LoveLetterCardObject } from "../cards/love-letter-card.object";

export class LoveLetterCardStackObject extends ACardStackObject<
  LoveLetterCardData,
  LoveLetterCardObject
> {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor(
    context: Phaser.Scene,
    positionX: number,
    positionY: number,
    label: string,
    cardStack: LoveLetterCardData[],
    showCount = true
  ) {
    super(context, positionX, positionY, label, cardStack, showCount);
  }

  // *****************************************************************************************************************
  // OVERRIDE METHODS
  // *****************************************************************************************************************

  protected override initCanvas(): void {
    super.initCanvas();
    if (this._cardStack.length > 0) {
      this.drawCard();
      this.adjustLabelPositionWithCard();
    }
  }

  // *****************************************************************************************************************
  // PUBLIC METHODS
  // *****************************************************************************************************************

  public stackWidth(): number {
    return this._topCardObject
      ? this._topCardObject.getImageWidth()
      : this._labelObject
      ? this._labelObject.getWidth()
      : 0;
  }

  public stackHeight(): number {
    return this._topCardObject
      ? this._topCardObject.getImageHeight()
      : this._labelObject
      ? this._labelObject.getHeight()
      : 0;
  }

  // *****************************************************************************************************************
  // PRIVATE METHODS
  // *****************************************************************************************************************

  private drawCard(): void {
    const lastCard = this._cardStack[this._cardStack.length - 1];
    this._topCardObject = new LoveLetterCardObject(
      this._context,
      this._positionX,
      this._positionY,
      lastCard
    );
  }
}
