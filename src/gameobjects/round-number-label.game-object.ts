import { PositionedSceneGameObject } from "./positioned-scene.game-object";
import { SimpleLabelGameObject } from "./simple-label.game-object";
import { DEFAULT_STYLE_WHITE } from "../utils/constants/cst";

export class RoundNumberLabelGameObject extends PositionedSceneGameObject {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  // INPUTS
  private _roundNumber: number;
  // OBJECTS
  private _textObject?: SimpleLabelGameObject;
  // VARIABLES

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor(
    context: Phaser.Scene,
    positionX: number,
    positionY: number,
    roundNumber: number
  ) {
    super(context, positionX, positionY);
    this._roundNumber = roundNumber;
    this._textObject = new SimpleLabelGameObject(
      context,
      positionX,
      positionY,
      this.label,
      DEFAULT_STYLE_WHITE
    );
  }

  // *****************************************************************************************************************
  // OVERRIDE METHODS
  // *****************************************************************************************************************

  clear(): void {
    this._textObject?.clear();
  }

  // *****************************************************************************************************************
  // PUBLIC METHODS
  // *****************************************************************************************************************

  public updateRoundNumber(roundNumber: number): void {
    this._roundNumber = roundNumber;
    this._textObject?.updateValue(this.label);
  }

  // GETTER

  get label(): string {
    return "Round " + this._roundNumber;
  }

  // *****************************************************************************************************************
  // PRIVATE METHODS
  // *****************************************************************************************************************
}
