import { LoveLetterPlayerData } from "../../objects/data/game/players/love-letter-player.data";
import { APlayersContainerGameObject } from "./a-players-container.game-object";
import { LoveLetterOtherPlayerGameObject } from "./love-letter-other-player.game-object";
import { LoveLetterCurrentPlayerGameObject } from "./love-letter-current-player.game-object";
import { LoveLetterPlayerGameObject } from "./love-letter-player.game-object";

export class LoveLetterPlayersContainerGameObject extends APlayersContainerGameObject<
  LoveLetterPlayerData,
  LoveLetterPlayerGameObject
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
    this._currentPlayerObject = new LoveLetterCurrentPlayerGameObject(
      this._context,
      this._width / 6,
      (this._height / 6) * 4,
      this._currentPlayer
    );
    const nbPlayers = this._players.length;
    const range = this._width / nbPlayers;
    for (let i = 0; i < this._players.length; i++) {
      this._playersObject.push(
        new LoveLetterOtherPlayerGameObject(
          this._context,
          i * range + range / 2,
          this._height / 6,
          this._players[i]
        )
      );
    }
  }
}
