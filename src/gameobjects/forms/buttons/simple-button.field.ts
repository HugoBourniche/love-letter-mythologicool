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
    protected _action: () => void;

    // *****************************************************************************************************************
    // CONSTRUCTOR
    // *****************************************************************************************************************

    constructor(context: Scene, positionX: number, positionY: number, style: Phaser.Types.GameObjects.Text.TextStyle, action: () => void) {
        super(context, positionX, positionY);
        this._action = action;

        this._image = context.add.image(positionX, positionY, 'button');
        this._image.setScale(1.2, 0.6).setInteractive();

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
        this._image.on("pointerover", () => this._image.setTexture("buttonHover"));
        this._image.on("pointerout", () => this._image.setTexture("button"));
    }
}