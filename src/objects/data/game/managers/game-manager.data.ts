import { APlayerData } from "../players/a-player-data";

export abstract class GameManagerData<P extends APlayerData> {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  private _currentPlayer?: P;
  private _players: P[];

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  protected constructor() {
    this._players = [];
  }

  // *****************************************************************************************************************
  // GETTER / SETTER
  // *****************************************************************************************************************

  get currentPlayer(): P | undefined {
    return this._currentPlayer;
  }

  set currentPlayer(value: P | undefined) {
    this._currentPlayer = value;
  }

  get players(): P[] {
    return this._players;
  }

  set players(value: P[]) {
    this._players = value;
  }
}
