import { ACardGameObject } from "./a-card.game-object";
import { LoveLetterCardData } from "../../objects/data/game/cards/love-letter-card.data";

export class LoveLetterCardGameObject extends ACardGameObject<LoveLetterCardData> {
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
