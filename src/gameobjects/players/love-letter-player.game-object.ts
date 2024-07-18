import { LoveLetterPlayerData } from "../../objects/data/game/players/love-letter-player.data";
import { APlayerGameObject } from "./a-player.game-object";
import { LoveLetterCardGameObject } from "../cards/love-letter-card.game-object";

export abstract class LoveLetterPlayerGameObject extends APlayerGameObject<LoveLetterPlayerData> {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  // INPUTS

  // OBJECTS
  protected _cardObjects: LoveLetterCardGameObject[];

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
