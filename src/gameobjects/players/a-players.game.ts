import { Scene } from "phaser";
import { APlayerData } from "../../objects/data/game/players/a-player-data";
import { APlayerGame } from "./a-player.game";
import { SceneObject } from "../scene-object";

export abstract class APlayersGame<
  P extends APlayerData,
  G extends APlayerGame<P>
> extends SceneObject {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  // INPUTS
  protected _width: number;
  protected _height: number;
  protected _players: P[];
  protected _currentPlayer: P;

  // OBJECTS
  protected _playersObject: G[];
  protected _currentPlayerObject?: G;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  protected constructor(
    context: Scene,
    width: number,
    height: number,
    players: P[],
    currentPlayer: P
  ) {
    super(context);
    this._width = width;
    this._height = height;
    this._players = players;
    this._playersObject = [];
    this._currentPlayer = currentPlayer;
    this.initPlayersOnCanvas();
  }

  // *****************************************************************************************************************
  // ABSTRACT METHODS
  // *****************************************************************************************************************

  protected abstract initPlayersOnCanvas(): void;
}
