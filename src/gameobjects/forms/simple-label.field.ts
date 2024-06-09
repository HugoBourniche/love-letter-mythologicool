import {SimpleField} from "./simple.field";
import Text = Phaser.GameObjects.Text;
import TextStyle = Phaser.Types.GameObjects.Text.TextStyle;
import {DEFAULT_STYLE} from "../../cst";

export class SimpleLabelField extends SimpleField {

    // *****************************************************************************************************************
    // ATTRIBUTES
    // *****************************************************************************************************************

    protected _label: string;
    protected _text: Text;

    // *****************************************************************************************************************
    // CONSTRUCTOR
    // *****************************************************************************************************************

    constructor(context: Phaser.Scene, positionX: number, positionY: number, label: string, style: TextStyle = DEFAULT_STYLE) {
        super(context, positionX, positionY);
        this._label = label;
        this._text = context.add.text(positionX, positionY, label, style);
    }

    // *****************************************************************************************************************
    // PUBLIC METHODS
    // *****************************************************************************************************************

    public override clear() {
        this._text.removedFromScene();
    }
}