import { ACardData } from "../cards/a-card.data";
import { LoveLetterPlayerData } from "../players/love-letter-player.data";
import { GameManagerData } from "./game-manager.data";

export class LoveLetterGameManagerData extends GameManagerData<LoveLetterPlayerData> {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  private _playerTurn: number;
  private _cardPile: ACardData[];
  private _discardPile: ACardData[];
  private _asidePile: ACardData[];

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

  get cardPile(): ACardData[] {
    return this._cardPile;
  }

  set cardPile(value: ACardData[]) {
    this._cardPile = value;
  }

  get discardPile(): ACardData[] {
    return this._discardPile;
  }

  set discardPile(value: ACardData[]) {
    this._discardPile = value;
  }

  get asidePile(): ACardData[] {
    return this._asidePile;
  }

  set asidePile(value: ACardData[]) {
    this._asidePile = value;
  }
}
