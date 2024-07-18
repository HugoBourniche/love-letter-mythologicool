import { LoveLetterCardStackGameObject } from "./love-letter-card-stack.game-object";
import { PositionedSceneGameObject } from "../positioned-scene.game-object";
import { LoveLetterCardData } from "../../objects/data/game/cards/love-letter-card.data";
import Phaser from "phaser";

export class LoveLetterCardStacksContainerGameObject extends PositionedSceneGameObject {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  // INPUTS
  private readonly _paddingX: number;
  // OBJECTS
  private _cardStackPileObjects?: LoveLetterCardStackGameObject;
  private _cardStackDiscardObjects?: LoveLetterCardStackGameObject;
  private _cardStackAsideObjects?: LoveLetterCardStackGameObject;
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
    this._paddingX = xPadding;
    this.create(cardStackPile, cardStackDiscard, cardStackAside);
  }

  // *****************************************************************************************************************
  // PHASER LIFE CYCLE
  // *****************************************************************************************************************

  create(
    cardStackPile: LoveLetterCardData[],
    cardStackDiscard: LoveLetterCardData[],
    cardStackAside: LoveLetterCardData[]
  ) {
    let previousObjectWidth = 0;
    this._cardStackPileObjects = this.createStacksObject(
      cardStackPile,
      this._positionX + previousObjectWidth,
      this._positionY,
      "Pile"
    );
    previousObjectWidth = this._cardStackPileObjects.stackWidth();
    this._cardStackDiscardObjects = this.createStacksObject(
      cardStackDiscard,
      this._positionX + previousObjectWidth + this._paddingX,
      this._positionY,
      "Discard"
    );
    previousObjectWidth += this._cardStackDiscardObjects.stackWidth();
    this._cardStackAsideObjects = this.createStacksObject(
      cardStackAside,
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
  ): LoveLetterCardStackGameObject {
    return new LoveLetterCardStackGameObject(
      this._context,
      positionX,
      positionY,
      label,
      _cardStack,
      _cardStack.length != 1
    );
  }
}
