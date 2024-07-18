import { LoveLetterCardStackGame } from "./love-letter-card-stack.game";
import { PositionedSceneObject } from "../positioned-scene.object";
import { LoveLetterCardData } from "../../objects/data/game/cards/love-letter-card.data";
import Phaser from "phaser";

export class LoveLetterCardStacksContainerGame extends PositionedSceneObject {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  // INPUTS
  private _cardStackPile: LoveLetterCardData[];
  private _cardStackDiscard: LoveLetterCardData[];
  private _cardStackAside: LoveLetterCardData[];
  private _paddingX: number;
  // OBJECTS
  private _cardStackPileObjects?: LoveLetterCardStackGame;
  private _cardStackDiscardObjects?: LoveLetterCardStackGame;
  private _cardStackAsideObjects?: LoveLetterCardStackGame;
  // VARIABLES

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor(
    context: Phaser.Scene,
    positionX: number,
    positionY: number,
    cardStackPile: LoveLetterCardData[],
    cardStackDiscard: LoveLetterCardData[],
    cardStackAside: LoveLetterCardData[],
    xPadding = 40
  ) {
    super(context, positionX, positionY);
    this._cardStackPile = cardStackPile;
    this._cardStackDiscard = cardStackDiscard;
    this._cardStackAside = cardStackAside;
    this._paddingX = xPadding;
    this.create();
  }

  // *****************************************************************************************************************
  // PHASER LIFE CYCLE
  // *****************************************************************************************************************

  create() {
    let previousObjectWidth = 0;
    console.log("PILE: Position X = " + this._positionX + ", previous stack width = " + previousObjectWidth);
    this._cardStackPileObjects = this.createStacksObject(
      this._cardStackPile,
      this._positionX + previousObjectWidth,
      this._positionY,
      "Pile"
    );
    previousObjectWidth = this._cardStackPileObjects.stackWidth();
    console.log("DISCARD: Position X = " + this._positionX + ", previous stack width = " + previousObjectWidth + ", paddingX = " + this._paddingX);
    this._cardStackDiscardObjects = this.createStacksObject(
      this._cardStackDiscard,
      this._positionX + previousObjectWidth + this._paddingX,
      this._positionY,
      "Discard"
    );
    previousObjectWidth += this._cardStackDiscardObjects.stackWidth();
    console.log("ASIDE: Position X = " + this._positionX + ", previous stack width = " + previousObjectWidth + ", paddingX = " + this._paddingX * 2);
    this._cardStackAsideObjects = this.createStacksObject(
      this._cardStackAside,
      this._positionX + previousObjectWidth + this._paddingX * 2,
      this._positionY,
      "Aside"
    );
  }

  // *****************************************************************************************************************
  // OVERRIDE METHODS
  // *****************************************************************************************************************

  clear(): void {
    this._cardStackPileObjects?.clear();
    this._cardStackDiscardObjects?.clear();
    this._cardStackAsideObjects?.clear();
  }

  // *****************************************************************************************************************
  // PRIVATE METHODS
  // *****************************************************************************************************************

  private createStacksObject(
    _cardStack: LoveLetterCardData[],
    positionX: number,
    positionY: number,
    label: string
  ): LoveLetterCardStackGame {
    return new LoveLetterCardStackGame(
      this._context,
      positionX,
      positionY,
      label,
      _cardStack,
      _cardStack.length != 1
    );
  }
}
