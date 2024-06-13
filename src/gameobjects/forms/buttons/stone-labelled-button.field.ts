import { Scene } from "phaser";
import { DEFAULT_STYLE } from "../../../cst";
import { LabelledButtonField } from "./labelled-button.field";

export class StoneLabelledButtonField extends LabelledButtonField {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor(
    context: Scene,
    positionX: number,
    positionY: number,
    label: string,
    action: () => void,
    style: Phaser.Types.GameObjects.Text.TextStyle = DEFAULT_STYLE
  ) {
    super(context, positionX, positionY, label, action, "stone_", style);

    this._image.setScale(1.2, 0.6);
  }

  // *****************************************************************************************************************
  // PUBLIC METHOD
  // *****************************************************************************************************************

  public clear() {
    super.clear();
  }

  // *****************************************************************************************************************
  // PRIVATE METHOD
  // *****************************************************************************************************************
}
