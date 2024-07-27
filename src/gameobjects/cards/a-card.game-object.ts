import { ACardData } from "../../objects/data/game/cards/a-card.data";
import { PositionedSceneGameObject } from "../positioned-scene.game-object";
import { IClickInteractive } from "../../utils/interfaces/i-click.interactive";
import Image = Phaser.GameObjects.Image;
import { PHASER_EVENT_POINTER_UP } from "../../utils/constants/cst";
import { IDraggableInteractive } from "../../utils/interfaces/i-draggable.interactive";

export abstract class ACardGameObject<C extends ACardData>
  extends PositionedSceneGameObject
  implements IClickInteractive, IDraggableInteractive
{
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
    this._image.setInteractive();
    this._image.setScale(scale, scale);
  }

  // *****************************************************************************************************************
  // OVERRIDES METHODS
  // *****************************************************************************************************************

  public override clear() {
    this._image.removedFromScene();
  }

  // *****************************************************************************************************************
  // IMPLEMENTS METHODS
  // *****************************************************************************************************************

  // IClickInteractive

  public onClick(onClickEvent: () => void): void {
    this._image.on(PHASER_EVENT_POINTER_UP, () => onClickEvent());
  }

  // IDraggableInteractive

  public enableDrag(): void {
    this._context.input.setDraggable(this._image);
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
