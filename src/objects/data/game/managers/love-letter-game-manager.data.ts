import { LoveLetterPlayerData } from "../players/love-letter-player.data";
import { GameManagerData } from "./game-manager.data";
import { LoveLetterCardData } from "../cards/love-letter-card.data";
import { LoveLetterRequestedActionData } from "../actions/love-letter-requested-action.data";

export class LoveLetterGameManagerData extends GameManagerData<
  LoveLetterPlayerData,
  LoveLetterRequestedActionData
> {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  private _playerTurn: number;
  private _cardPile: LoveLetterCardData[];
  private _discardPile: LoveLetterCardData[];
  private _asidePile: LoveLetterCardData[];

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor() {
    super();
    this._playerTurn = -1;
    this._cardPile = [];
    this._discardPile = [];
    this._asidePile = [];
  }
  // *****************************************************************************************************************
  // GETTER/SETTER
  // *****************************************************************************************************************

  get playerTurn(): number {
    return this._playerTurn;
  }

  set playerTurn(value: number) {
    this._playerTurn = value;
  }

  get cardPile(): LoveLetterCardData[] {
    return this._cardPile;
  }

  set cardPile(value: LoveLetterCardData[]) {
    this._cardPile = value;
  }

  get discardPile(): LoveLetterCardData[] {
    return this._discardPile;
  }

  set discardPile(value: LoveLetterCardData[]) {
    this._discardPile = value;
  }

  get asidePile(): LoveLetterCardData[] {
    return this._asidePile;
  }

  set asidePile(value: LoveLetterCardData[]) {
    this._asidePile = value;
  }
}
