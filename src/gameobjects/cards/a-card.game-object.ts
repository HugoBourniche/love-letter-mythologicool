import { ACardData } from "../../objects/data/game/cards/a-card.data";
import Image = Phaser.GameObjects.Image;
import { PositionedSceneGameObject } from "../positioned-scene.game-object";

export abstract class ACardGameObject<
  C extends ACardData
> extends PositionedSceneGameObject {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  // INPUTS
  private _card: C;

  // OBJECTS
  private _image: Image;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  protected constructor(
    context: Phaser.Scene,
    positionX: number,
    positionY: number,
    card: C,
    scale = 0.1
  ) {
    super(context, positionX, positionY);
    this._card = card;
    this._image = context.add.image(
      positionX + 10 * scale,
      positionY,
      card.spriteId
    );
    this._image.setScale(scale, scale);
  }

  // *****************************************************************************************************************
  // OVERRIDES METHODS
  // *****************************************************************************************************************

  public override clear() {
    this._image.removedFromScene();
  }

  // *****************************************************************************************************************
  // PUBLIC METHODS
  // *****************************************************************************************************************

  public getImageHeight(): number {
    return this._image.height * this._image.scaleY;
  }

  public getImageWidth(): number {
    return this._image.width * this._image.scaleX;
  }
}
