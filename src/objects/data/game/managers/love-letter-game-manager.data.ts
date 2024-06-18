import { CardData } from "../cards/card.data";
import { LoveLetterPlayerData } from "../love-letter-player.data";
import { GameManagerData } from "./game-manager.data";

export class LoveLetterGameManagerData extends GameManagerData<LoveLetterPlayerData> {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  private _playerTurn: number;
  private _cardPile: CardData[];
  private _discardPile: CardData[];
  private _asidePile: CardData[];

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

  get cardPile(): CardData[] {
    return this._cardPile;
  }

  set cardPile(value: CardData[]) {
    this._cardPile = value;
  }

  get discardPile(): CardData[] {
    return this._discardPile;
  }

  set discardPile(value: CardData[]) {
    this._discardPile = value;
  }

  get asidePile(): CardData[] {
    return this._asidePile;
  }

  set asidePile(value: CardData[]) {
    this._asidePile = value;
  }
}
