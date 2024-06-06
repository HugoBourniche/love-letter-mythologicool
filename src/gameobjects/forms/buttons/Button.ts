import Text = Phaser.GameObjects.Text;
import Image = Phaser.GameObjects.Image;
import {Scene} from "phaser";

export class Button {

    // *****************************************************************************************************************
    // ATTRIBUTES
    // *****************************************************************************************************************

    // OBJECTS
    private _context: Scene;
    private _textObject: Text;
    private _image: Image;

    // CUSTOM VALUES
    private _positionX: number;
    private _positionY: number;
    private _label: string;

    private _action: () => void;

    // *****************************************************************************************************************
    // CONSTRUCTOR
    // *****************************************************************************************************************

    constructor(context: Scene, positionX: number, positionY: number, label: string, style: Phaser.Types.GameObjects.Text.TextStyle, action: () => void) {
        this._context = context;
        this._positionX = positionX;
        this._positionY = positionY;
        this._label = label;
        this._action = action;

        this._image = context.add.image(positionX, positionY, 'button');
        this._image.setScale(1.2, 0.6).setInteractive();
        this._textObject = context.add.text(positionX - (7*label.length), positionY - 10, label, style);

        this.enableAnimation();
    }

    // *****************************************************************************************************************
    // ABSTRACT METHOD
    // *****************************************************************************************************************

    // *****************************************************************************************************************
    // PRIVATE METHOD
    // *****************************************************************************************************************

    private enableAnimation(): void {
        this._image.on("pointerup", () => this._action());
        this._image.on("pointerover", () => this._image.setTexture("buttonHover"));
        this._image.on("pointerout", () => this._image.setTexture("button"));
    }

}