import { APlayerData } from "../players/a-player-data";
import { ARequestedActionData } from "../actions/a-requested-action.data";

export abstract class GameManagerData<
  P extends APlayerData,
  A extends ARequestedActionData
> {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  private _currentPlayer?: P;
  private _players: P[];
  private _requestedAction?: A;

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

  get requestedAction(): A | undefined {
    return this._requestedAction;
  }

  set requestedAction(value: A | undefined) {
    this._requestedAction = value;
  }
}
