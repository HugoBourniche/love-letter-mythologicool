import { APlayerData } from "./a-player-data";
import { LoveLetterCardData } from "../cards/love-letter-card.data";

export class LoveLetterPlayerData extends APlayerData {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  private _hand: LoveLetterCardData[];
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

  get hand(): LoveLetterCardData[] {
    return this._hand;
  }

  set hand(value: LoveLetterCardData[]) {
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
