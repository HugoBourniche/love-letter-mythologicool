import Text = Phaser.GameObjects.Text;
import {Scene} from "phaser";
import {SimpleButton} from "./simple-button";

export class LabelledButton extends SimpleButton {

    // *****************************************************************************************************************
    // ATTRIBUTES
    // *****************************************************************************************************************

    private _textObject: Text;
    private _label: string;

    // *****************************************************************************************************************
    // CONSTRUCTOR
    // *****************************************************************************************************************

    constructor(context: Scene, positionX: number, positionY: number, label: string, style: Phaser.Types.GameObjects.Text.TextStyle, action: () => void) {
        super(context, positionX, positionY, style, action);
        this._label = label;
        this._textObject = context.add.text(positionX - (7*label.length), positionY - 10, label, style);
    }

    // *****************************************************************************************************************
    // ABSTRACT METHOD
    // *****************************************************************************************************************

    // *****************************************************************************************************************
    // PRIVATE METHOD
    // *****************************************************************************************************************

}