import {Scene} from "phaser";
import Image = Phaser.GameObjects.Image;
import {SimpleField} from "../simple.field";

export class SimpleButtonField extends SimpleField {


    // *****************************************************************************************************************
    // ATTRIBUTES
    // *****************************************************************************************************************

    // OBJECTS
    protected _image: Image;

    // CUSTOM VALUES
    protected _imageRef: string;
    protected _action: () => void;

    // *****************************************************************************************************************
    // CONSTRUCTOR
    // *****************************************************************************************************************

    constructor(context: Scene, positionX: number, positionY: number, imagePrefix: string, action: () => void) {
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

    // *****************************************************************************************************************
    // PRIVATE METHOD
    // *****************************************************************************************************************

    private enableAnimation(): void {
        this._image.on("pointerup", () => this._action());
        this._image.on("pointerover", () => this._image.setTexture(this._imageRef + "Hover"));
        this._image.on("pointerout", () => this._image.setTexture(this._imageRef));
    }
}