import { LoveLetterPlayerData } from "../../objects/data/game/players/love-letter-player.data";
import { LoveLetterCardGameObject } from "../cards/love-letter-card.game-object";
import { LoveLetterPlayerGameObject } from "./love-letter-player.game-object";

export class LoveLetterCurrentPlayerGameObject extends LoveLetterPlayerGameObject {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  // INPUTS
  // OBJECTS

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor(
    context: Phaser.Scene,
    positionX: number,
    positionY: number,
    player: LoveLetterPlayerData
  ) {
    super(context, positionX, positionY, player);
  }

  // *****************************************************************************************************************
  // OVERRIDE METHODS
  // *****************************************************************************************************************

  public override clear() {
    super.clear();
  }

  protected override initCards() {
    for (let i = 0; i < this._player.hand.length; i++) {
      const cardData = this._player.hand[i];
      const cardObject = new LoveLetterCardGameObject(
        this._context,
        this._positionX + 80 + 200 * i,
        this._positionY,
        cardData,
        0.18
      );
      cardObject.enableDrag();
      this._cardObjects.push(cardObject);
    }
  }

  // *****************************************************************************************************************
  // PRIVATE METHODS
  // *****************************************************************************************************************
}
