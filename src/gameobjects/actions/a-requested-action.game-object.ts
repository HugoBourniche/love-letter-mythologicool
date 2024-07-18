import { SimpleLabelGameObject } from "../simple-label.game-object";
import { ARequestedActionData } from "../../objects/data/game/actions/a-requested-action.data";
import { PositionedSceneGameObject } from "../positioned-scene.game-object";
import Phaser from "phaser";
import { DEFAULT_STYLE_WHITE } from "../../utils/constants/cst";

export abstract class ARequestedActionGameObject<
  A extends ARequestedActionData
> extends PositionedSceneGameObject {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  // INPUTS
  protected _requestedAction: A;
  // OBJECTS
  protected _labelObject?: SimpleLabelGameObject;
  // VARIABLES
  protected _label: string;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  protected constructor(
    context: Phaser.Scene,
    positionX: number,
    positionY: number,
    requestedAction: A
  ) {
    super(context, positionX, positionY);
    this._requestedAction = requestedAction;
    this._label = "";
  }

  // *****************************************************************************************************************
  // PHASER LIFE CYCLE
  // *****************************************************************************************************************

  create() {
    this._label = this.buildRequestedActionLabel();
    this._labelObject = new SimpleLabelGameObject(
      this._context,
      this._positionX,
      this._positionY,
      this._label,
      DEFAULT_STYLE_WHITE
    );
  }

  update(requestedAction: A) {
    this._requestedAction = requestedAction;
    this._label = this.buildRequestedActionLabel();
    this._labelObject?.updateValue(this._label);
  }

  // *****************************************************************************************************************
  // OVERRIDE METHODS
  // *****************************************************************************************************************

  public override clear(): void {
    this._labelObject?.clear();
  }

  // *****************************************************************************************************************
  // PUBLIC METHODS
  // *****************************************************************************************************************

  // *****************************************************************************************************************
  // PRIVATE METHODS
  // *****************************************************************************************************************

  protected abstract buildRequestedActionLabel(): string;
}
