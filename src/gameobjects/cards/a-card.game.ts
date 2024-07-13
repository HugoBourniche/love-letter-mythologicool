import {ACardData} from "../../objects/data/game/cards/a-card.data";
import Image = Phaser.GameObjects.Image;
import {SimpleField} from "../forms/simple.field";

export abstract class ACardGame<C extends ACardData> extends SimpleField {

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

    protected constructor(context: Phaser.Scene, positionX: number, positionY: number, card: C, scale = 0.1) {
        super(context, positionX, positionY);
        this._card = card;
        this._image = context.add.image(positionX + (10 * scale), positionY, card.spriteId);
        this._image.setScale(scale, scale);
    }

    // *****************************************************************************************************************
    // OVERRIDES METHODS
    // *****************************************************************************************************************

    public override clear() {
        this._image.removedFromScene();
    }
}