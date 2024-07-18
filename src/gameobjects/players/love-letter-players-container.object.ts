import { LoveLetterPlayerData } from "../../objects/data/game/players/love-letter-player.data";
import { APlayersContainerObject } from "./a-players-container.object";
import { LoveLetterOtherPlayerObject } from "./love-letter-other-player.object";
import { LoveLetterCurrentPlayerObject } from "./love-letter-current-player.object";
import { LoveLetterPlayerObject } from "./love-letter-player-object";

export class LoveLetterPlayersContainerObject extends APlayersContainerObject<
  LoveLetterPlayerData,
  LoveLetterPlayerObject
> {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor(
    context: Phaser.Scene,
    width: number,
    height: number,
    players: LoveLetterPlayerData[],
    currentPlayer: LoveLetterPlayerData
  ) {
    super(context, width, height, players, currentPlayer);
  }

  // *****************************************************************************************************************
  // OVERRIDE METHODS
  // *****************************************************************************************************************

  protected override initPlayersOnCanvas(): void {
    this._currentPlayerObject = new LoveLetterCurrentPlayerObject(
      this._context,
      this._width / 6,
      (this._height / 6) * 4,
      this._currentPlayer
    );
    const nbPlayers = this._players.length;
    const range = this._width / nbPlayers;
    for (let i = 0; i < this._players.length; i++) {
      this._playersObject.push(
        new LoveLetterOtherPlayerObject(
          this._context,
          i * range + range / 2,
          this._height / 6,
          this._players[i]
        )
      );
    }
  }
}
