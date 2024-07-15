import { LoveLetterPlayerData } from "../../objects/data/game/players/love-letter-player.data";
import { APlayerGame } from "./a-player.game";
import { LoveLetterCardGame } from "../cards/love-letter-card.game";

export abstract class LoveLetterPlayerGame extends APlayerGame<LoveLetterPlayerData> {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  // INPUTS

  // OBJECTS
  protected _cardObjects: LoveLetterCardGame[];

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  protected constructor(
    context: Phaser.Scene,
    positionX: number,
    positionY: number,
    player: LoveLetterPlayerData
  ) {
    super(context, positionX, positionY, player);
    this._cardObjects = [];
    this.initCards();
  }

  // *****************************************************************************************************************
  // ABSTRACT METHODS
  // *****************************************************************************************************************

  protected abstract initCards(): void;

  // *****************************************************************************************************************
  // OVERRIDE METHODS
  // *****************************************************************************************************************

  public override clear() {
    super.clear();
    for (const cardObject of this._cardObjects) {
      cardObject.clear();
    }
  }
}
