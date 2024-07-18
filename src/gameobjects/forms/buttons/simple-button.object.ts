import { Scene } from "phaser";
import Image = Phaser.GameObjects.Image;
import { SimpleInteractiveObject } from "../simple-interactive.object";

export class SimpleButtonObject extends SimpleInteractiveObject {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  // INPUTS
  protected _imageRef: string;
  protected _action: () => void;

  // OBJECTS
  protected _image: Image;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor(
    context: Scene,
    positionX: number,
    positionY: number,
    imagePrefix: string,
    action: () => void
  ) {
    super(context, positionX, positionY);
    this._action = action;
    this._imageRef = imagePrefix + "button";
    this._image = context.add.image(positionX, positionY, this._imageRef);
    this._image.setInteractive();

    this.enableAnimation();
  }

  // *****************************************************************************************************************
  // PUBLIC METHOD
  // *****************************************************************************************************************

  public override clear() {
    this._image.removedFromScene();
  }

  public override disable(): void {
    this._image.disableInteractive();
  }

  public override enable(): void {
    this._image.setInteractive();
  }

  // *****************************************************************************************************************
  // PRIVATE METHOD
  // *****************************************************************************************************************

  private enableAnimation(): void {
    this._image.on("pointerup", () => this._action());
    this._image.on("pointerover", () =>
      this._image.setTexture(this._imageRef + "Hover")
    );
    this._image.on("pointerout", () => this._image.setTexture(this._imageRef));
  }
}
