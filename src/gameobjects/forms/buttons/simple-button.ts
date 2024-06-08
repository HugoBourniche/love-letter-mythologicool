import {Scene} from "phaser";
import Image = Phaser.GameObjects.Image;

export class SimpleButton {


    // *****************************************************************************************************************
    // ATTRIBUTES
    // *****************************************************************************************************************

    // OBJECTS
    protected _context: Scene;
    protected _image: Image;

    // CUSTOM VALUES
    protected _positionX: number;
    protected _positionY: number;

    protected _action: () => void;

    // *****************************************************************************************************************
    // CONSTRUCTOR
    // *****************************************************************************************************************

    constructor(context: Scene, positionX: number, positionY: number, style: Phaser.Types.GameObjects.Text.TextStyle, action: () => void) {
        this._context = context;
        this._positionX = positionX;
        this._positionY = positionY;
        this._action = action;

        this._image = context.add.image(positionX, positionY, 'button');
        this._image.setScale(1.2, 0.6).setInteractive();

        this.enableAnimation();
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