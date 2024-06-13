import { GameOptionRangeData } from "./game-option-range.data";

export class GameOptionsData {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  private _maxPlayers: number;
  private _ranges: GameOptionRangeData;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor() {
    this._maxPlayers = 0;
    this._ranges = new GameOptionRangeData();
  }

  // *****************************************************************************************************************
  // GETTER / SETTER
  // *****************************************************************************************************************

  get maxPlayers(): number {
    return this._maxPlayers;
  }

  set maxPlayers(value: number) {
    this._maxPlayers = value;
  }

  get ranges(): GameOptionRangeData {
    return this._ranges;
  }

  set ranges(value: GameOptionRangeData) {
    this._ranges = value;
  }
}
