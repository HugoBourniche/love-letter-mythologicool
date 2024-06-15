import { CardData } from "./cards/card.data";
import { APlayerData } from "./players/a-player-data";

export class LoveLetterPlayerData extends APlayerData {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  private _hand: CardData[];
  private _position: number;
  private _nbFavorPeace: number;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor() {
    super();
    this._hand = [];
    this._position = -1;
    this._nbFavorPeace = 0;
  }

  // *****************************************************************************************************************
  // GETTER / SETTER
  // *****************************************************************************************************************

  get hand(): CardData[] {
    return this._hand;
  }

  set hand(value: CardData[]) {
    this._hand = value;
  }

  get position(): number {
    return this._position;
  }

  set position(value: number) {
    this._position = value;
  }

  get nbFavorPeace(): number {
    return this._nbFavorPeace;
  }

  set nbFavorPeace(value: number) {
    this._nbFavorPeace = value;
  }
}
