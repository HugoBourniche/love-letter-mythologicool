import { LoveLetterPlayerData } from "../../objects/data/game/players/love-letter-player.data";
import { LoveLetterCardObject } from "../cards/love-letter-card.object";
import { LoveLetterPlayerObject } from "./love-letter-player-object";

export class LoveLetterCurrentPlayerObject extends LoveLetterPlayerObject {
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
      const cardObject = new LoveLetterCardObject(
        this._context,
        this._positionX + 80 + 200 * i,
        this._positionY,
        cardData,
        0.18
      );
      this._cardObjects.push(cardObject);
    }
  }

  // *****************************************************************************************************************
  // PRIVATE METHODS
  // *****************************************************************************************************************
}
