import { LoveLetterPlayerData } from "../../objects/data/game/players/love-letter-player.data";
import { APlayerObject } from "./a-player.object";
import { LoveLetterCardObject } from "../cards/love-letter-card.object";

export abstract class LoveLetterPlayerObject extends APlayerObject<LoveLetterPlayerData> {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  // INPUTS

  // OBJECTS
  protected _cardObjects: LoveLetterCardObject[];

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
