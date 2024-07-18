import { ACardStackGameObject } from "./a-card-stack.game-object";
import { LoveLetterCardData } from "../../objects/data/game/cards/love-letter-card.data";
import { LoveLetterCardGameObject } from "../cards/love-letter-card.game-object";

export class LoveLetterCardStackGameObject extends ACardStackGameObject<
  LoveLetterCardData,
  LoveLetterCardGameObject
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
    this._topCardObject = new LoveLetterCardGameObject(
      this._context,
      this._positionX,
      this._positionY,
      lastCard
    );
  }
}
