import { ACardStackGame } from "./a-card-stack.game";
import { LoveLetterCardData } from "../../objects/data/game/cards/love-letter-card.data";
import { LoveLetterCardGame } from "../cards/love-letter-card.game";

export class LoveLetterCardStackGame extends ACardStackGame<
  LoveLetterCardData,
  LoveLetterCardGame
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
    return this._topCardObject ? this._topCardObject.getImageWidth() : this._labelObject ? this._labelObject.getWidth() : 0;
  }

  public stackHeight(): number {
    return this._topCardObject ? this._topCardObject.getImageHeight() : this._labelObject ? this._labelObject.getHeight() : 0;
  }

  // *****************************************************************************************************************
  // PRIVATE METHODS
  // *****************************************************************************************************************

  private drawCard(): void {
    const lastCard = this._cardStack[this._cardStack.length - 1];
    this._topCardObject = new LoveLetterCardGame(
      this._context,
      this._positionX,
      this._positionY,
      lastCard
    );
  }
}
