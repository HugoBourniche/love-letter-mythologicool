import { SceneGameObject } from "./scene.game-object";

export abstract class PositionedSceneGameObject extends SceneGameObject {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  // INPUTS
  protected _positionX: number;
  protected _positionY: number;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  protected constructor(
    context: Phaser.Scene,
    positionX: number,
    positionY: number
  ) {
    super(context);
    this._positionX = positionX;
    this._positionY = positionY;
  }

  // *****************************************************************************************************************
  // ABSTRACT METHODS
  // *****************************************************************************************************************

  public abstract clear(): void;
}
