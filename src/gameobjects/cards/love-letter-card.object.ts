import { ACardObject } from "./a-card.object";
import { LoveLetterCardData } from "../../objects/data/game/cards/love-letter-card.data";

export class LoveLetterCardObject extends ACardObject<LoveLetterCardData> {
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
    card: LoveLetterCardData,
    scale = 0.1
  ) {
    super(context, positionX, positionY, card, scale);
  }
}
